import styled from "styled-components";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function handleGetContact(contact) {
      const response = await fetch("/api/contacts");
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
    const response = await fetch("/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (response.ok) {
      const responses = await response.json();
      console.log(responses);
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  return (
    <>
      <Header />
      <ElementsContainer>
        <Image
          className="left"
          src="/images/Background-element-light-left.png"
          alt=""
          height={850}
          width={350}
        />
        <ContactForm onAddContact={handleAddContact} />
        <Image
          className="right"
          src="/images/Background element light right.png"
          alt=""
          height={850}
          width={300}
        />
      </ElementsContainer>
    </>
  );
}

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .left {
    align-self: flex-start;
  }

  .right {
    align-self: flex-end;
  }
`;
