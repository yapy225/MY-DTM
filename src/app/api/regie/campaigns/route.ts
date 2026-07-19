import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/pilotage/auth";
import { upsertCampaign } from "@/lib/regie/worker";

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body || !body.type || !body.title || !body.dest_url) {
    return NextResponse.json({ error: "type, title, dest_url requis" }, { status: 400 });
  }
  const r = await upsertCampaign(body);
  const d = await r.json().catch(() => ({}));
  return NextResponse.json(d, { status: r.status });
}
