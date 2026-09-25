import { AgentPicker } from "@/components/AgentPicker";
import { EarlyAccess } from "@/components/EarlyAccess";
import { Logo, LogoMark } from "@/components/Logo";
import { faqs } from "@/lib/content";
import styles from "@/components/site.module.css";

const problems = [
  {
    tag: "Inquiries",
    title: "Messages wait while you work.",
    body: "A lead writes in during a job or after hours. By the time you reply, they’ve booked somewhere else.",
  },
  {
    tag: "Scheduling",
    title: "Booking takes five messages.",
    body: "Checking the calendar, offering times, confirming, rescheduling — it adds up across every appointment.",
  },
  {
    tag: "Follow-up",
    title: "Follow-up depends on memory.",
    body: "The quote you meant to chase and the client due back next month slip when the day gets busy.",
  },
];

const steps = [
  {
    n: "01",
    title: "Choose your agents",
    body: "Pick the work you want handled — booking, WhatsApp replies, calls, follow-up. Leave the rest.",
  },
  {
    n: "02",
    title: "Map your workflow",
    body: "Tell Connect how a lead becomes an appointment in your business: your hours, services, prices and rules.",
  },
  {
    n: "03",
    title: "Run it from one place",
    body: "See every conversation, booking and follow-up in one interface. Review, adjust or take over at any time.",
  },
];

const activity = [
  { time: "08:12", lead: "Priya S.", channel: "WhatsApp", agent: "Booking", status: "Booked · Thu 10:30" },
  { time: "09:47", lead: "Missed call", channel: "Voice", agent: "Voice calling", status: "Called back · Quote sent" },
  { time: "11:05", lead: "Daniel R.", channel: "Web form", agent: "Follow-up", status: "Reminder scheduled" },
  { time: "13:20", lead: "Aisha K.", channel: "WhatsApp", agent: "WhatsApp chat", status: "Needs you · Custom request" },
  { time: "16:38", lead: "Marco T.", channel: "Instagram", agent: "Booking", status: "Booked · Sat 09:00" },
];

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <a href="#top" aria-label="Connect home">
            <Logo />
          </a>
          <nav className={styles.navLinks} aria-label="Primary">
            <a href="#agents">Agents</a>
            <a href="#how">How it works</a>
            <a href="#interface">One interface</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#early-access" className={styles.btnPrimary}>
            Get early access
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <span className={styles.tag}>AI agents for small service businesses</span>
            <h1 className={styles.display}>
              Every lead answered. <br className={styles.brDesk} />
              More of them <em className={styles.serifEm}>booked.</em>
            </h1>
            <div className={styles.heroFoot}>
              <p className={styles.lede}>
                Connect lets you choose AI agents for the repetitive work
                between an inquiry and an appointment — replies, booking,
                reminders and follow-up — and manage them from one interface.
              </p>
              <div className={styles.ctaRow}>
                <a href="#agents" className={styles.btnPrimary}>
                  Choose your agents
                </a>
                <a href="#how" className={styles.btnOutline}>
                  See how it works
                </a>
              </div>
            </div>

            <div className={styles.heroPanel}>
              <div className={styles.thread}>
                <div className={styles.threadHead}>
                  <span className={styles.mono}>WhatsApp · 21:42</span>
                  <span className={styles.mono}>New lead</span>
                </div>
                <p className={`${styles.bubble} ${styles.bubbleIn}`}>
                  Hi — do you have anything this week for a first
                  consultation?
                </p>
                <p className={`${styles.bubble} ${styles.bubbleOut}`}>
                  Hi! Yes — we have Tuesday at 4:00 pm or Thursday at 10:30
                  am. Which works better?
                </p>
                <p className={`${styles.bubble} ${styles.bubbleIn}`}>
                  Tuesday please.
                </p>
                <p className={`${styles.bubble} ${styles.bubbleOut}`}>
                  Done. You’re booked for Tuesday at 4:00 pm. I’ll send a
                  reminder the day before.
                </p>
              </div>
              <ol className={styles.timeline}>
                <li>
                  <span className={styles.mono}>21:42</span>
                  <span>Inquiry received</span>
                  <span className={styles.agentChip}>WhatsApp chat</span>
                </li>
                <li>
                  <span className={styles.mono}>21:42</span>
                  <span>Two open slots offered</span>
                  <span className={styles.agentChip}>Booking</span>
                </li>
                <li>
                  <span className={styles.mono}>21:45</span>
                  <span>Appointment confirmed</span>
                  <span className={styles.agentChip}>Booking</span>
                </li>
                <li>
                  <span className={styles.mono}>Mon</span>
                  <span>Reminder scheduled</span>
                  <span className={styles.agentChip}>Follow-up</span>
                </li>
              </ol>
            </div>
            <p className={styles.caption}>
              Illustrative example. Connect is in development.
            </p>
          </div>
        </section>

        {/* Problem */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className={styles.tag}>The problem</span>
              <h2 className={styles.h2}>
                The work that slips when you’re busy running the business.
              </h2>
            </div>
            <div className={styles.cols3}>
              {problems.map((p) => (
                <article key={p.tag} className={styles.problem}>
                  <span className={styles.mono}>{p.tag}</span>
                  <h3 className={styles.h3}>{p.title}</h3>
                  <p className={styles.body}>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Agents */}
        <section id="agents" className={`${styles.section} ${styles.linen}`}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className={styles.tag}>The agents</span>
              <h2 className={styles.h2}>
                Pick only the agents you need.
              </h2>
              <p className={styles.sectionLede}>
                Each agent handles one job. Choose the ones that match where
                your time goes — the rest stay out of the way.
              </p>
            </div>
            <AgentPicker />
          </div>
        </section>

        {/* How it works */}
        <section id="how" className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className={styles.tag}>How it works</span>
              <h2 className={styles.h2}>
                From inquiry to appointment, in three steps.
              </h2>
            </div>
            <ol className={styles.steps}>
              {steps.map((s) => (
                <li key={s.n} className={styles.step}>
                  <span className={styles.stepNum}>{s.n}</span>
                  <h3 className={styles.h3}>{s.title}</h3>
                  <p className={styles.body}>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* One interface */}
        <section id="interface" className={`${styles.section} ${styles.linen}`}>
          <div className={styles.wrap}>
            <div className={styles.split}>
              <div className={styles.sectionHead}>
                <span className={styles.tag}>One interface</span>
                <h2 className={styles.h2}>
                  One place to see what your agents did today.
                </h2>
                <p className={styles.sectionLede}>
                  No separate tools for calls, chats and calendars. Every
                  conversation, booking and follow-up lands in one view — and
                  anything that needs a human is flagged for you.
                </p>
              </div>
              <div className={styles.console}>
                <div className={styles.consoleHead}>
                  <span className={styles.mono}>Today</span>
                  <span className={styles.mono}>5 conversations</span>
                </div>
                <div className={styles.table} role="table" aria-label="Example activity">
                  {activity.map((r) => (
                    <div key={r.time} className={styles.row} role="row">
                      <span className={styles.mono} role="cell">{r.time}</span>
                      <span role="cell" className={styles.rowLead}>
                        {r.lead}
                        <small>{r.channel}</small>
                      </span>
                      <span role="cell" className={styles.agentChip}>{r.agent}</span>
                      <span
                        role="cell"
                        className={styles.rowStatus}
                        data-flag={r.status.startsWith("Needs you")}
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
                <p className={styles.caption}>Illustrative preview.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Principle / quote */}
        <section className={styles.section}>
          <div className={`${styles.wrap} ${styles.principle}`}>
            <span className={styles.tag}>Our approach</span>
            <blockquote className={styles.quote}>
              Agents take the repetitive work. You keep the judgment — your
              prices, your rules, your customers.
            </blockquote>
            <div className={styles.cols3}>
              <div>
                <h3 className={styles.h4}>You set the rules</h3>
                <p className={styles.body}>
                  Hours, services, prices and what counts as a good lead come
                  from you.
                </p>
              </div>
              <div>
                <h3 className={styles.h4}>You see everything</h3>
                <p className={styles.body}>
                  Every message and booking is visible, so nothing happens
                  behind your back.
                </p>
              </div>
              <div>
                <h3 className={styles.h4}>You can step in</h3>
                <p className={styles.body}>
                  Take over any conversation. Unusual requests are handed to
                  you, not guessed at.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Early access */}
        <section id="early-access" className={`${styles.section} ${styles.stone}`}>
          <div className={`${styles.wrap} ${styles.split}`}>
            <div className={styles.sectionHead}>
              <span className={styles.tag}>Early access</span>
              <h2 className={styles.h2}>
                Show us one task you’d hand off tomorrow.
              </h2>
              <p className={styles.sectionLede}>
                We’re building Connect with a small group of service
                businesses. Tell us where your time goes and we’ll map how
                Connect could handle it — no commitment.
              </p>
            </div>
            <EarlyAccess />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={styles.section}>
          <div className={`${styles.wrap} ${styles.split}`}>
            <div className={styles.sectionHead}>
              <span className={styles.tag}>Questions</span>
              <h2 className={styles.h2}>Plain answers.</h2>
            </div>
            <div className={styles.faq}>
              {faqs.map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary>
                    <span>{f.q}</span>
                    <span className={styles.faqIcon} aria-hidden="true" />
                  </summary>
                  <p className={styles.body}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <p className={styles.footerLine}>
            Fewer missed leads. <em className={styles.serifEm}>More booked days.</em>
          </p>
          <div className={styles.footerBar}>
            <span className={styles.logo}>
              <LogoMark size={18} />
              <span>Connect</span>
            </span>
            <nav className={styles.footerLinks} aria-label="Footer">
              <a href="#agents">Agents</a>
              <a href="#how">How it works</a>
              <a href="#faq">FAQ</a>
              <a href="#early-access">Early access</a>
            </nav>
            <span className={styles.mono}>© {new Date().getFullYear()} Connect</span>
          </div>
        </div>
      </footer>
    </>
  );
}
