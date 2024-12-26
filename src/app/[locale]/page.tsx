import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Home() {
  const ctx = useTranslations("HomePage");
  return (
    <div>
      <h1>{ctx("title")}</h1>
      <Link href="/about">{ctx("about")}</Link>
    </div>
  );
}
