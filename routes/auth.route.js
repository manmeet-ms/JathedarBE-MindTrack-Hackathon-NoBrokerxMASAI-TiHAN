import express from "express";
import passport from "passport";
import {
  discordLogin,
  discordLoginCallback,
  discordLogout,
  discordProfile,
  flushUsers,
  loginUser,
  registerUser,
  resetPassword,
  verifyUser,
} from "../controllers/auth.controller.js";
import {
  authenticateJWT,
  checkUserExists,
  requireAuthentication,
} from "../middlewares/auth.middleware.js";
 
const router = express.Router();
// raw db routes

router.post(
  "/register",
  // checkUserExists,
  registerUser
);
router.post("/login", checkUserExists, requireAuthentication, loginUser);
router.post("/password/reset", resetPassword);
router.get("/verify/:token", verifyUser);
router.post("/flush", flushUsers);

/*
returns {user, jwt token}
 */
router.get("/me", authenticateJWT, (req, res) => {
  // logger("log",{
  //   user: req.user, // comes from decoded JWT (id, username, role, etc.)
  //   token: req.cookies.token, // return token from cookie if needed
  // })
  res.json({
    user: req.user, // comes from decoded JWT (id, username, role, etc.)
    // token: req.cookies.token, // return token from cookie if needed
  });
});

// discord auth routes
router.get("/discord/login", discordLogin);
router.get(
  "/discord/callback",
  passport.authenticate("discord", { session: false, failureRedirect: "/" }),
  discordLoginCallback
);
router.get("/discord/profile", discordProfile); // to be migrated in user routes
router.get("/discord/logout", discordLogout);
// router.get("/discord/connections",discordConnections) // to be migrated in user routes

// google auth routes

export default router;
