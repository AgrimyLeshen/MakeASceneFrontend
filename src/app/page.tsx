import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-5xl font-bold">MakeAScene</h1>
      <Link href="/register" className="mt-8 inline-block underline">
        Jetzt registrieren
      </Link>
    </main>
  );
}