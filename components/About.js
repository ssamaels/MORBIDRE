import styled from "styled-components";
import Image from "next/image";
import { useContext } from "react";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";

export default function About() {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

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
              <p className="h1">ABOUT ME</p>
              <p>
                My name is Andrea Bajčeta, but in the world of design, I go by
                Morbi Dre. I&apos;ve been involved in graphic design for eight
                years, during which time I have created timeless pieces. I
                follow trends, but in a way that I take the best from each of
                them, while still preserving the client&apos;s identity and my
                own signature style. I have been practicing painting for over
                fifteen years, so transitioning to graphic board felt natural to
                me. It is another tool through which I can express my creativity
                and view of the world. I have behind me two illustrated
                collections of poems, an illustrated novel, and a collection of
                shirts called &quot;Zao Bidji by morbidredesign.&quot; Thanks to
                my extensive knowledge of art history and graphic design
                history, I believe I can easily create whatever need. My driving
                force is the desire to make positive changes, along with
                consuming a significant amount of coffee on a daily basis. My
                special mindset ensures hyperfocus whenever I work on a project.
                From the moment I start working until the project&apos;s
                completion, it&apos;s all about you. This way, I guarantee
                mutual satisfaction with the final design. If you decide to
                contact me, be prepared that our first meeting will likely
                involve spending several hours together, sipping coffee, and
                filling out a questionnaire that will help me understand your
                needs and create what ever you require.
              </p>
            </AboutText>
            <Image
              className="right"
              src={
                darkMode ? "/images/right dark.png" : "/images/right light.png"
              }
              alt=""
              height={750}
              width={250}
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
    position: fixed;
    left: 0;
  }

  .right {
    position: fixed;
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
  text-align: center;
  color: #000000;
  line-height: 3rem;
  z-index: 2;

  .h1 {
    font-size: 3rem;
    font-weight: bolder;
  }

  p {
    width: 50%;
    font-size: 1.5rem;
    font-weight: bold;
  }

  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    `}
`;
