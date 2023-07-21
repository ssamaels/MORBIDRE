import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import { useState, useEffect } from "react";

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
      <ContactForm onAddContact={handleAddContact} />
    </>
  );
}
