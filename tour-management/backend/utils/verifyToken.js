import jwt from "jsonwebtoken";

const getToken = (req) => {
  const cookieToken =
    req.cookies?.access_token || req.cookies?.token;
  if (cookieToken) return cookieToken;

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return null;
};

export const verifyToken = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "you are not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Token is not valid" });
    }

    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Access denied" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "you are not authorized" });
    }
  });
};
