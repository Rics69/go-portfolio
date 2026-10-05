import { apiProfile } from "@/content/profile";

// Prerendered into the static export; the hero terminal fetches it for real.
export const dynamic = "force-static";

export function GET() {
  return Response.json(apiProfile);
}
