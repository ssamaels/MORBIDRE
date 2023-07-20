import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ReviewForm from "@/components/ReviewForm";
import Reviews from "@/components/Reviews";

export default function ReviewsPage({ reviews }) {
  async function handleAddReview(review) {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <>
      <Header />
      <ReviewForm onAddReview={handleAddReview} />
      <Reviews reviews={reviews} />
    </>
  );
}
