import React, { useContext } from "react";
import styled from "styled-components";
import { MdOutlineDelete } from "react-icons/md";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";
import axios from "axios";

const DeleteButton = ({ onDelete }) => {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  const handleDelete = async () => {
    onDelete();
  };

  return (
    <>
      {isClient && (
        <Button $darkMode={darkMode} onClick={handleDelete}>
          <MdOutlineDelete className="bin" />
        </Button>
      )}
    </>
  );
};

export default DeleteButton;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 0.3rem;
  border: 0.1rem solid #000000;
  border-radius: 0.2rem;
  background: transparent;
  color: #000000;
  align-self: center;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.5);
    color: #ffffff;
  }

  .bin {
    color: #ff0000;
    width: 1.5rem;
    height: 1.5rem;
  }

  ${(props) =>
    props.$darkMode &&
    `
    border: 0.1rem solid #ffffff;
    color: #ffffff;
    &:hover {
        background: rgb(250, 250, 250, 0.5);
        color: #000000;
    }
    `}
`;
