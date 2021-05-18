import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { isEmpty, isNil } from "ramda";
import { useLazyQuery } from "@apollo/client";
import moment from "moment";

// change location of search business query
import {
  GET_BUSINESS_DETAILS_PARTIAL,
  GET_BUSINESS_DETAILS_FULL,
} from "../../components/search/searchBusinessesQuery";

const BusinessDetailContainer = styled.section``;

const MainHeader = styled.header`
  position: relative;
`;

const ImageContainer = styled.figure`
  width: 100%;
  min-height: 30vh;
  img {
    filter: ${(props) => props.isClosed && " grayscale(1)"};
  }
`;

const Name = styled.h1`
  font-size: 3em;
`;

const IsClosed = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  background: red;
  border-radius: 5px;
  padding: 10px 20px;
`;

const Description = styled.article`
  display: flex;
  /* add media for flex row here */
  flex-direction: column;
`;

const Hours = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ContactNumber = styled.div``;

const Phone = styled.a``;

const Rating = styled.div`
  position: ${(props) => (props.static ? "static" : "absolute")};
  right: 0;
  bottom: 0;
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

const Cost = styled.div``;

const ReviewText = styled.span``;

const Reviews = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Location = styled.div``;

const ReviewItem = styled.li``;

function BusinessDetail({ businessList }) {
  const router = useRouter();
  const { id } = router.query;

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

  // find the business if it exists inside businessList, in case you reload the page then we don't have businessList so we need to fetch complete information of the business with it's ID.
  const foundBusiness =
    !isNil(businessList) &&
    !isNil(businessList.find((business) => business.id === id));

  const [getBusinessDetails, { data, loading, error }] = useLazyQuery(
    isNil(businessList) || !foundBusiness
      ? GET_BUSINESS_DETAILS_FULL
      : GET_BUSINESS_DETAILS_PARTIAL
  );

  useEffect(() => {
    console.log({ id });
    getBusinessDetails({ variables: { id } });
    // javascript fetch to get the first 5 reviews from this api:
    // https://www.reviewsmaker.com/api/demo/yelp/
  }, [id]);

  useEffect(() => {
    if (!isNil(data)) {
      setBusinessInformation(data.business);
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

  console.log({ reviews });

  const isClosed = !isNil(hours[0]) && !hours[0].is_open_now;
  const isPermanentClosed = is_closed;

  return (
    <BusinessDetailContainer>
      <MainHeader>
        <Name>{name}</Name>
        {isPermanentClosed && <IsClosed>Permanently Closed</IsClosed>}
        <ImageContainer isClosed={isClosed || isPermanentClosed}>
          <img src={photos[0]} alt={`Header main picture of ${name}`} />
        </ImageContainer>
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
        <Hours>
          {!isNil(hours) &&
            !isNil(hours[0]) &&
            hours[0].open.map((days, index) => {
              return (
                <li key={`hours-${index}`}>
                  {moment.weekdays(index + 1)}
                  {moment(days.start, "hmm").format("HH:mm")}
                  {moment(days.end, "hmm").format("HH:mm")}
                </li>
              );
            })}
        </Hours>
        <Location>{location.address1}</Location>
        <ContactNumber>
          <Phone href={`tel:${phone}`}>{phone}</Phone>
        </ContactNumber>
        <Cost>Cost of prices: {price}</Cost>
      </Description>
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
    </BusinessDetailContainer>
  );
}

const mapStateToProps = (state) => {
  return { businessList: state.main.businesses };
};

export default connect(mapStateToProps)(BusinessDetail);
