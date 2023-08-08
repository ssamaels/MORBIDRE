import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { MdOutlineKeyboardDoubleArrowDown, MdLanguage } from "react-icons/md";
import {
  RiHomeLine,
  RiFolderLine,
  RiSmartphoneLine,
  RiStarLine,
} from "react-icons/ri";
import {
  LiaToggleOffSolid,
  LiaToggleOnSolid,
  LiaAddressCardSolid,
} from "react-icons/lia";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { i18n } from "next-i18next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function Header() {
  const [showmenu, setShowMenu] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const [language, setLanguage] = useState(i18n.language);
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation("common");

  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

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

  const handleLanguageChange = (newLanguage) => {
    setShowDropdown(false);
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    router.push(router.pathname, router.asPath, { locale: newLanguage });
  };

  const handleMouseLeave = () => {
    setShowMenu(true);
  };

  return (
    <StyledHeader style={{ top: visible ? "0" : "-1000px" }}>
      {isClient && (
        <>
          <Brand onClick={() => setShowMenu(!showmenu)}>
            <Image
              src={darkMode ? "/images/LOGO-DARK.png" : "/images/TRUE-LOGO.png"}
              alt="MorbiDre"
              width={150}
              height={60}
              priority
            />
            <ArrowButton $darkMode={darkMode}>
              <MdOutlineKeyboardDoubleArrowDown />
            </ArrowButton>
          </Brand>
          <Nav
            $show={!showmenu}
            $darkMode={darkMode}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button $darkMode={darkMode}>
                <RiHomeLine style={{ width: "30", height: "30" }} />
                {t("home")}
              </Button>
            </Link>
            <Link href="/about" style={{ textDecoration: "none" }}>
              <Button $darkMode={darkMode}>
                <LiaAddressCardSolid style={{ width: "30", height: "30" }} />
                {t("about")}
              </Button>
            </Link>
            <Link href="/portfolio" style={{ textDecoration: "none" }}>
              <Button $darkMode={darkMode}>
                <RiFolderLine style={{ width: "30", height: "30" }} />
                {t("portfolio")}
              </Button>
            </Link>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <Button $darkMode={darkMode}>
                <RiSmartphoneLine style={{ width: "30", height: "30" }} />
                {t("contact")}
              </Button>
            </Link>
            <Link href="/reviews" style={{ textDecoration: "none" }}>
              <Button $darkMode={darkMode}>
                <RiStarLine style={{ width: "30", height: "30" }} />
                {t("reviews")}
              </Button>
            </Link>
            <Button onClick={handleDarkModeToggle} $darkMode={darkMode}>
              {darkMode ? (
                <>
                  <LiaToggleOnSolid style={{ width: "30", height: "30" }} />
                  {t("L_mode")}
                </>
              ) : (
                <>
                  <LiaToggleOffSolid style={{ width: "30", height: "30" }} />
                  {t("D_mode")}
                </>
              )}
            </Button>
            <Button
              onClick={() => setShowDropdown(!showDropdown)}
              $darkMode={darkMode}
            >
              <MdLanguage style={{ width: "30", height: "30" }} />
              {t("language")}
              {showDropdown && (
                <DropdownContent $darkMode={darkMode}>
                  <DropdownItem
                    onClick={() => handleLanguageChange("en")}
                    $darkMode={darkMode}
                  >
                    {t("english")}
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleLanguageChange("sr")}
                    $darkMode={darkMode}
                  >
                    {t("serbian")}
                  </DropdownItem>
                </DropdownContent>
              )}
            </Button>
          </Nav>
        </>
      )}
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
  display: ${(props) => (props.$show ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 70px;
  background: rgb(250, 250, 250, 0.9);
  padding: 10px;
  width: 100%;
  z-index: 2;

  ${(props) =>
    props.$darkMode &&
    `
      background: rgb(0, 0, 0, 0.9);
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
    props.$darkMode &&
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
    props.$darkMode &&
    `
      color: white;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        color: #000000;
      }
    `}
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  ${(props) =>
    props.$darkMode &&
    `
      background: rgb(0, 0, 0, 0.9);
    `}
`;

const DropdownItem = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: rgb(0, 0, 0, 0.3);
    color: #ffffff;
  }

  ${(props) =>
    props.$darkMode &&
    `
      color: white;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        color: #000000;
      }
    `}
`;
