// src/app/(auth)/register/page.tsx
import { redirect } from "next/navigation";

export const metadata = { title: "Registrieren" };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function register(formData: FormData) {
    "use server";

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    let res: Response;
      console.log("i fire")
      res = await fetch(`https://api.makeascene.social/v1/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      console.log(res)
      
    if (!res.ok) redirect("/register?error=failed");
    redirect("/login");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6">
      <h1 className="text-2xl font-bold">Registrieren</h1>

      {error === "failed" && <p role="alert" className="text-sm text-red-600">Registrierung fehlgeschlagen.</p>}
      {error === "server" && <p role="alert" className="text-sm text-red-600">Server nicht erreichbar.</p>}

      <form action={register} className="flex flex-col gap-3">
        <input name="email" type="email" placeholder="E-Mail" autoComplete="email" required className="rounded border px-3 py-2" />
        <input name="password" type="password" placeholder="Passwort" autoComplete="new-password" required minLength={8} className="rounded border px-3 py-2" />
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">Konto erstellen</button>
      </form>
    </main>
  );
}