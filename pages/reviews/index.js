import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ReviewForm from "@/components/ReviewForm";
import Reviews from "@/components/Reviews";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function handleGetReview(review) {
      const response = await fetch("/api/reviews");
      if (response.ok) {
        const responses = await response.json();
        setReviews(responses);
      } else {
        console.error(`Error: ${response.status}`);
      }
    }
    handleGetReview();
  }, []);
  async function handleAddReview(review) {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      const responses = await response.json();
      setReviews((prevReviews) => [review, ...prevReviews]);
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  const handleReviewDelete = async (reviewId) => {
    const isConfirmed = window.confirm("Are you sure?");

    if (isConfirmed) {
      try {
        await axios.delete(`/api/delete_image?model=review&id=${reviewId}`);
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <ReviewForm onAddReview={handleAddReview} />
      <StyledReviewsList>
        <Reviews reviews={reviews} onDelete={handleReviewDelete} />
      </StyledReviewsList>
    </>
  );
}

const StyledReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;
