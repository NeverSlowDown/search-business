import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { isNil } from "ramda";
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
    reviews: "",
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

  console.log({ hours });

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
      </Description>
    </BusinessDetailContainer>
  );
}

const mapStateToProps = (state) => {
  return { businessList: state.main.businesses };
};

export default connect(mapStateToProps)(BusinessDetail);
