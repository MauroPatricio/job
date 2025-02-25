import express from 'express';
import { isAdmin, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import Booking from "../models/BookingModel.js";

const bookingRouter = express.Router();

// Create a new booking
bookingRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const booking = new Booking(req.body);
            await booking.save();
            res.status(201).json(booking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
);

// Get all bookings
bookingRouter.get(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const bookings = await Booking.find().populate('client provider serviceStatus');
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Get a single booking by ID
bookingRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const booking = await Booking.findById(req.params.id).populate('client provider serviceStatus');
            if (!booking) return res.status(404).json({ message: "Booking not found" });
            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Update a booking by ID
bookingRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!booking) return res.status(404).json({ message: "Booking not found" });
            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Delete a booking by ID
bookingRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const booking = await Booking.findByIdAndDelete(req.params.id);
            if (!booking) return res.status(404).json({ message: "Booking not found" });
            res.status(200).json({ message: "Booking deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

export default bookingRouter;
