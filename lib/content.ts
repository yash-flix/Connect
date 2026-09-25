export type AgentId =
  | "booking"
  | "voice"
  | "whatsapp"
  | "followup"
  | "content"
  | "marketing"
  | "leadgen"
  | "proposal";

export type Agent = {
  id: AgentId;
  code: string;
  name: string;
  job: string;
  example: string;
  /** Module height on the isometric board. */
  height: number;
};

export const agents: Agent[] = [
  {
    id: "booking",
    code: "A-01",
    name: "Booking",
    job: "Offers open slots from your calendar, confirms one and sends a reminder.",
    example: "Books Tuesday 4:00 pm while you’re with another client.",
    height: 8,
  },
  {
    id: "voice",
    code: "A-02",
    name: "Voice",
    job: "Answers calls you can’t take and returns the ones you missed.",
    example: "Calls back the lunchtime missed call and books the visit.",
    height: 5,
  },
  {
    id: "whatsapp",
    code: "A-03",
    name: "WhatsApp",
    job: "Replies to WhatsApp messages with your prices, hours and services.",
    example: "Answers “Are you open Saturday?” at 9:40 pm.",
    height: 10,
  },
  {
    id: "followup",
    code: "A-04",
    name: "Follow-up",
    job: "Checks in with leads who went quiet and clients who are due back.",
    example: "Nudges the Friday inquiry that never picked a time.",
    height: 6,
  },
  {
    id: "content",
    code: "A-05",
    name: "Content",
    job: "Drafts posts and updates in your voice. Nothing goes out until you approve it.",
    example: "Turns next week’s open slots into a short post.",
    height: 4,
  },
  {
    id: "marketing",
    code: "A-06",
    name: "Marketing",
    job: "Sends simple campaigns to past clients and people who asked but didn’t book.",
    example: "Tells last year’s clients the season is opening up.",
    height: 7,
  },
  {
    id: "leadgen",
    code: "A-07",
    name: "Lead generation",
    job: "Finds prospects that match the work you want more of.",
    example: "Lists nearby offices that might need regular servicing.",
    height: 5,
  },
  {
    id: "proposal",
    code: "A-08",
    name: "Proposals",
    job: "Turns what a lead told you into a draft quote for you to check.",
    example: "Drafts the quote after a site visit, ready for your edits.",
    height: 9,
  },
];

export const steps = [
  {
    n: "01",
    title: "A lead gets in touch",
    body: "A WhatsApp message at 9:40 pm, a call you couldn’t pick up, a form on your site.",
  },
  {
    n: "02",
    title: "Connect replies",
    body: "The WhatsApp or Voice agent answers with your prices, hours and services.",
  },
  {
    n: "03",
    title: "An appointment is booked",
    body: "The Booking agent offers open slots from your calendar and confirms one.",
  },
  {
    n: "04",
    title: "Nobody is forgotten",
    body: "Reminders go out before the visit. Leads who went quiet get a nudge.",
  },
];

export const rules = [
  { k: "Opening hours", v: "Mon–Fri 08:00–19:00 · Sat 09:00–13:00" },
  { k: "First visit", v: "45 minutes, priced from your list" },
  { k: "Booking notice", v: "At least 2 hours ahead" },
  { k: "Reminders", v: "24 hours before, on WhatsApp" },
  { k: "Tone", v: "Friendly, short, first names" },
  { k: "Pass to me", v: "Complaints, refunds, anything clinical" },
];

export const faqs = [
  {
    q: "Can I use Connect today?",
    a: "Not yet. Connect is in development and we’re building it with a small group of service businesses. Join early access and we’ll map your workflow with you.",
  },
  {
    q: "Do I need every agent?",
    a: "No. Install the ones that match where your time goes. Most businesses would start with one, often Booking or Follow-up, and add others later.",
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
