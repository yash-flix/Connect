import { AgentPicker } from "@/components/AgentPicker";
import { EarlyAccess } from "@/components/EarlyAccess";
import { FlowScene } from "@/components/FlowScene";
import { BoardFigure } from "@/components/BoardFigure";
import { Mark, ModuleIcon } from "@/components/iso";
import { Logo } from "@/components/Logo";
import { agents, faqs, rules, steps } from "@/lib/content";
import styles from "@/components/site.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <a href="#top" aria-label="Connect, home">
            <Logo />
          </a>
          <nav className={styles.navLinks} aria-label="Primary">
            <a href="#flow">How it works</a>
            <a href="#agents">Agents</a>
            <a href="#rules">Control</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#early-access" className={styles.btnPrimary}>
            Early access
          </a>
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>AI agents for small service businesses</p>
                <h1 className={styles.display}>
                  The front desk for businesses that don’t have one.
                </h1>
              </div>
              <div className={styles.heroAside}>
                <p className={styles.lede}>
                  Connect answers new leads, books appointments and follows
                  up, using AI agents you choose one at a time. Start with the
                  job that eats most of your day. Add more when it makes sense.
                </p>
                <div className={styles.ctaRow}>
                  <a href="#agents" className={styles.btnPrimary}>
                    Choose your agents
                  </a>
                  <a href="#flow" className={styles.btnGhost}>
                    See how a lead moves
                  </a>
                </div>
              </div>
            </div>

            <BoardFigure
              fig="Fig. 1 · Connect board"
              status="4 installed · 1 installing"
              installed={["voice", "whatsapp", "followup", "proposal"]}
              installing="booking"
              label="A Connect board with Voice, WhatsApp, Follow-up and Proposals installed, Booking being plugged in, and four channels wired into the core."
              caption="Each module is one agent. They all route into one core, so every agent shares the same inbox, calendar and rules."
              meta={<span className={styles.code}>Illustration · product in development</span>}
            />
          </div>
        </section>

        {/* ---------- Flow ---------- */}
        <section id="flow" className={styles.section}>
          <div className={styles.wrap}>
            <header className={styles.head}>
              <p className={styles.eyebrow}>§ 1 · How a lead moves</p>
              <h2 className={styles.h2}>
                Someone messages at 9:40 pm. Here’s what happens next.
              </h2>
            </header>

            <div className={styles.flowGrid}>
              <ol className={styles.stepList}>
                {steps.map((s) => (
                  <li key={s.n}>
                    <span className={styles.stepNum}>{s.n}</span>
                    <div>
                      <h3 className={styles.h3}>{s.title}</h3>
                      <p className={styles.muted}>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <figure className={styles.flowFigure}>
                <FlowScene />
                <figcaption className={styles.code}>
                  Fig. 2 · Inquiry → Connect → Calendar → Follow-up
                </figcaption>
              </figure>
            </div>
            <p className={styles.note}>
              Anything outside the rules you set, such as a complaint or an
              unusual request, is passed to you instead of guessed at.
            </p>
          </div>
        </section>

        {/* ---------- Agents ---------- */}
        <section id="agents" className={`${styles.section} ${styles.band}`}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={styles.eyebrow}>§ 2 · The agents</p>
                <h2 className={styles.h2}>Eight agents. Install the ones you need.</h2>
              </div>
              <p className={styles.lede}>
                Each agent does one job. They share one inbox, one calendar
                and one set of rules, so adding a second doesn’t mean learning
                a second tool.
              </p>
            </header>
            <AgentPicker />
          </div>
        </section>

        {/* ---------- Rules ---------- */}
        <section id="rules" className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.rulesGrid}>
              <header className={styles.head}>
                <p className={styles.eyebrow}>§ 3 · Control</p>
                <h2 className={styles.h2}>
                  You write the rules. The agents work inside them.
                </h2>
                <p className={styles.lede}>
                  Agents take the repetitive part of the job. Pricing,
                  judgment calls and anything sensitive stay with you.
                </p>
                <ul className={styles.facts}>
                  <li>
                    <span className={styles.code}>Visible</span>
                    Every conversation and booking is in one place.
                  </li>
                  <li>
                    <span className={styles.code}>Interruptible</span>
                    Take over any thread and the agent steps back.
                  </li>
                  <li>
                    <span className={styles.code}>Bounded</span>
                    Requests outside your rules come to you.
                  </li>
                </ul>
              </header>

              <div className={styles.spec}>
                <div className={styles.sheetHead}>
                  <span className={styles.code}>Rule sheet</span>
                  <span className={styles.code}>Example · physiotherapy clinic</span>
                </div>
                <dl>
                  {rules.map((r) => (
                    <div key={r.k} className={styles.specRow}>
                      <dt>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Early access ---------- */}
        <section id="early-access" className={`${styles.section} ${styles.band}`}>
          <div className={`${styles.wrap} ${styles.accessGrid}`}>
            <header className={styles.head}>
              <p className={styles.eyebrow}>§ 4 · Early access</p>
              <h2 className={styles.h2}>Tell us which job you’d hand off first.</h2>
              <p className={styles.lede}>
                Connect is in development. We’re building it with a small
                number of service businesses. Leave your details and we’ll map
                your lead-to-appointment workflow with you.
              </p>
            </header>
            <EarlyAccess />
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className={styles.section}>
          <div className={`${styles.wrap} ${styles.faqGrid}`}>
            <header className={styles.head}>
              <p className={styles.eyebrow}>§ 5 · Questions</p>
              <h2 className={styles.h2}>Before you ask.</h2>
            </header>
            <div>
              {faqs.map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary>
                    <span>{f.q}</span>
                    <span className={styles.faqIcon} aria-hidden="true" />
                  </summary>
                  <p className={styles.muted}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <div className={styles.footerHero}>
            <p className={styles.footerWord}>
              <Mark size={64} />
              Connect
            </p>
            <div className={styles.footerCta}>
              <p className={styles.lede}>
                Fewer missed leads. More booked days. Start with one agent.
              </p>
              <a href="#early-access" className={styles.btnPrimary}>
                Get early access
              </a>
            </div>
          </div>

          <div className={styles.parts}>
            <div className={styles.partsHead}>
              <span className={styles.code}>Parts list</span>
              <span className={styles.code}>8 agents · 1 core</span>
            </div>
            <ul className={styles.partsGrid}>
              {agents.map((a) => (
                <li key={a.id}>
                  <a href="#agents" className={styles.part}>
                    <ModuleIcon id={a.id} on />
                    <span className={styles.code}>{a.code}</span>
                    <span className={styles.partName}>{a.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <dl className={styles.titleBlock}>
            <div className={styles.tbWide}>
              <dt>Project</dt>
              <dd>Connect: the front desk for businesses that don’t have one</dd>
            </div>
            <div>
              <dt>Sheet</dt>
              <dd>01 / 01</dd>
            </div>
            <div>
              <dt>Revision</dt>
              <dd>0.1 · Early access</dd>
            </div>
            <div>
              <dt>Navigate</dt>
              <dd className={styles.tbLinks}>
                <a href="#flow">How it works</a>
                <a href="#agents">Agents</a>
                <a href="#rules">Control</a>
                <a href="#faq">FAQ</a>
              </dd>
            </div>
            <div>
              <dt>Built for</dt>
              <dd>Small service businesses</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className={styles.tbStatus}>In development</dd>
            </div>
            <div>
              <dt>©</dt>
              <dd>{new Date().getFullYear()} Connect</dd>
            </div>
          </dl>
        </div>
      </footer>
    </>
  );
}
