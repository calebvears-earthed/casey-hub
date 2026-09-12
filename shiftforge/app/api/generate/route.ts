import { NextResponse } from "next/server";
// Placeholder for AI report generation. Martin wires this to Claude API in production.
export async function POST(request: Request) {
  const body = await request.json();
  const fake = `## Shift Report · AI-Draft\n\n**Asset:** ${body.asset_code || "N/A"}\n\n(Casey — this is a mock response. In production, this endpoint calls Claude API with the form data + asset context, returning a polished report in the client's writing voice.)`;
  return NextResponse.json({ narrative: fake });
}
