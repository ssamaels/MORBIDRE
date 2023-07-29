import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import {
  RiHomeLine,
  RiFolderLine,
  RiSmartphoneLine,
  RiStarLine,
} from "react-icons/ri";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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
      <Brand onClick={() => setShowMenu(!showMenu)}>
        <Image
          src="/images/TRUE-LOGO.png"
          alt="MorbiDre"
          width={150}
          height={60}
          priority
        />
        <ArrowButton>
          <MdOutlineKeyboardDoubleArrowDown />
        </ArrowButton>
      </Brand>
      <Nav showMenu={!showMenu}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button>
            <RiHomeLine style={{ width: "30", height: "30" }} />
            HOME
          </Button>
        </Link>
        <Link href="/portfolio" style={{ textDecoration: "none" }}>
          <Button>
            <RiFolderLine style={{ width: "30", height: "30" }} />
            PORTFOLIO
          </Button>
        </Link>
        <Link href="/contact" style={{ textDecoration: "none" }}>
          <Button>
            <RiSmartphoneLine style={{ width: "30", height: "30" }} />
            CONTACT
          </Button>
        </Link>
        <Link href="/reviews" style={{ textDecoration: "none" }}>
          <Button>
            <RiStarLine style={{ width: "30", height: "30" }} />
            REVIEWS
          </Button>
        </Link>
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
  display: ${(props) => (props.showMenu ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 70px;
  background: rgb(250, 250, 250, 0.8);
  padding: 10px;
  width: 100%;
  z-index: 2;
`;

const ArrowButton = styled.button`
  display: block;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
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
    background: #ccc;
    color: #ffffff;
  }
`;
