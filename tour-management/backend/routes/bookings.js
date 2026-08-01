
import express from 'express';
import { createBooking, getBooking, getAllBooking, } from '../controllers/bookingController.js';

import { verifyToken, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();


router.post("/", verifyToken, createBooking);
router.get("/:id", verifyToken, getBooking);
router.get("/", verifyAdmin, getAllBooking);

export default router;
