import React, { useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import Image from "next/image";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { useTranslation } from "next-i18next";

export default function DrawingCanvas() {
  const canvasRef = useRef(null);
  const context = useRef(null);
  const imageRef = useRef(null);
  const inputRef = useRef(null);
  const drawColor = useRef("black");
  const startBackgroundColor = useRef("white");
  const drawWidth = useRef(2);
  const isDrawing = useRef(false);
  const restoreArray = useRef([]);
  const index = useRef(-1);
  const { t } = useTranslation("common");

  useEffect(() => {
    const canvas = canvasRef.current;
    context.current = canvas.getContext("2d");
    context.current.fillStyle = startBackgroundColor.current;
    context.current.fillRect(0, 0, canvas.width, canvas.height);

    function start(event) {
      isDrawing.current = true;
      const { pageX, pageY } = event.touches ? event.touches[0] : event;
      const canvasRect = canvasRef.current.getBoundingClientRect();
      context.current.beginPath();
      context.current.moveTo(
        pageX - canvasRect.left - window.scrollX,
        pageY - canvasRect.top - window.scrollY
      );
      event.preventDefault();
    }

    function draw(event) {
      if (isDrawing.current) {
        const { pageX, pageY } = event.touches ? event.touches[0] : event;
        const canvasRect = canvasRef.current.getBoundingClientRect();

        context.current.lineTo(
          pageX - canvasRect.left - window.scrollX,
          pageY - canvasRect.top - window.scrollY
        );
        context.current.strokeStyle = drawColor.current;
        context.current.lineWidth = drawWidth.current;
        context.current.lineCap = "round";
        context.current.lineJoin = "round";
        context.current.stroke();
      }
      event.preventDefault();
    }

    function stop(event) {
      if (isDrawing.current) {
        context.current.stroke();
        context.current.closePath();
        isDrawing.current = false;
      }
      event.preventDefault();

      if (event.type !== "mouseout") {
        restoreArray.current.push(
          context.current.getImageData(0, 0, canvas.width, canvas.height)
        );
        index.current += 1;
      }
    }

    canvas.addEventListener("touchstart", start, false);
    canvas.addEventListener("touchmove", draw, false);
    canvas.addEventListener("mousedown", start, false);
    canvas.addEventListener("mousemove", draw, false);
    canvas.addEventListener("touchend", stop, false);
    canvas.addEventListener("mouseup", stop, false);
    canvas.addEventListener("mouseout", stop, false);

    return () => {
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("touchend", stop);
      canvas.removeEventListener("mouseup", stop);
      canvas.removeEventListener("mouseout", stop);
    };
  }, []);

  function changeColor(element) {
    drawColor.current = element.style.background;
  }

  function clearCanvas() {
    context.current.fillStyle = startBackgroundColor.current;
    context.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    context.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    restoreArray.current = [];
    index.current = -1;
  }

  function undoLast() {
    if (index.current <= 0) {
      clearCanvas();
    } else {
      index.current -= 1;
      restoreArray.current.pop();
      context.current.putImageData(restoreArray.current[index.current], 0, 0);
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      imageRef.current.src = event.target.result;
      imageRef.current.onload = () => {
        context.current.drawImage(
          imageRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        restoreArray.current.push(
          context.current.getImageData(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          )
        );
        index.current += 1;
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  return (
    <CreativeArea>
      {isClient && (
        <>
          <StyledLabel htmlFor="canvas" $darkMode={darkMode}>
            {t("draw")}:
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <UploadButton
              type="button"
              onClick={handleButtonClick}
              $darkMode={darkMode}
            >
              {t("upload")}
              <LiaCloudUploadAltSolid className="cloud" />
            </UploadButton>
          </StyledLabel>
          <StyledCanvas
            ref={canvasRef}
            className="canvas"
            id="canvas"
            width={350}
            height={250}
            $darkMode={darkMode}
          ></StyledCanvas>
          <StyledTools>
            <RangePicker
              onChange={(e) => (drawWidth.current = e.target.value)}
              type="range"
              min="1"
              max="100"
            />
            <ColorPicker
              onChange={(e) => (drawColor.current = e.target.value)}
              type="color"
              $darkMode={darkMode}
            />
            <StyledButton
              onClick={undoLast}
              type="button"
              className="button"
              $darkMode={darkMode}
            >
              {t("undo")}
            </StyledButton>
            <StyledButton
              onClick={clearCanvas}
              type="button"
              className="button"
              $darkMode={darkMode}
            >
              {t("clear")}
            </StyledButton>
          </StyledTools>
          <Image
            ref={imageRef}
            style={{ display: "none" }}
            alt=""
            width={0}
            height={0}
          />
        </>
      )}
    </CreativeArea>
  );
}

export function convertCanvasToImage() {
  const dataURL = canvas.toDataURL("image/png");
  return dataURL;
}

const CreativeArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 1rem;
`;

const StyledCanvas = styled.canvas`
  border: 0.02rem double #000000;
  border-radius: 1.5rem;
  overflow: hidden;

  ${(props) =>
    props.$darkMode &&
    `
    border: 0.02rem double #ffffff;
    `}

  @media (max-width: 775px) {
    width: 350px;
  }
`;

const StyledTools = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledButton = styled.button`
  margin: 1rem;
  padding: 0.5rem;
  border: 0.1rem solid #000000;
  border-radius: 0.2rem;
  background: transparent;
  color: #000000;
  align-self: center;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
  }

  ${(props) =>
    props.$darkMode &&
    `
    border: 0.1rem solid #ffffff;
    color: #ffffff;
    &:hover {
      background: rgb(250, 250, 250, 0.5);
      color: #000000;
    }
    `}
`;

const ColorPicker = styled.input`
  margin: 1rem;
  padding: 0.1rem;
  border: 0.1rem solid #000000;
  border-radius: 0.2rem;
  background: transparent;
  align-self: center;
  ${(props) =>
    props.$darkMode &&
    `
    border: 0.1rem solid #ffffff;
    `}
`;

const RangePicker = styled.input`
  margin: 1rem;
  background-color: #000000;
  align-self: center;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 0.3rem;
  color: #000000;
  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    `}
`;

const UploadButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 0.5rem;
  margin: 1rem;
  border: 0.01rem solid #000000;
  border-radius: 0.2rem;
  background: transparent;
  color: #000000;
  align-self: center;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
    .cloud {
      color: #ffffff;
    }
  }

  .cloud {
    color: #000000;
  }

  ${(props) =>
    props.$darkMode &&
    `
    border: 0.1rem solid #ffffff;
    color: #ffffff;
    &:hover {
        background: rgb(250, 250, 250, 0.5);
        color: #000000;
        .cloud {
            color: #000000
        }
    }
    .cloud{
        color: #ffffff;
    `}
`;
