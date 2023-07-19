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
        <label htmlFor="email" className="name_label">
          <strong>Email:</strong>
        </label>
        <StyledInput
          type="text"
          name="email"
          id="email"
          cols="30"
          rows="5"
          required
        ></StyledInput>
        <label htmlFor="Message" className="Message_label">
          <strong>Message:</strong>
        </label>
        <StyledTextArea
          type="text"
          name="notes"
          id="notes"
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
`;

const StyledTextArea = styled.textarea`
  border: 4px solid #1ce598;
  border-radius: 15px;
`;

const StyledButton = styled.button`
  margin: 10px;
  background-color: #1ce598;
  border-radius: 15px;
`;
