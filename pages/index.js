import Image from "next/image";
import styled from "styled-components";
import Header from "@/components/Header";
import CategoriesButton from "@/components/CategoriesButton";
import { RxDoubleArrowDown } from "react-icons/rx";
import { useDarkMode } from "@/components/DarkModeContext";
import { useContext } from "react";
import { ClientSideContext } from "./_app";

export default function Home() {
  const { darkMode, setDarkMode } = useDarkMode();

  const isClient = useContext(ClientSideContext);

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
              <h3>
                <strong>WELCOME TO MY WORLD.</strong>
              </h3>
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
          {/* <Pride>
        <p>
          One more thing I can say about my work is that, as a graphic designer
          and illustrator, I take pride in the fact that every line and element
          is a product of my own mind and hands.
        </p>
        <Image
          src="/images/Logo Rabbit.png"
          alt="rabbit"
          width={260}
          height={260}
        />
      </Pride> */}
          <CategoriesButton
            style={{
              alignSelf: "center",
              justifySelf: "center",
            }}
          />
        </ElementsContainer>
      )}
    </>
  );
}

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: column;

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
      opacity: 20%;
      right: 0;
      margin-right: -18rem;
    }

    .arrow {
      left: 50%;
      transform: translateX(-50%);
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
  width: 45%;
  line-height: 3rem;
  font-size: 2rem;

  ${(props) =>
    props.$darkMode &&
    `
      color: #ffffff;
    `}

  @media (max-width: 768px) {
    position: absolute;
    width: 80%;
    top: 20;
    left: 50%;
    z-index: 3;
    padding: 20px;
  }
`;
