import React, { useState, useEffect } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  defaultCity = "",
  defaultDistance = "",
  defaultMaxGroupSize = "",
}) => {
  const [city, setCity] = useState(defaultCity);
  const [distance, setDistance] = useState(defaultDistance);
  const [maxGroupSize, setMaxGroupSize] = useState(defaultMaxGroupSize);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCity(defaultCity);
    setDistance(defaultDistance);
    setMaxGroupSize(defaultMaxGroupSize);
  }, [defaultCity, defaultDistance, defaultMaxGroupSize]);

  const searchHandler = async (e) => {
    e?.preventDefault();

    const location = city.trim();
    if (!location) {
      return alert("Please enter a location to search.");
    }

    const params = new URLSearchParams({
      city: location,
    });

    if (distance !== "" && Number(distance) >= 0) {
      params.set("distance", String(distance));
    }

    if (maxGroupSize !== "" && Number(maxGroupSize) >= 0) {
      params.set("maxGroupSize", String(maxGroupSize));
    }

    setLoading(true);
    try {
      navigate(`/tours/search?${params.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form
          className="d-flex align-items-center gap-4"
          onSubmit={searchHandler}
        >
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="Location"
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                min="0"
                placeholder="Distance k/m"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                aria-label="Distance"
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={maxGroupSize}
                onChange={(e) => setMaxGroupSize(e.target.value)}
                aria-label="Max People"
              />
            </div>
          </FormGroup>

          <button
            type="submit"
            className="search__icon"
            disabled={loading}
            aria-label="Search tours"
          >
            <i className={loading ? "ri-loader-4-line" : "ri-search-line"}></i>
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
