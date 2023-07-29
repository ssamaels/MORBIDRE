import styled from "styled-components";
import Image from "next/image";

const Reviews = ({ reviews }) => {
  function getTime(data) {
    const currentTime = new Date(data);
    const year = currentTime.getFullYear();
    const date = currentTime.getDate();
    const month = currentTime.getMonth() + 1;
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    return `${date}.${month}.${year} - ${hours}:${minutes}`;
  }

  return (
    <ReviewsContainer>
      <Image
        className="left"
        src="/images/left light.png"
        alt=""
        height={650}
        width={300}
      />
      <StyledContainder className="reviews-container">
        <h3>Customer reviews:</h3>
        <hr></hr>
        <ul>
          {reviews &&
            reviews.map((review) => (
              <StyledListItem key={review._id}>
                <ListInput>
                  <strong>Date:</strong> {getTime(review.date)}
                </ListInput>
                {<br></br>}
                <ListInput>
                  <strong>Name:</strong> {review.name}
                </ListInput>
                {<br></br>}
                <ListInput>
                  <strong>Review:</strong> {review.review}
                </ListInput>
                <hr></hr>
              </StyledListItem>
            ))}
        </ul>
      </StyledContainder>
    </ReviewsContainer>
  );
};

export default Reviews;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  .left {
    align-self: flex-start;
    position: fixed;
    top: 5rem;
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

  hr {
    margin-top: 0.2rem;
    border-top: 0.3rem double;
    border-bottom: none;
    margin-bottom: 1.5rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 90%;
  }
`;

const StyledListItem = styled.li`
  margin-top: 0.05rem;
  margin-bottom: 0.05rem;
  width: 100%;
  padding: 0.05rem;

  hr {
    border-top: 0.2rem double;
    border-bottom: none;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    width: 100%;
  }
`;

const ListInput = styled.div`
  margin: 0.3rem;
  display: inline-flex;
  padding: 0.2rem;
`;
