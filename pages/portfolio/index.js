import styled from "styled-components";
import connectDB from "@/db/connect";
import KidlitIllustrations from "@/db/models/kidlit_illustrations";
import MorbidreDesign from "@/db/models/morbidre_design";
import MorbidreIllustrations from "@/db/models/morbidre_illustrations";
import Collections from "@/db/models/collections";
import { BiSolidRightArrow } from "react-icons/bi";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <>
      <Header />
      <ElementsContainer>
        <Image
          className="left"
          src="/images/Background element light left 1ce598.png"
          alt=""
          height={850}
          width={350}
        />
        <Container>
          <LinkDisplay>
            <Link
              href="/portfolio/kidlit_illustrations"
              style={{ textDecoration: "none", color: "#0aa368" }}
            >
              <strong>KIDLIT ILLUSTRATIONS:</strong>
            </Link>
            <ProjectDisplay>
              {kidLitImages.map((image) => (
                <Image
                  key={image._id}
                  src={image.image}
                  alt=""
                  width={150}
                  height={150}
                />
              ))}
              <Link href="/portfolio/kidlit_illustrations">
                <BiSolidRightArrow
                  style={{
                    color: "#0aa368",
                    width: "50",
                    height: "50",
                    marginLeft: "20",
                  }}
                />
              </Link>
            </ProjectDisplay>
          </LinkDisplay>
          <LinkDisplay>
            <Link
              href="/portfolio/morbidre_illustrations"
              style={{ textDecoration: "none", color: "#11b877" }}
            >
              <strong>MORBIDRE ILLUSTRATIONS:</strong>
            </Link>
            <ProjectDisplay>
              {morbidreImages.map((image) => (
                <Image
                  key={image._id}
                  src={image.image}
                  alt=""
                  width={150}
                  height={150}
                />
              ))}
              <Link href="/portfolio/morbidre_illustrations">
                <BiSolidRightArrow
                  style={{
                    color: "#11b877",
                    width: "50",
                    height: "50",
                    marginLeft: "20",
                  }}
                />
              </Link>
            </ProjectDisplay>
          </LinkDisplay>
          <LinkDisplay>
            <Link
              href="/portfolio/morbidre_designs"
              style={{ textDecoration: "none", color: "##1ce598" }}
            >
              <strong>MORBIDRE DESIGN:</strong>
            </Link>
            <ProjectDisplay>
              {morbidreDesigns.map((image) => (
                <Image
                  key={image._id}
                  src={image.image}
                  alt=""
                  width={150}
                  height={150}
                />
              ))}
              <Link href="/portfolio/morbidre_designs">
                <BiSolidRightArrow
                  style={{
                    color: "##1ce598",
                    width: "50",
                    height: "50",
                    marginLeft: "20",
                  }}
                />
              </Link>
            </ProjectDisplay>
          </LinkDisplay>
          <LinkDisplay>
            <Link
              href="/portfolio/collections"
              style={{ textDecoration: "none", color: "#26f0a3" }}
            >
              <strong>COLLECTIONS:</strong>
            </Link>
            <ProjectDisplay>
              {collections.map((image) => (
                <Image
                  key={image._id}
                  src={image.image}
                  alt=""
                  width={150}
                  height={150}
                />
              ))}
              <Link href="/portfolio/collections">
                <BiSolidRightArrow
                  style={{
                    color: "#26f0a3",
                    width: "50",
                    height: "50",
                    marginLeft: "20",
                  }}
                />
              </Link>
            </ProjectDisplay>
          </LinkDisplay>
        </Container>
        <Image
          className="right"
          src="/images/Background element light right 1ce598.png"
          alt=""
          height={850}
          width={300}
        />
      </ElementsContainer>
    </>
  );
}

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
  justify-content: space-between;

  .left {
    align-self: flex-start;
  }

  .right {
    align-self: flex-end;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
`;

const LinkDisplay = styled.div`
  display: flex;
  flex-direction: column;

  a {
    justify-self: flex-start;
    margin-left: -20px;
  }
`;

const ProjectDisplay = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
  margin-bottom: 20px;

  img {
    margin-left: 3px;
    margin-right: 3px;
  }
`;
