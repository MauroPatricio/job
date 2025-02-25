import express from 'express';
import { isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import Review from '../models/ReviewModel.js';

const reviewRouter = express.Router();

// Create a new review
reviewRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const review = new Review(req.body);
            await review.save();
            res.status(201).json(review);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
);

// Get all reviews
reviewRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        try {
            const reviews = await Review.find().populate('client provider booking');
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Get a single review by ID
reviewRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        try {
            const review = await Review.findById(req.params.id).populate('client provider booking');
            if (!review) return res.status(404).json({ message: "Review not found" });
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Update a review by ID
reviewRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!review) return res.status(404).json({ message: "Review not found" });
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Delete a review by ID
reviewRouter.delete(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const review = await Review.findByIdAndDelete(req.params.id);
            if (!review) return res.status(404).json({ message: "Review not found" });
            res.status(200).json({ message: "Review deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

export default reviewRouter;
