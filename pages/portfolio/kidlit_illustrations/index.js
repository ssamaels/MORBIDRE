import styled from "styled-components";
import Header from "@/components/Header";
import Image from "next/image";
import React, { useState, useContext } from "react";
import connectDB from "@/db/connect";
import KidlitIllustrations from "@/db/models/kidlit_illustrations";
import ImagePopup from "@/components/ImagePopup";
import { ClientSideContext } from "@/pages/_app";

const KidlitIllustrationsPage = ({ illustrations }) => {
  const [popupImage, setPopupImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openPopup = (imageIndex) => {
    setPopupImage(illustrations[imageIndex].image);
    setCurrentImageIndex(imageIndex);
  };

  const closePopup = () => {
    setPopupImage(null);
    setCurrentImageIndex(0);
  };

  const showNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % illustrations.length;
    setPopupImage(illustrations[nextIndex].image);
    setCurrentImageIndex(nextIndex);
  };

  const showPreviousImage = () => {
    const previousIndex =
      (currentImageIndex - 1 + illustrations.length) % illustrations.length;
    setPopupImage(illustrations[previousIndex].image);
    setCurrentImageIndex(previousIndex);
  };

  const isClient = useContext(ClientSideContext);

  return (
    <>
      <Header />
      {isClient && (
        <KidlitDisplay>
          <h1>Kidlit Illustrations</h1>
          <KidlitGrid>
            {illustrations.length > 0 ? (
              illustrations.map((illustration, index) => (
                <KidlitItem
                  key={illustration._id}
                  onClick={() => openPopup(index)}
                >
                  <ZoomableImage src={illustration.image} alt="Illustration" />
                </KidlitItem>
              ))
            ) : (
              <p>No illustrations found.</p>
            )}
          </KidlitGrid>
        </KidlitDisplay>
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

    const illustrations = await KidlitIllustrations.find({}, "image");

    return {
      props: {
        illustrations: JSON.parse(JSON.stringify(illustrations)),
      },
    };
  } catch (error) {
    console.error("Error fetching Kidlit illustrations:", error);
    return {
      props: {
        illustrations: [],
      },
    };
  }
}

export default KidlitIllustrationsPage;

const KidlitDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
`;

const KidlitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const KidlitItem = styled.div`
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

  /* @media (min-width: 768px) {
    ${KidlitItem}:hover & {
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

    ${KidlitItem}:not(:hover) & {
      transform: scale(1);
      pointer-events: auto;
    }
  } */
`;
