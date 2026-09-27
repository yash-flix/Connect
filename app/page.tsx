import { AgentPicker } from "@/components/AgentPicker";
import { ChatFigure } from "@/components/ChatFigure";
import { EarlyAccess } from "@/components/EarlyAccess";
import { FlowScene } from "@/components/FlowScene";
import { Glyph } from "@/components/iso";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { faqs, rules, steps } from "@/lib/content";
import Link from "next/link";
import styles from "@/components/site.module.css";

export default function Home() {
  return (
    <>
      <SiteHeader />

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
                <h2 className={styles.h2}>From first message to booked visit.</h2>
              </div>
              <p className={styles.lede}>
                The agent replies from your approved info and hands you the
                customer when they’re ready.
              </p>
            </header>

            <figure className={styles.flowFigure}>
              <FlowScene steps={steps} />
              <figcaption className={styles.code}>
                Fig. 2 · Message → Record → Fact check → Calendar
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Agents ---------- */}
        <section id="agents" className={`${styles.section} ${styles.band}`}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={styles.eyebrow}>§ 2 · The agents</p>
                <h2 className={styles.h2}>Two agents. Eight jobs. Switch on what you need.</h2>
              </div>
              <p className={styles.lede}>
                The WhatsApp agent handles messages and the Voice agent
                handles calls. Each one does the jobs you switch on, from
                qualifying and booking to follow-ups. They share one record
                per customer, one calendar and one set of rules.
              </p>
            </header>
            <AgentPicker />
            <p className={styles.note}>
              Start with the WhatsApp agent, then add Voice when you see
              results.{" "}
              <Link href="/packages" className={styles.inlineLink}>
                See the two packages →
              </Link>
            </p>
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
                  <p className={styles.muted}>
                    {f.a}
                    {f.link && (
                      <>
                        {" "}
                        <Link href={f.link.href} className={styles.inlineLink}>
                          {f.link.label} →
                        </Link>
                      </>
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
