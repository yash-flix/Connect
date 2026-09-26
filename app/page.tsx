import { AgentPicker } from "@/components/AgentPicker";
import { ChatFigure } from "@/components/ChatFigure";
import { EarlyAccess } from "@/components/EarlyAccess";
import { FlowScene } from "@/components/FlowScene";
import { Glyph } from "@/components/iso";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { faqs, rules, steps } from "@/lib/content";
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
          <MobileMenu />
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={`${styles.eyebrow} ${styles.rise}`}>
                  For clinics, salons, studios and home services
                </p>
                <h1 className={`${styles.display} ${styles.rise}`} style={{ animationDelay: "0.08s" }}>
                  Never lose a customer{" "}
                  <span className={styles.accent}>because you were busy.</span>
                </h1>
              </div>
              <div className={`${styles.heroAside} ${styles.rise}`} style={{ animationDelay: "0.2s" }}>
                <p className={styles.lede}>
                  While you’re with a client, messages and calls go
                  unanswered, and those people book somewhere else. Connect
                  gives you AI agents that reply for you, book the appointment
                  and follow up.
                </p>
                <div className={styles.ctaRow}>
                  <a href="#flow" className={styles.btnPrimary}>
                    See how it works
                  </a>
                  <a href="#early-access" className={styles.btnGhost}>
                    Get early access
                  </a>
                </div>
                <div className={styles.channelRow}>
                  <span className={styles.code}>Answers on</span>
                  <ul>
                    {(
                      [
                        ["WhatsApp", "whatsapp"],
                        ["Calls", "voice"],
                        ["Web forms", "proposal"],
                        ["Email", "content"],
                      ] as const
                    ).map(([name, glyph]) => (
                      <li key={name}>
                        <svg viewBox="0 0 10 10" aria-hidden="true">
                          <Glyph id={glyph} />
                        </svg>
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <ChatFigure />
          </div>
        </section>

        {/* ---------- Flow ---------- */}
        <section id="flow" className={styles.section}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={styles.eyebrow}>§ 1 · How it works</p>
                <h2 className={styles.h2}>From first message to booked visit, in four steps.</h2>
              </div>
              <p className={styles.lede}>
                Every lead follows the same path. Connect handles each step
                for you, so nobody waits and nobody slips through.
              </p>
            </header>

            <figure className={styles.flowFigure}>
              <FlowScene steps={steps} />
              <figcaption className={styles.code}>
                Fig. 2 · Inquiry → Connect → Calendar → Follow-up
              </figcaption>
            </figure>
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
                Each step above is done by an agent, and each agent does one
                job. Start with the one that saves you the most time. They
                share one inbox, calendar and set of rules, so adding another
                is easy.
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
            <div className={styles.footerBrand}>
              <Logo />
              <p className={styles.muted}>
                The front desk for businesses that don’t have one.
              </p>
            </div>
            <a href="#early-access" className={styles.btnPrimary}>
              Get early access
            </a>
          </div>

          <div className={styles.footerBase}>
            <nav className={styles.footerLinks} aria-label="Footer">
              <a href="#flow">How it works</a>
              <a href="#agents">Agents</a>
              <a href="#rules">Control</a>
              <a href="#faq">FAQ</a>
            </nav>
            <span className={styles.code}>© {new Date().getFullYear()} Connect</span>
            <a href="#top" className={styles.code}>
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
