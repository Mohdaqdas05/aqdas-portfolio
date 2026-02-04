import { neon } from "@netlify/neon";
import type { Context } from "@netlify/functions";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(req: Request, context: Context) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body: ContactFormData = await req.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const sql = neon();

    // Ensure the messages table exists
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        is_read BOOLEAN DEFAULT FALSE
      )
    `;

    // Insert the message into the database
    const result = await sql`
      INSERT INTO messages (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
      RETURNING id, created_at
    `;

    // Send email notification using Netlify's email handling
    // Note: Email notifications require setting up NOTIFICATION_EMAIL environment variable
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "aqdasalifarooqui41@gmail.com";

    // Create email content for webhook/notification service
    const emailPayload = {
      to: notificationEmail,
      subject: `New Contact Form Message: ${subject}`,
      text: `
You have received a new message from your portfolio website.

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your portfolio contact form.
Message ID: ${result[0]?.id}
Time: ${result[0]?.created_at}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #FF6B35, #FF8F6B); padding: 20px; color: white; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
    .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #e0e0e0; }
    .message-box { white-space: pre-wrap; }
    .footer { margin-top: 20px; font-size: 12px; color: #999; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Message</h2>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">From your portfolio website</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="value message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
      <div class="footer">
        Message ID: ${result[0]?.id} | Received: ${new Date(result[0]?.created_at).toLocaleString()}
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    // If SENDGRID_API_KEY is configured, send email via SendGrid
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || "noreply@netlify.app";

    if (sendgridApiKey) {
      try {
        const emailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${sendgridApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: notificationEmail }] }],
            from: { email: fromEmail, name: "Portfolio Contact Form" },
            subject: emailPayload.subject,
            content: [
              { type: "text/plain", value: emailPayload.text },
              { type: "text/html", value: emailPayload.html },
            ],
          }),
        });

        if (!emailResponse.ok) {
          console.error("Failed to send email notification:", await emailResponse.text());
        }
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Don't fail the request if email fails - the message is still saved
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully",
        id: result[0]?.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process your message. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export const config = {
  path: "/api/contact",
};
