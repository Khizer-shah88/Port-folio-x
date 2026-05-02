import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

async function saveSubscriber(email: string) {
  const filePath = path.resolve(process.cwd(), "data", "subscribers.json");
  try {
    await fs.access(filePath);
  } catch (e) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, "[]");
  }

  const raw = await fs.readFile(filePath, "utf8");
  let list = [] as Array<any>;
  try {
    list = JSON.parse(raw || "[]");
  } catch (e) {
    list = [];
  }

  const entry = { email, date: new Date().toISOString() };
  list.push(entry);
  await fs.writeFile(filePath, JSON.stringify(list, null, 2));
  return entry;
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let email: string | null = null;

    if (contentType.includes("application/json")) {
      const body = await req.json();
      email = body.email || body.EMAIL || null;
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const v = form.get("EMAIL") || form.get("email");
      email = typeof v === "string" ? v : v ? String(v) : null;
    } else {
      // try json fallback
      try {
        const body = await req.json();
        email = body.email || body.EMAIL || null;
      } catch (e) {
        email = null;
      }
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const entry = await saveSubscriber(email);

    // Try to send a notification email if SMTP config is present and nodemailer is available
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
    const notifyTo = process.env.NOTIFY_EMAIL || "khizershah493@gmail.com";

    if (smtpHost && smtpUser && smtpPass) {
      try {
        // require at runtime without static analysis so Next.js build won't fail
        let nodemailer: any = null;
        try {
          // use eval to avoid bundler resolving the require during build
          // eslint-disable-next-line no-eval
          nodemailer = eval("require")("nodemailer");
        } catch (e) {
          nodemailer = null;
        }

        if (nodemailer) {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort || 587,
            secure: smtpPort === 465, // true for 465, false for other ports
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          await transporter.sendMail({
            from: smtpUser,
            to: notifyTo,
            subject: "New newsletter signup",
            text: `New signup: ${email} (at ${entry.date})`,
            html: `<p>New signup: <strong>${email}</strong></p><p>At: ${entry.date}</p>`,
          });
        }
      } catch (e) {
        return NextResponse.json({ ok: true, saved: entry, warning: `Failed to send email: ${(e as Error).message}` });
      }
    }

    return NextResponse.json({ ok: true, saved: entry });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || "Unknown error" }, { status: 500 });
  }
}
