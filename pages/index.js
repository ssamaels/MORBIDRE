import Image from "next/image";
import styled from "styled-components";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Image
          className="dre"
          src={"/images/Dre pic light.png"}
          alt="Dre"
          width={500}
          height={700}
        />
        <Introduction>
          <p className="h1">
            <strong>WELCOME TO MY WORLD.</strong>
          </p>
          <div className="p">
            <strong>
              I am a graphic designer and freelance illustrator with 8 years of
              expirience and over 60 projects in my portfolio. With every
              project I grow and learn something new. My moto is: &quot;There is
              no such thing as a small project&quot;, and by that I mean that my
              whole world is revolving around a client. I take my job seriously
              and I do one project at a time. When we agree to work together,
              you will have my undivided attention.
            </strong>
            <p className="quote">
              &quot;Maybe I&apos;m not able to change the world, but I will
              definetly make a whole new one just for you.&quot;
            </p>
          </div>
        </Introduction>
      </Container>
      <Tree>
        <div className="graphic">
          <h3>GRAPHIC DESIGN</h3>
          <div className="pg">
            <p>PACKAGING DESIGN</p>
            <p>LABEL DESIGN</p>
            <p>BRANDING AND REBRANDING SERVICES</p>
            <p>ADVERTISING DESIGN</p>
            <p>MARKETING DESIGN</p>
            <p>VISUAL COMMUNICATION</p>
          </div>
        </div>
        <div className="morbidre">
          <h3>
            MORBIDRE<br></br> ILLUSTRATIONS
          </h3>
          <div className="pm">
            <p>CUSTOM T-SHIRT PRINTS</p>
            <p>POSTER AND STICKER ILLUSTRATIONS</p>
            <p>DARK (MORBIDRE) ILLUSTRATIONS</p>
          </div>
        </div>
        <div className="kidlit">
          <h3>
            KIDLIT AND COVER<br></br> ILLUSTRATIONS
          </h3>
          <div className="pk">
            <p>CUSTOM KIDLIT ILLUSTRATIONS</p>
            <p>COVER AND POSTER ILLUSTRATIONS</p>
          </div>
        </div>
      </Tree>
      <AboutContainer>
        <Image
          className="left"
          src="/images/Background element light left 1ce598.png"
          alt=""
          height={1150}
          width={650}
        />
        <About>
          <h1>ABOUT ME</h1>
          <p>
            My name is Andrea Bajčeta, but in the world of design, I go by Morbi
            Dre. I&apos;ve been involved in graphic design for eight years,
            during which time I have created timeless pieces. I follow trends,
            but in a way that I take the best from each of them, while still
            preserving the client&apos;s identity and my own signature style. I
            have been practicing painting for over fifteen years, so
            transitioning to graphic board felt natural to me. It is another
            tool through which I can express my creativity and view of the
            world. I have behind me two illustrated collections of poems, an
            illustrated novel, and a collection of shirts called &quot;Zao Bidji
            by morbidredesign.&quot; Thanks to my extensive knowledge of art
            history and graphic design history, I believe I can easily create
            whatever need. My driving force is the desire to make positive
            changes, along with consuming a significant amount of coffee on a
            daily basis. My special mindset ensures hyperfocus whenever I work
            on a project. From the moment I start working until the
            project&apos;s completion, it&apos;s all about you. This way, I
            guarantee mutual satisfaction with the final design. If you decide
            to contact me, be prepared that our first meeting will likely
            involve spending several hours together, sipping coffee, and filling
            out a questionnaire that will help me understand your needs and
            create what ever you require.
          </p>
        </About>
        <Image
          className="right"
          src="/images/Background element light right 1ce598.png"
          alt=""
          height={1150}
          width={600}
        />
      </AboutContainer>
      <Pride>
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
      </Pride>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10%;
  margin-top: 50px;
  background-color: #1ce598;
  min-height: 300px;
`;

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;

  .h1 {
    color: white;
    margin-left: 20%;
    font-size: 2.5rem;
  }

  .p {
    color: black;
    padding: 3%;
    margin: 5% 20% 2% 12%;
    border: 0.5rem solid white;
    font-size: 1.5rem;
  }

  .quote {
    font-style: italic;
    margin-top: 5%;
  }
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5%;
`;

const About = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  font-size: 1.8rem;
`;

const Tree = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url("/images/Tree original.png");
  background-size: cover;
  background-position: bottom right;
  height: 1900px;
  width: 500px;
  position: absolute;
  top: 830px;
  left: 10%;
  bottom: 0;
  z-index: 2;

  .graphic {
    display: flex;
    flex-direction: column;
    margin-top: 1039px;
    margin-left: 135px;

    h3 {
      font-size: xx-large;
    }

    .pg {
      margin-top: 38px;
    }

    p {
      margin-left: 125px;
      font-size: 0.7rem;
      padding-bottom: 17px;
    }
  }

  .morbidre {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    margin-left: 135px;

    h3 {
      font-size: xx-large;
    }

    .pm {
      margin-top: 25px;
    }

    p {
      margin-left: 125px;
      font-size: 0.7rem;
      padding-bottom: 17px;
    }
  }

  .kidlit {
    display: flex;
    flex-direction: column;
    margin-top: 108px;
    margin-left: 135px;

    h3 {
      font-size: xx-large;
    }

    .pk {
      margin-top: 23px;
    }

    p {
      margin-left: 125px;
      font-size: 0.7rem;
      padding-bottom: 17px;
    }
  }
`;

const Pride = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40%;
  margin-left: 20%;
  margin-right: 20%;

  p {
    font-size: 1.5rem;
    padding: 2%;
    border: 0.3rem solid #1ce598;
    border-radius: 100px;
    margin-bottom: 70%;
  }

  img {
    align-self: flex-end;
    margin-right: -20%;
  }
`;
