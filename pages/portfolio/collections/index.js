import styles from "@/styles/Home.module.css";
import React from "react";
import Header from "@/components/Header";
import connectDB from "@/db/connect";
import Collections from "@/db/models/collections";
import Image from "next/image";

const CollectionsPage = ({ collections }) => {
  return (
    <>
      <Header />
      <div>
        <h1>Collections</h1>
        {collections.length > 0 ? (
          collections.map((collection) => (
            <div key={collection._id}>
              <h2>{collection.name}</h2>
              <Image
                src={collection.image}
                alt="Collection"
                width={50}
                height={50}
              />
            </div>
          ))
        ) : (
          <p>No collections found.</p>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    await connectDB();

    const collections = await Collections.find({}, "name image");

    return {
      props: {
        collections: JSON.parse(JSON.stringify(collections)),
      },
    };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return {
      props: {
        collections: [],
      },
    };
  }
}

export default CollectionsPage;
