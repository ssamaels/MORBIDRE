import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <NavContainer>
        <Nav>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button>HOME</Button>
          </Link>
          <Link href="/portfolio" style={{ textDecoration: "none" }}>
            <Button>PORTFOLIO</Button>
          </Link>
          <Brand>
            <Image
              src="/images/TRUE-LOGO.png"
              alt=""
              width={150}
              height={60}
              priority
            />
          </Brand>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <Button>CONTACT</Button>
          </Link>
          <Link href="/reviews" style={{ textDecoration: "none" }}>
            <Button>REVIEWS</Button>
          </Link>
        </Nav>
      </NavContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flexbox;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  height: 70px;
  background: transparent;
  border-bottom: 6px solid #1ce598;
  margin: 0;
  margin-top: 10px;
`;

const Brand = styled.div`
  align-self: center;
`;

const NavContainer = styled.div`
  align-self: center;
`;

const Nav = styled.nav`
  justify-content: space-around;
  display: flex;
`;

const Button = styled.button`
  padding: 0;
  height: 80px;
  width: 130px;
  margin-top: -10px;
  background: transparent;
  border: none;
  color: black;
  /* text-decoration: none; */
  &:hover {
    background: #2581dc;
    color: #ffffff;
  }
`;
