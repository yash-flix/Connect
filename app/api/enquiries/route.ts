import { getDb } from "@/lib/mongodb";

const PLANS = ["Core", "Growth", "Not sure yet"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "type" | "task" | "plan" | "body";

function bad(field: Field, error: string) {
  return Response.json({ ok: false, field, error }, { status: 400 });
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return bad("body", "Invalid request.");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return bad("body", "Invalid request.");
  }

  // Honeypot: real visitors never see this field. Pretend it worked.
  if (str(body.company_website)) {
    return Response.json({ ok: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const businessType = str(body.type);
  const task = str(body.task);
  const plan = str(body.plan);

  if (name.length < 1 || name.length > 120) {
    return bad("name", "Please enter your name (up to 120 characters).");
  }
  if (email.length > 200 || !EMAIL_RE.test(email)) {
    return bad("email", "Please enter a valid email address.");
  }
  if (businessType.length > 80) {
    return bad("type", "Business type is too long.");
  }
  if (task.length > 2000) {
    return bad("task", "Please keep this under 2000 characters.");
  }
  if (plan && !(PLANS as readonly string[]).includes(plan)) {
    return bad("plan", "Please choose a package from the list.");
  }

  const source =
    body.source === "packages" || body.source === "home"
      ? body.source
      : plan
        ? "packages"
        : "home";

  try {
    const db = await getDb();
    await db.collection("enquiries").insertOne({
      name,
      email,
      businessType,
      task,
      plan,
      source,
      createdAt: new Date(),
      userAgent: (request.headers.get("user-agent") ?? "").slice(0, 500),
    });
  } catch (err) {
    console.error(
      "[enquiries] insert failed:",
      err instanceof Error ? err.message : err,
    );
    return Response.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}
