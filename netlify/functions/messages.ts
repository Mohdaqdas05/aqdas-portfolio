import { neon } from "@netlify/neon";
import type { Context } from "@netlify/functions";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default async function handler(req: Request, context: Context) {
  const sql = neon();

  // GET - Retrieve all messages (for admin viewing)
  if (req.method === "GET") {
    try {
      const url = new URL(req.url);
      const unreadOnly = url.searchParams.get("unread") === "true";
      const limit = parseInt(url.searchParams.get("limit") || "50");
      const offset = parseInt(url.searchParams.get("offset") || "0");

      let messages;
      if (unreadOnly) {
        messages = await sql`SELECT * FROM messages WHERE is_read = false ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
      } else {
        messages = await sql`SELECT * FROM messages ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
      }

      // Get total count
      let countResult;
      if (unreadOnly) {
        countResult = await sql`SELECT COUNT(*) as total FROM messages WHERE is_read = false`;
      } else {
        countResult = await sql`SELECT COUNT(*) as total FROM messages`;
      }

      return new Response(
        JSON.stringify({
          messages,
          total: parseInt(countResult[0]?.total || "0"),
          limit,
          offset,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch messages" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // PATCH - Mark message as read/unread
  if (req.method === "PATCH") {
    try {
      const body = await req.json();
      const { id, is_read } = body;

      if (!id) {
        return new Response(
          JSON.stringify({ error: "Message ID is required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const readStatus = is_read !== false;
      await sql`UPDATE messages SET is_read = ${readStatus} WHERE id = ${id}`;

      return new Response(
        JSON.stringify({ success: true, message: "Message updated" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error updating message:", error);
      return new Response(
        JSON.stringify({ error: "Failed to update message" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // DELETE - Delete a message
  if (req.method === "DELETE") {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");

      if (!id) {
        return new Response(
          JSON.stringify({ error: "Message ID is required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      await sql`DELETE FROM messages WHERE id = ${id}`;

      return new Response(
        JSON.stringify({ success: true, message: "Message deleted" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error deleting message:", error);
      return new Response(
        JSON.stringify({ error: "Failed to delete message" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}

export const config = {
  path: "/api/messages",
};
