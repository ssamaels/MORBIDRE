import styled from "styled-components";
import React, { useState, useContext } from "react";
import Header from "@/components/Header";
import connectDB from "@/db/connect";
import MorbidreDesign from "@/db/models/morbidre_design";
import ImagePopup from "@/components/ImagePopup";
import { useDarkMode } from "@/components/DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useSession } from "next-auth/react";
import UploadButton from "@/components/Upload/UploadButton";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const MorbidreDesignsPage = ({ designs }) => {
  const [popupImage, setPopupImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { data: session } = useSession();
  const { t } = useTranslation();

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

  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  const handleImageDelete = async (imageId) => {
    const isConfirmed = window.confirm("Are you sure?");

    if (isConfirmed) {
      try {
        await axios.delete(`/api/delete_image?model=morbidre_d&id=${imageId}`);
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
          <DesignDisplay $darkMode={darkMode}>
            <h1>MORBIDRE DESIGN</h1>
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
            <UploadButton uploadPath="/api/upload_morbi_d" />
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
  } else {
    return (
      <>
        <Header />
        {isClient && (
          <DesignDisplay $darkMode={darkMode}>
            <h1>MORBIDRE DESIGN</h1>
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
            onDelete={() => handleImageDelete(designs[currentImageIndex]._id)}
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

  ${(props) =>
    props.$darkMode &&
    `
    h1, p {
      color: #ffffff;
    }
    `}
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
