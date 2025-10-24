import express from 'express';
import { getPublicVapidKey, saveSubscription, testNotify, triggerNotification } from '../controllers/notification.controller.js';
 
const router = express.Router();

router.post('/subscribe', saveSubscription);
router.post('/test', testNotify);
router.post('/trigger', triggerNotification);
router.get("/public-key", getPublicVapidKey);
export default router;
