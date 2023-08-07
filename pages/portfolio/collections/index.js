import styled from "styled-components";
import React, { useState, useContext } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import connectDB from "@/db/connect";
import Collections from "@/db/models/collections";
import ImagePopup from "@/components/ImagePopup";
import { useDarkMode } from "@/components/DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useSession } from "next-auth/react";
import UploadButton from "@/components/Upload/UploadButton";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const CollectionsPage = ({ collections }) => {
  const [popupImage, setPopupImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { data: session } = useSession();
  const { t } = useTranslation();

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

  const handleImageDelete = async (imageId) => {
    const isConfirmed = window.confirm("Are you sure?");

    if (isConfirmed) {
      try {
        await axios.delete(`/api/delete_image?model=collections&id=${imageId}`);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  if (session) {
    return (
      <>
        <Header />
        {isClient && (
          <CollectionsDisplay $darkMode={darkMode}>
            <h1>{t("COLLECTIONS")}</h1>
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
                <p>{t("collections_not_found")}</p>
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
            onDelete={() =>
              handleImageDelete(collections[currentImageIndex]._id)
            }
          />
        )}
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        {isClient && (
          <CollectionsDisplay $darkMode={darkMode}>
            <h1>{t("COLLECTIONS")}</h1>
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
                <p>{t("collections_not_found")}</p>
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
        <Footer />
      </>
    );
  }
};

export async function getServerSideProps({ locale }) {
  try {
    await connectDB();

    const collections = await Collections.find({}, "name image");

    return {
      props: {
        collections: JSON.parse(JSON.stringify(collections)),
        ...(await serverSideTranslations(locale)),
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
  margin-bottom: 5rem;

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
