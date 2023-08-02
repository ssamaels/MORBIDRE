import { useState } from "react";
import UploadButton from "./UploadButton";

export default function ParentComponent() {
  const [uploadPath, setUploadPath] = useState("");

  const handleKidlitClick = () => {
    setUploadPath("/api/upload_kidlit");
  };

  const handleMorbiDreIClick = () => {
    setUploadPath("/api/upload_morbi_i");
  };

  const handleMorbiDreDClick = () => {
    setUploadPath("/api/upload_morbi_d");
  };

  const handleCollectionsClick = () => {
    setUploadPath("/api/upload_collections");
  };

  return (
    <div>
      <button onClick={handleKidlitClick}>Upload Kidlit</button>
      <button onClick={handleMorbiDreIClick}>
        Upload MorbiDre Illustrations
      </button>
      <button onClick={handleMorbiDreDClick}>Upload MorbiDre Design</button>
      <button onClick={handleCollectionsClick}>Upload Collections</button>
      {uploadPath && <UploadButton uploadPath={uploadPath} />}
    </div>
  );
}
