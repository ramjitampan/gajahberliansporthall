import { Button, PageHeading } from "../components/UI";
import { useTranslation } from "../i18n/I18nContext";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto w-[min(700px,calc(100%-48px))] py-[15vh] text-center">
      <PageHeading
        eyebrow={t("notFoundPage.eyebrow")}
        title={t("notFoundPage.title")}
        copy={t("notFoundPage.copy")}
      />
      <Button to="/">{t("notFoundPage.backHome")}</Button>
    </div>
  );
}
