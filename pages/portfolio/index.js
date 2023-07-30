import styled from "styled-components";
import connectDB from "@/db/connect";
import KidlitIllustrations from "@/db/models/kidlit_illustrations";
import MorbidreDesign from "@/db/models/morbidre_design";
import MorbidreIllustrations from "@/db/models/morbidre_illustrations";
import Collections from "@/db/models/collections";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useDarkMode } from "@/components/DarkModeContext";

export async function getServerSideProps() {
  await connectDB();

  const kidLitImagesCursor = await KidlitIllustrations.aggregate([
    { $sample: { size: 5 } },
  ]);
  const morbidreImagesCursor = await MorbidreIllustrations.aggregate([
    { $sample: { size: 5 } },
  ]);
  const morbidreDesignsCursor = await MorbidreDesign.aggregate([
    { $sample: { size: 5 } },
  ]);
  const collectionsCursor = await Collections.aggregate([
    { $sample: { size: 5 } },
  ]);

  const kidLitImages = [];
  for await (const doc of kidLitImagesCursor) {
    kidLitImages.push(JSON.parse(JSON.stringify(doc)));
  }

  const morbidreImages = [];
  for await (const doc of morbidreImagesCursor) {
    morbidreImages.push(JSON.parse(JSON.stringify(doc)));
  }

  const morbidreDesigns = [];
  for await (const doc of morbidreDesignsCursor) {
    morbidreDesigns.push(JSON.parse(JSON.stringify(doc)));
  }

  const collections = [];
  for await (const doc of collectionsCursor) {
    collections.push(JSON.parse(JSON.stringify(doc)));
  }

  return {
    props: {
      kidLitImages,
      morbidreImages,
      morbidreDesigns,
      collections,
    },
  };
}

export default function Portfolio({
  kidLitImages,
  morbidreImages,
  morbidreDesigns,
  collections,
}) {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <>
      <Header />
      <ElementsContainer darkMode={darkMode}>
        <Image
          className="left"
          src={darkMode ? "/images/left dark.png" : "/images/left light.png"}
          alt=""
          height={650}
          width={300}
        />
        <Container>
          <LinkDisplay darkMode={darkMode}>
            <Link
              href="/portfolio/kidlit_illustrations"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <strong>KIDLIT ILLUSTRATIONS:</strong>
            </Link>
            <ProjectDisplay>
              {kidLitImages.map((image) => (
                <Image
                  key={image._id}
                  src={image.image}
                  alt=""
                  width={100}
                  height={100}
                />
              ))}
              <Link href="/portfolio/kidlit_illustrations">
                <MdKeyboardDoubleArrowRight
                  style={{
                    color: "#000000",
                    width: "50",
                    height: "50",
                  }}
                  className="arrow"
                />
              </Link>
            </ProjectDisplay>
          </LinkDisplay>
          <hr></hr>
          <LinkDisplay darkMode={darkMode}>
            <Link
              href="/portfolio/morbidre_illustrations"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <strong>MORBIDRE ILLUSTRATIONS:</strong>
            </Link>
            <ProjectDisplay>
              {morbidreImages.map((image) => (
                <Image
                  key={image._id}
                  src={image.image}
                  alt=""
                  width={100}
                  height={100}
                />
              ))}
              <Link href="/portfolio/morbidre_illustrations">
                <MdKeyboardDoubleArrowRight
                  style={{
                    color: "#000000",
                    width: "50",
                    height: "50",
                  }}
                  className="arrow"
                />
              </Link>
            </ProjectDisplay>
          </LinkDisplay>
          <hr></hr>
          <LinkDisplay darkMode={darkMode}>
            <Link
              href="/portfolio/morbidre_designs"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <strong>MORBIDRE DESIGN:</strong>
            </Link>
            <ProjectDisplay>
              {morbidreDesigns.map((image) => (
                <Image
                  key={image._id}
                  src={image.image}
                  alt=""
                  width={100}
                  height={100}
                />
              ))}
              <Link href="/portfolio/morbidre_designs">
                <MdKeyboardDoubleArrowRight
                  style={{
                    color: "#000000",
                    width: "50",
                    height: "50",
                  }}
                  className="arrow"
                />
              </Link>
            </ProjectDisplay>
          </LinkDisplay>
          <hr></hr>
          <LinkDisplay darkMode={darkMode}>
            <Link
              href="/portfolio/collections"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <strong>COLLECTIONS:</strong>
            </Link>
            <ProjectDisplay>
              {collections.map((image) => (
                <Image
                  key={image._id}
                  src={image.image}
                  alt=""
                  width={100}
                  height={100}
                />
              ))}
              <Link href="/portfolio/collections">
                <MdKeyboardDoubleArrowRight
                  style={{
                    color: "#000000",
                    width: "50",
                    height: "50",
                  }}
                  className="arrow"
                />
              </Link>
            </ProjectDisplay>
          </LinkDisplay>
        </Container>
        <Image
          className="right"
          src={darkMode ? "/images/right dark.png" : "/images/right light.png"}
          alt=""
          height={750}
          width={250}
        />
      </ElementsContainer>
    </>
  );
}

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 7rem;
  justify-content: space-between;

  hr {
    border-top: 0.2rem double;
    border-bottom: none;
    margin-right: 2.5rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  ${(props) =>
    props.darkMode &&
    `
      color: #ffffff;
    `}

  @media (max-width: 1200px) {
    .left {
      display: none;
    }
    .right {
      display: none;
    }
    justify-content: center;
  }
  @media (max-width: 768px) {
    margin-top: 10rem;
    flex-direction: column;
    justify-content: space-between;

    hr {
      border-top: 0.2rem double;
      border-bottom: none;
      margin-bottom: 2rem;
      margin-right: 0;
      margin-top: 0;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: center;
`;

const LinkDisplay = styled.div`
  display: flex;
  flex-direction: column;

  a {
    justify-self: flex-start;
    margin-left: -2rem;
  }

  ${(props) =>
    props.darkMode &&
    `
      color: #ffffff;
    `}

  @media (max-width: 768px) {
    a {
      align-self: center;
      margin: 0;
    }
  }
`;

const ProjectDisplay = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.7rem;
  margin-bottom: 1rem;

  img {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }

  .arrow {
    margin-left: 2.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    img {
      margin-bottom: 0.5rem;
    }

    .arrow {
      margin-left: 0;
    }
  }
`;
