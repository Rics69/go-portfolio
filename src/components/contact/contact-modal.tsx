"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ArrowIcon, CheckIcon, CloseIcon, CopyIcon, MailIcon, TelegramIcon } from "@/components/ui/icons";
import { links, profile } from "@/content/profile";
import { useCopy } from "@/hooks/use-copy";

type ContactContextValue = { isOpen: boolean; open: () => void };

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const value = useContext(ContactContext);
  if (!value) throw new Error("useContact must be used inside <ContactProvider>");
  return value;
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open }), [isOpen, open]);

  return (
    <ContactContext value={value}>
      {children}
      <AnimatePresence>{isOpen && <ContactDialog onClose={close} />}</AnimatePresence>
    </ContactContext>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

function ContactDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { copied, copy } = useCopy();

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      // Keep focus inside the dialog.
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = overflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        aria-describedby="contact-text"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.4, ease }}
        className="relative w-full max-w-[480px] rounded-[28px] bg-paper p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-mist hover:text-ink"
        >
          <CloseIcon className="size-5" />
        </button>

        <p className="text-eyebrow text-muted">
          <span className="text-gopher-ink">{"//"}</span> связаться
        </p>
        <h2 id="contact-title" className="text-display mt-3 text-[36px] sm:text-[44px]">
          Давайте поговорим
        </h2>
        <p id="contact-text" className="mt-3 text-base leading-relaxed text-muted">
          Выберите, где удобнее: в Telegram или по почте.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3">
          <a
            data-autofocus
            href={links.telegram}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl bg-gopher p-4 transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-[#00c2f0] sm:p-5"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink text-paper">
              <TelegramIcon className="size-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-bold tracking-tight">Telegram</span>
              <span className="block font-mono text-[14px] text-ink/70">@{profile.contacts.telegram}</span>
            </span>
            <ArrowIcon
              direction="out"
              className="size-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <div className="flex items-center gap-2 rounded-2xl bg-mist p-4 sm:p-5">
            <a href={links.email} className="group flex min-w-0 flex-1 items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-paper text-ink shadow-soft">
                <MailIcon className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-bold tracking-tight group-hover:underline">Почта</span>
                <span className="block font-mono text-[14px] break-all text-muted">{profile.contacts.email}</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => copy(profile.contacts.email)}
              aria-label="Скопировать адрес почты"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink shadow-soft transition-colors hover:bg-line"
            >
              {copied ? <CheckIcon className="size-5 text-gopher-ink" /> : <CopyIcon className="size-5" />}
            </button>
          </div>
        </div>

        <p aria-live="polite" className="mt-4 min-h-6 text-[14px] text-gopher-ink">
          {copied ? "Адрес скопирован" : ""}
        </p>
      </motion.div>
    </motion.div>
  );
}
