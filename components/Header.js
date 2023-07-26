import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { GiFullFolder } from "react-icons/gi";
import { TbStars } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <StyledHeader>
      <Brand>
        <Image
          src="/images/TRUE-LOGO.png"
          alt="MorbiDre"
          width={150}
          height={60}
          priority
        />
      </Brand>
      <BurgerButton onClick={() => setShowMenu(!showMenu)}>
        <AiOutlineMenu />
      </BurgerButton>
      <Nav showMenu={showMenu}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button>
            <HiOutlineHome
              style={{ color: "#1ce598", width: "40", height: "40" }}
            />
            HOME
          </Button>
        </Link>
        <Link href="/portfolio" style={{ textDecoration: "none" }}>
          <Button>
            <GiFullFolder
              style={{ color: "#1ce598", width: "40", height: "40" }}
            />
            PORTFOLIO
          </Button>
        </Link>
        <Link href="/contact" style={{ textDecoration: "none" }}>
          <Button>
            <BsPhone style={{ color: "#1ce598", width: "40", height: "40" }} />
            CONTACT
          </Button>
        </Link>
        <Link href="/reviews" style={{ textDecoration: "none" }}>
          <Button>
            <TbStars style={{ color: "#1ce598", width: "40", height: "40" }} />
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
  border-bottom: 6px solid #1ce598;
  margin: 0;
  margin-top: 10px;
  position: relative;
  z-index: 1;
`;

const Brand = styled.div`
  align-self: center;
  margin-left: 10px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  margin-right: 10px;
  @media (max-width: 690px) {
    display: ${(props) => (props.showMenu ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 70px;
    background: #ffffff;
    padding: 10px;
    width: 100%;
    z-index: 2;
  }
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 80px;
  width: 130px;
  margin-top: -10px;
  background: transparent;
  border: none;
  color: black;
  cursor: pointer;
  &:hover {
    background: #ccc;
    color: #ffffff;
  }
  @media (max-width: 690px) {
    width: 100%;
  }
`;

const BurgerButton = styled.button`
  display: none;
  @media (max-width: 690px) {
    display: block;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;
