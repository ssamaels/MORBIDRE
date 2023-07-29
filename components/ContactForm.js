import styled from "styled-components";
import DrawingCanvas, { convertCanvasToImage } from "./DrawingCanvas";
import { useState } from "react";

export default function ContactForm({ onAddContact }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

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
    document.getElementById("contact-form").reset();
    document.getElementById("contact-name").focus();
  };

  return (
    <>
      <StyledForm id="contact-form" onSubmit={handleSubmit}>
        <StyledLabel htmlFor="contact-name">Name:</StyledLabel>
        <StyledInput
          type="text"
          className="contact-name"
          id="contact-name"
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
  background-color: rgb(0, 0, 0, 0.8);
  border-radius: 0.2rem;
  color: #fff;
`;

const StyledLabel = styled.label`
  margin: 0.03rem;
`;
