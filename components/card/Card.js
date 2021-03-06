import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { isNil } from "ramda";
import { useRouter } from "next/router";
import { setBusinessSeen } from "../../redux/actions/main";
import { connect } from "react-redux";

export const Container = styled.article`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  min-height: 250px;
  box-shadow: 0px 2px 12px 0px #0000002e;
  transition: 0.3s ease;
  background: white;
  &:hover {
    box-shadow: 0px 6px 16px 0px #0000002e;
  }
  animation: fadeUp 0.5s 0.5s ease forwards;
  opacity: 0;
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
  ${(props) =>
    props.activated &&
    `
  filter: blur(50px) brightness(1.5);
  transition: 2s ease;
  `}
`;

const BusinessMainImage = styled.figure`
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  border-radius: 5px;
  height: 150px;
`;

const Image = styled.img`
  width: 100%;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 0px 15px;
  padding-bottom: 20px;
  transition: 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  ${Container}:hover & {
    transform: translateY(0);
  }
`;

const FirstLine = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Name = styled.span`
  font-weight: 400;
  font-size: 1em;
  flex: 1;
  padding-right: 10px;
  transition: 0.3s ease;
  ${FirstLine}:hover & {
    color: ${(props) => props.theme.main};
  }
`;

const ImageContainer = styled.div`
  border: 20px solid white;
  border-left: 15px solid white;
  border-right: 15px solid white;
  position: relative;
  cursor: pointer;
  &:hover {
    & ~ ${Description} > ${FirstLine} > ${Name} {
      color: ${(props) => props.theme.main};
    }
  }
`;

const Rating = styled.div`
  font-weight: 400;
  font-size: 1em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: 0 0 43px;
  justify-content: center;
  svg {
    width: 20px;
    height: 20px;
    position: relative;
    top: -1px;
    left: 1px;
    path {
      fill: ${(props) => props.theme.secondary};
    }
  }
`;
const ReviewCount = styled.span`
  font-weight: 200;
  font-size: 0.55em;
  color: #929292;
  width: 100%;
  text-align: center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px auto 0 auto;
  align-items: flex-start;
  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => props.theme.main};
  }
`;
const Phone = styled.a`
  background: none;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  display: flex;
  flex-wrap: wrap;
  color: black;
  text-decoration: none;
  font-size: 0.75em;
  transition: 0.3s ease;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.main};
  }
`;

const Location = styled.button`
  background: none;
  justify-content: center;
  align-items: center;
  border: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  font-size: 0.75em;
  transition: 0.3s ease;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.main};
  }
`;

const Seen = styled.div`
  border: none;
  padding: 0;
  position: absolute;
  right: 20px;
  top: 24px;
  background: rgba(0, 0, 0, 0.7);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: 0.3s 0.3s ease;
  ${Container}:hover & {
    transform: scale(1);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    path {
      fill: white;
    }
    width: 24px;
    fill: black;
    position: relative;
    top: 2px;
  }
  animation: fadeIn 0.5s ease;
  @keyframes fadeIn {
    0% {
      transform: scale(0.7);
      opacity: 0;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const openAddress = (search) => {
  return window.open("http://google.com/search?q=" + search);
};

function Card({ item, setBusinessSeen }) {
  const { name, rating, photos, review_count, location, phone, alias, seen } =
    item;
  const router = useRouter();

  const handleSeen = (item) => {
    setBusinessSeen(item.id);
  };

  const [isLeaving, setIsLeaving] = useState(false);

  return (
    <Container activated={isLeaving}>
      <ImageContainer
        onClick={() => {
          setIsLeaving(true);
          handleSeen(item);

          // a timeout to execute a bye bye animation
          setTimeout(() => {
            router.push({
              pathname: "/business/[id]",
              query: { id: alias },
            });
          }, 300);
        }}
      >
        <BusinessMainImage>
          {!isNil(photos) && (
            <Image src={photos[0]} alt={`${name} main photo`} />
          )}
        </BusinessMainImage>
      </ImageContainer>

      {seen && (
        <Seen>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 40"
            version="1.1"
            x="0px"
            y="0px"
          >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <path
                d="M6.57441438,16.7074746 C7.149187,17.5974451 7.82824869,18.4880178 8.6045372,19.3160589 C10.7761923,21.6324909 13.2548024,23 16,23 C18.7451976,23 21.2238077,21.6324909 23.3954628,19.3160589 C24.1717513,18.4880178 24.850813,17.5974451 25.4255856,16.7074746 C25.5887228,16.4548751 25.7334114,16.2176303 25.8592878,16 C25.7334114,15.7823697 25.5887228,15.5451249 25.4255856,15.2925254 C24.850813,14.4025549 24.1717513,13.5119822 23.3954628,12.6839411 C21.2238077,10.3675091 18.7451976,9 16,9 C13.2548024,9 10.7761923,10.3675091 8.6045372,12.6839411 C7.82824869,13.5119822 7.149187,14.4025549 6.57441438,15.2925254 C6.41127724,15.5451249 6.26658862,15.7823697 6.14071218,16 C6.26658862,16.2176303 6.41127724,16.4548751 6.57441438,16.7074746 Z M4.10557281,15.5527864 C4.24614091,15.2716502 4.50996726,14.8026256 4.89433562,14.2074746 C5.5305005,13.2224451 6.28112631,12.2380178 7.1454628,11.3160589 C9.66130774,8.63249094 12.6201976,7 16,7 C19.3798024,7 22.3386923,8.63249094 24.8545372,11.3160589 C25.7188737,12.2380178 26.4694995,13.2224451 27.1056644,14.2074746 C27.4900327,14.8026256 27.7538591,15.2716502 27.8944272,15.5527864 C28.0351909,15.8343139 28.0351909,16.1656861 27.8944272,16.4472136 C27.7538591,16.7283498 27.4900327,17.1973744 27.1056644,17.7925254 C26.4694995,18.7775549 25.7188737,19.7619822 24.8545372,20.6839411 C22.3386923,23.3675091 19.3798024,25 16,25 C12.6201976,25 9.66130774,23.3675091 7.1454628,20.6839411 C6.28112631,19.7619822 5.5305005,18.7775549 4.89433562,17.7925254 C4.50996726,17.1973744 4.24614091,16.7283498 4.10557281,16.4472136 C3.96480906,16.1656861 3.96480906,15.8343139 4.10557281,15.5527864 Z"
                fill="#000000"
              />
              <path
                d="M16,20 C13.790861,20 12,18.209139 12,16 C12,13.790861 13.790861,12 16,12 C18.209139,12 20,13.790861 20,16 C20,18.209139 18.209139,20 16,20 Z M16,18 C17.1045695,18 18,17.1045695 18,16 C18,14.8954305 17.1045695,14 16,14 C14.8954305,14 14,14.8954305 14,16 C14,17.1045695 14.8954305,18 16,18 Z"
                fill="#000000"
              />
            </g>
          </svg>
        </Seen>
      )}
      <Description>
        <FirstLine
          onClick={() => {
            handleSeen(item);
            router.push({
              pathname: "/business/[id]",
              query: { id: alias },
            });
          }}
        >
          <Name>{name}</Name>
          <Rating>
            {rating}
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path
                fill="none"
                d="M16.85,7.275l-3.967-0.577l-1.773-3.593c-0.208-0.423-0.639-0.69-1.11-0.69s-0.902,0.267-1.11,0.69L7.116,6.699L3.148,7.275c-0.466,0.068-0.854,0.394-1,0.842c-0.145,0.448-0.023,0.941,0.314,1.27l2.871,2.799l-0.677,3.951c-0.08,0.464,0.112,0.934,0.493,1.211c0.217,0.156,0.472,0.236,0.728,0.236c0.197,0,0.396-0.048,0.577-0.143l3.547-1.864l3.548,1.864c0.18,0.095,0.381,0.143,0.576,0.143c0.256,0,0.512-0.08,0.729-0.236c0.381-0.277,0.572-0.747,0.492-1.211l-0.678-3.951l2.871-2.799c0.338-0.329,0.459-0.821,0.314-1.27C17.705,7.669,17.316,7.343,16.85,7.275z M13.336,11.754l0.787,4.591l-4.124-2.167l-4.124,2.167l0.788-4.591L3.326,8.5l4.612-0.67l2.062-4.177l2.062,4.177l4.613,0.67L13.336,11.754z"
              ></path>
            </svg>
            <ReviewCount>({review_count})</ReviewCount>
          </Rating>
        </FirstLine>
        <Actions>
          {/* For a better UX experience it should open a modal with the google maps direction in it, but for now I only do a regular google search */}
          <Location onClick={() => openAddress(location.address1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 350 386.25"
              x="0px"
              y="0px"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <defs></defs>
              <g>
                <path
                  className="fil0"
                  d="M113 0c62,0 112,50 112,113 0,64 -52,161 -107,194 -4,2 -8,2 -11,0 -55,-37 -107,-128 -107,-194 0,-63 50,-113 113,-113zm0 20c-51,0 -93,42 -93,93 0,59 46,139 93,174 46,-33 92,-118 92,-174 0,-51 -41,-93 -92,-93z"
                />
                <path
                  className="fil0"
                  d="M113 69c24,0 44,19 44,44 0,24 -20,44 -44,44 -25,0 -44,-20 -44,-44 0,-25 19,-44 44,-44zm0 20c-14,0 -24,10 -24,24 0,13 10,24 24,24 13,0 24,-11 24,-24 0,-14 -11,-24 -24,-24z"
                />
              </g>
            </svg>
            {location.address1}
          </Location>

          <Phone href={`tel:${phone}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1024 1280"
              x="0px"
              y="0px"
            >
              <path d="M968.8 715.3l-119-119.1c-23.5-24.4-51.9-37.2-82-37.2-29.9 0-58.5 12.8-82.7 36.9l-62 62c-3.1-1.6-6.1-3.1-8.9-4.5-7.3-3.6-14.3-7.2-20.3-11-62.9-39.9-120.2-92.2-175.3-159.7-24.3-30.7-41.1-56.5-53.3-81.9 15.7-14.7 30.5-29.7 44.5-44.1 5.9-6 12.1-12.2 18.1-18.2 24.8-24.8 37.9-53.7 37.9-83.5 0-30-13.1-58.9-37.9-83.5l-59.1-59.1c-6.7-6.7-13.1-13.2-19.7-20.1l-0.3-0.3c-12.9-13.3-26.8-27.4-40.7-40.3-23.6-23.1-51.8-35.3-81.6-35.3-29.6 0-58.1 12.3-82.4 35.5l-74.5 74.5c-30.1 29.8-47.1 66.2-50.6 108.2-4 50 5.1 102.8 28.6 165.9 35.4 96.2 88.7 185.2 167.7 280.1v0c95.7 114.4 211.3 204.9 343.4 269l0.1 0.1c51.1 24.2 119.5 52.6 195.2 57.5h0.9c4.4 0.2 8.9 0.4 13.7 0.4 54.3 0 98.1-18.8 133.8-57.5 0.6-0.7 1.4-1.5 2.2-2.6 10-11.9 21.4-23.1 33.6-34.8l2.8-2.7c11.4-10.9 20.4-19.9 28.4-28.2 23.9-24.9 36.5-53.8 36.4-83.7 0-30-12.8-58.6-37-82.8zM101.5 241.6v0c2-22.7 10.5-40.8 26.6-56.9l73.7-73.7c8.1-7.8 16.6-12 24.5-12 9.6 0 18.1 6.6 23.5 12.1l0.6 0.6c11.2 10.4 22 21.4 33.4 33l5.2 5.3c3.4 3.5 6.9 7 10.4 10.6 3.4 3.4 6.8 6.9 10.2 10.4l59.3 59.3c6.2 6.2 13.6 15.6 13.6 25s-7.4 18.8-13.6 25c-3.1 3.1-6.2 6.2-9.3 9.4-3 3.1-6.1 6.2-9.2 9.3l-4.2 4.2c-16.7 16.9-32.6 32.9-49.7 48.2l-1.7 1.7c-25.9 25.9-17 52.7-14.1 61.5 0.2 0.7 0.4 1.2 0.6 1.8l0.4 1c16.2 38.8 38.4 75 72 117.3l0.1 0.1c60.5 74.6 124.3 132.7 195.2 177.8 7.8 5.1 15.7 9.1 23.4 12.9 1.4 0.7 2.9 1.4 4.3 2.2l0.1 0.1c7.3 3.6 14.3 7.2 20.3 11l1.8 1c0.6 0.3 1.2 0.7 1.8 1 8.8 4.5 17.9 6.8 27 6.8 15.4 0 29.4-6.2 41.6-18.5l74.2-74.2c5.8-5.8 14.6-12.6 24.2-12.6 9.8 0 18.3 7.6 22.6 12.2l0.2 0.2 119.8 119.6c17.2 17.2 16.9 32.4-0.8 50.8l-0.2 0.2c-8.4 9-17.3 17.6-25.7 25.7l-2.4 2.3c-13.4 13-27.2 26.4-40.1 41.8-19.6 21-41.9 30.3-72.3 30.3-2.8 0-6-0.2-9.2-0.4-62.1-4-120.6-28.5-164.7-49.5-121.4-58.8-227.7-142-315.8-247.4-72.7-87.5-121.5-168.8-153.8-255.9-19.1-51.4-26.8-93-23.8-130.6z" />
            </svg>
            {phone}
          </Phone>
        </Actions>
      </Description>
    </Container>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    rating: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.string),
    review_count: PropTypes.number,
    location: PropTypes.object,
    phone: PropTypes.string,
  }),
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  setBusinessSeen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
