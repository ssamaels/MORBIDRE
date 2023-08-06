import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <About />
      <Footer />
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
