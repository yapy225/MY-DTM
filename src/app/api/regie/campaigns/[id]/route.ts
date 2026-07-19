import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/pilotage/auth";
import { patchCampaign, deleteCampaign } from "@/lib/regie/worker";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const r = await patchCampaign(id, body);
  const d = await r.json().catch(() => ({}));
  return NextResponse.json(d, { status: r.status });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const r = await deleteCampaign(id);
  const d = await r.json().catch(() => ({}));
  return NextResponse.json(d, { status: r.status });
}
