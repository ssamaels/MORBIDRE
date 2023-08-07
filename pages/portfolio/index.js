import styled from "styled-components";
import connectDB from "@/db/connect";
import KidlitIllustrations from "@/db/models/kidlit_illustrations";
import MorbidreDesign from "@/db/models/morbidre_design";
import MorbidreIllustrations from "@/db/models/morbidre_illustrations";
import Collections from "@/db/models/collections";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useDarkMode } from "@/components/DarkModeContext";
import { useContext } from "react";
import { ClientSideContext } from "../_app";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps(context) {
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
      ...(await serverSideTranslations(context.locale)),
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
  const isClient = useContext(ClientSideContext);
  const { t } = useTranslation();

  return (
    <>
      <Header />
      {isClient && (
        <ElementsContainer $darkMode={darkMode}>
          <Image
            className="left"
            src={darkMode ? "/images/left dark.png" : "/images/left light.png"}
            alt=""
            height={650}
            width={300}
          />
          <Container>
            <LinkDisplay $darkMode={darkMode}>
              <Link href="/portfolio/kidlit_illustrations">
                <strong>{t("KIDLIT_ILLUSTRATIONS")}:</strong>
              </Link>
              <ProjectDisplay $darkMode={darkMode}>
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
                  <MdKeyboardDoubleArrowRight className="arrow" />
                </Link>
              </ProjectDisplay>
            </LinkDisplay>
            <hr></hr>
            <LinkDisplay $darkMode={darkMode}>
              <Link href="/portfolio/morbidre_illustrations">
                <strong>{t("MORBIDRE_ILLUSTRATIONS")}:</strong>
              </Link>
              <ProjectDisplay $darkMode={darkMode}>
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
                  <MdKeyboardDoubleArrowRight className="arrow" />
                </Link>
              </ProjectDisplay>
            </LinkDisplay>
            <hr></hr>
            <LinkDisplay $darkMode={darkMode}>
              <Link href="/portfolio/morbidre_designs">
                <strong>{t("MORBIDRE_DESIGN")}:</strong>
              </Link>
              <ProjectDisplay $darkMode={darkMode}>
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
                  <MdKeyboardDoubleArrowRight className="arrow" />
                </Link>
              </ProjectDisplay>
            </LinkDisplay>
            <hr></hr>
            <LinkDisplay $darkMode={darkMode}>
              <Link href="/portfolio/collections">
                <strong>{t("COLLECTIONS")}:</strong>
              </Link>
              <ProjectDisplay $darkMode={darkMode}>
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
                  <MdKeyboardDoubleArrowRight className="arrow" />
                </Link>
              </ProjectDisplay>
            </LinkDisplay>
          </Container>
          <Image
            className="right"
            src={
              darkMode ? "/images/right dark.png" : "/images/right light.png"
            }
            alt=""
            height={750}
            width={250}
          />
        </ElementsContainer>
      )}
      <Footer />
    </>
  );
}

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10rem;
  margin-bottom: 10rem;
  justify-content: space-between;

  hr {
    border-top: 0.2rem double;
    border-bottom: none;
    margin-right: 2.5rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  ${(props) =>
    props.$darkMode &&
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
    text-decoration: none;
    color: #000000;
  }

  ${(props) =>
    props.$darkMode &&
    `
      a {
        color: #ffffff
      };
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
    border: 0.2rem double #000000;
    border-radius: 1rem;
    background-color: rgb(250, 250, 250, 0.5);
  }

  .arrow {
    margin-left: 2.5rem;
    color: #000000;
    width: 50px;
    height: 50px;
  }

  ${(props) =>
    props.$darkMode &&
    `
    img {
        border: 0.2rem double #ffffff;
      }

      .arrow {
        color: #ffffff
      };
    `}

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
