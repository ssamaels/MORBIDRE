import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import {
  RiHomeLine,
  RiFolderLine,
  RiSmartphoneLine,
  RiStarLine,
} from "react-icons/ri";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";
import { useDarkMode } from "./DarkModeContext";

export default function Header() {
  const [showmenu, setShowMenu] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const { darkMode, setDarkMode } = useDarkMode();

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos < prevScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <StyledHeader style={{ top: visible ? "0" : "-500px" }}>
      <Brand onClick={() => setShowMenu(!showmenu)}>
        <Image
          src={darkMode ? "/images/LOGO-DARK.png" : "/images/TRUE-LOGO.png"}
          // src="/images/LOGO-DARK.png"
          alt="MorbiDre"
          width={150}
          height={60}
          priority
        />
        <ArrowButton darkMode={darkMode}>
          <MdOutlineKeyboardDoubleArrowDown />
        </ArrowButton>
      </Brand>
      <Nav showmenu={!showmenu} darkMode={darkMode}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button darkMode={darkMode}>
            <RiHomeLine style={{ width: "30", height: "30" }} />
            HOME
          </Button>
        </Link>
        <Link href="/portfolio" style={{ textDecoration: "none" }}>
          <Button darkMode={darkMode}>
            <RiFolderLine style={{ width: "30", height: "30" }} />
            PORTFOLIO
          </Button>
        </Link>
        <Link href="/contact" style={{ textDecoration: "none" }}>
          <Button darkMode={darkMode}>
            <RiSmartphoneLine style={{ width: "30", height: "30" }} />
            CONTACT
          </Button>
        </Link>
        <Link href="/reviews" style={{ textDecoration: "none" }}>
          <Button darkMode={darkMode}>
            <RiStarLine style={{ width: "30", height: "30" }} />
            REVIEWS
          </Button>
        </Link>
        <Button onClick={handleDarkModeToggle} darkMode={darkMode}>
          {darkMode ? (
            <>
              <LiaToggleOnSolid style={{ width: "30", height: "30" }} />
              {" LIGHT MODE"}
            </>
          ) : (
            <>
              <LiaToggleOffSolid style={{ width: "30", height: "30" }} />
              {" DARK MODE"}
            </>
          )}
        </Button>
      </Nav>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 70px;
  background: transparent;
  margin: 0;
  margin-top: 2rem;
  position: relative;
  z-index: 5;
  position: fixed;
  transition: top 0.6s;
  width: 100%;
  top: 0;
  z-index: 5;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: ${(props) => (props.showmenu ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 70px;
  background: rgb(250, 250, 250, 0.7);
  padding: 10px;
  width: 100%;
  z-index: 2;

  ${(props) =>
    props.darkMode &&
    `
      background: rgb(0, 0, 0, 0.7);
    `}
`;

const ArrowButton = styled.button`
  display: block;
  background: transparent;
  color: #000000;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  ${(props) =>
    props.darkMode &&
    `
color: #ffffff;
`}
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 80px;
  width: 100%;
  margin-top: -10px;
  background: transparent;
  border: none;
  color: black;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.3);
    color: #ffffff;
  }

  ${(props) =>
    props.darkMode &&
    `
      background: transparent;
      color: white;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        color: #000000;
      }
    `}
`;
