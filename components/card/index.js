import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { isNil } from "ramda";

export const Container = styled.article`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 20px 0 0 0;
  overflow: hidden;
  position: relative;
  min-height: 250px;
  box-shadow: 0px 5px 16px 0px #0000002e;
  transition: 0.3s ease;
  &:hover {
    box-shadow: 0px 10px 20px 0px #0000002e;
  }
  animation: fadeUp 0.5s 0.5s ease forwards;
  opacity: 0;
  transform: translateY(10px);
  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ImageContainer = styled.figure`
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 100%;
  align-items: center;
  height: 250px;
`;

const Image = styled.img`
  width: 100%;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(calc(100% + 16px));
  transition: 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  ${Container}:hover & {
    transform: translateY(0);
  }
  @media screen and (max-width: 767px) {
    position: static;
    box-shadow: 0px 0px 10px #00000038;
    transform: translateY(0);
  }
`;

const Name = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: black;
  text-align: center;
`;

const Save = styled.button`
  border: none;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 10px;
  background: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transform: 1;
  transition: 0.3s 0.3s ease;
  ${Container}:hover & {
    transform: scale(1);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 18px;
    g {
      fill: white;
    }
  }
  @media screen and (max-width: 767px) {
    transform: scale(1);
  }
`;

function Card({ item }) {
  const { name, id, alias, rating, url, photos } = item;
  return (
    <Container>
      <ImageContainer>
        {!isNil(photos) && <Image src={photos[0]} alt={`${name} main photo`} />}
      </ImageContainer>
      <Save onClick={() => console.log("oh weee")}></Save>
      <Description>
        <Name>{name}</Name>
        <p>{rating}</p>
        <a href={url} target="_blank" rel="noreferrer">
          link
        </a>
      </Description>
    </Container>
  );
}

Card.propTypes = {
  item: {
    name: PropTypes.string,
    id: PropTypes.string,
    alias: PropTypes.string,
    rating: PropTypes.number,
    url: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
  },
};

export default Card;
