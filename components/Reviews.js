import styled from "styled-components";
import Image from "next/image";
import { useContext } from "react";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useSession } from "next-auth/react";
import DeleteButton from "@/components/DeleteButton";
import { useTranslation } from "next-i18next";

const Reviews = ({ reviews, onDelete }) => {
  const { data: session } = useSession();
  const { t } = useTranslation("common");

  function getTime(data) {
    const currentTime = new Date(data);
    const year = currentTime.getFullYear();
    const date = currentTime.getDate();
    const month = currentTime.getMonth() + 1;
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    return `${date}.${month}.${year} - ${hours}:${minutes}`;
  }

  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  if (session) {
    return (
      <ReviewsContainer>
        {isClient && (
          <>
            <Image
              className="left"
              src={
                darkMode ? "/images/left dark.png" : "/images/left light.png"
              }
              alt=""
              height={650}
              width={300}
            />
            <StyledContainder
              className="reviews-container"
              $darkMode={darkMode}
            >
              <div className="CR">
                <strong>{t("customer_reviews")}:</strong>
              </div>
              <hr></hr>
              <ul>
                {reviews &&
                  reviews.map((review) => (
                    <StyledListItem key={review._id} $darkMode={darkMode}>
                      <Container>
                        <ListInput>
                          <strong>{t("DATE")}:</strong> {getTime(review.date)}
                        </ListInput>
                        <DeleteButton onDelete={() => onDelete(review._id)} />
                      </Container>
                      {<br></br>}
                      <ListInput>
                        <strong>{t("NAME")}:</strong> {review.name}
                      </ListInput>
                      {<br></br>}
                      <ListInput>
                        <strong>{t("REVIEW")}:</strong> {review.review}
                      </ListInput>
                      <hr></hr>
                    </StyledListItem>
                  ))}
              </ul>
            </StyledContainder>
          </>
        )}
      </ReviewsContainer>
    );
  } else {
    return (
      <ReviewsContainer>
        {isClient && (
          <>
            <Image
              className="left"
              src={
                darkMode ? "/images/left dark.png" : "/images/left light.png"
              }
              alt=""
              height={650}
              width={300}
            />
            <StyledContainder
              className="reviews-container"
              $darkMode={darkMode}
            >
              <div className="CR">
                <strong>{t("customer_reviews")}:</strong>
              </div>
              <hr></hr>
              <ul>
                {reviews &&
                  reviews.map((review) => (
                    <StyledListItem key={review._id} $darkMode={darkMode}>
                      <ListInput>
                        <div className="label">{t("DATE")}:</div>{" "}
                        {getTime(review.date)}
                      </ListInput>
                      {<br></br>}
                      <ListInput>
                        <div className="label">{t("NAME")}:</div> {review.name}
                      </ListInput>
                      {<br></br>}
                      <ListInput>
                        <div className="label">{t("REVIEW")}:</div>{" "}
                        {review.review}
                      </ListInput>
                      <hr></hr>
                    </StyledListItem>
                  ))}
              </ul>
            </StyledContainder>
          </>
        )}
      </ReviewsContainer>
    );
  }
};

export default Reviews;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 5rem;

  .left {
    align-self: flex-start;
    position: fixed;
    top: 3.5rem;
  }

  @media (max-width: 768px) {
    .left {
      display: none;
    }
  }
`;

const StyledContainder = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  max-width: 70%;
  white-space: normal;
  margin-left: 20rem;
  color: #000000;

  .CR {
    font-family: "Roboto-bold", sans-serif;
    font-size: 1.3rem;
  }

  hr {
    margin-top: 0.2rem;
    border-top: 0.3rem double;
    border-bottom: none;
    margin-bottom: 1.5rem;
    width: 100%;
    color: #000000;
  }

  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    hr {
      color: #ffffff;
    }
    `}

  @media (max-width: 768px) {
    margin-left: 3rem;
  }
`;

const StyledListItem = styled.li`
  margin-top: 0.05rem;
  margin-bottom: 0.05rem;
  width: 100%;
  padding: 0.05rem;
  color: #000000;

  hr {
    border-top: 0.2rem double;
    border-bottom: none;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    width: 100%;
    color: #000000;
  }

  ${(props) =>
    props.$darkMode &&
    `
    color: #ffffff;
    hr {
      color: #ffffff;
    }
    `}
`;

const ListInput = styled.div`
  margin: 0.3rem;
  display: inline-flex;
  padding: 0.2rem;

  .label {
    font-family: "Roboto-bold", sans-serif;
    margin-right: 1rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
