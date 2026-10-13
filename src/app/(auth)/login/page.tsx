import { redirect } from "next/navigation";
import { decodeJwt } from "jose";
import { setSession } from "@/lib/session";

export const metadata = { title: "Login" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; expired?: string }>;
}) {
  const { error, expired } = await searchParams;

  async function login(formData: FormData) {
    "use server";

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    let res: Response;
    try {
      res = await fetch(`https://api.makeascene.social/v1/auth/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch {
      redirect("/login?error=server");
    }

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.access_token || !data?.refresh_token) {
      redirect("/login?error=invalid");
    }

    await setSession({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6">
      <h1 className="text-2xl font-bold">Login</h1>

      {expired && <p className="text-sm">Sitzung abgelaufen, bitte neu anmelden.</p>}
      {error === "invalid" && <p role="alert" className="text-sm text-red-600">E-Mail oder Passwort falsch.</p>}
      {error === "server" && <p role="alert" className="text-sm text-red-600">Server nicht erreichbar.</p>}

      <form action={login} className="flex flex-col gap-3">
        <input name="email" type="email" placeholder="E-Mail" autoComplete="email" required className="rounded border px-3 py-2" />
        <input name="password" type="password" placeholder="Passwort" autoComplete="current-password" required className="rounded border px-3 py-2" />
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">Anmelden</button>
      </form>
    </main>
  );
}