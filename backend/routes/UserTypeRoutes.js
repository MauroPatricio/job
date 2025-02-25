import express from 'express';
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import UserType from '../models/UserTypeModel.js';

const userTypeRouter = express.Router();

// Create a new user type
userTypeRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const userType = new UserType(req.body);
            await userType.save();
            res.status(201).json(userType);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
);

// Get all user types
userTypeRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        try {
            const userTypes = await UserType.find();
            res.status(200).json(userTypes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Get a single user type by ID
userTypeRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        try {
            const userType = await UserType.findById(req.params.id);
            if (!userType) return res.status(404).json({ message: "User type not found" });
            res.status(200).json(userType);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Update a user type by ID
userTypeRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const userType = await UserType.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!userType) return res.status(404).json({ message: "User type not found" });
            res.status(200).json(userType);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Delete a user type by ID
userTypeRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const userType = await UserType.findByIdAndDelete(req.params.id);
            if (!userType) return res.status(404).json({ message: "User type not found" });
            res.status(200).json({ message: "User type deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

export default userTypeRouter;
