import { redirect } from "next/navigation";
import { getSession, clearSession } from "@/lib/session";
import Header from "@/components/layout/Header";

type User = { id: string; email: string };

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ refreshed?: string }>;
}) {
  const { refreshed } = await searchParams;

  const token = await getSession();
  if (!token) redirect("/login");

  const res = await fetch(`https://api.makeascene.social/v1/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect(
      refreshed
        ? "/api/auth/refresh?logout=1"
        : "/api/auth/refresh?from=/dashboard",
    );
  }

  if (!res.ok) throw new Error(`Daten konnten nicht geladen werden (${res.status}).`);

    const user: User = await res.json();


    async function logout() {
    "use server";

    const accessToken = await getSession();
    try{
        await fetch(`https://api.makeascene.social/v1/auth/logout`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch {}
    
    await clearSession(); 
    redirect("/login");
  }

  return (
    <>
      <Header
        //menuPanel={<MenuContent />}
        //filterPanel={<FilterContent />}
      />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-bold">Hallo {user.email}</h1>

        <form action={logout}>
          <button type="submit" className="mt-8 rounded border px-4 py-2 text-white">
            Abmelden
          </button>
        </form>
      </main>
    </>
  );
}