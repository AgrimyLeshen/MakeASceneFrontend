function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Fehlende Umgebungsvariable: ${name}`);
  return value;
}

export const env = {
  apiUrl: required("NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL),
};