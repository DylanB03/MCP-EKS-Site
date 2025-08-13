import { NextResponse } from "next/server";
import nodemailer from "nodemailer";



type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function htmlEscape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const name = (body.name || "Anonymous").trim();
    const email = (body.email || "").trim();
    const subject = (body.subject || "New message from website").trim();
    const message = (body.message || "").trim();

    // Basic validation
    if (!email || !message) {
      return NextResponse.json({ error: "Please include an email and a message." }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: "Message too long." }, { status: 400 });
    }

    // ENV variables you must set:
    // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      TO_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
      console.error("Missing SMTP env vars");
      return NextResponse.json({ error: "Email sending is not configured." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: parseInt(SMTP_PORT, 10) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${htmlEscape(name)}" <${SMTP_USER}>`,
      replyTo: email,
      to: TO_EMAIL,
      subject: subject,
      text:
        `You received a new message from your website contact form.\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Subject: ${subject}\n\n` +
        `Message:\n${message}`,
      html:
        `<h3>New message from website contact form</h3>` +
        `<p><strong>Name:</strong> ${htmlEscape(name)}</p>` +
        `<p><strong>Email:</strong> ${htmlEscape(email)}</p>` +
        `<p><strong>Subject:</strong> ${htmlEscape(subject)}</p>` +
        `<hr />` +
        `<p>${htmlEscape(message).replace(/\n/g, "<br/>")}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true, message: "Message sent successfully." });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}