import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureFigure } from "@/components/ArchitectureFigure";
import { PlanEnquiry } from "@/components/PlanEnquiry";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDictionary } from "@/lib/i18n/server";
import { getMatrix, getPlans } from "@/lib/packages";
import styles from "@/components/site.module.css";
import pk from "@/components/packages.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getDictionary();
  return { title: meta.packagesTitle, description: meta.packagesDescription };
}

function Cell({ v, t }: { v: boolean | string; t: { included: string; notIncluded: string } }) {
  if (v === true) return <span className={pk.tick}>✓<span className={styles.srOnly}> {t.included}</span></span>;
  if (v === false) return <span className={pk.dash}>—<span className={styles.srOnly}> {t.notIncluded}</span></span>;
  return <>{v}</>;
}

export default async function Packages() {
  const d = await getDictionary();
  const { hero, arch, compare, setup, cta } = d.packages;

  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* ---------- Hero + plans ---------- */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={`${styles.eyebrow} ${styles.rise}`}>{hero.eyebrow}</p>
                <h1 className={`${styles.h2} ${styles.rise}`} style={{ animationDelay: "0.08s" }}>
                  {hero.title}
                </h1>
              </div>
              <p className={`${styles.lede} ${styles.rise}`} style={{ animationDelay: "0.16s" }}>
                {hero.lede}
              </p>
            </header>

            <div className={pk.plans}>
              {getPlans(d).map((p) => (
                <article key={p.id} className={pk.plan} data-plan={p.id}>
                  <div className={pk.planHead}>
                    <h2 className={pk.planName}>{p.name}</h2>
                    <span className={styles.code}>{d.packages.packageNo[p.id]}</span>
                  </div>
                  <p className={pk.planTag}>{p.tagline}</p>
                  <div>
                    {p.lead && <p className={pk.planLead}>{p.lead}</p>}
                    <ul className={pk.planList}>
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={pk.planFoot}>
                    <p className={pk.bestFor}>
                      <span className={styles.code}>{d.packages.bestFor}</span>
                      {p.bestFor}
                    </p>
                    <PlanEnquiry plan={p.name} primary={p.id === "growth"} t={d.enquiry} form={d.form} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Architecture ---------- */}
        <section id="architecture" className={`${styles.section} ${styles.band}`}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={styles.eyebrow}>{arch.eyebrow}</p>
                <h2 className={styles.h2}>{arch.title}</h2>
              </div>
              <p className={styles.lede}>{arch.lede}</p>
            </header>
            <ArchitectureFigure t={d.arch} />
          </div>
        </section>

        {/* ---------- Compare ---------- */}
        <section id="compare" className={`${styles.section} ${styles.band}`}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={styles.eyebrow}>{compare.eyebrow}</p>
                <h2 className={styles.h2}>{compare.title}</h2>
              </div>
            </header>
            <table className={pk.table}>
              <thead>
                <tr>
                  <th scope="col">{compare.part}</th>
                  <th scope="col">Core</th>
                  <th scope="col">Growth</th>
                </tr>
              </thead>
              <tbody>
                {getMatrix(d).map(([label, core, growth]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td><Cell v={core} t={d.packages} /></td>
                    <td data-growth><Cell v={growth} t={d.packages} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------- Provide + report ---------- */}
        <section id="setup" className={styles.section}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={styles.eyebrow}>{setup.eyebrow}</p>
                <h2 className={styles.h2}>{setup.title}</h2>
              </div>
              <p className={styles.lede}>{setup.lede}</p>
            </header>
            <div className={pk.pair}>
              <div>
                <div className={pk.pairHead}>
                  <h3 className={pk.pairTitle}>{setup.provide}</h3>
                  <span className={styles.code}>{setup.growthAdds}</span>
                </div>
                <ul className={pk.simpleList}>
                  {d.provide.core.map((x) => <li key={x}>{x}</li>)}
                  {d.provide.growth.map((x) => <li key={x} data-growth>{x}</li>)}
                </ul>
              </div>
              <div>
                <div className={pk.pairHead}>
                  <h3 className={pk.pairTitle}>{setup.report}</h3>
                  <span className={styles.code}>{setup.growthAdds}</span>
                </div>
                <ul className={pk.simpleList}>
                  {d.reports.core.map((x) => <li key={x}>{x}</li>)}
                  {d.reports.growth.map((x) => <li key={x} data-growth>{x}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className={`${styles.section} ${styles.band}`}>
          <div className={`${styles.wrap} ${styles.headSplit}`}>
            <div>
              <h2 className={styles.h2}>{cta.title}</h2>
            </div>
            <div className={styles.ctaRow}>
              <Link href="/#early-access" className={styles.btnPrimary}>
                {cta.access}
              </Link>
              <Link href="/#flow" className={styles.btnGhost}>
                {cta.flow}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
