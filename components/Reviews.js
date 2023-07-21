import styled from "styled-components";

const Reviews = ({ reviews }) => {
  return (
    <StyledContainder className="reviews-container">
      <h3>Customer reviews:</h3>
      <ul>
        {reviews &&
          reviews.map((review) => (
            <StyledListItem key={review._id}>
              <ListInput>
                <strong>Name:</strong> {review.name}
              </ListInput>
              {<br></br>}
              <ListInput>
                <strong>Review:</strong> {review.review}
              </ListInput>
            </StyledListItem>
          ))}
      </ul>
    </StyledContainder>
  );
};

export default Reviews;

const StyledContainder = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  max-width: 1200px;
  white-space: normal;
`;

const StyledListItem = styled.li`
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
  padding: 5px;
`;

const ListInput = styled.div`
  border: 1px solid #1ce598;
  margin: 3px;
  display: inline-flex;
  padding: 2px;
`;
