import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { isNil } from "ramda";
import { useLazyQuery } from "@apollo/client";

// change location of search business query
import {
  GET_BUSINESS_DETAILS_PARTIAL,
  GET_BUSINESS_DETAILS_FULL,
} from "../../components/search/searchBusinessesQuery";

const BusinessDetailContainer = styled.section``;

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
  } = businessInformation;

  return (
    <BusinessDetailContainer>
      <h1>{name}</h1>
    </BusinessDetailContainer>
  );
}

const mapStateToProps = (state) => {
  return { businessList: state.main.businesses };
};

export default connect(mapStateToProps)(BusinessDetail);
