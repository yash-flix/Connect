import type { Dictionary } from "@/lib/i18n";

/**
 * Structure for the /packages page. The words for each language live in
 * lib/i18n; the helpers below join the two. Plain words only: no vendor or
 * tool names.
 */

export type PlanId = "core" | "growth";

export type Plan = {
  id: PlanId;
  /** Package names are the same in every language. */
  name: string;
  tagline: string;
  bestFor: string;
  lead?: string;
  features: string[];
};

const planNames: Record<PlanId, string> = { core: "Core", growth: "Growth" };

export function getPlans(d: Dictionary): Plan[] {
  return (["core", "growth"] as const).map((id) => ({ id, name: planNames[id], ...d.plans[id] }));
}

export type FlowStep = {
  title: string;
  sub: string;
  /** "growth" steps exist only in Growth. "decision" steps branch to you. */
  kind: "both" | "growth" | "decision";
  /** Where a "No" at a decision goes. */
  no?: { title: string; sub: string };
  tag?: string;
};

type FlowShape = { kind: FlowStep["kind"]; sameAsCore?: boolean };

const coreShape: FlowShape[] = [
  { kind: "both" },
  { kind: "both" },
  { kind: "both" },
  { kind: "decision" },
  { kind: "both" },
  { kind: "both" },
  { kind: "both" },
];

const growthShape: FlowShape[] = [
  { kind: "growth" },
  { kind: "growth" },
  { kind: "growth" },
  { kind: "growth" },
  { kind: "decision" },
  { kind: "both", sameAsCore: true },
  { kind: "both", sameAsCore: true },
];

function flow(shape: FlowShape[], text: Dictionary["coreFlow"], d: Dictionary): FlowStep[] {
  return shape.map((s, i) => ({
    ...text[i],
    kind: s.kind,
    tag: s.sameAsCore ? d.packages.flows.sameAsCore : undefined,
  }));
}

export const getCoreFlow = (d: Dictionary) => flow(coreShape, d.coreFlow, d);
export const getGrowthFlow = (d: Dictionary) => flow(growthShape, d.growthFlow, d);

type Cell = boolean | string;

/** Tick (`true`) and dash (`false`) cells; `null` takes the row's text from the dictionary. */
const matrixShape: [boolean | null, boolean | null][] = [
  [true, true],
  [null, null],
  [false, true],
  [true, true],
  [true, true],
  [false, true],
  [false, true],
  [true, true],
  [true, true],
  [true, true],
  [null, null],
];

/** Component matrix. `true` is a tick, `false` a dash, a string is shown as is. */
export function getMatrix(d: Dictionary): [string, Cell, Cell][] {
  return matrixShape.map(([core, growth], i) => {
    const row = d.matrix[i];
    return [row.label, core ?? row.core ?? "", growth ?? row.growth ?? ""];
  });
}
