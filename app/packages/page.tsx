import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureFigure } from "@/components/ArchitectureFigure";
import { PackageFlow } from "@/components/PackageFlow";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { coreFlow, growthFlow, matrix, plans, provide, reports } from "@/lib/packages";
import styles from "@/components/site.module.css";
import pk from "@/components/packages.module.css";

export const metadata: Metadata = {
  title: "Packages — Connect",
  description:
    "Core gives you a WhatsApp agent that replies, qualifies and books. Growth adds a Voice agent that calls new enquiries back within minutes.",
};

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <span className={pk.tick}>✓<span className={styles.srOnly}> Included</span></span>;
  if (v === false) return <span className={pk.dash}>—<span className={styles.srOnly}> Not included</span></span>;
  return <>{v}</>;
}

export default function Packages() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* ---------- Hero + plans ---------- */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={`${styles.eyebrow} ${styles.rise}`}>Packages</p>
                <h1 className={`${styles.h2} ${styles.rise}`} style={{ animationDelay: "0.08s" }}>
                  Start with one agent. Add the second when you see results.
                </h1>
              </div>
              <p className={`${styles.lede} ${styles.rise}`} style={{ animationDelay: "0.16s" }}>
                Both packages run on the same foundation. Moving from Core to
                Growth means switching the Voice agent on and adding your
                other services. Nothing is rebuilt.
              </p>
            </header>

            <div className={pk.plans}>
              {plans.map((p) => (
                <article key={p.id} className={pk.plan} data-plan={p.id}>
                  <div className={pk.planHead}>
                    <h2 className={pk.planName}>{p.name}</h2>
                    <span className={styles.code}>{p.id === "core" ? "Package 1" : "Package 2"}</span>
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
                      <span className={styles.code}>Best for · </span>
                      {p.bestFor}
                    </p>
                    <Link
                      href="/#early-access"
                      className={p.id === "growth" ? styles.btnPrimary : styles.btnGhost}
                    >
                      Ask about {p.name}
                    </Link>
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
                <p className={styles.eyebrow}>§ 1 · Under the hood</p>
                <h2 className={styles.h2}>One foundation. Growth switches more of it on.</h2>
              </div>
              <p className={styles.lede}>
                The agents talk to your customers. Behind them, one flow keeps
                a record of every customer, checks every answer against your
                information, books your calendar and tells you who’s ready.
              </p>
            </header>
            <ArchitectureFigure />
          </div>
        </section>

        {/* ---------- Flows ---------- */}
        <section id="flows" className={styles.section}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={styles.eyebrow}>§ 2 · Step by step</p>
                <h2 className={styles.h2}>What happens to each enquiry.</h2>
              </div>
              <p className={styles.lede}>
                In Core, the customer messages first. In Growth, the Voice
                agent calls form and ad enquiries straight back, then hands
                over to the same WhatsApp steps as Core.
              </p>
            </header>
            <div className={pk.flows}>
              <PackageFlow fig="Fig. 2 · Core" title="A message comes in" steps={coreFlow} />
              <PackageFlow fig="Fig. 3 · Growth" title="A form is filled in" steps={growthFlow} />
            </div>
            <p className={styles.note}>
              Growth customers who message on WhatsApp follow the Core flow,
              routed to the right service’s information.
            </p>
          </div>
        </section>

        {/* ---------- Compare ---------- */}
        <section id="compare" className={`${styles.section} ${styles.band}`}>
          <div className={styles.wrap}>
            <header className={`${styles.head} ${styles.headSplit}`}>
              <div>
                <p className={styles.eyebrow}>§ 3 · Side by side</p>
                <h2 className={styles.h2}>What’s in each package.</h2>
              </div>
            </header>
            <table className={pk.table}>
              <thead>
                <tr>
                  <th scope="col">Part</th>
                  <th scope="col">Core</th>
                  <th scope="col">Growth</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map(([label, core, growth]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td><Cell v={core} /></td>
                    <td data-growth><Cell v={growth} /></td>
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
                <p className={styles.eyebrow}>§ 4 · Getting started</p>
                <h2 className={styles.h2}>What we need from you, and what you get back.</h2>
              </div>
              <p className={styles.lede}>
                We set everything up and test it with you, including mixed
                languages and awkward questions, before the first real
                customer arrives.
              </p>
            </header>
            <div className={pk.pair}>
              <div>
                <div className={pk.pairHead}>
                  <h3 className={pk.pairTitle}>You provide</h3>
                  <span className={styles.code}>+ Growth adds</span>
                </div>
                <ul className={pk.simpleList}>
                  {provide.core.map((x) => <li key={x}>{x}</li>)}
                  {provide.growth.map((x) => <li key={x} data-growth>{x}</li>)}
                </ul>
              </div>
              <div>
                <div className={pk.pairHead}>
                  <h3 className={pk.pairTitle}>Your monthly report</h3>
                  <span className={styles.code}>+ Growth adds</span>
                </div>
                <ul className={pk.simpleList}>
                  {reports.core.map((x) => <li key={x}>{x}</li>)}
                  {reports.growth.map((x) => <li key={x} data-growth>{x}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className={`${styles.section} ${styles.band}`}>
          <div className={`${styles.wrap} ${styles.headSplit}`}>
            <div>
              <h2 className={styles.h2}>Not sure which one fits?</h2>
            </div>
            <div className={styles.ctaRow}>
              <Link href="/#early-access" className={styles.btnPrimary}>
                Get early access
              </Link>
              <Link href="/#flow" className={styles.btnGhost}>
                See how it works
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
