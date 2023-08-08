import styled from "styled-components";
import Header from "@/components/Header";
import { useDarkMode } from "@/components/DarkModeContext";
import { ClientSideContext } from "../_app";
import { useContext } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Copyrights() {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);
  const { t } = useTranslation();

  return (
    <>
      {isClient && (
        <>
          <StyledCopyrights $darkMode={darkMode}>
            <h1>{t("copyrights")}</h1>
            <p>{t("reserved_rights")}</p>
            <p>{t("owned_by")}</p>
            <p>{t("designed_by")}</p>
            <p>{t("developed_by")}</p>
          </StyledCopyrights>
        </>
      )}
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

const StyledCopyrights = styled.div`
  color: #000000;
  line-height: 2rem;
  margin: 2rem;

  ${(props) =>
    props.$darkMode &&
    `
      color: #ffffff;
    `}
`;
