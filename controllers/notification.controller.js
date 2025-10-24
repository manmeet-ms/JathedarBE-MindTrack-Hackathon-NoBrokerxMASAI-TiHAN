import PushSubscription from '../models/PushSubscription.model.js';

import { sendNotification } from '../utils/push.utils.js';
import logger from '../utils/logger.utils.js';
let subscriptions = [];


export const saveSubscription = async (req, res) => {
  try {
    const { endpoint, keys } = req.body;
    const existing = await PushSubscription.findOne({ endpoint });

    if (!existing) {
      await PushSubscription.create({ endpoint, keys });
      logger("log","New push subscription saved");
    }

    res.status(201).json({ message: 'Subscription saved' });
  } catch (err) {
    logger("error","Failed to save push subscription:", err);
    res.status(500).json({ error: err.message });
  }
};

export const testNotify = async (req, res) => {
  try {
    // logger("log",req);
    
    const subscription = await PushSubscription.findOne();
    logger("log","subscription found: ",subscription);
    
    if (!subscription) return res.status(404).json({ error: 'No subscriptions found' });

    await sendNotification(subscription, {
      title: "Test Notification",
      body: "If you see this, push is working!"
    });

    res.sendStatus(200);
  } catch (err) {
    logger("error","Failed to send test notification:", err.message);
    res.status(500).json({ error: err.message });
  }
};



export const triggerNotification = async (req, res) => {
  // const { title, body, image, icon } = req.body;
    const subscriptions = await PushSubscription.find();

  if (!subscriptions || subscriptions.length === 0) {
    return res.status(404).json({ error: 'No subscriptions found' });
  }
  for (const sub of subscriptions) {
    try {
      await sendNotification(sub, { ...req.body });
    } catch (err) {
      logger("error",'Push error:', err.message, err.statusCode);
    }
  }

  res.sendStatus(200);
};

export const getPublicVapidKey = (req, res) => {
res.json({ publicKey: process.env.VITE_WEBPUSH_PUBLIC_KEY });
};
 

// controllers/notification.controller.js
