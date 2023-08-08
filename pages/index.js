import Image from "next/image";
import styled from "styled-components";
import Header from "@/components/Header";
import CategoriesButton from "@/components/CategoriesButton";
import { RxDoubleArrowDown } from "react-icons/rx";
import { useDarkMode } from "@/components/DarkModeContext";
import { useContext, useState, useEffect } from "react";
import { ClientSideContext } from "./_app";
import Footer from "@/components/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Home() {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);
  const [hideArrow, setHideArrow] = useState(false);
  const { t } = useTranslation();

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      setHideArrow(true);
    } else {
      setHideArrow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      {isClient && (
        <ElementsContainer $darkMode={darkMode}>
          <Container>
            <Image
              className="left"
              src={
                darkMode ? "/images/left dark.png" : "/images/left light.png"
              }
              alt=""
              height={650}
              width={300}
            />
            <Welcome $darkMode={darkMode}>
              <p className="h1">
                <strong>{t("welcome")}</strong>
              </p>
              <p className="quote">{t("quote")}</p>
            </Welcome>
            <Image
              className="right"
              src={
                darkMode ? "/images/right dark.png" : "/images/right light.png"
              }
              alt=""
              height={750}
              width={250}
            />
          </Container>
          {!hideArrow && (
            <RxDoubleArrowDown
              className="arrow"
              style={{
                width: "40",
                height: "40",
                alignSelf: "center",
                position: "fixed",
                bottom: "5",
              }}
            />
          )}
          <CategoriesButton
            style={{
              alignSelf: "center",
              justifySelf: "center",
            }}
          />
        </ElementsContainer>
      )}
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

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .left {
    left: 0;
    top: 10rem;
    position: fixed;
  }
  .right {
    right: 0;
    top: 10rem;
    position: fixed;
  }

  ${(props) =>
    props.$darkMode &&
    `
      color: #ffffff;
    `}

  @media (max-width: 768px) {
    margin-top: 10rem;
    position: relative;

    .left {
      opacity: 20%;
      left: 0;
    }
    .right {
      display: none;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-content: center;
  margin-top: 25rem;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    position: relative;
    margin-top: 10rem;
  }
`;

const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  align-items: center;
  text-align: center;
  width: 45%;
  line-height: 4rem;

  .h1 {
    font-size: 3rem;
  }

  p {
    font-size: 2rem;
  }

  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    `}

  @media (max-width: 768px) {
    position: absolute;
    width: 60%;
    align-self: center;
    z-index: 3;
    padding: 20px;
    line-height: 2rem;

    .h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
  }
`;
