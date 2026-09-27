/**
 * English copy for the whole site. This file defines the dictionary's shape:
 * `hi.ts` is typed against it, so a missing key fails type-check.
 *
 * Only words live here. Ids, codes, heights, links and other structure stay in
 * lib/content.ts, lib/packages.ts and lib/nav.ts.
 * Plain words only: no vendor or tool names.
 */

type Text = { title: string; sub: string };
type PlanText = { tagline: string; bestFor: string; lead?: string; features: string[] };
type StepText = { title: string; body: string; branch?: string };
type FaqText = { q: string; a: string; link?: { href: string; label: string } };
/** Text for the string cells of the comparison table; tick/dash cells stay in lib/packages.ts. */
type MatrixText = { label: string; core?: string; growth?: string };

export const en = {
  meta: {
    title: "Connect — the front desk for businesses that don’t have one",
    description:
      "Connect answers new leads, books appointments and follows up, using AI agents you choose one at a time.",
    packagesTitle: "Packages — Connect",
    packagesDescription:
      "Core gives you a WhatsApp agent that replies, qualifies and books. Growth adds a Voice agent that calls new enquiries back within minutes.",
  },

  nav: {
    flow: "How it works",
    agents: "Agents",
    packages: "Packages",
    rules: "Control",
    earlyAccess: "Early access",
    faq: "FAQ",
    home: "Connect, home",
    primary: "Primary",
    footer: "Footer",
    mobile: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    earlyAccessButton: "Early access",
  },

  lang: {
    group: "Language",
    toEnglish: "Switch to English",
    toHindi: "Switch to Hindi, हिंदी में देखें",
  },

  footer: {
    tagline: "The front desk for businesses that don’t have one.",
    cta: "Get early access",
    backToTop: "Back to top ↑",
  },

  /** Channel names, in the order of the hero list and the board's cables. */
  channels: ["WhatsApp", "Calls", "Web forms", "Email"],

  home: {
    hero: {
      title: "Never lose a customer",
      titleAccent: "because you were busy.",
      lede:
        "While you’re with a client, messages and calls go unanswered, and those people book somewhere else. Connect gives you AI agents that reply for you, book the appointment and follow up.",
      ctaFlow: "See how it works",
      ctaAccess: "Get early access",
      answersOn: "Answers on",
    },
    flow: {
      eyebrow: "§ 1 · How it works",
      title: "From first message to booked visit.",
      lede: "The agent replies from your approved info and hands you the customer when they’re ready.",
      caption: "Fig. 2 · Message → Record → Fact check → Calendar",
      aria: "A customer message moves to the agent, which opens their record, checks its reply against your approved information and books a slot in your calendar.",
    },
    agents: {
      eyebrow: "§ 2 · The agents",
      title: "Two agents. Eight jobs. Switch on what you need.",
      lede:
        "The WhatsApp agent handles messages and the Voice agent handles calls. Each one does the jobs you switch on, from qualifying and booking to follow-ups. They share one record per customer, one calendar and one set of rules.",
      note: "Start with the WhatsApp agent, then add Voice when you see results.",
      noteLink: "See the two packages →",
    },
    rules: {
      eyebrow: "§ 3 · Control",
      title: "You write the rules. The agents work inside them.",
      lede: "Agents take the repetitive part of the job. Pricing, judgment calls and anything sensitive stay with you.",
      facts: [
        { k: "Visible", v: "Every conversation and booking is in one place." },
        { k: "Interruptible", v: "Take over any thread and the agent steps back." },
        { k: "Bounded", v: "Requests outside your rules come to you." },
      ],
      sheet: "Rule sheet",
      example: "Example · physiotherapy clinic",
      rows: [
        { k: "Opening hours", v: "Mon–Fri 08:00–19:00 · Sat 09:00–13:00" },
        { k: "First visit", v: "45 minutes, priced from your list" },
        { k: "Booking notice", v: "At least 2 hours ahead" },
        { k: "Reminders", v: "24 hours before, on WhatsApp" },
        { k: "Tone", v: "Friendly, short, first names" },
        { k: "Pass to me", v: "Complaints, refunds, anything clinical" },
      ],
    },
    access: {
      eyebrow: "§ 4 · Early access",
      title: "Tell us which job you’d hand off first.",
      lede:
        "Connect is in development. We’re building it with a small number of service businesses. Leave your details and we’ll map your lead-to-appointment workflow with you.",
    },
    faq: {
      eyebrow: "§ 5 · Questions",
      title: "Before you ask.",
    },
  },

  /** Fig. 1 on the home page: one late-night chat. */
  chat: {
    fig: "Fig. 1 · A 9:40 pm message, handled",
    offClock: "You were off the clock",
    aria: "A customer asks on WhatsApp at 9:40 pm if the business is open Saturday. Connect replies with hours, price and two free slots, the customer picks 10:00, and Connect confirms the booking and schedules a reminder.",
    phoneBar: "WhatsApp · Your business",
    thread: [
      { time: "9:40 pm", text: "Hi, are you open Saturday? How much is a first visit?" },
      {
        time: "9:40 pm",
        text: "Hi Priya! Yes, 9:00–13:00. A first visit is 45 min. Saturday 10:00 or 11:30 are free. Shall I book one?",
      },
      { time: "9:41 pm", text: "10:00 please" },
      { time: "9:41 pm", text: "Done. You’re booked for Sat 10:00. I’ll send a reminder on Friday." },
    ],
    day: "Sat",
    outcomes: [
      { title: "Answered", body: "Replied in seconds with your hours and prices, while you were off the clock." },
      { title: "Booked", body: "Picked a free slot from your calendar and confirmed it." },
      { title: "Reminded", body: "A reminder goes out the day before, so the visit actually happens." },
    ],
    foot: "No missed message, no back-and-forth, no forgotten booking. That’s the whole idea.",
    meta: "Illustration · product in development",
  },

  steps: [
    { title: "A customer messages", body: "From your ad, website or a listing." },
    { title: "The agent recalls them", body: "It opens their record and history." },
    { title: "It checks every answer", body: "Replies only from info you approved.", branch: "No match → you" },
    { title: "It books and tells you", body: "Books a slot and sends you a summary." },
  ] as StepText[],

  parents: {
    whatsapp: {
      name: "WhatsApp agent",
      job: "Replies to every message in seconds, day or night, using only the information you’ve approved.",
    },
    voice: {
      name: "Voice agent",
      job: "Calls new form and ad enquiries back within about two minutes and asks your questions by voice.",
    },
  },

  agents: {
    qualify: {
      name: "Qualify",
      job: "Asks the questions you’d ask: what they need, their budget, their timing. Saves every answer.",
      example: "Learns it’s a first visit, for Saturday, paying by card.",
    },
    booking: {
      name: "Booking",
      job: "Offers open slots from your calendar, confirms one and sends a reminder.",
      example: "Books Tuesday 4:00 pm while you’re with another client.",
    },
    followup: {
      name: "Follow-up",
      job: "Checks in with leads who went quiet and clients who are due back.",
      example: "Nudges the Friday inquiry that never picked a time.",
    },
    handoff: {
      name: "Hand-off",
      job: "Sends you ready customers, and anything outside your information, with a short summary.",
      example: "“Priya, first visit, Sat 10:00, asked about parking.”",
    },
    proposal: {
      name: "Proposals",
      job: "Turns what a lead told you into a draft quote for you to check.",
      example: "Drafts the quote after a site visit, ready for your edits.",
    },
    content: {
      name: "Content",
      job: "Drafts posts and updates in your voice. Nothing goes out until you approve it.",
      example: "Turns next week’s open slots into a short post.",
    },
    marketing: {
      name: "Marketing",
      job: "Sends simple campaigns to past clients and people who asked but didn’t book.",
      example: "Tells last year’s clients the season is opening up.",
    },
    leadgen: {
      name: "Lead generation",
      job: "Finds prospects that match the work you want more of.",
      example: "Lists nearby offices that might need regular servicing.",
    },
  },

  /** The agent picker and its board figure. Placeholders are filled with fmt(). */
  picker: {
    agent: "Agent",
    doingNow: "Doing now",
    nothingYet: "Nothing yet",
    jobsLabel: "The jobs they do · switch on what you need",
    doneBy: "Done by",
    on: "On",
    switchOn: "Switch on",
    switchOnLabel: "Switch on {name}",
    switchOffLabel: "Switch off {name}",
    fig: "Fig. 3 · Your board",
    status: "{n} of {total} jobs on",
    boardLabel: "Connect board with {n} jobs switched on",
    empty: "An empty board. Switch on a job to start.",
    ask: "Ask about this setup",
  },

  /** Words printed on the isometric board. */
  board: {
    plate: "CONNECT · BOARD 01 · 8 SOCKETS",
    coreTitle: "CONNECT CORE",
    coreText: "INBOX · CALENDAR · RULES",
    installing: "installing",
  },

  packages: {
    hero: {
      eyebrow: "Packages",
      title: "Start with one agent. Add the second when you see results.",
      lede:
        "Both packages run on the same foundation. Moving from Core to Growth means switching the Voice agent on and adding your other services. Nothing is rebuilt.",
    },
    packageNo: { core: "Package 1", growth: "Package 2" },
    bestFor: "Best for · ",
    included: "Included",
    notIncluded: "Not included",
    arch: {
      eyebrow: "§ 1 · How it works",
      title: "Your customer asks. The agents answer. You get the booking.",
      lede:
        "Both packages work the same way. Growth adds the Voice agent, which calls new form and ad enquiries straight back.",
    },
    compare: {
      eyebrow: "§ 2 · Side by side",
      title: "What’s in each package.",
      part: "Part",
    },
    setup: {
      eyebrow: "§ 3 · Getting started",
      title: "What we need from you, and what you get back.",
      lede:
        "We set everything up and test it with you, including mixed languages and awkward questions, before the first real customer arrives.",
      provide: "You provide",
      report: "Your monthly report",
      growthAdds: "+ Growth adds",
    },
    cta: {
      title: "Not sure which one fits?",
      access: "Get early access",
      flow: "See how it works",
    },
  },

  plans: {
    core: {
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
    } as PlanText,
    growth: {
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
    } as PlanText,
  },

  matrix: [
    { label: "WhatsApp agent" },
    { label: "Approved information + fact check", core: "1 service", growth: "Up to 3" },
    { label: "Routing to the right service" },
    { label: "Qualify and book visits" },
    { label: "Welcome message for form enquiries" },
    { label: "Voice agent callback" },
    { label: "WhatsApp follow-on after the call" },
    { label: "Hand-off to you with a summary" },
    { label: "One record per customer" },
    { label: "Monitoring and error alerts" },
    { label: "Monthly report", core: "Basic", growth: "Detailed + review call" },
  ] as MatrixText[],

  provide: {
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
  },

  reports: {
    core: ["Enquiries received", "Average reply time", "Share qualified", "Visits booked", "Hand-offs to you"],
    growth: [
      "Calls answered, length and outcome",
      "Breakdown by service or location",
      "The most common objections",
      "A monthly review call with us",
    ],
  },

  /** Fig. 1 on /packages: customer → agents → you. Growth flags live in ArchitectureFigure. */
  arch: {
    fig: "Fig. 1 · How it works for you",
    meta: "Upgrading is a switch, not a rebuild",
    aria: "Your customer sends a WhatsApp message, or in Growth fills in a form and gets a call back. Connect’s WhatsApp agent replies in seconds and, in Growth, the Voice agent calls back in about two minutes. They answer only from your approved info, remember every customer and pass anything unsure to you. You get a booked visit, a short summary and a monthly report.",
    customer: {
      label: "Your customer",
      items: [
        { title: "Sends a WhatsApp message", sub: "From your ad, website or a listing" },
        { title: "Fills in a form or taps an ad", sub: "The Voice agent calls them back" },
      ] as Text[],
    },
    connect: {
      label: "Connect’s agents",
      items: [
        { title: "WhatsApp agent", sub: "Replies in seconds, day or night" },
        { title: "Voice agent", sub: "Calls back in about 2 minutes" },
      ] as Text[],
      promises: [
        "Answers only from your approved info",
        "Remembers every customer",
        "Anything unsure comes to you",
      ],
    },
    you: {
      label: "You",
      items: [
        { title: "A booked visit", sub: "Straight into your calendar" },
        { title: "A short summary", sub: "Who they are and what they need" },
        { title: "A monthly report", sub: "Enquiries, replies and bookings" },
      ] as Text[],
    },
    growth: "Growth",
    growthNote: "Only in Growth. Everything else comes with both packages.",
  },

  /** The "Ask about <plan>" modal. */
  enquiry: {
    button: "Ask about {plan}",
    close: "Close",
    eyebrow: "Package · {plan}",
    title: "Tell us about your business.",
    body: "We’ll get back to you about {plan} and map how the agents would handle your enquiries.",
  },

  /** The early access form. */
  form: {
    received: "Received",
    doneWithPlan: "Thanks. We’ll be in touch about {plan} and how it would fit your business.",
    done: "Thanks. We’ll reach out to map your lead-to-appointment workflow together.",
    name: "Your name",
    email: "Work email",
    type: "Business type",
    choose: "Choose one",
    types: [
      "Clinic or wellness",
      "Salon or studio",
      "Home services",
      "Consulting or agency",
      "Other service business",
    ],
    plan: "Package",
    notSure: "Not sure yet",
    task: "What takes up most of your time?",
    placeholder: "e.g. Replying to WhatsApp inquiries after hours and chasing people to confirm.",
    askAbout: "Ask about {plan}",
    join: "Join early access",
    sending: "Sending…",
    networkError: "Couldn’t reach the server. Check your connection and try again.",
    /** Keyed by the field the server rejected; `body` is the fallback. */
    errors: {
      name: "Please enter your name (up to 120 characters).",
      email: "Please enter a valid email address.",
      type: "Business type is too long.",
      task: "Please keep this under 2000 characters.",
      plan: "Please choose a package from the list.",
      body: "Something went wrong. Please try again.",
    },
  },

  faqs: [
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
  ] as FaqText[],
};

export type Dictionary = typeof en;
