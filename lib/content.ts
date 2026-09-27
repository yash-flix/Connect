import type { Dictionary } from "@/lib/i18n";

/**
 * Structure for the home page: ids, codes, heights. The words for each
 * language live in lib/i18n; the helpers below join the two.
 */

/** The two parent agents: one per channel. Every job below runs through them. */
export type ParentId = "whatsapp" | "voice";

/** The jobs the parent agents carry out. */
export type AgentId =
  | "qualify"
  | "booking"
  | "followup"
  | "handoff"
  | "proposal"
  | "content"
  | "marketing"
  | "leadgen";

export type Parent = {
  id: ParentId;
  code: string;
  name: string;
  job: string;
};

export type Agent = {
  id: AgentId;
  code: string;
  name: string;
  job: string;
  example: string;
  /** Which parent agents carry out this job. */
  by: ParentId[];
  /** Module height on the isometric board. */
  height: number;
};

const parentShape: { id: ParentId; code: string }[] = [
  { id: "whatsapp", code: "A-01" },
  { id: "voice", code: "A-02" },
];

const agentShape: Pick<Agent, "id" | "code" | "by" | "height">[] = [
  { id: "qualify", code: "J-01", by: ["whatsapp", "voice"], height: 7 },
  { id: "booking", code: "J-02", by: ["whatsapp", "voice"], height: 8 },
  { id: "followup", code: "J-03", by: ["whatsapp", "voice"], height: 6 },
  { id: "handoff", code: "J-04", by: ["whatsapp", "voice"], height: 10 },
  { id: "proposal", code: "J-05", by: ["whatsapp"], height: 9 },
  { id: "content", code: "J-06", by: ["whatsapp"], height: 4 },
  { id: "marketing", code: "J-07", by: ["whatsapp"], height: 5 },
  { id: "leadgen", code: "J-08", by: ["whatsapp", "voice"], height: 5 },
];

export function getParents(d: Dictionary): Parent[] {
  return parentShape.map((p) => ({ ...p, ...d.parents[p.id] }));
}

export function getAgents(d: Dictionary): Agent[] {
  return agentShape.map((a) => ({ ...a, ...d.agents[a.id] }));
}

export type Step = { n: string; title: string; body: string; branch?: string };

export function getSteps(d: Dictionary): Step[] {
  return d.steps.map((s, i) => ({ n: String(i + 1).padStart(2, "0"), ...s }));
}

export type Faq = Dictionary["faqs"][number];
