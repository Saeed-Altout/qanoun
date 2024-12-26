import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {t("about.title")}
            </h3>
            <p className="text-gray-400">{t("about.description")}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {t("quickLinks.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#B4975A] transition-colors"
                >
                  {t("quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/lawyers"
                  className="hover:text-[#B4975A] transition-colors"
                >
                  {t("quickLinks.lawyers")}
                </Link>
              </li>
              <li>
                <Link
                  href="/firms"
                  className="hover:text-[#B4975A] transition-colors"
                >
                  {t("quickLinks.firms")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {t("services.title")}
            </h3>
            <ul className="space-y-2">
              {["consultation", "caseManagement", "legalAdvice"].map(
                (service) => (
                  <li key={service}>{t(`services.${service}`)}</li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {t("contact.title")}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>{t("contact.address")}</li>
              <li>{t("contact.email")}</li>
              <li>{t("contact.phone")}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
