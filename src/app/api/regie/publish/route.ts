import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/pilotage/auth";
import { publish } from "@/lib/regie/worker";

export async function POST() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const r = await publish();
  const d = await r.json().catch(() => ({}));
  return NextResponse.json(d, { status: r.status });
}
