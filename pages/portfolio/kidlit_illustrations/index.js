import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import connectDB from "@/db/connect";
import KidlitIllustrations from "@/db/models/kidlit_illustrations";

const KidlitIllustrationsPage = ({ illustrations }) => {
  return (
    <>
      <Header />
      <div>
        <h1>Kidlit Illustrations</h1>
        {illustrations.length > 0 ? (
          illustrations.map((illustration) => (
            <Image
              key={illustration._id}
              src={illustration.image}
              alt="Illustration"
              width={50}
              height={50}
            />
          ))
        ) : (
          <p>No illustrations found.</p>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    await connectDB();

    const illustrations = await KidlitIllustrations.find({}, "image");

    return {
      props: {
        illustrations: JSON.parse(JSON.stringify(illustrations)),
      },
    };
  } catch (error) {
    console.error("Error fetching Kidlit illustrations:", error);
    return {
      props: {
        illustrations: [],
      },
    };
  }
}

export default KidlitIllustrationsPage;
