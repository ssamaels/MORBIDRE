import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useTranslation } from "next-i18next";

const DreLogin = () => {
  const { data: session } = useSession();
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);
  const { t } = useTranslation("common");

  if (session) {
    return (
      <LoginPage>
        {isClient && (
          <>
            <Image
              className="left"
              src={
                darkMode ? "/images/left dark.png" : "/images/left light.png"
              }
              alt=""
              height={650}
              width={300}
            />
            <Login $darkMode={darkMode}>
              <h1>
                {t("Welcome")} {session.user.name}
              </h1>
              <h3>Now do your thing...</h3>
              <button onClick={() => signOut()}>{t("log_out")}</button>
            </Login>
            <Image
              className="right"
              src={
                darkMode ? "/images/right dark.png" : "/images/right light.png"
              }
              alt=""
              height={750}
              width={250}
            />
          </>
        )}
      </LoginPage>
    );
  } else {
    return (
      <LoginPage>
        {isClient && (
          <>
            <Image
              className="left"
              src={
                darkMode ? "/images/left dark.png" : "/images/left light.png"
              }
              alt=""
              height={650}
              width={300}
            />
            <Login $darkMode={darkMode}>
              <h1>{t("Welcome")} Dre!</h1>
              <button onClick={() => signIn()}>{t("log_in")}</button>
            </Login>
            <Image
              className="right"
              src={
                darkMode ? "/images/right dark.png" : "/images/right light.png"
              }
              alt=""
              height={750}
              width={250}
            />
          </>
        )}
      </LoginPage>
    );
  }
};

export default DreLogin;

const LoginPage = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 5rem;

  @media (max-width: 768px) {
    .left {
      opacity: 20%;
    }

    .right {
      display: none;
    }
  }
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  width: 100%;

  h1,
  h3 {
    color: #000000;
  }

  button {
    padding: 0.3rem;
    border: 0.1rem solid #000000;
    border-radius: 0.2rem;
    background: transparent;
    color: #000000;
    align-self: center;
    cursor: pointer;
    &:hover {
      background: rgb(0, 0, 0, 0.5);
      color: #ffffff;
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 5%;
    z-index: 3;
    padding: 20px;
  }

  ${(props) =>
    props.$darkMode &&
    `
    h1, h3 {
        color: #ffffff;
    }
    
    button {
        border: 0.1rem solid #ffffff;
        color: #ffffff;
        &:hover {
          background: rgb(250, 250, 250, 0.5);
          color: #000000;
        }
    }
    `}
`;
