import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useContext } from "react";
import { AiOutlineInstagram, AiOutlineMail } from "react-icons/ai";
import { useTranslation } from "next-i18next";

export default function Footer() {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);
  const { t } = useTranslation("common");

  return (
    <>
      {isClient && (
        <>
          <StyledFooter $darkMode={darkMode}>
            <ContactConteainer $darkMode={darkMode}>
              <p className="p">{t("contact_F")}</p>
              <Link
                href="https://www.instagram.com/morbi.dre/"
                style={{ textDecoration: "none" }}
              >
                <div>
                  <AiOutlineInstagram /> morbidre
                </div>
              </Link>
              <Link
                href="https://www.instagram.com/morbidredesign/"
                style={{ textDecoration: "none" }}
              >
                <div>
                  <AiOutlineInstagram /> morbidredesign
                </div>
              </Link>
              <p>
                <div>
                  <AiOutlineMail /> andreabajceta96@gmail.com
                </div>
              </p>
            </ContactConteainer>
            <TermsContainer $darkMode={darkMode}>
              <Link href="/FAQ" style={{ textDecoration: "none" }}>
                FAQ
              </Link>
              <Link href="/privacy_policy" style={{ textDecoration: "none" }}>
                Privacy Policy
              </Link>
              <Link
                href="/terms_and_conditions"
                style={{ textDecoration: "none" }}
              >
                Terms And Conditions
              </Link>
            </TermsContainer>
            <Image
              src="/images/Logo Rabbit.png"
              alt="rabbit"
              width={100}
              height={100}
              priority
            />
          </StyledFooter>
        </>
      )}
    </>
  );
}

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background: transparent;
  color: #000000;
  margin: 0;
  margin-bottom: 2rem;
  position: relative;
  z-index: 5;
  width: 100%;
  bottom: 0;
  z-index: 5;

  img {
    margin-right: 1.3rem;
  }

  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    `}

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.8rem;

    img {
      display: none;
    }
  }
`;

const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* text-align: center; */
  padding-left: 0.2rem;
  border-left: 2px solid #000000;

  a {
    color: #000000;
  }

  ${(props) =>
    props.$darkMode &&
    `
      border-left: 2px solid #ffffff;
      a {
        color: #ffffff;
      }
      `}

  @media (max-width: 768px) {
    margin-right: 0.5rem;
  }
`;

const ContactConteainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;

  a {
    color: #000000;

    ${(props) =>
      props.$darkMode &&
      `
      color: #ffffff;
      `}
  }

  div {
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    margin-left: 0.5rem;
  }
`;
