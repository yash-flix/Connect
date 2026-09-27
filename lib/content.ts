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

export const parents: Parent[] = [
  {
    id: "whatsapp",
    code: "A-01",
    name: "WhatsApp agent",
    job: "Replies to every message in seconds, day or night, using only the information you’ve approved.",
  },
  {
    id: "voice",
    code: "A-02",
    name: "Voice agent",
    job: "Calls new form and ad enquiries back within about two minutes and asks your questions by voice.",
  },
];

export const agents: Agent[] = [
  {
    id: "qualify",
    code: "J-01",
    name: "Qualify",
    job: "Asks the questions you’d ask: what they need, their budget, their timing. Saves every answer.",
    example: "Learns it’s a first visit, for Saturday, paying by card.",
    by: ["whatsapp", "voice"],
    height: 7,
  },
  {
    id: "booking",
    code: "J-02",
    name: "Booking",
    job: "Offers open slots from your calendar, confirms one and sends a reminder.",
    example: "Books Tuesday 4:00 pm while you’re with another client.",
    by: ["whatsapp", "voice"],
    height: 8,
  },
  {
    id: "followup",
    code: "J-03",
    name: "Follow-up",
    job: "Checks in with leads who went quiet and clients who are due back.",
    example: "Nudges the Friday inquiry that never picked a time.",
    by: ["whatsapp", "voice"],
    height: 6,
  },
  {
    id: "handoff",
    code: "J-04",
    name: "Hand-off",
    job: "Sends you ready customers, and anything outside your information, with a short summary.",
    example: "“Priya, first visit, Sat 10:00, asked about parking.”",
    by: ["whatsapp", "voice"],
    height: 10,
  },
  {
    id: "proposal",
    code: "J-05",
    name: "Proposals",
    job: "Turns what a lead told you into a draft quote for you to check.",
    example: "Drafts the quote after a site visit, ready for your edits.",
    by: ["whatsapp"],
    height: 9,
  },
  {
    id: "content",
    code: "J-06",
    name: "Content",
    job: "Drafts posts and updates in your voice. Nothing goes out until you approve it.",
    example: "Turns next week’s open slots into a short post.",
    by: ["whatsapp"],
    height: 4,
  },
  {
    id: "marketing",
    code: "J-07",
    name: "Marketing",
    job: "Sends simple campaigns to past clients and people who asked but didn’t book.",
    example: "Tells last year’s clients the season is opening up.",
    by: ["whatsapp"],
    height: 5,
  },
  {
    id: "leadgen",
    code: "J-08",
    name: "Lead generation",
    job: "Finds prospects that match the work you want more of.",
    example: "Lists nearby offices that might need regular servicing.",
    by: ["whatsapp", "voice"],
    height: 5,
  },
];

export type Step = { n: string; title: string; body: string; branch?: string };

export const steps: Step[] = [
  {
    n: "01",
    title: "A customer gets in touch",
    body: "A message from your ad, your website or a listing, at any hour.",
  },
  {
    n: "02",
    title: "The agent picks up their history",
    body: "New or returning, it opens that customer’s record, so nobody repeats themselves.",
  },
  {
    n: "03",
    title: "It answers from your info, then checks itself",
    body: "Every price and number is checked against what you approved before it’s sent.",
    branch: "No match → passed to you",
  },
  {
    n: "04",
    title: "It qualifies, books and tells you",
    body: "It asks your questions, books a free slot and sends you a summary.",
  },
];

/** What runs behind every conversation, whichever agents you use. */
export const background = [
  ["Memory", "One record per customer, with the whole conversation."],
  ["Fact check", "Every price and number is checked before it’s sent."],
  ["Watching", "We’re alerted the moment anything stops working."],
  ["Report", "Monthly numbers: enquiries, reply time, bookings, hand-offs."],
];

export const rules = [
  { k: "Opening hours", v: "Mon–Fri 08:00–19:00 · Sat 09:00–13:00" },
  { k: "First visit", v: "45 minutes, priced from your list" },
  { k: "Booking notice", v: "At least 2 hours ahead" },
  { k: "Reminders", v: "24 hours before, on WhatsApp" },
  { k: "Tone", v: "Friendly, short, first names" },
  { k: "Pass to me", v: "Complaints, refunds, anything clinical" },
];

export type Faq = { q: string; a: string; link?: { href: string; label: string } };

export const faqs: Faq[] = [
  {
    q: "Can I use Connect today?",
    a: "Not yet. Connect is in development and we’re building it with a small group of service businesses. Join early access and we’ll map your workflow with you.",
  },
  {
    q: "Do I need every agent?",
    a: "No. There are two agents, WhatsApp and Voice, and each one can do up to eight jobs. Most businesses start with the WhatsApp agent qualifying, booking and handing off, then switch on more jobs or add Voice later.",
  },
  {
    q: "Can it get prices wrong?",
    a: "Every reply is checked against the information you approved before it’s sent. If a price, size or number doesn’t match, the reply is stopped and the conversation comes to you. On calls, the Voice agent doesn’t quote prices at all.",
  },
  {
    q: "What’s the difference between Core and Growth?",
    a: "Core is the WhatsApp agent for one service or location. Growth adds the Voice agent, which calls new enquiries back within minutes, covers up to three services or locations and comes with a detailed monthly report.",
    link: { href: "/packages", label: "Compare the packages" },
  },
  {
    q: "Who’s in control?",
    a: "You are. You set the hours, prices and rules. You can read every conversation, take one over at any point, and decide which requests always come to you.",
  },
  {
    q: "What kind of business is it for?",
    a: "Small service businesses that get inquiries and appointment requests. Clinics, salons, studios, home services, tutors, consultants. Usually the owner or a few staff handle leads by hand today.",
  },
  {
    q: "How will pricing work?",
    a: "It isn’t set yet. Because you choose your agents, the aim is that you pay for the ones you use and nothing else.",
  },
];
