import React, { useRef, useEffect } from "react";
import styled from "styled-components";

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
      context.current.beginPath();
      context.current.moveTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop
      );
      event.preventDefault();
    }

    function draw(event) {
      if (isDrawing.current) {
        context.current.lineTo(
          event.clientX - canvas.offsetLeft,
          event.clientY - canvas.offsetTop
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

  return (
    <CreativeArea>
      <StyledCanvas ref={canvasRef} id="canvas"></StyledCanvas>
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
        <StyledButton onClick={clearCanvas} type="button" className="button">
          Clear
        </StyledButton>
      </StyledTools>
    </CreativeArea>
  );
}

const CreativeArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`;

const StyledCanvas = styled.canvas`
  border: 4px solid #1ce598;
  border-radius: 15px;
`;

const StyledTools = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledButton = styled.button`
  margin: 10px;
  background-color: #1ce598;
  align-self: center;
`;

const ColorPicker = styled.input`
  margin: 10px;
  background-color: #1ce598;
  align-self: center;
`;

const RangePicker = styled.input`
  margin: 10px;
  background-color: #1ce598;
  align-self: center;
`;
