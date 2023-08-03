import styled from "styled-components";
import { useDarkMode } from "@/components/DarkModeContext";
import { ClientSideContext } from "../_app";
import React, { useContext } from "react";

export default function FAQ() {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  const faqData = [
    {
      question: "What services does Morbidre-Design offer?",
      answer:
        "Morbidre-Design offers a wide range of graphic design services, including logo design, website design, branding, illustration, and more. Feel free to contact us for specific inquiries or to discuss your project.",
    },
    {
      question: "How can I request a quote for a design project?",
      answer:
        "To request a quote, please use the contact form on our website and provide us with details about your project. We will get back to you with a personalized quote and more information.",
    },
    {
      question: "What is the turnaround time for design projects?",
      answer:
        "The turnaround time for design projects depends on the complexity and scope of the project. Simple tasks may be completed within a few days, while larger projects may take several weeks. We strive to provide accurate time estimates during the quote process.",
    },
  ];

  return (
    <>
      {isClient && (
        <>
          <StyledFAQ $darkMode={darkMode}>
            <h1>Frequently Asked Questions</h1>
            <ul>
              {faqData.map((faqItem, index) => (
                <li key={index}>
                  <h3>{faqItem.question}</h3>
                  <p>{faqItem.answer}</p>
                </li>
              ))}
            </ul>
          </StyledFAQ>
        </>
      )}
    </>
  );
}

const StyledFAQ = styled.div`
  color: #000000;
  line-height: 3rem;
  margin: 2rem;

  ${(props) =>
    props.$darkMode &&
    `
      color: #ffffff;
    `}
`;
