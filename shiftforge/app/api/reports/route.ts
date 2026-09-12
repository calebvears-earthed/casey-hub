import { NextResponse } from "next/server";
import reports from "@/data/reports.json";
export async function GET() { return NextResponse.json(reports); }
