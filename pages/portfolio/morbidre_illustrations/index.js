import styled from "styled-components";
import React, { useState, useContext } from "react";
import Header from "@/components/Header";
import connectDB from "@/db/connect";
import MorbidreIllustrations from "@/db/models/morbidre_illustrations";
import ImagePopup from "@/components/ImagePopup";
import { useDarkMode } from "@/components/DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useSession } from "next-auth/react";
import UploadButton from "@/components/Upload/UploadButton";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const MorbidreIllustrationsPage = ({ illustrations }) => {
  const [popupImage, setPopupImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { data: session } = useSession();
  const { t } = useTranslation();

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

  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  const handleImageDelete = async (imageId) => {
    const isConfirmed = window.confirm("Are you sure?");

    if (isConfirmed) {
      try {
        await axios.delete(`/api/delete_image?model=morbidre_i&id=${imageId}`);
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
          <IllustrationDisplay $darkMode={darkMode}>
            <h1>MORBIDRE ILLUSTRATIONS</h1>
            <IllustrationGrid>
              {illustrations.length > 0 ? (
                illustrations.map((illustration, index) => (
                  <IllustrationItem
                    key={illustration._id}
                    onClick={() => openPopup(index)}
                  >
                    <ZoomableImage
                      src={illustration.image}
                      alt="Illustration"
                    />
                  </IllustrationItem>
                ))
              ) : (
                <p>No illustrations found.</p>
              )}
            </IllustrationGrid>
            <UploadButton uploadPath="/api/upload_morbi_i" />
          </IllustrationDisplay>
        )}
        {popupImage && (
          <ImagePopup
            image={popupImage}
            onClose={closePopup}
            onNext={showNextImage}
            onPrevious={showPreviousImage}
            onDelete={() =>
              handleImageDelete(illustrations[currentImageIndex]._id)
            }
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <Header />
        {isClient && (
          <IllustrationDisplay $darkMode={darkMode}>
            <h1>MORBIDRE ILLUSTRATIONS</h1>
            <IllustrationGrid>
              {illustrations.length > 0 ? (
                illustrations.map((illustration, index) => (
                  <IllustrationItem
                    key={illustration._id}
                    onClick={() => openPopup(index)}
                  >
                    <ZoomableImage
                      src={illustration.image}
                      alt="Illustration"
                    />
                  </IllustrationItem>
                ))
              ) : (
                <p>No illustrations found.</p>
              )}
            </IllustrationGrid>
          </IllustrationDisplay>
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

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

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

  ${(props) =>
    props.$darkMode &&
    `
    h1, p {
      color: #ffffff;
    }
    `}
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
