import { Check, ClipboardList, Clock3, CreditCard, MapPinned } from "lucide-react";
import Reveal from "../Reveal";
import { useTranslation } from "../../i18n/I18nContext";

export default function BookingSteps() {
  const { t } = useTranslation();

  const stepIcons = [MapPinned, Clock3, ClipboardList, CreditCard];
  const steps = t("steps.items") || [];

  return (
    <section className="bg-[#e8e5da] px-5 py-20 text-ink dark:bg-[#15251f] dark:text-cream md:px-8 md:py-28 transition-colors duration-200">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-soft dark:text-sage">
              {t("steps.eyebrow")}
            </p>
            <h2 className="text-4xl font-semibold leading-[.98] tracking-[-.05em] md:text-6xl text-ink dark:text-cream">
              {t("steps.titleLead")}{" "}
              <span className="font-display font-normal italic text-emerald dark:text-champagne">
                {t("steps.titleAccent")}
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted dark:text-cream/70">
            {t("steps.copy")}
          </p>
        </Reveal>

        <ol className="relative grid gap-0 border-l border-[#b6b5a6] dark:border-white/15 pl-5 sm:pl-0 md:grid-cols-4 md:border-l-0 md:border-t md:pl-0">
          {steps.map((step, i) => {
            const Icon = stepIcons[i] || MapPinned;
            return (
              <Reveal
                key={step.title}
                delay={i * 60}
                className="relative border-b border-[#b6b5a6] dark:border-white/15 py-5 sm:pl-2 md:border-b-0 md:border-r md:py-7 md:pr-6 md:first:pl-0 md:last:border-r-0"
              >
                <span className="absolute -left-[25px] top-8 grid size-3 place-items-center rounded-full bg-emerald dark:bg-sage text-[8px] text-cream dark:text-[#102a22] md:-top-[7px] md:left-0">
                  {i === 3 ? <Check size={9} /> : ""}
                </span>
                <span className="mb-8 flex items-center justify-between md:mb-12">
                  <Icon size={20} className="text-emerald dark:text-sage" />
                  <span className="font-display text-3xl italic text-[#9c9a83] dark:text-white/40">
                    0{i + 1}
                  </span>
                </span>
                <h3 className="max-w-48 text-base font-semibold text-ink dark:text-cream">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-52 text-xs leading-5 text-muted dark:text-cream/70">
                  {step.copy}
                </p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
