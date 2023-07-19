import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import DrawingCanvas from "@/components/DrawingCanvas";

export default function Contact() {
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
        </div>
        <button type="submit">SUBMIT</button>
      </div>
    </>
  );
}
