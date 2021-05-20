import React from "react";
import styled from "styled-components";
import { Description, MainHeader } from "./[id]";

const ItemContainer = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0px 2px 12px 0px #0000002e;
  transition: 0.3s ease;
  background: white;
  padding: 10px;
  padding-bottom: 20px;
  border-radius: 5px;
  position: relative;
  width: 100%;
  &:hover {
    box-shadow: 0px 6px 16px 0px #0000002e;
  }
  background: white;
  height: 210px;
  margin-bottom: 20px;
`;

const Skeleton = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: gray;
  animation: loadingSkeleton 1s ease infinite;
  @keyframes loadingSkeleton {
    0% {
      background: #dcdcdc;
    }
    50% {
      background: #ececec;
    }
    100% {
      background: #dcdcdc;
    }
  }
`;

const ItemDescription = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const Text = styled.div`
  position: absolute;
  height: 15px;
  width: 0px;
  margin-top: 10px;
  animation: text 0.5s 1s ease forwards;
  @keyframes text {
    100% {
      width: 125px;
    }
  }

  ${(props) =>
    props.second &&
    `
      top: 30px;

  `}
`;

const ImageContainer = styled.div`
  height: 120px;
  width: 100%;
  position: relative;
`;

export default function CardSkeleton() {
  return (
    <>
      <MainHeader>
        <Skeleton />
      </MainHeader>
      <Description>
        <ItemContainer>
          <ImageContainer>
            <Skeleton />
          </ImageContainer>
          <ItemDescription>
            <Text>
              <Skeleton />
            </Text>
            <Text second>
              <Skeleton />
            </Text>
          </ItemDescription>
        </ItemContainer>

        <ItemContainer>
          <ImageContainer>
            <Skeleton />
          </ImageContainer>
          <ItemDescription>
            <Text>
              <Skeleton />
            </Text>
            <Text second>
              <Skeleton />
            </Text>
          </ItemDescription>
        </ItemContainer>

        <ItemContainer>
          <ImageContainer>
            <Skeleton />
          </ImageContainer>
          <ItemDescription>
            <Text>
              <Skeleton />
            </Text>
            <Text second>
              <Skeleton />
            </Text>
          </ItemDescription>
        </ItemContainer>
      </Description>
    </>
  );
}
