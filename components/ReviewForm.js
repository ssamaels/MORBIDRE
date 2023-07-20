import { useState } from "react";
import styled from "styled-components";

const ReviewForm = ({ onAddReview }) => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, review);
    const newReview = {
      name,
      review,
    };
    onAddReview(newReview);
    document.getElementById("review-form").reset();
    document.getElementById("review-name").focus();
  };

  return (
    <>
      <StyledForm id="review-form" onSubmit={handleSubmit}>
        <label htmlFor="review-name" className="name_label">
          <strong>Name:</strong>
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
          <strong>Write a review:</strong>
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
      </StyledForm>
    </>
  );
};

export default ReviewForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100vw;
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
