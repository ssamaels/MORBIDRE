import "@/styles/globals.css";
import { SWRConfig } from "swr";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

export default function App({ Component, pageProps }) {
  // const [reviews, setReviews] = useLocalStorage("Review: ", []);

  // const handleAddReview = (newReview) => {
  //   setReviews((prevResetReviews) => [...prevResetReviews, newReview]);
  // };

  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
