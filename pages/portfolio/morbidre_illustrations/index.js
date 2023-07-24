import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import connectDB from "@/db/connect";
import MorbidreIllustrations from "@/db/models/morbidre_illustrations";

const MorbidreIllustrationsPage = ({ illustrations }) => {
  return (
    <>
      <Header />
      <div>
        <h1>Morbidre Illustrations</h1>
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

    const illustrations = await MorbidreIllustrations.find({}, "image");

    return {
      props: {
        illustrations: JSON.parse(JSON.stringify(illustrations)),
      },
    };
  } catch (error) {
    console.error("Error fetching Morbidre illustrations:", error);
    return {
      props: {
        illustrations: [],
      },
    };
  }
}

export default MorbidreIllustrationsPage;
