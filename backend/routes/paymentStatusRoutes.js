import express from 'express';
import { isAdmin, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import PaymentStatus from "../models/PaymentStatusModel.js";

const paymentStatusRouter = express.Router();

// Create a new payment status
paymentStatusRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const paymentStatus = new PaymentStatus(req.body);
            await paymentStatus.save();
            res.status(201).json(paymentStatus);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
);

// Get all payment statuses
paymentStatusRouter.get(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const statuses = await PaymentStatus.find();
            res.status(200).json(statuses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Get a single payment status by ID
paymentStatusRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const status = await PaymentStatus.findById(req.params.id);
            if (!status) return res.status(404).json({ message: "Payment status not found" });
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Update a payment status by ID
paymentStatusRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const status = await PaymentStatus.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!status) return res.status(404).json({ message: "Payment status not found" });
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Delete a payment status by ID
paymentStatusRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const status = await PaymentStatus.findByIdAndDelete(req.params.id);
            if (!status) return res.status(404).json({ message: "Payment status not found" });
            res.status(200).json({ message: "Payment status deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

export default paymentStatusRouter;
