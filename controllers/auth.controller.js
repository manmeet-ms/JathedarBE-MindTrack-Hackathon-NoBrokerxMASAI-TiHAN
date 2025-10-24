import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import passport from "passport";

import logger from "../utils/logger.utils.js";
import User from "../models/User.model.js";

// raw
export const registerUser = async (req, res) => {
  /**
   * ## ALGORITHM:
   * - get data
   * - validate data
   * - check for existing user in database, other creat a new user
   * - create a verification token, save in db , send to user
   * - send success status to user
   */
  const { name, email, password } = req.body;
  // logger("log",name, email, password);

  if (!name || !email || !password) {
    log;
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger("log", {
        message: "User already exists",
        user: existingUser.name,
      });

      return res.status(400).json({ message: "User already exists" });
    }
    const createdUser = await User.create(req.body);
    // logger("log", "result result result", createdUser);

    const genToken = crypto.randomBytes(32).toString("hex");
    logger("log", "verificationToken", genToken);
    createdUser.verificationToken = genToken;
    await createdUser.save();

    // send email
    //   const transport = nodemailer.createTransport({
    //     host: process.env.VITE_MAILTRAP_HOST,
    //     port: process.env.VITE_MAILTRAP_PORT,
    //     auth: {
    //       user: process.env.VITE_MAILTRAP_USERNAME,
    //       pass: process.env.VITE_MAILTRAP_PASSWORD,
    //     },
    //   });
    //   const mailtrapOptions = {
    //     from: process.env.VITE_MAILTRAP_SENDEREMAIL,
    //     to: user.email,
    //     subject: "Verify your email",
    //     text: `Click to verify:
    // ${process.env.VITE_BACKEND_URL}/api/user/verify/${genToken}`,
    //   };
    // await transport.sendMail(mailtrapOptions);

    logger("log", {
      text: `Click to verify: 
  ${process.env.VITE_BACKEND_URL}/user/verify/${genToken}`,
    });

    res.status(200).json({
      message: "User registered successfully, please verify your email",
      // ,token: genToken,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registered successfully, please verify your email",
      error: error,
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // logger("log", req.body);

    const user = await User.findOne({ email });
    if (user) {
      logger("log", "User found", user.email, user.name);
    }

    const receivedPasswordHash = bcrypt.compare(password, user.password);
    // logger("log", receivedPasswordHash);

    if (email === user.email && receivedPasswordHash) {
      // logger("log", "User Logged in");
      res.send(user);
    }
  } catch (error) {
    res.status(401).json(error);

    logger("error", error);
  }
};
export const verifyUser = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ verificationToken: token });
  if (user) {
    // logger("log", "User found", user.name);

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: `${user.name} you're now verified!` });
  }
};
export const resetPassword = async (req, res) => {};
export const flushUsers = async (req, res) => {
  await User.deleteMany({});
  res.status(200).json({ message: "All users flushed successfully" });
};

// discord
// let accessToken;

export const discordLogin = passport.authenticate("discord");

export const discordLoginCallback = (req, res) => {
  // accessToken = req.params.code;
  // logger("log", req.query.code);
  // // accessToken = req.user.accessToken;
  // logger("log", "req.user.accessToken", req.user.accessToken);

  const { user, token } = req.user;
  // logger("log", token);

  // logger("log", "accessToken", accessToken);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none", // 👈 must be 'none' for cross-origin (5173 → 3000)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // path: "/",
  });
  // logger("log","accessToken: " + JSON.stringify(accessToken));

  res.redirect(process.env.FRONTEND_URL);
  res.json({ user, token }).redirect;
  //   res.send(`
  //      <html>
  //      <body>
  //        <p>You have been authenticated with this platform. You can close the window now.</p>
  //        <script>
  //          // Pass the access token and status to the parent window
  //          console.log(accessToken);
  //          window.open.postMessage({ token: ${JSON.stringify(
  //            accessToken
  //          )}, status: "Login successful" }, "*");

  //          // Close the window after a delay
  //          setTimeout(() => {
  //            window.close();
  //          }, 3000); // 3 seconds delay
  //  </body>
  //      </html>
  //    `);
};
export const discordProfile = async (req, res) => {
  if (!accessToken) {
    return res.status(400).send("Access token is required");
  }

  try {
    const response = await fetch(process.env.VITE_DISCORD_API_ENDPOINT + "/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch user data from Discord");
    }

    const userData = await response.json();
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const discordConnections = async (req, res) => {
  if (!accessToken) {
    return res.status(400).send("Access token is required");
  }

  try {
    const response = await fetch(process.env.VITE_DISCORD_API_ENDPOINT + "/users/@me/connections", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // logger("log", "response: " + JSON.stringify(response));

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch user connectins from Discord");
    }

    const userData = await response.json();
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
};
export const discordLogout = async (req, res) => {
  await req.logout((err) => {
    accessToken = null;
    if (err) {
      return next(err);
    }
  });
};
// google

// TODO: 👉 Do you want me to show you a tiny logout route so you can quickly clear cookies between test users? That way switching is just one click instead of manual cookie clearing.
