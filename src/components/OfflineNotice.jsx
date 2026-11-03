import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Check, RefreshCw, X } from "lucide-react";
import { useTranslation } from "../i18n/I18nContext";

export default function OfflineNotice() {
  const { t } = useTranslation();
  const [offline, setOffline] = useState(() => typeof navigator !== "undefined" && navigator.onLine === false);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const goOffline = () => { setOffline(true); setResult(""); setDismissed(false); };
    const goOnline = () => {
      setOffline(false);
      setResult("online");
      setDismissed(false);
      window.setTimeout(() => setResult(""), 6000);
    };
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  async function retryConnection() {
    setChecking(true);
    setResult("");
    setDismissed(false);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(window.location.href, { method: "HEAD", cache: "no-store", signal: controller.signal });
      if (!response.ok) throw new Error("Current page could not be reached");
      setOffline(false);
      setResult("online");
      window.setTimeout(() => setResult(""), 6000);
    } catch {
      setOffline(true);
      setResult("offline");
    } finally {
      window.clearTimeout(timeout);
      setChecking(false);
    }
  }

  if ((!offline && !result) || dismissed) return null;
  return (
    <div className="fixed inset-x-3 bottom-3 z-[100] mx-auto flex max-w-2xl items-start gap-3 border border-[#c8ae78]/50 bg-[#102a22] px-4 py-3 text-[#f7f3ea] shadow-xl sm:inset-x-auto sm:bottom-5" role="status" aria-live="polite">
      {result === "online" ? <Check size={17} className="mt-0.5 shrink-0 text-[#c8d3a8]" /> : <AlertTriangle size={17} className="mt-0.5 shrink-0 text-[#dcc898]" />}
      <div className="min-w-0 flex-1"><p className="text-xs font-bold">{result === "online" ? t("network.reconnected") : t("network.offlineTitle")}</p><p className="mt-1 text-[11px] leading-5 text-white/65">{result === "online" ? t("network.reconnectedCopy") : result === "offline" ? t("network.retryFailed") : t("network.offlineCopy")}</p></div>
      {offline && <button type="button" onClick={retryConnection} disabled={checking} className="inline-flex min-h-10 shrink-0 items-center gap-2 border border-white/25 px-3 text-[10px] font-bold transition hover:border-[#dcc898] hover:text-[#e7d9b5] disabled:opacity-50"><RefreshCw size={13} className={checking ? "animate-spin" : ""} />{checking ? t("network.checking") : t("network.retry")}</button>}
      {result === "online" && <Link to="/" className="shrink-0 self-center text-[10px] font-bold underline decoration-white/35 underline-offset-4 hover:text-[#e7d9b5]">{t("errors.actions.home")}</Link>}
      <button type="button" onClick={() => setDismissed(true)} aria-label={t("network.dismiss")} className="grid size-10 shrink-0 place-items-center text-white/55 transition hover:text-white"><X size={15} /></button>
    </div>
  );
}
