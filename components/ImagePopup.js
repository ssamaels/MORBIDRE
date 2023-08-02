import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdClose,
} from "react-icons/md";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useSession } from "next-auth/react";
import DeleteButton from "@/components/DeleteButton";

const ImagePopup = ({ image, onClose, onNext, onPrevious, onDelete }) => {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {isClient && (
          <PopupOverlay onClick={onClose} $darkMode={darkMode}>
            <PopupContent>
              <CloseContainer>
                <CloseButton onClick={onClose} $darkMode={darkMode}>
                  <MdClose />
                </CloseButton>
                <DeleteButton onDelete={onDelete} />
              </CloseContainer>
              <PrevButton
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
                $darkMode={darkMode}
              >
                <MdKeyboardDoubleArrowLeft />
              </PrevButton>
              <ZoomableImage src={image} alt="Collection" />
              <NextButton
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                $darkMode={darkMode}
              >
                <MdKeyboardDoubleArrowRight />
              </NextButton>
            </PopupContent>
          </PopupOverlay>
        )}
      </>
    );
  } else {
    return (
      <>
        {isClient && (
          <PopupOverlay onClick={onClose} $darkMode={darkMode}>
            <PopupContent>
              <CloseButton onClick={onClose} $darkMode={darkMode}>
                <MdClose />
              </CloseButton>
              <PrevButton
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
                $darkMode={darkMode}
              >
                <MdKeyboardDoubleArrowLeft />
              </PrevButton>
              <ZoomableImage src={image} alt="Collection" />
              <NextButton
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                $darkMode={darkMode}
              >
                <MdKeyboardDoubleArrowRight />
              </NextButton>
            </PopupContent>
          </PopupOverlay>
        )}
      </>
    );
  }
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  ${(props) =>
    props.$darkMode &&
    `
    background-color: rgba(0, 0, 0, 0.8);
    `}
`;

const PopupContent = styled.div`
  display: flex;
  position: relative;
`;

const CloseContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #000000;
  font-size: 24px;
  cursor: pointer;

  ${(props) =>
    props.$darkMode &&
    `
  color: #ffffff;
  `}
`;

const PrevButton = styled.div`
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  color: #000000;
  font-size: 32px;
  cursor: pointer;

  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    `}
`;

const NextButton = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  color: #000000;
  font-size: 32px;
  cursor: pointer;

  ${(props) =>
    props.$darkMode &&
    `
  color: #ffffff;
  `}
`;

const ZoomableImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
`;

export default ImagePopup;
