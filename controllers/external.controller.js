import axios from "axios";
import logger from ".././utils/logger.utils.js";

const discordBotToken = process.env.DISCORD_JATHEDAR_BOT_TOKEN;
// const discordBotToken = import.meta.env.VITE_DISCORD_BOT_TOKEN;
const discordApiBaseUrl = "https://discord.com/api/v10";

export const gTailscaleDevices = async (req, res) => {
  try {
    const result = await axios.get(
      "https://api.tailscale.com/api/v2/tailnet/manmeet-ms.github/devices",
      {
        headers: {
          Authorization: `Bearer ${process.env.ONLINE_DEVICES_TAILSCALE}`,
        },
      }
    );
    // logger("success",result.data);

    res.send(result.data);
  } catch (error) {
    logger("error",error);
  }
};
export const gDiscordChannelMessages = async (req, res) => {
  try {
    const { channelId } = req.params;
    const result = await axios.get(
      `${discordApiBaseUrl}/channels/${channelId}/messages`,
      {
        headers: {
          Authorization: `Bot ${discordBotToken}`,
        },
      }
    );
    res.send(result.data);
    // logger("success",result.data);

  } catch (error) {
    res.send(error.message);
    console.error(error.message);
  }
};
export const gDiscordThreadMessages = async (req, res) => {
  try {
    const { threadId } = req.params;
 
    const result = await axios.get(
      `${discordApiBaseUrl}/channels/${threadId}/messages`,
      {
        headers: {
          Authorization: `Bot ${discordBotToken}`,
        },
      }
    );
    res.json(result.data);
    // logger("success",result.data);
    result.data;
  } catch (error) {
    res.send(error.message);
    console.error(error.message);
  }
};
export const gDiscordSingleMessage = async (req, res) => {
  try {
    const { channelId, messageId } = req.params;
 
    const result = await axios.get(
      `${discordApiBaseUrl}/channels/${channelId}/messages/${messageId}`,
      {
        headers: {
          Authorization: `Bot ${discordBotToken}`,
        },
      }
    );
    res.send(result.data);
    logger("log",
      "under external.controller :: gDiscordSingleMessage",
      result.data
    );
  } catch (error) {
    res.send(error.message);
    console.error(error.message);
  }
};
export const gDollarRate = async (req, res) => {
  try {
    res.send("result.data");
  } catch (error) {
    logger("error",error);
  }
};
