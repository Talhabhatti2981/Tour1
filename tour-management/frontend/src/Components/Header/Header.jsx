import React, { useRef, useEffect, useContext, useCallback } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import "./header.css";

import { AuthContext } from "../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);

  const displayName = user?.username || user?.userName || user?.email || "U";
  const initial = displayName.charAt(0).toUpperCase();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const stickyHeaderHandler = useCallback(() => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current?.classList.add("sticky__header");
    } else {
      headerRef.current?.classList.remove("sticky__header");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderHandler);

    return () => {
      window.removeEventListener("scroll", stickyHeaderHandler);
    };
  }, [stickyHeaderHandler]);

  const toggleMenu = () => menuRef.current?.classList.toggle("show__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            {/* Logo */}
            <div className="logo">
              <Link to={user ? "/home" : "/login"}>
                <img src={logo} alt="Travel World" />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center">
                {navLinks.map((item) => (
                  <li className="nav__item" key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Side Buttons */}
            <div className="nav__right d-flex align-items-center">
              <div className="nav__btns d-flex align-items-center">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="user__chip"
                      title={displayName}
                      aria-label={`${displayName} profile`}
                    >
                      <span className="user__avatar">{initial}</span>
                      <span className="user__name">{displayName}</span>
                    </Link>

                    <Button className="btn logout__btn" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>

                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
