export type Agent = {
  id: string;
  code: string;
  name: string;
  job: string;
  example: string;
};

export const agents: Agent[] = [
  {
    id: "booking",
    code: "01",
    name: "Booking",
    job: "Offers open slots, confirms appointments and sends reminders.",
    example: "“Tuesday at 4 works. You’re booked — see you then.”",
  },
  {
    id: "voice",
    code: "02",
    name: "Voice calling",
    job: "Answers and returns calls so inquiries don’t sit in voicemail.",
    example: "Picks up the missed call from lunch and books the visit.",
  },
  {
    id: "whatsapp",
    code: "03",
    name: "WhatsApp chat",
    job: "Replies to WhatsApp messages with prices, hours and next steps.",
    example: "Answers “Are you open Saturday?” within the conversation.",
  },
  {
    id: "followup",
    code: "04",
    name: "Follow-up",
    job: "Checks in with leads who went quiet and customers due to return.",
    example: "Nudges the Friday inquiry that never picked a time.",
  },
  {
    id: "content",
    code: "05",
    name: "Content",
    job: "Drafts posts and updates in your voice for you to approve.",
    example: "Turns this week’s openings into a short post.",
  },
  {
    id: "marketing",
    code: "06",
    name: "Marketing",
    job: "Runs simple campaigns to past customers and new audiences.",
    example: "Lets past clients know about a seasonal offer.",
  },
  {
    id: "leadgen",
    code: "07",
    name: "Lead generation",
    job: "Finds and qualifies new prospects that fit how you work.",
    example: "Builds a list of nearby businesses that need your service.",
  },
  {
    id: "proposal",
    code: "08",
    name: "Proposals",
    job: "Prepares quotes and proposals from the details a lead shares.",
    example: "Drafts a quote after the site visit for you to review.",
  },
];

export const faqs = [
  {
    q: "Is Connect available today?",
    a: "Not yet. Connect is being built now, and we’re working with a small group of service businesses to shape it. Join early access and we’ll walk through your workflow with you.",
  },
  {
    q: "Do I have to use every agent?",
    a: "No. You choose only the agents that fit how your business runs. Start with one — booking or follow-up is common — and add others when they make sense.",
  },
  {
    q: "Who stays in control?",
    a: "You do. Agents handle the repetitive parts — first replies, scheduling, reminders — and you set the rules, review what they do, and step in whenever you want.",
  },
  {
    q: "What kind of business is Connect for?",
    a: "Small service businesses that get inquiries and appointment requests: clinics, salons, studios, home services, consultants and similar teams where the owner or a few staff handle leads by hand.",
  },
  {
    q: "What will it cost?",
    a: "Pricing isn’t set yet. Because you pick your agents, the plan is for you to pay for what you use rather than a bundle you don’t need.",
  },
];
