import { useState, useContext } from "react";
import styled from "styled-components";
import { ClientSideContext } from "@/pages/_app";

const ReviewForm = ({ onAddReview }) => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [date, setDate] = useState("");

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
    document.getElementById("review-form").reset();
    document.getElementById("review-name").focus();
  };

  const isClient = useContext(ClientSideContext);

  return (
    <>
      <StyledForm id="review-form" onSubmit={handleSubmit}>
        {isClient && (
          <>
            <label htmlFor="review-name" className="name_label">
              Name:
            </label>
            <StyledInput
              type="text"
              className="review-name"
              id="review-name"
              cols="30"
              rows="5"
              required
              onChange={(e) => setName(e.target.value)}
            ></StyledInput>
            <label htmlFor="review-message" className="review-message">
              Write a review:
            </label>
            <StyledTextArea
              type="text"
              className="review-message"
              id="review-message"
              cols="30"
              rows="5"
              required
              onChange={(e) => setReview(e.target.value)}
            ></StyledTextArea>
            <StyledButton className="submitButton" type="submit">
              SUBMIT
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
  border-radius: 0.2rem;
  padding-left: 0.05rem;
  padding-right: 0.05rem;
  background-color: rgb(250, 250, 250, 0.7);
`;

const StyledButton = styled.button`
  margin: 1rem;
  padding: 0.3rem;
  background: transparent;
  color: #000000;
  border-radius: 0.2rem;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
  }
`;
