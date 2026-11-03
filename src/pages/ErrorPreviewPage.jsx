import { Link, useParams } from "react-router-dom";
import ErrorExperience from "../components/ErrorExperience";
import { useTranslation } from "../i18n/I18nContext";

const previews = [
  { type: "404", label: "404" },
  { type: "403", label: "403" },
  { type: "500", label: "500" },
  { type: "502", label: "502" },
  { type: "503", label: "503" },
  { type: "504", label: "504" },
  { type: "offline", label: "Offline" },
  { type: "runtime", label: "Runtime" },
];

export default function ErrorPreviewPage() {
  const { type: requestedType } = useParams();
  const { t } = useTranslation();
  const type = previews.some((preview) => preview.type === requestedType) ? requestedType : "404";

  return (
    <div className="min-h-screen bg-[#f4f2eb] font-sans text-ink dark:bg-[#0b1512] dark:text-cream">
      <aside className="border-b border-white/15 bg-[#0b2019] text-[#f7f3ea]">
        <div className="mx-auto flex w-[min(1280px,calc(100%-24px))] flex-col gap-2 py-3 sm:w-[min(1280px,calc(100%-48px))] md:flex-row md:items-center md:justify-between md:gap-5">
          <div className="flex items-center gap-3"><span className="shrink-0 border border-[#c8ae78]/50 px-2 py-1 text-[9px] font-black uppercase tracking-[.15em] text-[#d8c38f]">DEV</span><p className="text-[10px] leading-4 text-white/65">{t("errors.previewNote")}</p></div>
          <nav aria-label={t("errors.previewLabel")} className="flex max-w-full gap-1 overflow-x-auto pb-1 md:pb-0">
            {previews.map((preview) => <Link key={preview.type} to={`/__error-preview/${preview.type}`} aria-current={type === preview.type ? "page" : undefined} className={`grid min-h-9 shrink-0 place-items-center border px-2.5 text-[9px] font-bold uppercase tracking-[.08em] transition-colors ${type === preview.type ? "border-[#c8ae78]/70 bg-[#c8ae78]/10 text-[#e2d2a9]" : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"}`}>{preview.label}</Link>)}
          </nav>
        </div>
      </aside>
      <ErrorExperience type={type} />
    </div>
  );
}
