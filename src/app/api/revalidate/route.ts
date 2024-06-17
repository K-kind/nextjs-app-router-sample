import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path");
  console.log("ああ", path);
  if (path) {
    revalidatePath(path);
  }
  return Response.json({ path });
}
