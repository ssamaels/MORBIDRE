import styled from "styled-components";
import Header from "@/components/Header";
import Image from "next/image";
import React, { useState, useContext } from "react";
import connectDB from "@/db/connect";
import MorbidreDesign from "@/db/models/morbidre_design";
import ImagePopup from "@/components/ImagePopup";
import { ClientSideContext } from "@/pages/_app";

const MorbidreDesignsPage = ({ designs }) => {
  const [popupImage, setPopupImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openPopup = (imageIndex) => {
    setPopupImage(designs[imageIndex].image);
    setCurrentImageIndex(imageIndex);
  };

  const closePopup = () => {
    setPopupImage(null);
    setCurrentImageIndex(0);
  };

  const showNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % designs.length;
    setPopupImage(designs[nextIndex].image);
    setCurrentImageIndex(nextIndex);
  };

  const showPreviousImage = () => {
    const previousIndex =
      (currentImageIndex - 1 + designs.length) % designs.length;
    setPopupImage(designs[previousIndex].image);
    setCurrentImageIndex(previousIndex);
  };

  const isClient = useContext(ClientSideContext);

  return (
    <>
      <Header />
      {isClient && (
        <DesignDisplay>
          <h1>Morbidre Design</h1>
          <DesignGrid>
            {designs.length > 0 ? (
              designs.map((design, index) => (
                <DesignItem key={design._id} onClick={() => openPopup(index)}>
                  <ZoomableImage src={design.image} alt="Design" />
                </DesignItem>
              ))
            ) : (
              <p>No designs found.</p>
            )}
          </DesignGrid>
        </DesignDisplay>
      )}
      {popupImage && (
        <ImagePopup
          image={popupImage}
          onClose={closePopup}
          onNext={showNextImage}
          onPrevious={showPreviousImage}
        />
      )}
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
  margin-top: 10rem;
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
`;
