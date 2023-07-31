import styled from "styled-components";
import DrawingCanvas, { convertCanvasToImage } from "./DrawingCanvas";
import React, { useState, useRef, useContext } from "react";
import emailjs from "@emailjs/browser";
import { ClientSideContext } from "@/pages/_app";

export default function ContactForm({ onAddContact }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const form = useRef();

  const isClient = useContext(ClientSideContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const canvasImage = convertCanvasToImage();
    setImage(canvasImage);

    console.log(name, email, message, image);
    const newContact = {
      name,
      email,
      message,
      image: canvasImage,
    };
    onAddContact(newContact);
    sendEmail();
    document.getElementById("contact-form").reset();
    document.getElementById("contact-name").focus();
  };

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_nmoz9jj",
        "template_9enahyl",
        form.current,
        "_hu0cXPGWXRr_CSBu"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <StyledForm ref={form} id="contact-form" onSubmit={handleSubmit}>
        {isClient && (
          <>
            <StyledLabel htmlFor="contact-name">Name:</StyledLabel>
            <StyledInput
              type="text"
              className="contact-name"
              id="contact-name"
              name="contact-name"
              cols="30"
              rows="5"
              required
              onChange={(e) => setName(e.target.value)}
            ></StyledInput>
            <StyledLabel htmlFor="contact-email">Email:</StyledLabel>
            <StyledInput
              type="text"
              className="contact-email"
              id="contact-email"
              name="contact-email"
              cols="30"
              rows="5"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></StyledInput>
            <StyledLabel htmlFor="contact-message">Message:</StyledLabel>
            <StyledTextArea
              type="text"
              className="contact-message"
              id="contact-message"
              name="contact-message"
              cols="30"
              rows="5"
              required
              onChange={(e) => setMessage(e.target.value)}
            ></StyledTextArea>
            <div className="field">
              <DrawingCanvas />
            </div>
            <StyledButton className="submit-button" type="submit">
              SUBMIT
            </StyledButton>
          </>
        )}
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 9rem;
`;

const StyledInput = styled.input`
  border: 0.01rem double #000000;
  border-radius: 0.2rem;
  padding-left: 0.05rem;
  padding-right: 0.05rem;
  background-color: rgb(250, 250, 250, 0.7);
`;

const StyledTextArea = styled.textarea`
  border: 0.01rem double #000000;
  border-radius: 0.5rem;
  padding-left: 0.05rem;
  padding-right: 0.05rem;
  background-color: rgb(250, 250, 250, 0.7);
`;

const StyledButton = styled.button`
  margin: 1rem;
  padding: 0.3rem;
  background: transparent;
  border-radius: 0.2rem;
  color: #000000;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
  }
`;

const StyledLabel = styled.label`
  margin: 0.03rem;
`;
