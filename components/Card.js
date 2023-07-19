import styled from "styled-components";
import Image from "next/image";

export default function Card({ image }) {
  return (
    <ImageContainer>
      <Image src={image} fill width={50} lenght={50} alt="" />
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #1ce598;
  border-radius: 15px;
`;
