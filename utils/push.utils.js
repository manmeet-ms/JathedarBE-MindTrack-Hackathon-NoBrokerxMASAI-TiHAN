// backend/utils/push.js
// TODO: production me fat sakti hai
 
import webpush from "web-push";
import "dotenv/config";
import PushSubscription from "../models/PushSubscription.model.js";

if (!process.env.VITE_WEBPUSH_PUBLIC_KEY || !process.env.VITE_WEBPUSH_PRIVATE_KEY) {
  console.error("VAPID keys are missing from environment variables.");
  throw new Error("VAPID keys are missing from environment variables.");
}
webpush.setVapidDetails(
  `mailto:${process.env.VITE_WEBPUSH_EMAIL}`,
  process.env.VITE_WEBPUSH_PUBLIC_KEY,
  process.env.VITE_WEBPUSH_PRIVATE_KEY,
  
);
 

export const sendNotification = async (subscription, payload) => {
  try {
  await webpush.sendNotification(subscription, JSON.stringify(payload));
} catch (err) {
  if (err.statusCode === 410 || err.statusCode === 404) {
    console.log("Subscription expired, removing:", subscription.endpoint);
    await PushSubscription.deleteOne({ endpoint: subscription.endpoint });
  } else {
    console.error("Push error", err);
  }
}
  // say.speak(payload.title+payload.body,"Microsoft Zira Desktop", 1.0, (err) => {
  // if (err) {
  //   return console.error("Error:", err);
  // }
  // console.log("Finished speaking with Zira");
// });
  
  // logger("log",payload)

  
};
