import React, { useState } from "react";
import styled from "styled-components";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdClose,
} from "react-icons/md";

const ImagePopup = ({ image, onClose, onNext, onPrevious }) => {
  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent>
        <CloseButton onClick={onClose}>
          <MdClose style={{ color: "#000000" }} />
        </CloseButton>
        <PrevButton
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
        >
          <MdKeyboardDoubleArrowLeft style={{ color: "#000000" }} />
        </PrevButton>
        <ZoomableImage src={image} alt="Collection" />
        <NextButton
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          <MdKeyboardDoubleArrowRight style={{ color: "#000000" }} />
        </NextButton>
      </PopupContent>
    </PopupOverlay>
  );
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
`;

const PopupContent = styled.div`
  display: flex;
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #000000;
  font-size: 24px;
  cursor: pointer;
`;

const PrevButton = styled.div`
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  color: #000000;
  font-size: 32px;
  cursor: pointer;
`;

const NextButton = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  color: #000000;
  font-size: 32px;
  cursor: pointer;
`;

const ZoomableImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
`;

export default ImagePopup;
