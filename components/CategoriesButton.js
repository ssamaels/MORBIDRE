import styled from "styled-components";
import { useState, useContext } from "react";
import { useDarkMode } from "./DarkModeContext";
import { RxValue } from "react-icons/rx";
import { ClientSideContext } from "@/pages/_app";
import { useTranslation } from "next-i18next";

export default function CategoriesButton() {
  const [showcategories, setShowCategories] = useState(true);
  const [showgraphic, setShowGraphic] = useState(true);
  const [showmorbi, setShowMorbi] = useState(true);
  const [showkidlit, setShowKidlit] = useState(true);
  const { t } = useTranslation("common");

  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  return (
    <>
      <StyledCategories>
        {isClient && (
          <>
            <StyledButton
              onClick={() => setShowCategories(!showcategories)}
              $darkMode={darkMode}
            >
              {t("categories")}
            </StyledButton>
            <Categories $show={!showcategories}>
              <Category
                onClick={() => setShowGraphic(!showgraphic)}
                $darkMode={darkMode}
              >
                {t("graphic_design")}
              </Category>
              <Category
                onClick={() => setShowMorbi(!showmorbi)}
                $darkMode={darkMode}
              >
                {t("MORBIDRE_ILLUSTRATIONS")}
              </Category>
              <Category
                onClick={() => setShowKidlit(!showkidlit)}
                $darkMode={darkMode}
              >
                {t("kidlit_and_cover")}
              </Category>
            </Categories>
            {!showcategories && (
              <Subcategories>
                <SubcategoriesGraphic $show={!showgraphic} $darkMode={darkMode}>
                  <div id="pg">
                    <p>{t("packaging")}</p>
                    <p>{t("label")}</p>
                    <p>{t("branding")}</p>
                    <p>{t("advertising")}</p>
                    <p>{t("marketing")}</p>
                    <p>{t("visual")}</p>
                  </div>
                </SubcategoriesGraphic>
                <SubcategoriesMorbi $show={!showmorbi} $darkMode={darkMode}>
                  <div id="pm">
                    <p>{t("custom")}</p>
                    <p>{t("poster")}</p>
                    <p>{t("dark_morbi")}</p>
                  </div>
                </SubcategoriesMorbi>
                <SubcategoriesKidlit $show={!showkidlit} $darkMode={darkMode}>
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
    props.$darkMode &&
    `
    border: 0.01rem solid #ffffff;
      color: #ffffff;

      &:hover {
        background: rgba(255, 255, 255, 0.5);
        color: #000000;
      }
    `}

  @media (max-width: 768px) {
    margin-top: 5rem;
    margin-left: 5rem;
    font-size: 1.2rem;
  }
`;

const Categories = styled.div`
  display: ${(props) => (props.$show ? "flex" : "none")};
  flex-direction: row;
  align-items: center;
  justify-items: space-between;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
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
    props.$darkMode &&
    `
    border: 0.01rem solid #ffffff;
      color: #ffffff;

      &:hover {
        background: rgba(255, 255, 255, 0.5);
        color: #000000;
      }
    `}

  @media (max-width: 768px) {
    margin: 1rem;
    margin-top: 5rem;
    margin-left: 30%;
    height: fit-content;
    padding: 0.4rem;
    /* margin: 0; */
    /* margin-top: 1rem; */
    font-size: 0.7rem;
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
  display: ${(props) => (props.$show ? "flex" : "none")};
  position: ${(props) => (props.$show ? "absolute" : "relative")};
  flex-direction: column;
  /* justify-self: flex-start; */
  /* align-self: center; */
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: bold;
  text-align: center;
  left: 0;
  margin-left: 7rem;
  margin-top: -3rem;

  @media (max-width: 768px) {
    /* margin-top: 0.1rem;
    margin-left: 1rem;
    font-size: 0.6rem;
    line-height: 2rem;
    align-self: center; */
    display: none;
  }

  ${(props) =>
    props.$darkMode &&
    `
      color: #ffffff;
    `}
`;

const SubcategoriesMorbi = styled.div`
  display: ${(props) => (props.$show ? "flex" : "none")};
  position: ${(props) => (props.$show ? "absolute" : "relative")};
  flex-direction: column;
  align-self: flex-start;
  align-self: center;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: bold;
  text-align: center;

  @media (max-width: 768px) {
    /* margin-top: 30rem;
    margin-right: -23rem;
    font-size: 0.6rem;
    line-height: 2rem; */
    display: none;
  }

  ${(props) =>
    props.$darkMode &&
    `
      color: #ffffff;
    `}
`;

const SubcategoriesKidlit = styled.div`
  display: ${(props) => (props.$show ? "flex" : "none")};
  position: ${(props) => (props.$show ? "absolute" : "relative")};
  flex-direction: column;
  align-self: flex-start;
  align-self: center;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: bold;
  text-align: center;
  right: 0;
  margin-right: 7rem;
  margin-top: -2rem;

  @media (max-width: 768px) {
    /* margin-top: 45rem;
    margin-right: -17rem;
    font-size: 0.6rem;
    line-height: 2rem; */
    display: none;
  }

  ${(props) =>
    props.$darkMode &&
    `
      color: #ffffff;
    `}
`;
