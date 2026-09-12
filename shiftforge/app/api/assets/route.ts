import { NextResponse } from "next/server";
import assets from "@/data/assets.json";
export async function GET() { return NextResponse.json(assets); }
