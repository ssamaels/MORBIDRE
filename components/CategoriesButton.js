import styled from "styled-components";
import { useState } from "react";
import { useDarkMode } from "./DarkModeContext";

export default function CategoriesButton() {
  const [showcategories, setShowCategories] = useState(true);
  const [showgraphic, setShowGraphic] = useState(true);
  const [showmorbi, setShowMorbi] = useState(true);
  const [showkidlit, setShowKidlit] = useState(true);

  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <>
      <StyledCategories>
        <StyledButton
          onClick={() => setShowCategories(!showcategories)}
          darkMode={darkMode}
        >
          CATEGORIES
        </StyledButton>
        <Categories showcategories={!showcategories}>
          <Category
            onClick={() => setShowGraphic(!showgraphic)}
            darkMode={darkMode}
          >
            GRAPHIC<br></br> DESIGN
          </Category>
          <Category
            onClick={() => setShowMorbi(!showmorbi)}
            darkMode={darkMode}
          >
            MORBIDRE<br></br> ILLUSTRATIONS
          </Category>
          <Category
            onClick={() => setShowKidlit(!showkidlit)}
            darkMode={darkMode}
          >
            KIDLIT AND<br></br> COVER ILLUSTRATIONS
          </Category>
        </Categories>
        <Subcategories>
          <SubcategoriesGraphic showgraphic={!showgraphic} darkMode={darkMode}>
            <div id="pg">
              <p>PACKAGING DESIGN</p>
              <p>LABEL DESIGN</p>
              <p>BRANDING AND REBRANDING SERVICES</p>
              <p>ADVERTISING DESIGN</p>
              <p>MARKETING DESIGN</p>
              <p>VISUAL COMMUNICATION</p>
            </div>
          </SubcategoriesGraphic>
          <SubcategoriesMorbi showmorbi={!showmorbi} darkMode={darkMode}>
            <div id="pm">
              <p>CUSTOM T-SHIRT PRINTS</p>
              <p>POSTER AND STICKER ILLUSTRATIONS</p>
              <p>DARK (MORBIDRE) ILLUSTRATIONS</p>
            </div>
          </SubcategoriesMorbi>
          <SubcategoriesKidlit showkidlit={!showkidlit} darkMode={darkMode}>
            <div id="pk">
              <p>CUSTOM KIDLIT ILLUSTRATIONS</p>
              <p>COVER AND POSTER ILLUSTRATIONS</p>
            </div>
          </SubcategoriesKidlit>
        </Subcategories>
      </StyledCategories>
    </>
  );
}

const StyledCategories = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledButton = styled.button`
  height: 4rem;
  width: 11rem;
  padding: 0.2rem;
  border: 0.01rem solid #000000;
  border-radius: 0.4rem;
  background: transparent;
  font-size: 1.5rem;
  font-weight: bolder;
  color: #000000;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
  }

  ${(props) =>
    props.darkMode &&
    `
    border: 0.01rem solid #ffffff;
      color: #ffffff;

      &:hover {
        background: rgba(255, 255, 255, 0.5);
        color: #000000;
      }
    `}

  @media (max-width: 768px) {
    margin-left: 20rem;
  }
`;

const Categories = styled.div`
  display: ${(props) => (props.showcategories ? "flex" : "none")};
  flex-direction: row;
  align-items: center;
  justify-items: space-between;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Category = styled.button`
  height: 7rem;
  width: 11rem;
  padding: 0.2rem;
  margin: 5rem;
  border: 0.01rem solid #000000;
  border-radius: 0.4rem;
  background: transparent;
  font-size: 1.3rem;
  font-weight: bold;
  color: #000000;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
  }

  ${(props) =>
    props.darkMode &&
    `
    border: 0.01rem solid #ffffff;
      color: #ffffff;

      &:hover {
        background: rgba(255, 255, 255, 0.5);
        color: #000000;
      }
    `}

  @media (max-width: 768px) {
    margin: 2rem;
  }
`;

const Subcategories = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  margin-bottom: 5rem;
  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SubcategoriesGraphic = styled.div`
  display: ${(props) => (props.showgraphic ? "flex" : "none")};
  position: ${(props) => (props.showgraphic ? "absolute" : "relative")};
  flex-direction: column;
  align-self: flex-start;
  align-self: center;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: bold;
  left: 0;
  margin-left: 7rem;
  margin-top: 6rem;

  @media (max-width: 768px) {
    margin-top: 8rem;
    margin-left: 1rem;
    font-size: 0.6rem;
    line-height: 2rem;
  }

  ${(props) =>
    props.darkMode &&
    `
      color: #ffffff;
    `}
`;

const SubcategoriesMorbi = styled.div`
  display: ${(props) => (props.showmorbi ? "flex" : "none")};
  position: ${(props) => (props.showmorbi ? "absolute" : "relative")};
  flex-direction: column;
  align-self: flex-start;
  align-self: center;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    margin-top: 2rem;
    margin-right: -23rem;
    font-size: 0.6rem;
    line-height: 2rem;
  }

  ${(props) =>
    props.darkMode &&
    `
      color: #ffffff;
    `}
`;

const SubcategoriesKidlit = styled.div`
  display: ${(props) => (props.showkidlit ? "flex" : "none")};
  position: ${(props) => (props.showkidlit ? "absolute" : "relative")};
  flex-direction: column;
  align-self: flex-start;
  align-self: center;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: bold;
  right: 0;
  margin-right: 7rem;
  margin-top: -2rem;

  @media (max-width: 768px) {
    margin-top: 0.1rem;
    margin-right: -17rem;
    font-size: 0.6rem;
    line-height: 2rem;
  }

  ${(props) =>
    props.darkMode &&
    `
      color: #ffffff;
    `}
`;
