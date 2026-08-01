import React, { useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/profile.css";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const displayName = user.username || user.userName || user.email || "User";
  const initial = displayName.charAt(0).toUpperCase();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <section className="profile">
      <Container>
        <Row>
          <Col lg="6" className="m-auto">
            <div className="profile__card">
              <div className="profile__avatar" aria-hidden="true">
                {initial}
              </div>

              <h2 className="profile__name">{displayName}</h2>
              <p className="profile__email">{user.email}</p>

              <ul className="profile__details">
                <li>
                  <span>Username</span>
                  <strong>{displayName}</strong>
                </li>
                <li>
                  <span>Email</span>
                  <strong>{user.email || "—"}</strong>
                </li>
                <li>
                  <span>Role</span>
                  <strong>{user.role || "user"}</strong>
                </li>
              </ul>

              <div className="profile__actions">
                <Button
                  className="btn primary__btn"
                  onClick={() => navigate("/home")}
                >
                  Go to Home
                </Button>
                <Button className="btn btn-dark" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
