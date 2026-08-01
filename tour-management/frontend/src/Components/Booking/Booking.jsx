import React, { useState, useContext } from "react";
import "./booking.css";
import {
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?._id || "",
    userEmail: user?.email || "",
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const handleChange = (e) => {
    setBooking((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const serviceFee = 10;

  const totalAmount =
    Number(price) * Number(booking.guestSize) + serviceFee;

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!user) {
        return alert("Please sign in to book a tour");
      }

      const token = user.token || localStorage.getItem("token");
      if (!token) {
        return alert("Session expired. Please login again.");
      }

      const bookingData = {
        ...booking,
        userId: user._id,
        userEmail: user.email,
        tourName: title,
      };

      const res = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }

      navigate("/thank-you");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="booking">

      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/ per person</span>
        </h3>

        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} (
          {reviews?.length || 0})
        </span>
      </div>


      <div className="booking__form">
        <h5>Information</h5>

        <Form className="booking__info-form" onSubmit={handleClick}>

          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              value={booking.fullName}
              onChange={handleChange}
            />
          </FormGroup>


          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              value={booking.phone}
              onChange={handleChange}
            />
          </FormGroup>


          <FormGroup className="d-flex align-items-center gap-3">

            <input
              type="date"
              id="bookAt"
              required
              value={booking.bookAt}
              onChange={handleChange}
            />


            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              min="1"
              required
              value={booking.guestSize}
              onChange={handleChange}
            />

          </FormGroup>


          <div className="booking__bottom">

            <ListGroup>

              <ListGroupItem className="border-0 px-0 d-flex justify-content-between">

                <h5 className="d-flex align-items-center gap-1">
                  ${price}
                  <i className="ri-close-line"></i>
                  {booking.guestSize} person
                </h5>

                <span>
                  ${Number(price) * Number(booking.guestSize)}
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
