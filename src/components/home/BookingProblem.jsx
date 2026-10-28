import { ArrowRight, Check, Clock3, PhoneCall, SearchX } from "lucide-react";
import Reveal from "../Reveal";
import { useTranslation } from "../../i18n/I18nContext";

export default function BookingProblem() {
  const { t } = useTranslation();

  const oldWaysIcons = [PhoneCall, Clock3, SearchX];
  const oldWaysTexts = t("problem.oldWays") || [];
  const newWaysTexts = t("problem.newWays") || [];

  return (
    <section className="bg-[#142e26] px-5 py-20 text-ivory dark:bg-[#0e211b] md:px-8 md:py-28 transition-colors duration-200">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-12 grid gap-6 md:grid-cols-[1fr_.55fr] md:items-end">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-sage">
              {t("problem.eyebrow")}
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[.98] tracking-[-.05em] md:text-6xl">
              {t("problem.titleLead")}{" "}
              <span className="font-display font-normal italic text-champagne">
                {t("problem.titleAccent")}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-ivory/65">
            {t("problem.copy")}
          </p>
        </Reveal>

        <div className="grid gap-8 border-t border-white/15 pt-8 md:grid-cols-[.9fr_60px_1.1fr] md:items-center">
          <Reveal>
            <p className="mb-5 text-[9px] font-bold uppercase tracking-[.18em] text-white/40">
              {t("problem.oldTag")}
            </p>
            <ul className="space-y-4">
              {oldWaysTexts.map((text, i) => {
                const Icon = oldWaysIcons[i] || PhoneCall;
                return (
                  <li key={text} className="flex items-center gap-4 text-sm text-ivory/55">
                    <span className="font-display text-xl italic text-white/30">0{i + 1}</span>
                    <Icon size={16} />
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <div className="hidden justify-center md:flex">
            <span className="grid size-11 place-items-center rounded-full border border-sage/35 text-sage">
              <ArrowRight size={18} />
            </span>
          </div>

          <Reveal delay={100} className="glass-panel rounded-2xl p-5 md:p-7 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="mb-5 text-[9px] font-bold uppercase tracking-[.18em] text-sage">
              {t("problem.newTag")}
            </p>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {newWaysTexts.map((text, i) => (
                <li key={text} className="flex items-center gap-4 py-4">
                  <span className="grid size-7 place-items-center rounded-full bg-sage/15 text-sage">
                    <Check size={14} />
                  </span>
                  <span className="text-sm font-medium">{text}</span>
                  <span className="ml-auto font-display text-xl italic text-champagne">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
