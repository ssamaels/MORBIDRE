import React, { useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { ClientSideContext } from "@/pages/_app";

export default function DrawingCanvas() {
  const canvasRef = useRef(null);
  const context = useRef(null);
  const drawColor = useRef("black");
  const startBackgroundColor = useRef("white");
  const drawWidth = useRef(2);
  const isDrawing = useRef(false);
  const restoreArray = useRef([]);
  const index = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    context.current = canvas.getContext("2d");
    context.current.fillStyle = startBackgroundColor.current;
    context.current.fillRect(0, 0, canvas.width, canvas.height);

    function start(event) {
      isDrawing.current = true;
      const { pageX, pageY } = event.touches ? event.touches[0] : event;
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const scaleX = canvasRef.current.width / canvasRect.width;
      const scaleY = canvasRef.current.height / canvasRect.height;
      context.current.beginPath();
      context.current.moveTo(
        (pageX - canvasRect.left) * scaleX,
        (pageY - canvasRect.top) * scaleY
      );
      event.preventDefault();
    }

    function draw(event) {
      if (isDrawing.current) {
        const { pageX, pageY } = event.touches ? event.touches[0] : event;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / canvasRect.width;
        const scaleY = canvasRef.current.height / canvasRect.height;
        console.log(" pageX, pageY:", pageX, pageY);
        console.log(
          "event.offsetX, event.offset:",
          event.offsetX,
          event.offsetY
        );

        console.log(" scaleX, scaleY:", scaleX, scaleY);
        context.current.lineTo(
          (pageX - canvasRect.left) * scaleX,
          (pageY - canvasRect.top) * scaleY
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

  const isClient = useContext(ClientSideContext);

  return (
    <CreativeArea>
      {isClient && (
        <>
          <StyledLabel htmlFor="canvas">
            Draw what you have in mind:
          </StyledLabel>
          <StyledCanvas
            ref={canvasRef}
            className="canvas"
            id="canvas"
            width={700}
            height={350}
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
            />
            <StyledButton onClick={undoLast} type="button" className="button">
              Undo
            </StyledButton>
            <StyledButton
              onClick={clearCanvas}
              type="button"
              className="button"
            >
              Clear
            </StyledButton>
          </StyledTools>
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
  border: 0.01rem double #000000;
  border-radius: 1.5rem;
  overflow: hidden;
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
  padding: 0.3rem;
  border-radius: 0.2rem;
  background: transparent;
  color: #000000;
  align-self: center;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
  }
`;

const ColorPicker = styled.input`
  margin: 1rem;
  padding: 0.1rem;
  border-radius: 0.2rem;
  background: transparent;
  align-self: center;
`;

const RangePicker = styled.input`
  margin: 1rem;
  background-color: #000000;
  align-self: center;
`;

const StyledLabel = styled.label`
  margin: 0.3rem;
`;
