import { motion, useReducedMotion } from "framer-motion";
import { ClipboardList, Clock3, CreditCard, MapPinned } from "lucide-react";
import Reveal from "../Reveal";
import { useTranslation } from "../../i18n/I18nContext";

const stepIcons = [MapPinned, Clock3, ClipboardList, CreditCard];
export default function BookingSteps() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const steps = t("steps.items") || [];
  return (
    <section className="gb-section gb-steps">
      <Reveal className="gb-steps-head">
        <div><p className="gb-kicker">{t("steps.eyebrow")}</p><h2>{t("steps.titleLead")} <span>{t("steps.titleAccent")}</span></h2></div>
        <p>{t("steps.copy")}</p>
      </Reveal>
      <ol className="gb-steps-list">
        {steps.map((step, index) => {
          const Icon = stepIcons[index] || MapPinned;
          return <motion.li key={step.title} className="gb-step" initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: reduceMotion ? 0 : .42, delay: reduceMotion ? 0 : index * .09, ease: "easeOut" }}>
            <span className="gb-step-marker">
              <Icon size={17} strokeWidth={1.6} />
              <span className="gb-step-number">0{index + 1}</span>
            </span>
            <h3>{step.title}</h3><p>{step.copy}</p>
          </motion.li>;
        })}
      </ol>
    </section>
  );
}
