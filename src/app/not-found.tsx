import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-dvh flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-[15px] text-muted">
        <span className="text-gopher-ink">GET</span> {"/такой-страницы-нет"}
      </p>
      <h1 className="text-display mt-6 text-[clamp(72px,18vw,180px)]">404</h1>
      <p className="mt-6 max-w-md text-lg text-ink-soft">
        Такого эндпоинта нет. Зато есть главная — там всё самое интересное.
      </p>
      <Button href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`} className="mt-10">
        На главную
      </Button>
    </main>
  );
}
