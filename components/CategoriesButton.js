import styled from "styled-components";
import { useState } from "react";

export default function CategoriesButton() {
  const [showCategories, setShowCategories] = useState(true);
  const [showGraphic, setShowGraphic] = useState(true);
  const [showMorbi, setShowMorbi] = useState(true);
  const [showKidlit, setShowKidlit] = useState(true);

  return (
    <>
      <StyledCategories>
        <StyledButton onClick={() => setShowCategories(!showCategories)}>
          CATEGORIES
        </StyledButton>
        {/* <CategoriesContainer> */}
        <Categories showCategories={!showCategories}>
          <Category onClick={() => setShowMorbi(!showMorbi)}>
            MORBIDRE ILLUSTRATIONS
          </Category>
          <Category onClick={() => setShowGraphic(!showGraphic)}>
            GRAPHIC DESIGN
          </Category>
          <Category onClick={() => setShowKidlit(!showKidlit)}>
            KIDLIT AND COVER ILLUSTRATIONS
          </Category>
        </Categories>
        <Subcategories>
          <SubcategoriesGraphic showGraphic={!showGraphic}>
            <div id="pg">
              <p>PACKAGING DESIGN</p>
              <p>LABEL DESIGN</p>
              <p>BRANDING AND REBRANDING SERVICES</p>
              <p>ADVERTISING DESIGN</p>
              <p>MARKETING DESIGN</p>
              <p>VISUAL COMMUNICATION</p>
            </div>
          </SubcategoriesGraphic>
          <SubcategoriesMorbi showMorbi={!showMorbi}>
            <div id="pm">
              <p>CUSTOM T-SHIRT PRINTS</p>
              <p>POSTER AND STICKER ILLUSTRATIONS</p>
              <p>DARK (MORBIDRE) ILLUSTRATIONS</p>
            </div>
          </SubcategoriesMorbi>
          <SubcategoriesKidlit showKidlit={!showKidlit}>
            <div id="pk">
              <p>CUSTOM KIDLIT ILLUSTRATIONS</p>
              <p>COVER AND POSTER ILLUSTRATIONS</p>
            </div>
          </SubcategoriesKidlit>
        </Subcategories>
        {/* </CategoriesContainer> */}
      </StyledCategories>
    </>
  );
}

const StyledCategories = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  margin-bottom: 10rem;
`;

const StyledButton = styled.button`
  padding: 0.2rem;
  border-radius: 0.4rem;
  background: transparent;
  color: #000000;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
  }
`;

const Categories = styled.nav`
  display: ${(props) => (props.showCategories ? "flex" : "none")};
  flex-direction: row;
  justify-content: space-evenly;
  position: absolute;
  bottom: -13rem;
  background: transparent;
  padding: 0.1rem;
  width: 90%;
  z-index: 2;
`;

const Category = styled.button`
  padding: 0.2rem;
  margin: 0.3rem;
  border-radius: 0.4rem;
  background: transparent;
  color: #000000;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
  }
`;

// const Subcategories = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-evenly;
//   bottom: -20rem;
// `;

// const SubcategoriesGraphic = styled.nav`
//   display: ${(props) => (props.showGraphic ? "flex" : "none")};
//   flex-direction: column;
//   justify-content: space-evenly;
//   position: absolute;
//   bottom: -13rem;
//   background: transparent;
//   padding: 0.1rem;
//   width: 90%;
//   z-index: 2;
// `;
// const SubcategoriesMorbi = styled.nav`
//   display: ${(props) => (props.showMorbi ? "flex" : "none")};
//   flex-direction: column;
//   justify-content: space-evenly;
//   position: absolute;
//   bottom: -13rem;
//   background: transparent;
//   padding: 0.1rem;
//   width: 90%;
//   z-index: 2;
// `;
// const SubcategoriesKidlit = styled.nav`
//   display: ${(props) => (props.showKidlit ? "flex" : "none")};
//   flex-direction: column;
//   justify-content: space-evenly;
//   position: absolute;
//   bottom: -13rem;
//   background: transparent;
//   padding: 0.1rem;
//   width: 90%;
//   z-index: 2;
// `;

// const CategoriesContainer = styled.div`
//   position: relative;
// `;

const Subcategories = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 1rem;
  /* position: absolute; */
`;

const SubcategoriesGraphic = styled.nav`
  display: ${(props) => (props.showGraphic ? "flex" : "none")};
  flex-direction: column;
  bottom: -30rem;
  justify-self: center;
  align-self: center;
  position: absolute;
`;

const SubcategoriesMorbi = styled.nav`
  display: ${(props) => (props.showMorbi ? "flex" : "none")};
  flex-direction: column;
  bottom: -30rem;
  justify-self: flex-start;
  align-self: flex-start;
  position: absolute;
`;

const SubcategoriesKidlit = styled.nav`
  display: ${(props) => (props.showKidlit ? "flex" : "none")};
  flex-direction: column;
  bottom: -30rem;
  justify-self: flex-end;
  align-self: flex-end;
  position: absolute;
`;
