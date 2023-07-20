import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import DrawingCanvas from "@/components/DrawingCanvas";

export default function Contact() {
  return (
    <>
      <Header />
      <StyledForm>
        <StyledLabel htmlFor="name">
          <strong>Name:</strong>
        </StyledLabel>
        <StyledInput
          type="text"
          className="name"
          id="name"
          cols="30"
          rows="5"
          required
        ></StyledInput>
        <StyledLabel htmlFor="email">
          <strong>Email:</strong>
        </StyledLabel>
        <StyledInput
          type="text"
          className="email"
          id="email"
          cols="30"
          rows="5"
          required
        ></StyledInput>
        <StyledLabel htmlFor="message">
          <strong>Message:</strong>
        </StyledLabel>
        <StyledTextArea
          type="text"
          className="message"
          id="message"
          cols="30"
          rows="5"
          required
        ></StyledTextArea>
        <div className="field">
          <DrawingCanvas />
        </div>
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

const StyledLabel = styled.label`
  margin: 3px;
`;
