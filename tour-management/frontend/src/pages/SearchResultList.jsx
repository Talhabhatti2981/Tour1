import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useSearchParams } from "react-router-dom";
import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";
import SearchBar from "../shared/SearchBar";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const SearchResultList = () => {
  const [searchParams] = useSearchParams();

  const city = searchParams.get("city") || "";
  const distance = searchParams.get("distance") || "";
  const maxGroupSize = searchParams.get("maxGroupSize") || "";

  const query = new URLSearchParams();
  if (city) query.set("city", city);
  if (distance) query.set("distance", distance);
  if (maxGroupSize) query.set("maxGroupSize", maxGroupSize);

  const searchUrl = query.toString()
    ? `${BASE_URL}/tours/search/getTourBySearch?${query.toString()}`
    : null;

  const { data: tours, loading, error } = useFetch(searchUrl);

  return (
    <>
      <CommonSection title="Tour Search Result" />

      <section>
        <Container>
          <Row>
            <SearchBar
              defaultCity={city}
              defaultDistance={distance}
              defaultMaxGroupSize={maxGroupSize}
            />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {city && (
            <h5 className="mb-4 text-center">
              Results for “{city}”
              {!loading && !error ? ` (${tours?.length || 0})` : ""}
            </h5>
          )}

          {loading && <h4 className="text-center pt-5">Loading.....</h4>}

          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              {!tours || tours.length === 0 ? (
                <h4 className="text-center">No tour found</h4>
              ) : (
                tours.map((tour) => (
                  <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                    <TourCard tour={tour} />
                  </Col>
                ))
              )}
            </Row>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default SearchResultList;
