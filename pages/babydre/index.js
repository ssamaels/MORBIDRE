import DreLogin from "@/components/DreLogin";
import Header from "@/components/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <DreLogin />
    </>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
