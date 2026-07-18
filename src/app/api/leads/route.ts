import { handleLeadPost } from "@/lib/leads/route-handler";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleLeadPost(request);
}
