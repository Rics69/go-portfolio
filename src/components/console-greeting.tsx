"use client";

import { useEffect } from "react";
import { useContact } from "@/components/contact/contact-modal";
import { links, profile } from "@/content/profile";

declare global {
  interface Window {
    hire?: () => string;
  }
}

let greeted = false;

// A note for whoever opens DevTools, plus a hire() helper they can call from the console.
export function ConsoleGreeting() {
  const contact = useContact();

  useEffect(() => {
    window.hire = () => {
      contact.open();
      return "Открываю контакты — спасибо, что заглянули!";
    };

    if (!greeted) {
      greeted = true;
      console.log(
        `%c ${profile.name} · ${profile.roleEn} `,
        "background:#00add8;color:#0a0a0a;font:600 14px ui-monospace,monospace;padding:6px 10px;border-radius:6px",
      );
      console.log(
        [
          "Раз вы заглянули в DevTools — нам точно есть о чём поговорить.",
          "",
          `Telegram  ${links.telegram}`,
          `Почта     ${profile.contacts.email}`,
          `Профиль   ${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/v1/me`,
          "",
          "Или просто наберите здесь: hire()",
        ].join("\n"),
      );
    }

    return () => {
      delete window.hire;
    };
  }, [contact]);

  return null;
}
