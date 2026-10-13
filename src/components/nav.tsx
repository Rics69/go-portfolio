"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useContact } from "@/components/contact/contact-modal";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { PixelToad } from "@/components/ui/pixel-toad";
import { profile } from "@/content/profile";
import { useActiveSection } from "@/hooks/use-active-section";

const items = [
  { id: "advantages", label: "Преимущества" },
  { id: "work", label: "Кейсы" },
  { id: "experience", label: "Опыт" },
  { id: "stack", label: "Стек" },
] as const;

const sectionIds = ["top", ...items.map((item) => item.id), "contact"] as const;

export function Nav() {
  const active = useActiveSection(sectionIds);
  const contact = useContact();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -96, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        aria-label="Основная навигация"
        className={`relative flex w-full max-w-max items-center justify-between gap-1 rounded-full bg-paper/85 p-1.5 ring-1 ring-black/5 backdrop-blur-md transition-shadow duration-300 max-md:max-w-none ${
          scrolled ? "shadow-float" : "shadow-soft"
        }`}
      >
        <a
          href="#top"
          className="flex min-h-11 items-center gap-2 rounded-full pr-4 pl-3 text-[15px] font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <PixelToad className="h-[34px] w-[40px]" />
          {profile.shortName}
        </a>

        <ul className="hidden items-center md:flex">
          {items.map((item) => (
            <li key={item.id} className="relative">
              {active === item.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-mist"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className="relative flex min-h-11 items-center px-4 text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={contact.open}
          className="ml-1 hidden min-h-11 items-center rounded-full bg-ink px-5 text-[15px] font-semibold text-paper transition-colors hover:bg-ink-soft md:flex"
        >
          Связаться
        </button>

        <button
          type="button"
          className="flex min-h-11 items-center gap-2 rounded-full px-4 text-[15px] font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          Меню
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-[calc(100%+8px)] origin-top rounded-[28px] bg-paper p-2 shadow-float ring-1 ring-black/5 md:hidden"
            >
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-12 items-center rounded-2xl px-4 text-lg font-medium ${
                        active === item.id ? "bg-mist" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  contact.open();
                }}
                className="mt-2 flex min-h-12 w-full items-center justify-center rounded-2xl bg-ink text-lg font-semibold text-paper"
              >
                Связаться
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
