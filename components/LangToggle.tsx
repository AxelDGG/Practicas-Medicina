"use client";
import { T, useLang } from "@/lib/i18n";

export default function LangToggle() {
  const [lang, setLang] = useLang();
  return (
    <div
      role="group"
      aria-label={T.langToggleAria[lang]}
      className="inline-flex items-center rounded-full border border-line bg-paper p-0.5 text-xs"
    >
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-full transition-colors ${
            lang === l ? "bg-ink text-cream" : "text-muted hover:text-ink"
          }`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
