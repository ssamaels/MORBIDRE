import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import connectDB from "@/db/connect";
import MorbidreDesign from "@/db/models/morbidre_design";

const MorbidreDesignsPage = ({ designs }) => {
  return (
    <>
      <Header />
      <div>
        <h1>Morbidre Design</h1>
        {designs.length > 0 ? (
          designs.map((design) => (
            <Image
              key={design._id}
              src={design.image}
              alt="Design"
              width={50}
              height={50}
            />
          ))
        ) : (
          <p>No designs found.</p>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    await connectDB();

    const designs = await MorbidreDesign.find({}, "image");

    return {
      props: {
        designs: JSON.parse(JSON.stringify(designs)),
      },
    };
  } catch (error) {
    console.error("Error fetching Morbidre designs:", error);
    return {
      props: {
        designs: [],
      },
    };
  }
}

export default MorbidreDesignsPage;
