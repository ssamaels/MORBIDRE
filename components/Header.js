import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <Brand>
        <Image
          src="/images/LOGO MORBIDRE-01.png"
          alt=""
          width={150}
          height={150}
        />
      </Brand>
      <NavContainer>
        <Nav>
          <Link href="/">HOME</Link>
          <Link href="/portfolio">PORTFOLIO</Link>
          <Link href="/contact">CONTACT</Link>
          <Link href="/reviews">REVIEWS</Link>
        </Nav>
      </NavContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  width: 100vw;
  height: 70px;
  background: transparent;
  padding-bottom: 11px;
  border-bottom: 6px solid yellow;
`;

const Brand = styled.div`
  justify-content: flex-start;
  margin: -10px;
  margin-top: -30px;
`;

const NavContainer = styled.div`
  margin: 0;
  justify-content: flex-end;
`;

const Nav = styled.nav`
  justify-content: space-between;
  margin-top: 20px;
  display: flex;
  margin-right: 0;
`;
