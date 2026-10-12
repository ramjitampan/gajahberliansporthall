import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingSummary, Button, Field, PageHeading } from "../components/UI";
import { useBooking } from "../hooks/useBooking";
const control = "w-full rounded-sm border border-[#c8c3b7] bg-[#fffefb] px-3.5 py-3 text-ink";
export default function CustomerPage() {
  const { booking, update, ensureCode } = useBooking();
  const navigate = useNavigate();
  const [form, setForm] = useState(booking.customer);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const change = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    update({ customer: next });
  };
  const submit = (e) => {
    e.preventDefault();
    if (busy) return;
    const next = {};
    if (form.name.trim().length < 3) next.name = "Masukkan nama lengkap minimal 3 karakter.";
    if (!/^(?:\+62|62|0)8[1-9][0-9]{6,11}$/.test(form.phone.replace(/[\s-]/g, ""))) next.phone = "Gunakan nomor Indonesia yang valid.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Format email belum valid.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    ensureCode();
    setTimeout(() => navigate("/booking/pembayaran"), 500);
  };
  if (!booking.date || booking.startHour === null)
    return (
      <div className="mx-auto w-[min(700px,calc(100%-48px))] py-[15vh] text-center">
        <PageHeading eyebrow="Data belum lengkap" title="Pilih jadwal terlebih dahulu." />
        <Button to="/booking">Kembali ke Pilih Jadwal</Button>
      </div>
    );
  return (
    <div className="mx-auto w-[calc(100%-32px)] py-14 md:w-[min(1180px,calc(100%-48px))] md:py-20">
      <PageHeading eyebrow="Langkah 2 dari 3" title="Siapa yang akan bermain?" copy="Kami hanya menggunakan data ini untuk identitas booking demo." />
      <div className="grid items-start gap-7 lg:grid-cols-[1.4fr_.65fr]">
        <form className="border border-line bg-paper p-5.5 md:p-8.5" onSubmit={submit} noValidate>
          <Field label="Nama lengkap" error={errors.name}>
            <input className={control} autoFocus autoComplete="name" name="name" value={form.name} onChange={change} placeholder="Contoh: Ramzy Maulana" />
          </Field>
          <Field label="Nomor WhatsApp atau telepon" error={errors.phone}>
            <input className={control} inputMode="tel" autoComplete="tel" name="phone" value={form.phone} onChange={change} placeholder="08xx xxxx xxxx" />
          </Field>
          <Field label="Email" optional error={errors.email}>
            <input className={control} type="email" name="email" value={form.email} onChange={change} placeholder="nama@email.com" />
          </Field>
          <p className="border-l-2 border-champagne pl-3.5 text-xs leading-6 text-muted">Data tersimpan di browser perangkat ini agar tetap ada ketika kembali.</p>
          <div className="mt-7.5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button to="/booking" variant="ghost">
              ← Kembali
            </Button>
            <Button type="submit" disabled={busy}>
              {busy ? "Menyiapkan…" : "Lanjut ke Pembayaran →"}
            </Button>
          </div>
        </form>
        <BookingSummary booking={booking} />
      </div>
    </div>
  );
}
