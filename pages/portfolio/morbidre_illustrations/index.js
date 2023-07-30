import styled from "styled-components";
import Header from "@/components/Header";
import Image from "next/image";
import React, { useState } from "react";
import connectDB from "@/db/connect";
import MorbidreIllustrations from "@/db/models/morbidre_illustrations";
import ImagePopup from "@/components/ImagePopup";

const MorbidreIllustrationsPage = ({ illustrations }) => {
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

  return (
    <>
      <Header />
      <IllustrationDisplay>
        <h1>Morbidre Illustrations</h1>
        <IllustrationGrid>
          {illustrations.length > 0 ? (
            illustrations.map((illustration, index) => (
              <IllustrationItem
                key={illustration._id}
                onClick={() => openPopup(index)}
              >
                <ZoomableImage src={illustration.image} alt="Illustration" />
              </IllustrationItem>
            ))
          ) : (
            <p>No illustrations found.</p>
          )}
        </IllustrationGrid>
      </IllustrationDisplay>
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
  margin-top: 10rem;
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
