import styled from "styled-components";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import connectDB from "@/db/connect";
import MorbidreDesign from "@/db/models/morbidre_design";

const MorbidreDesignsPage = ({ designs }) => {
  return (
    <>
      <Header />
      <DesignDisplay>
        <h1>Morbidre Design</h1>
        <DesignGrid>
          {designs.length > 0 ? (
            designs.map((design) => (
              <DesignItem key={design._id}>
                <ZoomableImage src={design.image} alt="Design" />
              </DesignItem>
            ))
          ) : (
            <p>No designs found.</p>
          )}
        </DesignGrid>
      </DesignDisplay>
    </>
  );
};

export async function getServerSideProps() {
  try {
    await connectDB();

    const designs = await MorbidreDesign.find({}, "image");

    return {
      props: {
        designs: JSON.parse(JSON.stringify(designs)),
      },
    };
  } catch (error) {
    console.error("Error fetching Morbidre designs:", error);
    return {
      props: {
        designs: [],
      },
    };
  }
}

export default MorbidreDesignsPage;

const DesignDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DesignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const DesignItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  position: relative;
  overflow: hidden;
`;

const ZoomableImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;

  ${DesignItem}:hover & {
    background-color: rgba(62, 250, 178, 0.7);
    border-radius: 500px;
    transform: scale(0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    pointer-events: none;
  }

  ${DesignItem}:not(:hover) & {
    transform: scale(1);
    pointer-events: auto;
  }
`;
