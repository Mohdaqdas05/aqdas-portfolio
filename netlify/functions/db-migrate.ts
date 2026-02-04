import { neon } from "@netlify/neon";
import type { Context } from "@netlify/functions";

export default async function handler(req: Request, context: Context) {
  const sql = neon();

  // Create messages table for storing contact form submissions
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

  return new Response(JSON.stringify({ success: true, message: "Database migration completed" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const config = {
  path: "/api/db-migrate",
};
