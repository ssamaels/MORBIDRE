import styled from "styled-components";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import connectDB from "@/db/connect";
import MorbidreIllustrations from "@/db/models/morbidre_illustrations";

const MorbidreIllustrationsPage = ({ illustrations }) => {
  return (
    <>
      <Header />
      <IllustrationDisplay>
        <h1>Morbidre Illustrations</h1>
        <IllustrationGrid>
          {illustrations.length > 0 ? (
            illustrations.map((illustration) => (
              <IllustrationItem key={illustration._id}>
                <ZoomableImage src={illustration.image} alt="Illustration" />
              </IllustrationItem>
            ))
          ) : (
            <p>No illustrations found.</p>
          )}
        </IllustrationGrid>
      </IllustrationDisplay>
    </>
  );
};

export async function getServerSideProps() {
  try {
    await connectDB();

    const illustrations = await MorbidreIllustrations.find({}, "image");

    return {
      props: {
        illustrations: JSON.parse(JSON.stringify(illustrations)),
      },
    };
  } catch (error) {
    console.error("Error fetching Morbidre illustrations:", error);
    return {
      props: {
        illustrations: [],
      },
    };
  }
}

export default MorbidreIllustrationsPage;

const IllustrationDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IllustrationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const IllustrationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid #1ce598;
  padding: 10px;
  position: relative;
  overflow: hidden;
`;

const ZoomableImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;

  ${IllustrationItem}:hover & {
    transform: scale(0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    pointer-events: none;
  }

  ${IllustrationItem}:not(:hover) & {
    transform: scale(1);
    pointer-events: auto;
  }
`;
