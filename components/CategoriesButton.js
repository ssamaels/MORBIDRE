import styled from "styled-components";
import { useState, useContext } from "react";
import { useDarkMode } from "./DarkModeContext";
import { RxValue } from "react-icons/rx";
import { ClientSideContext } from "@/pages/_app";
import { useTranslation } from "next-i18next";

export default function CategoriesButton() {
  const [showcategories, setShowCategories] = useState(true);
  // const [showgraphic, setShowGraphic] = useState(true);
  // const [showmorbi, setShowMorbi] = useState(true);
  // const [showkidlit, setShowKidlit] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t } = useTranslation("common");

  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  return (
    <StyledCategories>
      {isClient && (
        <>
          <StyledButton
            onClick={() => {
              setShowCategories(!showcategories);
              setSelectedCategory(null);
            }}
            $darkMode={darkMode}
          >
            {t("categories")}
          </StyledButton>
          <Categories $show={!showcategories}>
            <Category
              onClick={() =>
                setSelectedCategory(
                  selectedCategory !== "graphic" ? "graphic" : null
                )
              }
              $darkMode={darkMode}
              $expanded={selectedCategory === "graphic"}
            >
              {t("graphic_design")}
            </Category>
            <Category
              onClick={() =>
                setSelectedCategory(
                  selectedCategory !== "morbi" ? "morbi" : null
                )
              }
              $darkMode={darkMode}
              $expanded={selectedCategory === "morbi"}
            >
              {t("MORBIDRE_ILLUSTRATIONS")}
            </Category>
            <Category
              onClick={() =>
                setSelectedCategory(
                  selectedCategory !== "kidlit" ? "kidlit" : null
                )
              }
              $darkMode={darkMode}
              $expanded={selectedCategory === "kidlit"}
            >
              {t("kidlit_and_cover")}
            </Category>
          </Categories>
          {!showcategories && (
            <Subcategories>
              <SubcategoriesGraphic
                $show={selectedCategory === "graphic"}
                $darkMode={darkMode}
              >
                <div id="pg">
                  <p>{t("packaging")}</p>
                  <p>{t("label")}</p>
                  <p>{t("branding")}</p>
                  <p>{t("advertising")}</p>
                  <p>{t("marketing")}</p>
                  <p>{t("visual")}</p>
                </div>
              </SubcategoriesGraphic>
              <SubcategoriesMorbi
                $show={selectedCategory === "morbi"}
                $darkMode={darkMode}
              >
                <div id="pm">
                  <p>{t("custom")}</p>
                  <p>{t("poster")}</p>
                  <p>{t("dark_morbi")}</p>
                </div>
              </SubcategoriesMorbi>
              <SubcategoriesKidlit
                $show={selectedCategory === "kidlit"}
                $darkMode={darkMode}
              >
                <div id="pk">
                  <p>{t("custom_kidlit")}</p>
                  <p>{t("cover")}</p>
                </div>
              </SubcategoriesKidlit>
            </Subcategories>
          )}
        </>
      )}
    </StyledCategories>
  );
}

const StyledCategories = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  align-self: center;
  justify-self: center;

  @media (max-width: 990px) {
    width: 80%;
  }
`;

const StyledButton = styled.button`
  height: 4rem;
  width: 11rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
  padding: 0.2rem;
  border: 0.4rem double #000000;
  border-radius: 0.4rem;
  background: transparent;
  color: #000000;
  font-size: 1.5rem;
  font-weight: bolder;
  z-index: 3;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
    border: 0.4rem double #ffffff;
  }

  ${(props) =>
    props.$darkMode &&
    `
    border: 0.4rem double #ffffff;
      color: #ffffff;

      &:hover {
        background: rgba(255, 255, 255, 0.5);
        color: #000000;
      }
    `}

  @media (max-width: 990px) {
    margin-top: 5rem;
    font-size: 1.2rem;
    margin-bottom: 0;
  }
`;

const Categories = styled.div`
  display: ${(props) => (props.$show ? "flex" : "none")};
  position: relative;
  flex-direction: row;
  align-items: center;
  width: 150%;
  justify-content: space-between;
  padding: 0.3rem;

  @media (max-width: 990px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Category = styled.button`
  margin-bottom: ${(props) => (props.$expanded ? "5rem" : "0.5rem")};
  position: relative;
  height: 7rem;
  width: 11rem;
  padding: 0.2rem;
  border: 0.4rem double #000000;
  border-radius: 0.4rem;
  background: transparent;
  color: #000000;
  font-size: 1.3rem;
  font-weight: bold;
  z-index: 2;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
    border: 0.4rem double #ffffff;
  }

  ${(props) =>
    props.$darkMode &&
    `
    border: 0.4rem double #ffffff;
      color: #ffffff;

      &:hover {
        background: rgba(255, 255, 255, 0.5);
        color: #000000;
      }
    `}

  @media (max-width: 990px) {
    margin: 1rem;
    margin-top: 5rem;
    display: ${(props) => (props.$show ? "flex" : "block")};
    margin-bottom: ${(props) => (props.$expanded ? "10rem" : "0.5rem")};
    height: fit-content;
    padding: 0.4rem;
    font-size: 0.7rem;
  }
`;

const Subcategories = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 120%;
  justify-content: space-between;
  margin-bottom: 5rem;

  @media (max-width: 990px) {
    flex-direction: column;
    justify-content: center;
    align-self: center;
  }
`;

const SubcategoriesGraphic = styled.div`
  display: ${(props) => (props.$show ? "flex" : "none")};
  color: ${(props) => (props.$darkMode ? "#ffffff" : "#000000")};
  position: absolute;
  left: -8rem;
  flex-direction: column;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 0.3rem;

  @media (max-width: 990px) {
    position: ${(props) => (props.$show ? "absolute" : "relative")};
    margin-top: ${(props) => (props.$show ? "1rem" : "0")};
    width: 100%;
    top: -27rem;
    left: 50%;
    translate: -50%;
    font-size: 0.6rem;
    align-self: center;
  }

  ${(props) =>
    props.$darkMode &&
    `
      color: #ffffff;
    `}
`;

const SubcategoriesMorbi = styled.div`
  display: ${(props) => (props.$show ? "flex" : "none")};
  color: ${(props) => (props.$darkMode ? "#ffffff" : "#000000")};
  position: absolute;
  left: 50%;
  translate: -50%;
  flex-direction: column;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 0.3rem;

  @media (max-width: 990px) {
    position: ${(props) => (props.$show ? "absolute" : "relative")};
    margin-top: ${(props) => (props.$show ? "1rem" : "0")};
    width: 100%;
    top: -16rem;
    left: 50%;
    translate: -50%;
    font-size: 0.6rem;
    align-self: center;
  }
`;

const SubcategoriesKidlit = styled.div`
  display: ${(props) => (props.$show ? "flex" : "none")};
  color: ${(props) => (props.$darkMode ? "#ffffff" : "#000000")};
  position: absolute;
  right: -7.5rem;
  flex-direction: column;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 0.3rem;

  @media (max-width: 990px) {
    position: ${(props) => (props.$show ? "absolute" : "relative")};
    margin-top: ${(props) => (props.$show ? "1rem" : "0")};
    width: 100%;
    left: 50%;
    translate: -50%;
    top: -8rem;
    font-size: 0.6rem;
    align-self: center;
  }
`;
