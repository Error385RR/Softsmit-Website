import { redirect } from "next/navigation";
import { getAdminUser } from "./server";

/** Call at the top of every admin page: layouts don't re-run on client-side navigation. */
export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
