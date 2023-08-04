import styled from "styled-components";
import Image from "next/image";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useDarkMode } from "@/components/DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const { HOST_ROOT } = process.env;

async function getStaticPaths() {
  const res = await axios.get(`${HOST_ROOT}/api/contact/`);
  const contacts = res.data;

  const paths = contacts.map((contact) => ({
    params: { id: contact._id.toString() },
  }));

  return { paths, fallback: true };
}

async function getStaticProps({ params }) {
  const url = `${HOST_ROOT}/api/contact/${params.id}`;
  console.log("url:", url);
  const res = await axios.get(url);
  const contact = res.data;

  return { props: { contact } };
}

const ContactDetail = ({ contact }) => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [isLoading, setIsLoading] = useState(true);
  const isClient = useContext(ClientSideContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (router.isFallback || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      {isClient && (
        <>
          <StyledContact>
            <StyledH1 $darkMode={darkMode}>{contact.name}</StyledH1>
            <StyledP $darkMode={darkMode}>
              <strong>Email:</strong> {contact.email}
            </StyledP>
            <StyledP $darkMode={darkMode}>
              <strong>Message:</strong> {contact.message}
            </StyledP>
            <StyledP $darkMode={darkMode}>
              <strong>Drawing:</strong>
            </StyledP>
            <Image src={contact.image} alt="Contact" width={500} height={400} />
          </StyledContact>
        </>
      )}
    </>
  );
};

const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  font-size: 1.5rem;
  line-height: 3rem;
  padding: 10rem;
`;

const StyledH1 = styled.h1`
  color: #000000;

  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    `}
`;

const StyledP = styled.p`
  color: #000000;

  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    `}
`;

export default ContactDetail;
