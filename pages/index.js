import Image from "next/image";
import styled from "styled-components";
import Header from "@/components/Header";
import CategoriesButton from "@/components/CategoriesButton";
import { RxDoubleArrowDown } from "react-icons/rx";

export default function Home() {
  return (
    <>
      <Header />
      {/* <div className="graphic">
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
        </div> */}
      <ElementsContainer>
        <Container>
          <Image
            className="left"
            src="/images/left light.png"
            alt=""
            height={650}
            width={300}
          />
          <Welcome>
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
            src="/images/right light.png"
            alt=""
            height={750}
            width={250}
          />
        </Container>
        <RxDoubleArrowDown
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
    </>
  );
}

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5%;
`;

const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  line-height: 3rem;
  font-size: 2rem;
`;

//   .graphic {
//     display: flex;
//     flex-direction: column;
//     margin-top: 1039px;
//     margin-left: 135px;

//     h3 {
//       font-size: xx-large;
//     }

//     .pg {
//       margin-top: 38px;
//     }

//     p {
//       margin-left: 125px;
//       font-size: 0.7rem;
//       padding-bottom: 17px;
//     }
//   }

//   .morbidre {
//     display: flex;
//     flex-direction: column;
//     margin-top: 100px;
//     margin-left: 135px;

//     h3 {
//       font-size: xx-large;
//     }

//     .pm {
//       margin-top: 25px;
//     }

//     p {
//       margin-left: 125px;
//       font-size: 0.7rem;
//       padding-bottom: 17px;
//     }
//   }

//   .kidlit {
//     display: flex;
//     flex-direction: column;
//     margin-top: 108px;
//     margin-left: 135px;

//     h3 {
//       font-size: xx-large;
//     }

//     .pk {
//       margin-top: 23px;
//     }

//     p {
//       margin-left: 125px;
//       font-size: 0.7rem;
//       padding-bottom: 17px;
//     }
//   }
// `;

// const Pride = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 40%;
//   margin-left: 20%;
//   margin-right: 20%;

//   p {
//     font-size: 1.5rem;
//     padding: 2%;
//     border: 0.3rem solid #1ce598;
//     border-radius: 100px;
//     margin-bottom: 70%;
//   }

//   img {
//     align-self: flex-end;
//     margin-right: -20%;
//   }
