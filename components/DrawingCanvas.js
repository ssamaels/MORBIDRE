// import React, { useRef, useEffect } from "react";

// export default function DrawingCanvas() {
//   const canvasRef = useRef(null);
//   let context;
//   let drawColor = "black";
//   let startBackgroundColor = "white";
//   let drawWidth = 2;
//   let isDrawing = false;
//   let restoreArray = [];
//   let index = -1;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     context.current = canvas.getContext("2d");
//     context.fillStyle = startBackgroundColor;
//     context.fillRect(0, 0, canvas.width, canvas.height);

//     canvas.addEventListener("touchstart", start, false);
//     canvas.addEventListener("touchmove", draw, false);
//     canvas.addEventListener("mousedown", start, false);
//     canvas.addEventListener("mousemove", draw, false);
//     canvas.addEventListener("touchend", stop, false);
//     canvas.addEventListener("mouseup", stop, false);
//     canvas.addEventListener("mouseout", stop, false);

//     return () => {
//       canvas.removeEventListener("touchstart", start);
//       canvas.removeEventListener("touchmove", draw);
//       canvas.removeEventListener("mousedown", start);
//       canvas.removeEventListener("mousemove", draw);
//       canvas.removeEventListener("touchend", stop);
//       canvas.removeEventListener("mouseup", stop);
//       canvas.removeEventListener("mouseout", stop);
//     };
//   }, []);

//   function start(event) {
//     isDrawing = true;
//     context.beginPath();
//     context.moveTo(
//       event.clientX - canvasRef.current.offsetLeft,
//       event.clientY - canvasRef.current.offsetTop
//     );
//     event.preventDefault();
//   }

//   function draw(event) {
//     if (isDrawing) {
//       context.lineTo(
//         event.clientX - canvasRef.current.offsetLeft,
//         event.clientY - canvasRef.current.offsetTop
//       );
//       context.strokeStyle = drawColor;
//       context.lineWidth = drawWidth;
//       context.lineCap = "round";
//       context.lineJoin = "round";
//       context.stroke();
//     }
//     event.preventDefault();
//   }

//   function stop(event) {
//     if (isDrawing) {
//       context.stroke();
//       context.closePath();
//       isDrawing = false;
//     }
//     event.preventDefault();

//     if (event.type !== "mouseout") {
//       restoreArray.push(
//         context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
//       );
//       index += 1;
//     }
//   }

//   function changeColor(element) {
//     drawColor = element.style.background;
//   }

//   function clearCanvas() {
//     context.fillStyle = startBackgroundColor;
//     context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//     restoreArray = [];
//     index = -1;
//   }

//   function undoLast() {
//     if (index <= 0) {
//       clearCanvas();
//     } else {
//       index -= 1;
//       restoreArray.pop();
//       context.putImageData(restoreArray[index], 0, 0);
//     }
//   }

//   return (
//     <div className="field">
//       <canvas ref={canvasRef} id="canvas"></canvas>
//       <div className="tools">
//         <button onClick={undoLast} type="button" className="button">
//           Undo
//         </button>
//         <button onClick={clearCanvas} type="button" className="button">
//           Clear
//         </button>

//         <input
//           onChange={(e) => (drawColor = e.target.value)}
//           type="color"
//           className="color-picker"
//           id="color-picker"
//         />
//         <input
//           onChange={(e) => (drawWidth = e.target.value)}
//           type="range"
//           className="range-picker"
//           id="range-picker"
//           min="1"
//           max="100"
//         />
//       </div>
//     </div>
//   );
// }

import React, { useRef, useEffect } from "react";

export default function DrawingCanvas() {
  const canvasRef = useRef(null);
  const context = useRef(null); // Using useRef here
  const drawColor = useRef("black");
  const startBackgroundColor = useRef("white");
  const drawWidth = useRef(2);
  const isDrawing = useRef(false);
  const restoreArray = useRef([]);
  const index = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    context.current = canvas.getContext("2d"); // Setting the mutable value
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
    <div className="field">
      <canvas ref={canvasRef} id="canvas"></canvas>
      <div className="tools">
        <button onClick={undoLast} type="button" className="button">
          Undo
        </button>
        <button onClick={clearCanvas} type="button" className="button">
          Clear
        </button>

        <input
          onChange={(e) => (drawColor.current = e.target.value)}
          type="color"
          className="color-picker"
          id="color-picker"
        />
        <input
          onChange={(e) => (drawWidth.current = e.target.value)}
          type="range"
          className="range-picker"
          id="range-picker"
          min="1"
          max="100"
        />
      </div>
    </div>
  );
}
