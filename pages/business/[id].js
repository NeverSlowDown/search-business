import { useRouter } from "next/router";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { isEmpty, isNil, prop } from "ramda";
import { useLazyQuery } from "@apollo/client";
import moment from "moment";

// change location of search business query
import {
  GET_BUSINESS_DETAILS_PARTIAL,
  GET_BUSINESS_DETAILS_FULL,
} from "../../components/search/searchBusinessesQuery";

import { openAddress } from "../../components/card/index";

const BusinessDetailContainer = styled.section``;

const MainHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: flex-end;
`;

const ImageContainer = styled.figure`
  width: 100%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  filter: ${(props) =>
    props.isClosed ? " grayscale(1) brightness(0.6)" : "brightness(0.6)"};
  width: 100%;
  background: url(${(props) => props.src}) no-repeat center;
  background-size: cover;
`;

const Name = styled.h1`
  font-size: 2.5em;
  color: white;
  position: absolute;
  z-index: 1;
  width: 100%;
  font-weight: 800;
  text-shadow: 0 5px 7px #000000a3;
  margin-bottom: 60px;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  text-align: center;
`;

const IsClosed = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  background: ${(props) =>
    props.permanent ? "#ff3838" : props.theme.secondary};
  color: white;
  border-radius: 5px;
  padding: 5px 20px;
  z-index: 1;
  font-size: 0.75em;
`;

const Description = styled.article`
  display: flex;
  /* add media for flex row here */
  flex-direction: column;
  padding: 20px;
  background: #f3f8ff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 0 10px 3px #0000002e;
  margin-top: -30px;
  min-height: calc(60vh + 30px);
  position: relative;
`;

const ItemDescription = styled.article`
  flex-direction: column;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  box-shadow: 0px 2px 12px 0px #0000002e;
  transition: 0.3s ease;
  background: white;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    box-shadow: 0px 6px 16px 0px #0000002e;
  }
  background: white;
  svg {
    width: 24px;
    height: 24px;
    fill: white;
    position: relative;
    top: 2px;
  }
`;

const ItemDescriptionTitle = styled.h2`
  font-weight: 600;
  color: #6f6f6f;
  font-size: 0.6em;
  text-transform: uppercase;
  align-self: flex-start;
  margin-bottom: 15px;
`;

const HoursList = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  flex-wrap: wrap;
  margin: 20px 0 10px 0;
`;

const HoursItem = styled.li`
  display: flex;
  margin-right: 20px;
  &:not(:first-child) {
    margin-top: 5px;
  }
`;

const WeekDay = styled.span`
  min-width: 70px;
`;

const HoursTime = styled.span`
  margin-left: 10px;
`;

const Phone = styled.span``;

const Rating = styled.div`
  position: ${(props) => (props.static ? "relative" : "absolute")};

  ${(props) =>
    props.static &&
    `
    top: -2px;
  `}

  ${(props) =>
    !props.static &&
    `
    right: 20px;
    top: 50px;
    background: #00000085;
    padding: 2px 10px;
    border-radius: 5px;
    color: white;
  `}

  font-weight: 400;
  font-size: ${(props) => (props.static ? "0.8em" : "1em")};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: ${(props) => (props.static ? "0 0 23px" : "0 0 43px")};
  justify-content: center;
  svg {
    width: ${(props) => (props.static ? "14px" : "20px")};
    height: ${(props) => (props.static ? "14px" : "20px")};
    position: relative;
    top: -1px;
    left: 1px;
    path {
      fill: ${(props) => props.theme.secondary};
    }
  }
`;

const ReviewText = styled.p`
  font-size: 0.75em;
  font-weight: 200;
`;

const Reviews = styled.ul`
  display: grid;
  flex-wrap: wrap;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 20px;
`;

const Address = styled.address``;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 0.75em;
  background: ${(props) => props.theme.main};
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin: 10px 0;
`;

const ButtonPhone = styled(Button)`
  svg {
    width: 24px;
    height: 24px;
    fill: white;
    position: relative;
    top: 2px;
    margin-right: 5px;
  }
`;

const ReviewItem = styled.li`
  border: 1px solid ${(props) => props.theme.secondary};
  border-radius: 5px;
  padding: 10px 15px;
  display: flex;
  flex-wrap: wrap;
  background: white;
`;

const HalfWrapper = styled.div`
  display: grid;
  flex-wrap: wrap;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 20px;
`;

function BusinessDetail({ businessList }) {
  const router = useRouter();
  const { id } = router.query;

  const [businessReviews, setBusinessReviews] = useState();

  const [businessInformation, setBusinessInformation] = useState({
    hours: "",
    is_closed: "",
    location: "",
    name: "",
    phone: "",
    photos: "",
    rating: "",
    review_count: "",
    reviews: [],
    price: "",
  });

  const [cost, setCost] = useState();

  const getPricesCost = (price) => {
    switch (price.length) {
      case 1:
        setCost("Cheap prices");
        break;
      case 2:
        setCost("Economic prices");
        break;
      case 3:
        setCost("Moderate prices");
        break;
      case 4:
        setCost("Expensive prices");
        break;
    }
  };

  // find the business if it exists inside businessList, in case you reload the page then we don't have businessList so we need to fetch complete information of the business with it's ID.
  const foundBusiness =
    !isNil(businessList) &&
    !isNil(businessList.find((business) => business.id === id));

  const [getBusinessDetails, { data, loading, error }] = useLazyQuery(
    isNil(businessList) || !foundBusiness
      ? GET_BUSINESS_DETAILS_FULL
      : GET_BUSINESS_DETAILS_PARTIAL
  );

  // const getReviews = async (id) => {
  //   try {
  //     const result = await fetch(
  //       "https://cors-anywhere.herokuapp.com/https://www.reviewsmaker.com/api/public/yelp?url=https://www.yelp.com/biz/" +
  //       id
  //     );
  //     setBusinessReviews(result.reviews);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    getBusinessDetails({ variables: { id } });

    // this is the solution for other reviews
    // You can get reviews from this api because Yelp only provides 3... :
    // https://www.reviewsmaker.com/api/demo/yelp/
    // getReviews(id);
  }, [id]);

  useEffect(() => {
    if (!isNil(data)) {
      setBusinessInformation(data.business);
      !isNil(data.business.price) && getPricesCost(data.business.price);
    }
  }, [data]);

  const {
    hours,
    is_closed,
    location,
    name,
    phone,
    photos,
    rating,
    review_count,
    reviews,
    price,
  } = businessInformation;

  const isClosed = !isNil(hours[0]) && !hours[0].is_open_now;
  const isPermanentClosed = is_closed;

  return (
    <BusinessDetailContainer>
      <MainHeader>
        <Name>{name}</Name>
        {isPermanentClosed && <IsClosed permanent>Permanently Closed</IsClosed>}
        {isClosed && <IsClosed>Closed</IsClosed>}
        <ImageContainer
          src={photos[0]}
          isClosed={isClosed || isPermanentClosed}
        />
        <Rating>
          {rating}
          <svg className="svg-icon" viewBox="0 0 20 20">
            <path
              fill="none"
              d="M16.85,7.275l-3.967-0.577l-1.773-3.593c-0.208-0.423-0.639-0.69-1.11-0.69s-0.902,0.267-1.11,0.69L7.116,6.699L3.148,7.275c-0.466,0.068-0.854,0.394-1,0.842c-0.145,0.448-0.023,0.941,0.314,1.27l2.871,2.799l-0.677,3.951c-0.08,0.464,0.112,0.934,0.493,1.211c0.217,0.156,0.472,0.236,0.728,0.236c0.197,0,0.396-0.048,0.577-0.143l3.547-1.864l3.548,1.864c0.18,0.095,0.381,0.143,0.576,0.143c0.256,0,0.512-0.08,0.729-0.236c0.381-0.277,0.572-0.747,0.492-1.211l-0.678-3.951l2.871-2.799c0.338-0.329,0.459-0.821,0.314-1.27C17.705,7.669,17.316,7.343,16.85,7.275z M13.336,11.754l0.787,4.591l-4.124-2.167l-4.124,2.167l0.788-4.591L3.326,8.5l4.612-0.67l2.062-4.177l2.062,4.177l4.613,0.67L13.336,11.754z"
            ></path>
          </svg>
        </Rating>
      </MainHeader>
      <Description>
        <HalfWrapper>
          <ItemDescription onClick={() => openAddress(location.address1)}>
            <ItemDescriptionTitle>Address:</ItemDescriptionTitle>
            <Address>{location.address1}</Address>
            <Button>
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
              View in Maps
            </Button>
          </ItemDescription>

          <ItemDescription>
            <ItemDescriptionTitle>Phone Number:</ItemDescriptionTitle>
            <Phone>{phone}</Phone>
            <ButtonPhone href={`tel:${phone}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 1024 1280"
                x="0px"
                y="0px"
              >
                <path d="M968.8 715.3l-119-119.1c-23.5-24.4-51.9-37.2-82-37.2-29.9 0-58.5 12.8-82.7 36.9l-62 62c-3.1-1.6-6.1-3.1-8.9-4.5-7.3-3.6-14.3-7.2-20.3-11-62.9-39.9-120.2-92.2-175.3-159.7-24.3-30.7-41.1-56.5-53.3-81.9 15.7-14.7 30.5-29.7 44.5-44.1 5.9-6 12.1-12.2 18.1-18.2 24.8-24.8 37.9-53.7 37.9-83.5 0-30-13.1-58.9-37.9-83.5l-59.1-59.1c-6.7-6.7-13.1-13.2-19.7-20.1l-0.3-0.3c-12.9-13.3-26.8-27.4-40.7-40.3-23.6-23.1-51.8-35.3-81.6-35.3-29.6 0-58.1 12.3-82.4 35.5l-74.5 74.5c-30.1 29.8-47.1 66.2-50.6 108.2-4 50 5.1 102.8 28.6 165.9 35.4 96.2 88.7 185.2 167.7 280.1v0c95.7 114.4 211.3 204.9 343.4 269l0.1 0.1c51.1 24.2 119.5 52.6 195.2 57.5h0.9c4.4 0.2 8.9 0.4 13.7 0.4 54.3 0 98.1-18.8 133.8-57.5 0.6-0.7 1.4-1.5 2.2-2.6 10-11.9 21.4-23.1 33.6-34.8l2.8-2.7c11.4-10.9 20.4-19.9 28.4-28.2 23.9-24.9 36.5-53.8 36.4-83.7 0-30-12.8-58.6-37-82.8zM101.5 241.6v0c2-22.7 10.5-40.8 26.6-56.9l73.7-73.7c8.1-7.8 16.6-12 24.5-12 9.6 0 18.1 6.6 23.5 12.1l0.6 0.6c11.2 10.4 22 21.4 33.4 33l5.2 5.3c3.4 3.5 6.9 7 10.4 10.6 3.4 3.4 6.8 6.9 10.2 10.4l59.3 59.3c6.2 6.2 13.6 15.6 13.6 25s-7.4 18.8-13.6 25c-3.1 3.1-6.2 6.2-9.3 9.4-3 3.1-6.1 6.2-9.2 9.3l-4.2 4.2c-16.7 16.9-32.6 32.9-49.7 48.2l-1.7 1.7c-25.9 25.9-17 52.7-14.1 61.5 0.2 0.7 0.4 1.2 0.6 1.8l0.4 1c16.2 38.8 38.4 75 72 117.3l0.1 0.1c60.5 74.6 124.3 132.7 195.2 177.8 7.8 5.1 15.7 9.1 23.4 12.9 1.4 0.7 2.9 1.4 4.3 2.2l0.1 0.1c7.3 3.6 14.3 7.2 20.3 11l1.8 1c0.6 0.3 1.2 0.7 1.8 1 8.8 4.5 17.9 6.8 27 6.8 15.4 0 29.4-6.2 41.6-18.5l74.2-74.2c5.8-5.8 14.6-12.6 24.2-12.6 9.8 0 18.3 7.6 22.6 12.2l0.2 0.2 119.8 119.6c17.2 17.2 16.9 32.4-0.8 50.8l-0.2 0.2c-8.4 9-17.3 17.6-25.7 25.7l-2.4 2.3c-13.4 13-27.2 26.4-40.1 41.8-19.6 21-41.9 30.3-72.3 30.3-2.8 0-6-0.2-9.2-0.4-62.1-4-120.6-28.5-164.7-49.5-121.4-58.8-227.7-142-315.8-247.4-72.7-87.5-121.5-168.8-153.8-255.9-19.1-51.4-26.8-93-23.8-130.6z" />
              </svg>
              Call
            </ButtonPhone>
          </ItemDescription>
        </HalfWrapper>
        {/* ATTENTION: one problem of Yelp API is that when it returns the times for the business it doesn't clarify the TIMEZONE, so I can't parse it with moment to the current timezone. You can check this when you see the hours of the place but it is not currently open. */}
        {!isNil(hours) && !isNil(hours[0]) && (
          <ItemDescription>
            <ItemDescriptionTitle>Hours available:</ItemDescriptionTitle>
            <HoursList>
              {hours[0].open.map((days, index) => {
                return (
                  <HoursItem key={`hours-${index}`}>
                    <WeekDay>{moment.weekdays(index + 1)}</WeekDay>
                    <HoursTime>
                      {moment(days.start, "hmm").format("HH:mm")}
                    </HoursTime>
                    <HoursTime>
                      {moment(days.end, "hmm").format("HH:mm")}
                    </HoursTime>
                  </HoursItem>
                );
              })}
            </HoursList>
          </ItemDescription>
        )}
        {!isNil(cost) && (
          <ItemDescription>
            <ItemDescriptionTitle>Cost of prices</ItemDescriptionTitle>
            {cost}
          </ItemDescription>
        )}

        {/* other reviews */}
        {/* {!isNil(businessReviews) && !isEmpty(businessReviews) && (
          <Reviews>
            {businessReviews.map((review, index) => {
              return (
                <ReviewItem key={`review-${index}`}>
                  <Rating static>
                    {review.rating}
                    <svg className="svg-icon" viewBox="0 0 20 20">
                      <path
                        fill="none"
                        d="M16.85,7.275l-3.967-0.577l-1.773-3.593c-0.208-0.423-0.639-0.69-1.11-0.69s-0.902,0.267-1.11,0.69L7.116,6.699L3.148,7.275c-0.466,0.068-0.854,0.394-1,0.842c-0.145,0.448-0.023,0.941,0.314,1.27l2.871,2.799l-0.677,3.951c-0.08,0.464,0.112,0.934,0.493,1.211c0.217,0.156,0.472,0.236,0.728,0.236c0.197,0,0.396-0.048,0.577-0.143l3.547-1.864l3.548,1.864c0.18,0.095,0.381,0.143,0.576,0.143c0.256,0,0.512-0.08,0.729-0.236c0.381-0.277,0.572-0.747,0.492-1.211l-0.678-3.951l2.871-2.799c0.338-0.329,0.459-0.821,0.314-1.27C17.705,7.669,17.316,7.343,16.85,7.275z M13.336,11.754l0.787,4.591l-4.124-2.167l-4.124,2.167l0.788-4.591L3.326,8.5l4.612-0.67l2.062-4.177l2.062,4.177l4.613,0.67L13.336,11.754z"
                      ></path>
                    </svg>
                  </Rating>
                  <ReviewText>{review.text}</ReviewText>
                </ReviewItem>
              );
            })}
          </Reviews>
        )} */}

        {!isEmpty(reviews) && !isNil(reviews) && (
          <Reviews>
            {reviews.map((review, index) => {
              return (
                <ReviewItem key={`review-${index}`}>
                  <Rating static>
                    {review.rating}
                    <svg className="svg-icon" viewBox="0 0 20 20">
                      <path
                        fill="none"
                        d="M16.85,7.275l-3.967-0.577l-1.773-3.593c-0.208-0.423-0.639-0.69-1.11-0.69s-0.902,0.267-1.11,0.69L7.116,6.699L3.148,7.275c-0.466,0.068-0.854,0.394-1,0.842c-0.145,0.448-0.023,0.941,0.314,1.27l2.871,2.799l-0.677,3.951c-0.08,0.464,0.112,0.934,0.493,1.211c0.217,0.156,0.472,0.236,0.728,0.236c0.197,0,0.396-0.048,0.577-0.143l3.547-1.864l3.548,1.864c0.18,0.095,0.381,0.143,0.576,0.143c0.256,0,0.512-0.08,0.729-0.236c0.381-0.277,0.572-0.747,0.492-1.211l-0.678-3.951l2.871-2.799c0.338-0.329,0.459-0.821,0.314-1.27C17.705,7.669,17.316,7.343,16.85,7.275z M13.336,11.754l0.787,4.591l-4.124-2.167l-4.124,2.167l0.788-4.591L3.326,8.5l4.612-0.67l2.062-4.177l2.062,4.177l4.613,0.67L13.336,11.754z"
                      ></path>
                    </svg>
                  </Rating>
                  <ReviewText>{review.text}</ReviewText>
                </ReviewItem>
              );
            })}
          </Reviews>
        )}
      </Description>
    </BusinessDetailContainer>
  );
}

const mapStateToProps = (state) => {
  return { businessList: state.main.businesses };
};

BusinessDetail.propTypes = {
  businessList: PropTypes.arrayOf({
    name: PropTypes.string,
    id: PropTypes.string,
    rating: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.string),
    review_count: PropTypes.number,
    location: PropTypes.object,
    phone: PropTypes.string,
    seen: PropTypes.bool,
  }),
};

export default connect(mapStateToProps)(BusinessDetail);
