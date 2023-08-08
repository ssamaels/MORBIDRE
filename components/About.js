import styled from "styled-components";
import Image from "next/image";
import { useContext } from "react";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useTranslation } from "next-i18next";

export default function About() {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);
  const { t } = useTranslation("common");

  return (
    <>
      {isClient && (
        <>
          <StyledAbout>
            <Image
              className="left"
              src={
                darkMode ? "/images/left dark.png" : "/images/left light.png"
              }
              alt=""
              height={650}
              width={300}
            />
            <AboutText $darkMode={darkMode}>
              <p className="h1">{t("about")}</p>
              <p>{t("about_text")}</p>
            </AboutText>
            <Image
              className="right"
              src={
                darkMode ? "/images/right dark.png" : "/images/right light.png"
              }
              alt=""
              height={950}
              width={450}
            />
          </StyledAbout>
        </>
      )}
    </>
  );
}

const StyledAbout = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 9rem;
  margin-bottom: 9rem;
  width: 100%;

  .left {
    left: 0;
    position: sticky;
    top: 2rem;
  }

  .right {
    right: 0;
  }

  @media (max-width: 768px) {
    .left {
      opacity: 10%;
    }

    .right {
      display: none;
    }
  }
`;

const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  color: #000000;
  line-height: 3rem;
  z-index: 2;

  .h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: bolder;
  }

  p {
    width: 60%;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: justify;
    line-height: 3rem;
  }

  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    `}
`;
