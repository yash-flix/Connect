/** Content for the /packages page. Plain words only: no vendor or tool names. */

export type Plan = {
  id: "core" | "growth";
  name: string;
  tagline: string;
  bestFor: string;
  lead?: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "core",
    name: "Core",
    tagline: "The WhatsApp agent, for one service or location.",
    bestFor: "Businesses whose customers mostly message first.",
    features: [
      "Replies to every WhatsApp message in seconds, day or night",
      "Answers only from your approved information, fact-checked before sending",
      "Asks your questions, then books a free slot from your calendar",
      "People who fill in a form and tick the WhatsApp box get one welcome message, and the agent takes over when they reply",
      "Hands you each ready customer with a short summary",
      "Monthly report on enquiries, reply time, bookings and hand-offs",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Adds the Voice agent, and up to three services or locations.",
    bestFor: "Businesses running ads and forms, where speed decides who wins the customer.",
    lead: "Everything in Core, plus",
    features: [
      "The Voice agent calls new form and ad enquiries back within about two minutes",
      "It asks your questions by voice and never quotes prices on a call",
      "After the call, the conversation carries on in WhatsApp with full context",
      "Up to three services or locations, each with its own approved information",
      "Every enquiry is routed to the right service automatically",
      "Detailed report with call results and common objections, plus a monthly review call",
    ],
  },
];

export type FlowStep = {
  title: string;
  sub: string;
  /** "growth" steps exist only in Growth. "decision" steps branch to you. */
  kind: "both" | "growth" | "decision";
  /** Where a "No" at a decision goes. */
  no?: { title: string; sub: string };
  tag?: string;
};

export const coreFlow: FlowStep[] = [
  { title: "Customer messages on WhatsApp", sub: "From your ad, website or a listing", kind: "both" },
  { title: "Open their record", sub: "Found by phone number, or created", kind: "both" },
  { title: "Draft a reply", sub: "Only from your approved information", kind: "both" },
  {
    title: "Does it match your information?",
    sub: "Every price and number is checked",
    kind: "decision",
    no: { title: "Passed to you", sub: "You take over the conversation" },
  },
  { title: "Qualify the customer", sub: "Needs, budget, timing", kind: "both" },
  { title: "Book the visit", sub: "A free slot from your calendar", kind: "both" },
  { title: "Tell you", sub: "Alert with a summary, added to your list", kind: "both" },
];

export const growthFlow: FlowStep[] = [
  { title: "Form or ad enquiry", sub: "Tagged with the service, consent given", kind: "growth" },
  { title: "Save and route", sub: "Their record plus the right service’s information", kind: "growth" },
  { title: "Call back in about 2 minutes", sub: "From your business number", kind: "growth" },
  { title: "Qualify by voice", sub: "No prices on calls, every answer saved", kind: "growth" },
  {
    title: "Happy to continue on WhatsApp?",
    sub: "The agent asks before messaging",
    kind: "decision",
    no: { title: "Passed to you", sub: "With a summary of the call" },
  },
  { title: "WhatsApp picks up", sub: "“As discussed, here’s the price list…”", kind: "both", tag: "Same as Core" },
  { title: "Book the visit and tell you", sub: "Exactly as in Core", kind: "both", tag: "Same as Core" },
];

/** Component matrix. `true` is a tick, `false` a dash, a string is shown as is. */
export const matrix: [string, boolean | string, boolean | string][] = [
  ["WhatsApp agent", true, true],
  ["Approved information + fact check", "1 service", "Up to 3"],
  ["Routing to the right service", false, true],
  ["Qualify and book visits", true, true],
  ["Welcome message for form enquiries", true, true],
  ["Voice agent callback", false, true],
  ["WhatsApp follow-on after the call", false, true],
  ["Hand-off to you with a summary", true, true],
  ["One record per customer", true, true],
  ["Monitoring and error alerts", true, true],
  ["Monthly report", "Basic", "Detailed + review call"],
];

export const provide = {
  core: [
    "A WhatsApp business number",
    "A calendar for visits",
    "Your service information, signed off by you",
    "Contact numbers for whoever takes the hand-offs",
  ],
  growth: [
    "A business number for calls",
    "Signed-off information for each service or location",
    "Consent wording on your forms, so we can call back",
  ],
};

export const reports = {
  core: ["Enquiries received", "Average reply time", "Share qualified", "Visits booked", "Hand-offs to you"],
  growth: ["Calls answered, length and outcome", "Breakdown by service or location", "The most common objections", "A monthly review call with us"],
};
