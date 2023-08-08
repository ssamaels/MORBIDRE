import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useDarkMode } from "./DarkModeContext";
import { ClientSideContext } from "@/pages/_app";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [smallFollowerPosition, setSmallFollowerPosition] = useState({
    x: 0,
    y: 0,
  });
  const [smallerFollowerPosition, setSmallerFollowerPosition] = useState({
    x: 0,
    y: 0,
  });
  const [active, setActive] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.pageX, y: e.pageY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    const updateFollowerPosition = () => {
      setFollowerPosition((prev) => ({
        x: prev.x + (position.x - prev.x) / 9,
        y: prev.y + (position.y - prev.y) / 9,
      }));
      setSmallFollowerPosition((prev) => ({
        x: prev.x + (followerPosition.x - prev.x) / 9,
        y: prev.y + (followerPosition.y - prev.y) / 9,
      }));
      setSmallerFollowerPosition((prev) => ({
        x: prev.x + (smallFollowerPosition.x - prev.x) / 9,
        y: prev.y + (smallFollowerPosition.y - prev.y) / 9,
      }));
    };

    const interval = setInterval(updateFollowerPosition, 16);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [position, followerPosition, smallFollowerPosition]);

  return (
    <>
      {isClient && (
        <>
          <CursorDot
            className={`cursor ${active ? "active" : ""}`}
            style={{ left: position.x, top: position.y }}
            $darkMode={darkMode}
          />
          <CursorFollower
            className={`cursor-follower ${active ? "active" : ""}`}
            style={{
              left: followerPosition.x,
              top: followerPosition.y,
            }}
            $darkMode={darkMode}
          />
          <CursorFollowerSmall
            className={`cursor-follower ${active ? "active" : ""}`}
            style={{
              left: smallFollowerPosition.x,
              top: smallFollowerPosition.y,
            }}
            $darkMode={darkMode}
          />
          <CursorFollowerSmaller
            className={`cursor-follower ${active ? "active" : ""}`}
            style={{
              left: smallerFollowerPosition.x,
              top: smallerFollowerPosition.y,
            }}
            $darkMode={darkMode}
          />
        </>
      )}
    </>
  );
};

export default Cursor;

const CursorDot = styled.div`
  position: absolute;
  background-color: #000000;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  z-index: 1;
  transition: 0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
    0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
  user-select: none;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);

  &.active {
    opacity: 0.5;
    transform: scale(0);
  }

  &.hovered {
    opacity: 0.08;
  }

  ${(props) =>
    props.$darkMode &&
    `
    background-color: #ffffff;
    `}
`;

const CursorFollower = styled.div`
  position: absolute;
  background-color: rgb(0, 0, 0, 0.3);
  width: 30px;
  height: 30px;
  border-radius: 100%;
  z-index: 1;
  transition: 0.6s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
    0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
  user-select: none;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);

  &.active {
    opacity: 0.7;
    transform: scale(3);
  }

  &.hovered {
    opacity: 0.08;
  }

  ${(props) =>
    props.$darkMode &&
    `
    background-color: rgb(250, 250, 250, 0.3);
    `}
`;

const CursorFollowerSmall = styled.div`
  position: absolute;
  background-color: rgb(0, 0, 0, 0.3);
  width: 20px;
  height: 20px;
  border-radius: 100%;
  z-index: 1;
  transition: 0.6s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
    0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
  user-select: none;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);

  &.active {
    opacity: 0.7;
    transform: scale(3);
  }

  &.hovered {
    opacity: 0.08;
  }

  ${(props) =>
    props.$darkMode &&
    `
    background-color: rgb(250, 250, 250, 0.3);
    `}
`;

const CursorFollowerSmaller = styled.div`
  position: absolute;
  background-color: rgb(0, 0, 0, 0.3);
  width: 10px;
  height: 10px;
  border-radius: 100%;
  z-index: 1;
  transition: 0.6s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
    0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
  user-select: none;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);

  &.active {
    opacity: 0.7;
    transform: scale(3);
  }

  &.hovered {
    opacity: 0.08;
  }

  ${(props) =>
    props.$darkMode &&
    `
    background-color: rgb(250, 250, 250, 0.3);
    `}
`;
