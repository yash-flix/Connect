import { AgentPicker } from "@/components/AgentPicker";
import { ChatFigure } from "@/components/ChatFigure";
import { EarlyAccess } from "@/components/EarlyAccess";
import { FlowScene } from "@/components/FlowScene";
import { Glyph } from "@/components/iso";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAgents, getParents, getSteps } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/server";
import Link from "next/link";
import styles from "@/components/site.module.css";

/** Glyphs for the hero's channel list, in the order of the dictionary's `channels`. */
const channelGlyphs = ["whatsapp", "voice", "proposal", "content"] as const;

export default async function Home() {
  const d = await getDictionary();
  const { hero, flow, agents, rules, access, faq } = d.home;

  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <h1 className={`${styles.display} ${styles.rise}`}>
                  {hero.title}{" "}
                  <span className={styles.accent}>{hero.titleAccent}</span>
                </h1>
              </div>
              <div className={`${styles.heroAside} ${styles.rise}`} style={{ animationDelay: "0.12s" }}>
                <p className={styles.lede}>{hero.lede}</p>
                <div className={styles.ctaRow}>
                  <a href="#flow" className={styles.btnPrimary}>
                    {hero.ctaFlow}
                  </a>
                  <a href="#early-access" className={styles.btnGhost}>
                    {hero.ctaAccess}
                  </a>
                </div>
                <div className={styles.channelRow}>
                  <span className={styles.code}>{hero.answersOn}</span>
                  <ul>
                    {channelGlyphs.map((glyph, i) => (
                      <li key={glyph}>
                        <svg viewBox="0 0 10 10" aria-hidden="true">
                          <Glyph id={glyph} />
                        </svg>
                        {d.channels[i]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <ChatFigure t={d.chat} />
          </div>
        </section>

        {/* ---------- Flow ---------- */}
        <section id="flow" className={styles.section}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={styles.eyebrow}>{flow.eyebrow}</p>
                <h2 className={styles.h2}>{flow.title}</h2>
              </div>
              <p className={styles.lede}>{flow.lede}</p>
            </header>

            <figure className={styles.flowFigure}>
              <FlowScene steps={getSteps(d)} label={flow.aria} />
              <figcaption className={styles.code}>{flow.caption}</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Agents ---------- */}
        <section id="agents" className={`${styles.section} ${styles.band}`}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={styles.eyebrow}>{agents.eyebrow}</p>
                <h2 className={styles.h2}>{agents.title}</h2>
              </div>
              <p className={styles.lede}>{agents.lede}</p>
            </header>
            <AgentPicker
              agents={getAgents(d)}
              parents={getParents(d)}
              t={d.picker}
              board={d.board}
              channels={d.channels}
            />
            <p className={styles.note}>
              {agents.note}{" "}
              <Link href="/packages" className={styles.inlineLink}>
                {agents.noteLink}
              </Link>
            </p>
          </div>
        </section>

        {/* ---------- Rules ---------- */}
        <section id="rules" className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.rulesGrid}>
              <header className={styles.head}>
                <p className={styles.eyebrow}>{rules.eyebrow}</p>
                <h2 className={styles.h2}>{rules.title}</h2>
                <p className={styles.lede}>{rules.lede}</p>
                <ul className={styles.facts}>
                  {rules.facts.map((f) => (
                    <li key={f.k}>
                      <span className={styles.code}>{f.k}</span>
                      {f.v}
                    </li>
                  ))}
                </ul>
              </header>

              <div className={styles.spec}>
                <div className={styles.sheetHead}>
                  <span className={styles.code}>{rules.sheet}</span>
                  <span className={styles.code}>{rules.example}</span>
                </div>
                <dl>
                  {rules.rows.map((r) => (
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
              <p className={styles.eyebrow}>{access.eyebrow}</p>
              <h2 className={styles.h2}>{access.title}</h2>
              <p className={styles.lede}>{access.lede}</p>
            </header>
            <EarlyAccess t={d.form} />
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className={styles.section}>
          <div className={`${styles.wrap} ${styles.faqGrid}`}>
            <header className={styles.head}>
              <p className={styles.eyebrow}>{faq.eyebrow}</p>
              <h2 className={styles.h2}>{faq.title}</h2>
            </header>
            <div>
              {d.faqs.map((f) => (
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
