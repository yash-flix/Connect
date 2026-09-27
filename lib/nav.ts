import type { Dictionary } from "@/lib/i18n";

export type NavLink = { n: string; label: string; href: string };

type NavKey = "flow" | "agents" | "packages" | "rules" | "earlyAccess" | "faq";

const shape: { n: string; key: NavKey; href: string }[] = [
  { n: "§ 1", key: "flow", href: "/#flow" },
  { n: "§ 2", key: "agents", href: "/#agents" },
  { n: "→", key: "packages", href: "/packages" },
  { n: "§ 3", key: "rules", href: "/#rules" },
  { n: "§ 5", key: "faq", href: "/#faq" },
];

/** Site-wide links, shared by the header, footer and mobile menu. */
export function getNavLinks(d: Dictionary): NavLink[] {
  return shape.map(({ n, key, href }) => ({ n, href, label: d.nav[key] }));
}

/** The mobile menu's links: early access sits in its section order, before FAQ. */
export function getMenuLinks(d: Dictionary): NavLink[] {
  const links = getNavLinks(d);
  return [
    ...links.slice(0, -1),
    { n: "§ 4", label: d.nav.earlyAccess, href: "/#early-access" },
    ...links.slice(-1),
  ];
}
