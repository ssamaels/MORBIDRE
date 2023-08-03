import styled from "styled-components";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useDarkMode } from "@/components/DarkModeContext";
import { ClientSideContext } from "../_app";

export default function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  useEffect(() => {
    async function handleGetContact(contact) {
      const response = await fetch("/api/contact");
      if (response.ok) {
        const responses = await response.json();
        setContacts(responses);
      } else {
        console.error(`Error: ${response.status}`);
      }
    }
    handleGetContact();
  }, []);
  async function handleAddContact(contact) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (response.ok) {
      const responses = await response.json();
      console.log(responses);
      return responses;
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  return (
    <>
      <Header />
      {isClient && (
        <ElementsContainer>
          <Image
            className="left"
            src={darkMode ? "/images/left dark.png" : "/images/left light.png"}
            alt=""
            height={650}
            width={300}
          />
          <ContactForm onAddContact={handleAddContact} />
          <Image
            className="right"
            src={
              darkMode ? "/images/right dark.png" : "/images/right light.png"
            }
            alt=""
            height={750}
            width={250}
          />
        </ElementsContainer>
      )}
    </>
  );
}

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .right {
    margin-left: 3rem;
  }

  @media (max-width: 1425px) {
    .left {
      display: none;
    }

    .right {
      display: none;
    }
    justify-content: center;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;
