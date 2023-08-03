import Image from "next/image";
import styled from "styled-components";
import Header from "@/components/Header";
import CategoriesButton from "@/components/CategoriesButton";
import { RxDoubleArrowDown } from "react-icons/rx";
import { useDarkMode } from "@/components/DarkModeContext";
import { useContext, useState, useEffect } from "react";
import { ClientSideContext } from "./_app";
import Footer from "@/components/Footer";

export default function Home() {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);
  const [hideArrow, setHideArrow] = useState(false);

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
                <strong>WELCOME TO MY WORLD.</strong>
              </p>
              <p className="quote">
                &quot;Maybe I&apos;m not able to change the world, but I will
                definetly make a whole new one just for you.&quot;
              </p>
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

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

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
  align-items: center;
  margin-top: 5%;

  @media (max-width: 768px) {
    position: relative;
  }
`;

const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 45%;
  line-height: 4rem;

  .h1 {
    font-size: 3rem;
    font-weight: bolder;
  }

  p {
    font-size: 2rem;
    font-weight: bold;
  }

  ${(props) =>
    props.$darkMode &&
    `
      color: #ffffff;
    `}

  @media (max-width: 768px) {
    position: absolute;
    width: 80%;
    top: 20;
    left: 5%;
    z-index: 3;
    padding: 20px;
  }
`;
