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
        <StyledLabel htmlFor="contact-name">
          <strong>Name:</strong>
        </StyledLabel>
        <StyledInput
          type="text"
          className="contact-name"
          id="contact-name"
          cols="30"
          rows="5"
          required
          onChange={(e) => setName(e.target.value)}
        ></StyledInput>
        <StyledLabel htmlFor="contact-email">
          <strong>Email:</strong>
        </StyledLabel>
        <StyledInput
          type="text"
          className="contact-email"
          id="contact-email"
          cols="30"
          rows="5"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></StyledInput>
        <StyledLabel htmlFor="contact-message">
          <strong>Message:</strong>
        </StyledLabel>
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
  /* width: 100vw; */
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  border: 4px solid #1ce598;
  border-radius: 15px;
  padding-left: 5px;
  padding-right: 5px;
`;

const StyledTextArea = styled.textarea`
  border: 4px solid #1ce598;
  border-radius: 15px;
  padding-left: 5px;
  padding-right: 5px;
`;

const StyledButton = styled.button`
  margin: 10px;
  background-color: #1ce598;
  border-radius: 15px;
`;

const StyledLabel = styled.label`
  margin: 3px;
`;
