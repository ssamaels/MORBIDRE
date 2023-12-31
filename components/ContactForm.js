import styled from "styled-components";
import DrawingCanvas, { convertCanvasToImage } from "./DrawingCanvas";
import React, { useState, useRef, useContext, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useTranslation } from "next-i18next";

const { HOST_ROOT } = process.env;

export default function ContactForm({ onAddContact }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [contactLink, setContactLink] = useState("");
  const canvasRef = useRef(null);
  const form = useRef();
  const { t } = useTranslation("common");

  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  const handleSubmit = async (e) => {
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
    const response = await onAddContact(newContact);
    console.log({ response });
    const canvas = document.getElementById("canvas");
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    setContactLink(`${HOST_ROOT}/contact/${response.savedContact._id}`);
    setTimeout(() => {
      sendEmail();
      form.current.reset();
      document.getElementById("contact-name").focus();
      window.alert("Contact form submitted successfully! Thank you!");
    }, 100);
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
            <StyledLabel htmlFor="contact-name" $darkMode={darkMode}>
              {t("name")}:
            </StyledLabel>
            <StyledInput
              type="text"
              className="contact-name"
              id="contact-name"
              name="contact-name"
              cols="30"
              rows="5"
              required
              onChange={(e) => setName(e.target.value)}
              $darkMode={darkMode}
            ></StyledInput>
            <StyledLabel htmlFor="contact-email" $darkMode={darkMode}>
              {t("email")}:
            </StyledLabel>
            <StyledInput
              type="text"
              className="contact-email"
              id="contact-email"
              name="contact-email"
              cols="30"
              rows="5"
              required
              onChange={(e) => setEmail(e.target.value)}
              $darkMode={darkMode}
            ></StyledInput>
            <StyledLabel htmlFor="contact-message" $darkMode={darkMode}>
              {t("message")}:
            </StyledLabel>
            <StyledTextArea
              type="text"
              className="contact-message"
              id="contact-message"
              name="contact-message"
              cols="30"
              rows="5"
              required
              onChange={(e) => setMessage(e.target.value)}
              $darkMode={darkMode}
            ></StyledTextArea>
            <div className="field">
              <DrawingCanvas ref={canvasRef} id="canvas" />
            </div>
            <StyledButton
              className="submit-button"
              type="submit"
              $darkMode={darkMode}
            >
              {t("submit")}
            </StyledButton>
            <input type="hidden" name="contact-link" value={contactLink} />
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
  border: 0.02rem double #000000;
  border-radius: 0.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  background-color: rgb(250, 250, 250, 0.7);
  width: 20rem;
  text-align: center;

  ${(props) =>
    props.$darkMode &&
    `
    border: 0.2rem double #ffffff;
    background-color: rgb(0,0,0,0.7);
    color: #ffffff;
    `}
`;

const StyledTextArea = styled.textarea`
  border: 0.02rem double #000000;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  background-color: rgb(250, 250, 250, 0.7);
  width: 20rem;

  ${(props) =>
    props.$darkMode &&
    `
    border: 0.2rem double #ffffff;
    background-color: rgb(0,0,0,0.7);
    color: #ffffff;
    `}
`;

const StyledButton = styled.button`
  margin: 1rem;
  padding: 0.5rem;
  background: transparent;
  border: 0.1rem solid #000000;
  border-radius: 0.2rem;
  color: #000000;
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
    `}
`;

const StyledLabel = styled.label`
  margin: 0.03rem;
  color: #000000;
  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    `}
`;
