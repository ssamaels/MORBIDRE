import styled from "styled-components";
import { useDarkMode } from "../DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import { useContext, useRef, useState } from "react";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { useTranslation } from "next-i18next";

export default function UploadButton({ uploadPath }) {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);
  const fileInputRef = useRef();
  const [imageData, setImageData] = useState(null);
  const { t } = useTranslation("common");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    for (let value of formData.values()) {
      console.log(value);
    }

    try {
      const response = await fetch(uploadPath, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setImageData(data);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <>
      {isClient && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleUpload}
          />
          <Button
            $darkMode={darkMode}
            onClick={() => fileInputRef.current.click()}
          >
            {t("upload")}
            <LiaCloudUploadAltSolid className="cloud" />
          </Button>
        </>
      )}
    </>
  );
}

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 0.3rem;
  margin-bottom: 3rem;
  font-size: large;
  border: 0.1rem solid #000000;
  border-radius: 0.2rem;
  background: transparent;
  color: #000000;
  align-self: center;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
    .cloud {
      color: #ffffff;
    }
  }

  .cloud {
    color: #000000;
  }

  ${(props) =>
    props.$darkMode &&
    `
    border: 0.1rem solid #ffffff;
    color: #ffffff;
    &:hover {
        background: rgb(250, 250, 250, 0.5);
        color: #000000;
        .cloud {
            color: #000000
        }
    }
    .cloud{
        color: #ffffff;
    `}
`;
