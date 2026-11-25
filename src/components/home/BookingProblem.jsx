import { ArrowRight, Check, Clock3, PhoneCall, SearchX } from "lucide-react";
import Reveal from "../Reveal";
import { useTranslation } from "../../i18n/I18nContext";

const oldWaysIcons = [PhoneCall, Clock3, SearchX];
function moveSpotlight(event) {
  if (event.pointerType === "touch") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--gb-pointer-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--gb-pointer-y", `${event.clientY - bounds.top}px`);
}

export default function BookingProblem() {
  const { t } = useTranslation();
  const oldWays = t("problem.oldWays") || [];
  const newWays = t("problem.newWays") || [];
  return (
    <section className="gb-section gb-problem">
      <Reveal className="gb-problem-head">
        <div><p className="gb-kicker">{t("problem.eyebrow")}</p><h2>{t("problem.titleLead")} <span>{t("problem.titleAccent")}</span></h2></div>
        <p>{t("problem.copy")}</p>
      </Reveal>
      <div className="gb-problem-flow">
        <Reveal className="gb-problem-old">
          <p className="gb-problem-label">{t("problem.oldTag")}</p>
          <ul>{oldWays.map((text, index) => {
            const Icon = oldWaysIcons[index] || PhoneCall;
            return <li key={text}><span>0{index + 1}</span><Icon size={16} /><span>{text}</span></li>;
          })}</ul>
        </Reveal>
        <div className="gb-problem-direction" aria-hidden="true"><span><ArrowRight size={18} /></span></div>
        <div className="gb-problem-new gb-glass gb-glass-interactive" onPointerMove={moveSpotlight}>
          <Reveal>
            <p className="gb-problem-label">{t("problem.newTag")}</p>
            <ul>{newWays.map((text, index) => <li key={text}><span><Check size={14} /></span><span>{text}</span><span>0{index + 1}</span></li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
