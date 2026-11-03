import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Eye, EyeOff, Globe, LockKeyhole, Moon, Sun } from "lucide-react";
import hero from "../assets/badminton-hero.png";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "../i18n/I18nContext";

function BrandMark({ light = false }) {
  return <span className={`grid size-10 shrink-0 place-items-center border font-display text-xl ${light ? "border-champagne/60 text-champagne" : "border-emerald/25 text-emerald dark:border-white/20 dark:text-champagne"}`}>B</span>;
}

function AuthField({ id, label, type = "text", autoComplete, value, onChange, error, trailing, ...props }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[13px] font-semibold text-ink dark:text-cream">{label}</label>
      <div className={`flex min-h-12 items-center border bg-paper transition-colors dark:bg-[#12211b] ${error ? "border-danger dark:border-red-400" : "border-line hover:border-emerald/55 focus-within:border-emerald dark:border-white/15 dark:hover:border-sage/60 dark:focus-within:border-sage"}`}>
        <input id={id} name={id} type={type} autoComplete={autoComplete} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-base text-ink outline-none placeholder:text-muted/70 dark:text-cream dark:placeholder:text-cream/35 sm:text-sm" {...props} />
        {trailing}
      </div>
      {error && <p id={`${id}-error`} className="text-xs leading-5 text-danger dark:text-red-300" role="alert">{error}</p>}
    </div>
  );
}

export default function AuthPage({ mode }) {
  const isRegister = mode === "register";
  const { t, lang, toggleLang } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState({ password: false, confirm: false });
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "", remember: true });
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const copy = (key) => t(`auth.${key}`);
  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.type === "checkbox" ? event.target.checked : event.target.value }));
  const emailError = attempted && !values.email ? copy("required") : attempted && !/^\S+@\S+\.\S+$/.test(values.email) ? copy("emailInvalid") : "";
  const nameError = attempted && !values.name.trim() ? copy("required") : attempted && values.name.trim().length < 2 ? copy("nameInvalid") : "";
  const passwordError = attempted && !values.password ? copy("required") : attempted && values.password.length < 8 ? copy("passwordLength") : "";
  const confirmError = attempted && !values.confirm ? copy("required") : attempted && values.password !== values.confirm ? copy("passwordMismatch") : "";

  function handleSubmit(event) {
    event.preventDefault();
    setAttempted(true);
    setSubmitted(false);
    if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email) || values.password.length < 8 || (isRegister && (!values.name.trim() || values.name.trim().length < 2 || values.password !== values.confirm))) return;
    // Intentionally unconnected until an authentication backend is provided.
    setSubmitted(true);
  }

  const eyeButton = (field) => (
    <button type="button" onClick={() => setVisible((current) => ({ ...current, [field]: !current[field] }))} aria-label={visible[field] ? copy("hidePassword") : copy("showPassword")} className="mr-1 grid size-10 shrink-0 place-items-center text-muted transition-colors hover:text-emerald focus-visible:outline-emerald dark:text-cream/60 dark:hover:text-sage">
      {visible[field] ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
    </button>
  );

  return (
    <main className="grid min-h-screen lg:grid-cols-[minmax(330px,0.82fr)_minmax(500px,1.18fr)]">
      <aside className="relative hidden min-h-screen overflow-hidden bg-[#102a22] text-cream lg:flex lg:flex-col lg:justify-between lg:px-11 lg:py-9 xl:px-16 xl:py-12">
        <img src={hero} alt="" className="absolute inset-0 size-full object-cover opacity-25 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d211b]/55 via-[#0d211b]/70 to-[#0d211b]/95" />
        <Link to="/" className="relative z-10 inline-flex w-fit items-center gap-3 rounded-sm focus-visible:outline-champagne" aria-label={copy("backHome")}>
          <BrandMark light />
          <span className="text-sm font-bold tracking-[-.02em]">Gajah Berlian <span className="font-normal text-cream/65">Sports Hall</span></span>
        </Link>
        <div className="relative z-10 max-w-xl pb-7 xl:pb-12">
          <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-champagne"><span className="h-px w-9 bg-champagne/70" /> {copy("venue")}</div>
          <h2 className="font-display text-5xl leading-[1.02] tracking-[-.035em] xl:text-[4.35rem]">{copy("panelLead")} <span className="italic text-champagne">{copy("panelAccent")}</span></h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-cream/70">{copy("panelCopy")}</p>
          <div className="mt-10 flex items-center gap-3 border-t border-white/15 pt-5 text-xs text-cream/60"><span className="grid size-8 place-items-center border border-champagne/40 text-champagne"><Check size={14} /></span>{copy("panelNote")}</div>
        </div>
        <p className="relative z-10 text-[10px] font-semibold uppercase tracking-[.16em] text-cream/40">{copy("city")}</p>
      </aside>

      <section className="flex min-h-screen flex-col px-5 py-5 sm:px-9 sm:py-7 lg:px-12 xl:px-20">
        <header className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2.5 lg:hidden"><BrandMark /><span className="text-xs font-bold tracking-tight">Gajah Berlian Sports Hall</span></Link>
          <Link to="/" className="hidden items-center gap-2 text-xs font-semibold text-muted transition hover:text-emerald dark:text-cream/60 dark:hover:text-sage lg:inline-flex"><ArrowLeft size={15} />{copy("backHome")}</Link>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" onClick={toggleLang} aria-label={copy("toggleLanguage")} className="inline-flex min-h-10 items-center gap-2 border border-line px-3 text-[11px] font-bold text-ink transition hover:border-emerald/50 dark:border-white/15 dark:text-cream dark:hover:border-sage/60"><Globe size={14} className="text-emerald dark:text-sage" />{lang.toUpperCase()}</button>
            <button type="button" onClick={toggleTheme} aria-label={isDark ? copy("lightTheme") : copy("darkTheme")} className="grid size-10 place-items-center border border-line text-ink transition hover:border-emerald/50 dark:border-white/15 dark:text-cream dark:hover:border-sage/60">{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </header>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }} className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center py-10 sm:py-12">
          <div className="mb-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-soft dark:text-sage">{copy(isRegister ? "registerEyebrow" : "loginEyebrow")}</p>
            <h1 className="font-display text-[clamp(2.75rem,7vw,4rem)] leading-[.98] tracking-[-.05em] text-ink dark:text-cream">{copy(isRegister ? "registerTitle" : "loginTitle")}</h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted dark:text-cream/65">{copy(isRegister ? "registerDescription" : "loginDescription")}</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="grid gap-5" aria-label={copy(isRegister ? "registerTitle" : "loginTitle")}>
            {isRegister && <AuthField id="name" label={copy("name")} autoComplete="name" value={values.name} onChange={set("name")} error={nameError} placeholder={copy("namePlaceholder")} />}
            <AuthField id="email" label={copy("email")} type="email" autoComplete="email" value={values.email} onChange={set("email")} error={emailError} placeholder="nama@email.com" />
            <AuthField id="password" label={copy("password")} type={visible.password ? "text" : "password"} autoComplete={isRegister ? "new-password" : "current-password"} value={values.password} onChange={set("password")} placeholder="••••••••" error={passwordError} trailing={eyeButton("password")} />
            {isRegister ? <AuthField id="confirm" label={copy("confirmPassword")} type={visible.confirm ? "text" : "password"} autoComplete="new-password" value={values.confirm} onChange={set("confirm")} placeholder="••••••••" error={confirmError} trailing={eyeButton("confirm")} /> : (
              <div className="flex items-center justify-between gap-3 text-xs">
                <label className="inline-flex min-h-8 cursor-pointer items-center gap-2.5 text-muted dark:text-cream/65"><input type="checkbox" checked={values.remember} onChange={set("remember")} className="size-4 accent-emerald dark:accent-sage" />{copy("remember")}</label>
              </div>
            )}
            <button type="submit" className="group mt-1 inline-flex min-h-12 items-center justify-center gap-2 bg-emerald px-5 text-sm font-bold text-white transition-colors hover:bg-emerald-soft focus-visible:outline-emerald dark:bg-sage dark:text-[#102a22] dark:hover:bg-[#c1d1ba]">{copy(isRegister ? "registerButton" : "loginButton")}<ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
            {submitted && <p role="status" className="border-l-2 border-champagne bg-champagne/10 px-3.5 py-3 text-xs leading-5 text-ink dark:text-cream">{copy("notConnected")}</p>}
          </form>

          <p className="mt-7 text-center text-sm text-muted dark:text-cream/65">{copy(isRegister ? "haveAccount" : "newHere")} <Link to={isRegister ? "/login" : "/register"} className="ml-1 font-bold text-emerald underline decoration-emerald/30 underline-offset-4 transition hover:decoration-emerald dark:text-sage dark:decoration-sage/30 dark:hover:decoration-sage">{copy(isRegister ? "loginLink" : "registerLink")}</Link></p>
          <p className="mt-8 flex items-center justify-center gap-2 text-[11px] text-muted/80 dark:text-cream/40"><LockKeyhole size={13} />{copy("privacyNote")}</p>
        </motion.div>
        <footer className="mx-auto w-full max-w-[440px] border-t border-line pt-4 text-center text-[10px] tracking-wide text-muted/75 dark:border-white/10 dark:text-cream/40">© {new Date().getFullYear()} Gajah Berlian Sports Hall</footer>
      </section>
    </main>
  );
}
