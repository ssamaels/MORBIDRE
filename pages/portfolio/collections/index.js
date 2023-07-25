import styled from "styled-components";
import React from "react";
import Header from "@/components/Header";
import connectDB from "@/db/connect";
import Collections from "@/db/models/collections";

const CollectionsPage = ({ collections }) => {
  return (
    <>
      <Header />
      <CollectionsDisplay>
        <h1>Collections</h1>
        <CollectionsGrid>
          {collections.length > 0 ? (
            collections.map((collection) => (
              <CollectionItem key={collection._id}>
                <ZoomableImage src={collection.image} alt="Collection" />
              </CollectionItem>
            ))
          ) : (
            <p>No collections found.</p>
          )}
        </CollectionsGrid>
      </CollectionsDisplay>
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

const CollectionsDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const CollectionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid #1ce598;
  padding: 10px;
  position: relative;
  overflow: hidden;
`;

const ZoomableImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;

  ${CollectionItem}:hover & {
    transform: scale(0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    pointer-events: none;
  }

  ${CollectionItem}:not(:hover) & {
    transform: scale(1);
    pointer-events: auto;
  }
`;
