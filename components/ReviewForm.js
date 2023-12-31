import { useState, useContext, useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useTranslation } from "next-i18next";

const ReviewForm = ({ onAddReview }) => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const form = useRef();
  const { t } = useTranslation("common");

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = Date.now();
    setDate(currentDate);
    console.log(date, name, review);
    const newReview = {
      date: currentDate,
      name,
      review,
    };
    onAddReview(newReview);
    sendEmail();
    form.current.reset();
    document.getElementById("review-name").focus();
    window.alert("Thank you for the review, Your opinion is very important!");
  };

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_nmoz9jj",
        "template_pwxndjj",
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

  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  return (
    <>
      <StyledForm ref={form} id="review-form" onSubmit={handleSubmit}>
        {isClient && (
          <>
            <StyledLabel
              htmlFor="review-name"
              className="name_label"
              $darkMode={darkMode}
            >
              {t("name")}:
            </StyledLabel>
            <StyledInput
              type="text"
              className="review-name"
              id="review-name"
              name="review-name"
              cols="30"
              rows="5"
              required
              onChange={(e) => setName(e.target.value)}
              $darkMode={darkMode}
            ></StyledInput>
            <StyledLabel
              htmlFor="review-message"
              className="review-message"
              $darkMode={darkMode}
            >
              {t("write_review")}:
            </StyledLabel>
            <StyledTextArea
              type="text"
              className="review-message"
              id="review-message"
              name="review-message"
              cols="30"
              rows="5"
              required
              onChange={(e) => setReview(e.target.value)}
              $darkMode={darkMode}
            ></StyledTextArea>
            <StyledButton
              className="submitButton"
              type="submit"
              $darkMode={darkMode}
            >
              {t("submit")}
            </StyledButton>
          </>
        )}
      </StyledForm>
    </>
  );
};

export default ReviewForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500;
  align-items: center;
  justify-content: space-around;
  margin-top: 9rem;

  @media (max-width: 768px) {
    /* margin-left: 75%; */
  }
`;

const StyledInput = styled.input`
  border: 0.01rem double #000000;
  border-radius: 0.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: #000000;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  background-color: rgb(250, 250, 250, 0.7);
  width: 20rem;
  text-align: center;

  ${(props) =>
    props.$darkMode &&
    `
    border: 0.01rem double #ffffff;
    color: #ffffff;
    background-color: rgb(0, 0, 0, 0.7);
    `}
`;

const StyledTextArea = styled.textarea`
  border: 0.01rem double #000000;
  border-radius: 0.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: #000000;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  background-color: rgb(250, 250, 250, 0.7);
  width: 20rem;

  ${(props) =>
    props.$darkMode &&
    `
    border: 0.01rem double #ffffff;
    color: #ffffff;
    background-color: rgb(0, 0, 0, 0.7);
    `}
`;

const StyledButton = styled.button`
  margin: 1rem;
  padding: 0.5rem;
  background: transparent;
  color: #000000;
  border: 0.1rem solid #000000;
  border-radius: 0.2rem;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
  }

  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    border: 0.1rem solid #ffffff;
    &:hover {
      background: rgb(250, 250, 250, 0.5);
      color: #000000;
    }

    `}
`;

const StyledLabel = styled.label`
  color: #000000;
  margin: 0.3rem;

  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    `}
`;
