const Reviews = ({ reviews }) => {
  return (
    <div className="reviews-container">
      <h3>Customer reviews</h3>
      <ul>
        {reviews &&
          reviews.map((review) => (
            <li key={review.id}>
              <div>Name: {review.name}</div>
              <div>Review: {review.review}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Reviews;
