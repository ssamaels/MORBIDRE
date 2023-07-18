import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

export default function Header() {
  //   const [showDropdown, setShowDropdown] = useState(false);

  //   useEffect(() => {
  //     function handleBodyClick() {
  //       setShowDropdown(false);
  //     }

  //     document.body.addEventListener("click", handleBodyClick);

  //     return () => {
  //       document.body.removeEventListener("click", handleBodyClick);
  //     };
  //   }, []);

  //   const toggleDropdown = (e) => {
  //     e.stopPropagation();
  //     setShowDropdown((prevState) => !prevState);
  //   };

  return (
    <>
      <StyledSection>
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
            <ul className="nav-list">
              <li>
                <Link href="/">HOME</Link>
              </li>
              <li>
                <Link href="/portfolio">PORTFOLIO</Link>
                {/* <NavDropdown className="nav-dropdown">
                  <li>
                    <Link href="/morbidre_illustrations">
                      MORBIDRE ILLUSTRATIONS
                    </Link>
                  </li>
                  <li>
                    <Link href="/morbidre_design">MORBIDRE DESIGN</Link>
                  </li>
                  <li>
                    <Link href="/kidlit_illustrations">
                      KIDLIT ILLUSTRATIONS
                    </Link>
                  </li>
                  <li>
                    <Link href="/collections">COLLECTIONS</Link>
                  </li>
                </NavDropdown> */}
              </li>
              <li>
                <Link href="/contact">CONTACT</Link>
              </li>
            </ul>
          </Nav>
        </NavContainer>
      </StyledSection>
    </>
  );
}

// const StyledSection = styled.div`
//   height: 100px;
//   background: none;
// `;

// const Brand = styled.div`
//   position: absolute;
//   padding-left: 20px;
//   float: left;
// `;

// const NavContainer = styled.div`
//   max-width: 100% vw;
//   margin: 0 auto;
// `;

// const Nav = styled.nav`
//   float: right;
//   ul {
//     list-style: none;
//     margin: 0;
//     padding: 0;
//     li {
//       float: left;
//       position: relative;
//       a,
//       a:visited {
//         display: block;
//         padding: 0 20px;
//         line-height: 70px;
//         background: #262626;
//         color: #ffffff;
//         text-decoration: none;
//         &:hover {
//           background: #2581dc;
//           color: #ffffff;
//         }
//       }
//     }
//   }
// `;

const StyledSection = styled.div`
  display: flex;
  height: 70px;
  background: transparent;
  padding-bottom: 10px;
  border-bottom: 3px solid yellow;
`;

const Brand = styled.div`
  position: relative;
  justify-content: start;
  margin: 0 auto;
`;

const NavContainer = styled.div`
  max-width: 100% vw;
  margin: 0 auto;
`;

const Nav = styled.nav`
  justify-content: end;
  Link,
  Link:visited {
    padding: 0 20px;
    line-height: 70px;
    background: transparent;
    color: #ffffff;
  }
  &:hover {
    background: #2581dc;
    color: #ffffff;
  }
`;
