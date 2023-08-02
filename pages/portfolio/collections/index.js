import styled from "styled-components";
import React, { useState, useContext } from "react";
import Header from "@/components/Header";
import connectDB from "@/db/connect";
import Collections from "@/db/models/collections";
import ImagePopup from "@/components/ImagePopup";
import { useDarkMode } from "@/components/DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useSession } from "next-auth/react";
import UploadButton from "@/components/UploadButton";

const CollectionsPage = ({ collections }) => {
  const [popupImage, setPopupImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { data: session } = useSession();

  const openPopup = (imageIndex) => {
    setPopupImage(collections[imageIndex].image);
    setCurrentImageIndex(imageIndex);
  };

  const closePopup = () => {
    setPopupImage(null);
    setCurrentImageIndex(0);
  };

  const showNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % collections.length;
    setPopupImage(collections[nextIndex].image);
    setCurrentImageIndex(nextIndex);
  };

  const showPreviousImage = () => {
    const previousIndex =
      (currentImageIndex - 1 + collections.length) % collections.length;
    setPopupImage(collections[previousIndex].image);
    setCurrentImageIndex(previousIndex);
  };

  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  if (session) {
    return (
      <>
        <Header />
        {isClient && (
          <CollectionsDisplay $darkMode={darkMode}>
            <h1>COLLECTIONS</h1>
            <CollectionsGrid>
              {collections.length > 0 ? (
                collections.map((collection, index) => (
                  <CollectionItem
                    key={collection._id}
                    onClick={() => openPopup(index)}
                  >
                    <ZoomableImage src={collection.image} alt="Collection" />
                  </CollectionItem>
                ))
              ) : (
                <p>No collections found.</p>
              )}
            </CollectionsGrid>
            <UploadButton uploadPath="/api/upload_collections" />
          </CollectionsDisplay>
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
  } else {
    return (
      <>
        <Header />
        {isClient && (
          <CollectionsDisplay $darkMode={darkMode}>
            <h1>COLLECTIONS</h1>
            <CollectionsGrid>
              {collections.length > 0 ? (
                collections.map((collection, index) => (
                  <CollectionItem
                    key={collection._id}
                    onClick={() => openPopup(index)}
                  >
                    <ZoomableImage src={collection.image} alt="Collection" />
                  </CollectionItem>
                ))
              ) : (
                <p>No collections found.</p>
              )}
            </CollectionsGrid>
          </CollectionsDisplay>
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
  }
};

export async function getServerSideProps() {
  try {
    await connectDB();

    const collections = await Collections.find({}, "name image");

    return {
      props: {
        collections: JSON.parse(JSON.stringify(collections)),
      },
    };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return {
      props: {
        collections: [],
      },
    };
  }
}

export default CollectionsPage;

const CollectionsDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;

  h1,
  p {
    color: #000000;
  }

  ${(props) =>
    props.$darkMode &&
    `
    h1, p {
      color: #ffffff;
    }
    `}
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const CollectionItem = styled.div`
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
