"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { useState } from "react";

const localeLabels: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
  ja: "日本語",
};

const localeFlags: Record<Locale, string> = {
  zh: "🇨🇳",
  en: "🇺🇸",
  ja: "🇯🇵",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function switchLocale(newLocale: Locale) {
    // pathname is like /zh/stories or /en/about
    // Replace the locale prefix
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");

    // Save to cookie via document.cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    router.push(newPath);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 transition-colors"
        aria-label="Switch language"
      >
        <span>{localeFlags[locale]}</span>
        <span>{localeLabels[locale]}</span>
        <span className="text-xs opacity-60">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 py-1 rounded-xl bg-[#1a1a2e] border border-purple-500/30 shadow-xl z-50 min-w-[120px]">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-purple-600/30 transition-colors ${
                l === locale ? "text-purple-300 font-medium" : "text-gray-300"
              }`}
            >
              <span>{localeFlags[l]}</span>
              <span>{localeLabels[l]}</span>
              {l === locale && <span className="ml-auto text-purple-400">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
