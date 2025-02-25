import express from 'express';
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import ServiceStatus from '../models/ServiceStatusModel.js';

const serviceStatusRouter = express.Router();

// Create a new service status
serviceStatusRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const serviceStatus = new ServiceStatus(req.body);
            await serviceStatus.save();
            res.status(201).json(serviceStatus);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
);

// Get all service statuses
serviceStatusRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        try {
            const statuses = await ServiceStatus.find();
            res.status(200).json(statuses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Get a single service status by ID
serviceStatusRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        try {
            const status = await ServiceStatus.findById(req.params.id);
            if (!status) return res.status(404).json({ message: "Service status not found" });
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Update a service status by ID
serviceStatusRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const status = await ServiceStatus.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!status) return res.status(404).json({ message: "Service status not found" });
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Delete a service status by ID
serviceStatusRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const status = await ServiceStatus.findByIdAndDelete(req.params.id);
            if (!status) return res.status(404).json({ message: "Service status not found" });
            res.status(200).json({ message: "Service status deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

export default serviceStatusRouter;
