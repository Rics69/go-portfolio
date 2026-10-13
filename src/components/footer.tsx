import { ArrowIcon } from "@/components/ui/icons";
import { links, profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="container-page flex flex-col gap-3 border-t border-line py-8 text-[14px] text-muted md:flex-row md:items-center md:justify-between">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p>Собрано на Next.js — бэкендер тоже умеет во фронтенд.</p>
      <a href={links.source} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 hover:text-ink">
        Исходники на GitHub
        <ArrowIcon
          direction="out"
          className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </footer>
  );
}
