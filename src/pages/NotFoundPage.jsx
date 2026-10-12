import { Button, PageHeading } from "../components/UI";
export default function NotFoundPage() {
  return (
    <div className="mx-auto w-[min(700px,calc(100%-48px))] py-[15vh] text-center">
      <PageHeading eyebrow="404" title="Halaman tidak ditemukan." copy="Sepertinya kamu keluar garis lapangan." />
      <Button to="/">Kembali ke Beranda</Button>
    </div>
  );
}
