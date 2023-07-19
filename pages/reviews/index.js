import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function Contact() {
  return (
    <>
      <Header />
      <StyledForm>
        <label htmlFor="name" className="name_label">
          <strong>Name:</strong>
        </label>
        <StyledInput
          type="text"
          name="name"
          id="name"
          cols="30"
          rows="5"
          required
        ></StyledInput>
        <label htmlFor="Message" className="Message_label">
          <strong>Write a review:</strong>
        </label>
        <StyledTextArea
          type="text"
          name="notes"
          id="notes"
          cols="30"
          rows="5"
          required
        ></StyledTextArea>
        <StyledButton type="submit">SUBMIT</StyledButton>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.div`
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
