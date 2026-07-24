import React, { useState } from "react";
import "./booking.css";
import {
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate()



  const [credentials, setCredentials] = useState({
    userId: "01",
    userEmail: "example@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(credentials.guestSize) + Number(serviceFee);

  // Send data to server
  const handleClick = (e) => {
    e.preventDefault();
    
navigate('/thank-you')

    // API call goes here
  };

  return (
    <div className="booking">
      {/* Booking Top */}
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/ per person</span>
        </h3>

        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length || 0})
        </span>
      </div>

      {/* Booking Form */}
      <div className="booking__form">
        <h5>Information</h5>

        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              value={credentials.fullName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              value={credentials.phone}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              required
              value={credentials.bookAt}
              onChange={handleChange}
            />

            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              min="1"
              required
              value={credentials.guestSize}
              onChange={handleChange}
            />
          </FormGroup>

          {/* Booking Bottom */}
          <div className="booking__bottom">
            <ListGroup>
              <ListGroupItem className="border-0 px-0 d-flex justify-content-between">
                <h5 className="d-flex align-items-center gap-1">
                  ${price}
                  <i className="ri-close-line"></i>
                  {credentials.guestSize} person
                </h5>

                <span>
                  ${Number(price) * Number(credentials.guestSize)}
                </span>
              </ListGroupItem>

              <ListGroupItem className="border-0 px-0 d-flex justify-content-between">
                <h5>Service Charge</h5>
                <span>${serviceFee}</span>
              </ListGroupItem>

              <ListGroupItem className="border-0 px-0 total d-flex justify-content-between">
                <h5>Total</h5>
                <span>${totalAmount}</span>
              </ListGroupItem>
            </ListGroup>

            <Button
              type="submit"
              className="btn primary__btn w-100 mt-4"
            >
              Book Now
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Booking;