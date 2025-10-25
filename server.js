import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import jwt from "jsonwebtoken";
import { Strategy as DiscordStrategy } from "passport-discord";

// import "./extractRoutes.js";
// // import { getExtractedRoutes } from "./extractRoutes.js";
// import "../src/utils/cron.utils.js";
import logger from "./utils/logger.utils.js"; 

import { connectDB } from "./config/mongodb.js";
import passport from "./config/passport.js";
import { authenticateJWT } from "./middlewares/auth.middleware.js";
import User from "./models/User.model.js";

// routes

// import authRoutes from "./routes/auth.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import pointsRoutes from "./routes/points.routes.js";
import authRoutes from "./routes/auth.route.js";
import externalRoutes from "./routes/external.route.js";
import notificationsRoutes from "./routes/notification.route.js";
import philosophyQuotesRoutes from "./routes/philosopherQuote.route.js";
import punishmentRoutes from "./routes/punishment.route.js";
import ritualRoutes from "./routes/ritual.route.js";
import timeblockRoutes from "./routes/timeblock.route.js" 
import chronosRoutes from "./routes/chronos.route.js";
import urgesRoutes from "./routes/urge.route.js";
import userRoutes from "./routes/user.route.js";
import violationRoutes from "./routes/violation.route.js";


const app = express();

const port =process.env.PORT || process.env.SERVER_PORT || 4000;
// app.use(
//   treblle({
//     apiKey: process.env.TREBLLE_API_KEY,
//     projectId: process.env.TREBLLE_PROJECT_ID,
//   })
// );
app.use(
  // TODO: fix this cors to allow from certain backednad fe routes
  cors({
    origin: true,
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

connectDB();

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_JATHEDAR_CLIENT_ID,
      clientSecret: process.env.DISCORD_JATHEDAR_CLIENT_SECRET,
      callbackURL: `${process.env.VITE_BACKEND_URL}/auth/discord/callback`,
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Upsert user into DB (pseudo-code with Mongoose)
        // console.log(profile);
        // logger("log", accessToken, refreshToken, profile);

        const user = await User.findOneAndUpdate(
          { "provider.discord.discordId": profile.id },
          {
            username: profile.username,
            name: profile.global_name,
            email: profile.email,
            avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`,
            provider: {
              discord: {
                discordId: profile.id,
              },
            },
          },
          { upsert: true, new: true }
        );
        const token = jwt.sign(
          {
            // keep stale data in JWT
            id: user._id,
            role: user.role,
            discordId: user.provider.discord.discordId,
          },
          process.env.JWT_SECRET, // keep this secret safe!
          { expiresIn: "7d" }
        );

        // user.jwt_token=token
        // user.save()
        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is MongoDB _id
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.listen(port,"0.0.0.0", () => logger("info", `Server running on ${port}`));
// Add routes here
app.get("/", (req, res) => res.send({ message: "Welcome to Jathedar" }));

app.get("/api", (req, res) => res.send({ message: "This is /api" }));
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", authenticateJWT, userRoutes);
app.use("/api/timeblocks", authenticateJWT, timeblockRoutes);
app.use("/api/rituals", authenticateJWT, ritualRoutes);
app.use("/api/violations", authenticateJWT, violationRoutes);
app.use("/api/punishments", authenticateJWT, punishmentRoutes);
app.use("/api/analytics", authenticateJWT, analyticsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/chronos",  chronosRoutes);
app.use("/api/urges", authenticateJWT, urgesRoutes);
app.use("/api/philosophy", philosophyQuotesRoutes);
app.use("/api/external", authenticateJWT, externalRoutes);
app.use("/api/points",authenticateJWT, pointsRoutes);

// investigation routes
// app.get("/api/routes", (req, res) => {
//   // const routesData = getExtractedRoutes();
//   logger("info", `Served routes at ${process.env.VITE_BACKEND_URL.replace("api", "")}`, routesData);
//   res.send(routesData);
// });

app.get("/api/jwt-check", authenticateJWT, (req, res) => {
  res.send(req.user);
});

//  TODO having issues make this link click on frontend on protected routes
app.get("/api/cookies", (req, res) => {
  console.log(req.cookies);
  const { token } = req.cookies;
   
  res.json(token); // user comes from JWT
});
app.get("/api/clear-cookies", (req, res) => {
  // req.cookies.remove()
  res.clearCookie("token");
  res.redirect(process.env.FRONTEND_URL);
});

// const sndMsgInDc =2 * 1000;
// let checkCounter = 0;
// setInterval(() => {
//   checkCounter++;
//   // logger("info",dayjs().format("YYYY-MM-DD"))
//   console.log(sndMsgInDc, "checmissedtimeblock", "checkCounter: ", checkCounter);
// console.log("missed timbrunning");

//  checkMissedTimeblocks()
// }, sndMsgInDc); // every 30 minutes
