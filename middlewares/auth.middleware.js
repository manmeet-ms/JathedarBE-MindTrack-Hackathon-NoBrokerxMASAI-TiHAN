import jwt from "jsonwebtoken";
import logger from ".././utils/logger.utils.js";

import User from "../models/User.model.js";

export const checkUserExists = async (req, res, next) => {
  try {
    logger("log", "Checking if user exists ");
    const { email } = req.body;
    logger("log", "got the email", email);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // es.status(404).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "User not Authenticated" });
    next(error);
  }
};
export const requireAuthentication = async (req, res, next) => {
  try {
    // logger("log","Checking if user is: Authenticated");
    logger("log", "Checking if user is: Authenticated");

    const { email, password } = req.body;
    logger("log", "got the email", email);
    const existingUser = await User.findOne({ email });
    if (existingUser.isVerified === true) {
      logger("log", " User is authenticated ");

      //  res.status(200).send("User is authenticated");
    }
    next();
  } catch (error) {
    //  res.status(401).json({ message: "User not Authenticated" });
    next(error);
  }
};
export const checkPermission = async (req, res, next) => {
  try {
    // logger("log","Checking if user is: Verified")
    logger("log", "Checking if user is: Authorized");
    next();
  } catch (error) {
    // res.status(403).json({ message: "Unauthorized: Access Denied" });
    next(error);
  }
};
export const requireVerifiedUser = async (req, res, next) => {
  try {
    logger("log", "Checking if user is: Verified");
    next();
  } catch (error) {
    //  res.status(401).json({ message: "User not Verified" });
    next(error);
  }
};

export const authenticateJWT = (req, res, next) => {
  // const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  try {
    const { token } = req.cookies;

    // logger("info", "req.cookies", req.cookies);
    // logger("log", "token", token);
    if (!token) {
      logger("error", "Unauthorized No Auth token", token);
      return res.status(401).json({ error: "Unauthorized No Auth token" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // logger("info", "decoded",decoded)
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = decoded; // { id, username, role, discordId }
      next();
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
    next(error);
  }
};
