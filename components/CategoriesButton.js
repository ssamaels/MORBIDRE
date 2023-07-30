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
        <Categories showCategories={!showCategories}>
          <Category onClick={() => setShowGraphic(!showGraphic)}>
            GRAPHIC<br></br> DESIGN
          </Category>
          <Category onClick={() => setShowMorbi(!showMorbi)}>
            MORBIDRE<br></br> ILLUSTRATIONS
          </Category>
          <Category onClick={() => setShowKidlit(!showKidlit)}>
            KIDLIT AND<br></br> COVER ILLUSTRATIONS
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

  @media (max-width: 768px) {
    margin-left: 20rem;
  }
`;

const Categories = styled.div`
  display: ${(props) => (props.showCategories ? "flex" : "none")};
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
  display: ${(props) => (props.showGraphic ? "flex" : "none")};
  position: ${(props) => (props.showGraphic ? "absolute" : "relative")};
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
`;

const SubcategoriesMorbi = styled.div`
  display: ${(props) => (props.showMorbi ? "flex" : "none")};
  position: ${(props) => (props.showMorbi ? "absolute" : "relative")};
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
`;

const SubcategoriesKidlit = styled.div`
  display: ${(props) => (props.showKidlit ? "flex" : "none")};
  position: ${(props) => (props.showKidlit ? "absolute" : "relative")};
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
`;
