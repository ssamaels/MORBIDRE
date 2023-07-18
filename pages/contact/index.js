import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import DrawingCanvas from "@/components/DrawingCanvas";

export default function Contact() {
  //     const canvas = document.getElementById("canvas");
  //     let context = canvas.getContext("2d");
  //     let draw_color = "black";
  //     let start_background_color = "white";
  //     context.fillStyle = start_background_color;
  //     context.fillRect(0, 0, canvas.width, canvas.heigth)
  //     let draw_width = "2";
  //     let is_drawing = false;

  // let restore_array = [];
  // let index = -1;

  //     canvas.addEventListener("touchstart", start, false)
  //     canvas.addEventListener("touchmove", draw, false)
  //     canvas.addEventListener("mousedown", start, false)
  //     canvas.addEventListener("mousemove", draw, false)

  //     canvas.addEventListener("touchend", stop, false)
  //     canvas.addEventListener("mouseup", stop, false)
  //     canvas.addEventListener("mouseout", stop, false)

  //     function start(event){
  //      is_drawing = true;
  //      context.beginPath();
  //      context.moveTo(event.clientX - canvas.offsetLeft,
  //                     event.clientY - canvas.offsetTop);
  //                     event.preventDefault();
  //     }

  // function draw(event) {
  //     if(is_drawing){
  //         context.lineTo(event.clientX - canvas.offsetLeft,
  //             event.clientY - canvas.offsetTop);
  //             context.strokeStyle = draw_color;
  //             context.lineWidth = draw_width;
  //             context.lineCap = "round";
  //             context.lineJoin - "round";
  //             context.stroke();
  //     }
  //     event.preventDefault();
  // }

  // function stop(event){
  //     if(is_drawing){
  //         context.stroke();
  //         context.closePath();
  //         is_drawing = false;
  //     }
  //     event.preventDefault();

  //     if(event.type !='mouseout'){restore_array.push(context.getImageData(0, 0, canvas.width, canvas.heigth));
  //     index += 1;}
  // }

  // function changeColor(element){
  //     draw_color = element.style.background;
  // }

  // function clearCanvas(){
  //     context.fillStyle = start_background_color;
  //     context.clearRect(0, 0, canvas.width, canvas.heigth)
  //     context.fillRect(0, 0, canvas.width, canvas.heigth)

  //     restore_array = [];
  //     index = -1;
  // }

  // function undoLast(){
  //     if(index <= 0){
  //         clearCanvas();
  //     } else {
  //         index -= 1;
  //         restore_array.pop();
  //         context.putImageData(restore_array[index], 0, 0);
  //     }
  // }

  return (
    <>
      <Header />
      <div>
        <label htmlFor="name" className="name_label">
          {" "}
          <strong>Name:</strong>
        </label>
        <input type="text" name="name" id="name" cols="30" rows="5"></input>
        <label htmlFor="email" className="name_label">
          {" "}
          <strong>Email:</strong>
        </label>
        <input type="text" name="email" id="email" cols="30" rows="5"></input>
        <label htmlFor="Message" className="Message_label">
          {" "}
          <strong>Message:</strong>
        </label>
        <textarea
          type="text"
          name="notes"
          id="notes"
          cols="30"
          rows="20"
        ></textarea>
        <div className="field">
          <DrawingCanvas />
          {/* <canvas id="canvas"></canvas>
          <div className="tools">
            <button onClick="undoLast()" type="button" className="button">
              Undo
            </button>
            <button onClick="clearCanvas()" type="button" className="button">
              Clear
            </button>

            <input onInput="draw_color = this.value" type="color" className="color-picker" id="color-picker" />
            <input
            onInput="draw_width = this.value"
              type="range"
              className="range-picker"
              id="range-picker"
              min="1"
              max="100"
            />
          </div> */}
        </div>
        <button type="submit">SUBMIT</button>
      </div>
    </>
  );
}
