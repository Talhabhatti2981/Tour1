import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const quick__links = [
  { path: "/home", display: "Home" },
  { path: "/tours", display: "Tours" },
];

const quick__links2 = [
  { path: "/login", display: "Login" },
  { path: "/register", display: "Register" },
];

const socialLinks = [
  { icon: "ri-youtube-line", label: "YouTube" },
  { icon: "ri-github-fill", label: "GitHub" },
  { icon: "ri-facebook-circle-line", label: "Facebook" },
  { icon: "ri-instagram-line", label: "Instagram" },
];

const contactItems = [
  {
    icon: "ri-map-pin-line",
    label: "Address",
    value: "Lahore, Pakistan",
  },
  {
    icon: "ri-mail-line",
    label: "Email",
    value: "Travelworld@gmail.com",
  },
  {
    icon: "ri-phone-line",
    label: "Phone",
    value: "0123-4567890",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row className="footer__top g-4">
          <Col lg="3" md="6">
            <div className="footer__brand">
              <img src={logo} alt="Travel World" className="footer__logo" />
              <p>
                Explore the world's most beautiful destinations. Create
                unforgettable memories with every journey.
              </p>
              <div className="social__links d-flex align-items-center gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href="#/"
                    aria-label={item.label}
                    className="social__icon"
                  >
                    <i className={item.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </Col>

          <Col lg="3" md="6">
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {quick__links.map((item) => (
                <ListGroupItem key={item.path} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {quick__links2.map((item) => (
                <ListGroupItem key={item.path} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6">
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">
              {contactItems.map((item) => (
                <ListGroupItem
                  key={item.label}
                  className="ps-0 border-0 footer__contact-item"
                >
                  <h6 className="mb-0 d-flex align-items-center gap-2">
                    <span>
                      <i className={item.icon}></i>
                    </span>
                    {item.label}:
                  </h6>
                  <p className="mb-0">{item.value}</p>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="12" className="text-center">
            <p className="copyright">
              Copyright {year}, design and develop by M. Hamza, Khadija Bakar,
              Sania Imran. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
