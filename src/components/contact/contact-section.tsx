"use client";

import { useContact } from "@/components/contact/contact-modal";
import { Shell } from "@/components/contact/shell";
import { ArrowIcon, CheckIcon, CopyIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { links, profile } from "@/content/profile";
import { useClock } from "@/hooks/use-clock";
import { useCopy } from "@/hooks/use-copy";

// Closing block in the Swiss style of the moodboard: meta row, oversized type, contact row.
export function ContactSection() {
  const contact = useContact();
  const time = useClock(profile.timeZone);
  const { copied, copy } = useCopy();

  return (
    <section id="contact" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-baseline justify-between gap-4 text-[15px] text-ink-soft">
          <p className="text-eyebrow text-muted">
            <span className="text-gopher-ink">{"//"}</span> 05 — контакты
          </p>
          <p>
            {profile.city} · <span className="font-mono tabular-nums">{time}</span> МСК
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-16 md:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <Shell />
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <h2 className="text-[clamp(48px,7.4vw,112px)] leading-[0.92] tracking-[-0.06em]">
              <span className="block font-extrabold">Есть задача</span>
              <span className="block font-normal">на Go? Пишите.</span>
            </h2>
            <p
              lang="ru"
              className="mt-10 max-w-lg text-[17px] leading-relaxed text-ink-soft [hyphens:auto] [text-align:justify]"
            >
              {profile.about} {profile.workFormats}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={contact.open}
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-base font-semibold text-paper shadow-soft transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-ink-soft"
              >
                Связаться
                <ArrowIcon className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
              </button>
              <span className="text-[15px] text-muted">или наберите в терминале sudo hire danil</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-4 text-[17px] md:mt-24 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={() => copy(profile.contacts.email)}
            className="group inline-flex min-h-11 items-center gap-2 self-start text-left hover:text-gopher-ink"
            aria-label={`Скопировать адрес ${profile.contacts.email}`}
          >
            <span className="break-all">{profile.contacts.email}</span>
            {copied ? (
              <CheckIcon className="size-4 shrink-0 text-gopher-ink" />
            ) : (
              <CopyIcon className="size-4 shrink-0 text-faint group-hover:text-gopher-ink" />
            )}
            <span aria-live="polite" className="text-[14px] text-gopher-ink">
              {copied ? "скопировано" : ""}
            </span>
          </button>
          <a
            href={links.telegram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center self-start hover:text-gopher-ink md:self-auto"
          >
            Telegram @{profile.contacts.telegram}
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center self-start hover:text-gopher-ink md:self-auto"
          >
            github.com/{profile.contacts.github}
          </a>
          <p className="text-ink-soft">{profile.city}, Россия</p>
        </div>
      </div>
    </section>
  );
}
