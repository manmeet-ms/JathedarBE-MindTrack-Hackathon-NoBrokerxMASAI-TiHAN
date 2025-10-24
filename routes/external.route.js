import express from "express";
import {
gTailscaleDevices,
gDiscordThreadMessages,
gDiscordChannelMessages,
gDiscordSingleMessage,
gDollarRate
} from "../controllers/external.controller.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";

const router = express.Router();

router.get("/tailscale/devices", gTailscaleDevices);
router.get("/discord/thread/:threadId",
    cacheMiddleware("discordThreadMessages", 8 * 60 * 60) ,
    gDiscordThreadMessages);
router.get("/discord/channel/:channelId",
    cacheMiddleware("discordChannelMessages", 8 * 60 * 60) ,
     gDiscordChannelMessages);
router.get("/discord/channel/:channelId/message/:messageId",
    cacheMiddleware("discordSingleMessage", 8 * 60 * 60) ,
     gDiscordSingleMessage);
router.get("/dollar-rate",cacheMiddleware("dollarRate", 1 * 60 * 60) , gDollarRate);

export default router;
