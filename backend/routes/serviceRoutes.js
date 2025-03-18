import express from 'express';
import { isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import Service from '../models/ServiceModel.js';

const serviceRouter = express.Router();

// Create a new service
serviceRouter.post(
    '/',
    // isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const service = new Service({
                 category: req.body.category,
                 name:  req.body.name,
                 description:  req.body.description,
                 img:  req.body.img,
                 icon: req.body.icon,
            });
            await service.save();
            res.status(201).json(service);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
);

// Get all services
serviceRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        try {
            const services = await Service.find().populate('category');
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Get a single service by ID
serviceRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        try {
            const service = await Service.findById(req.params.id).populate('category provider province');
            if (!service) return res.status(404).json({ message: "Service not found" });
            res.status(200).json(service);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Update a service by ID
serviceRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!service) return res.status(404).json({ message: "Servico nao encontrado" });
            res.status(200).json(service);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Delete a service by ID
serviceRouter.delete(
    '/:id',
    // isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const service = await Service.findByIdAndDelete(req.params.id);
            if (!service) return res.status(404).json({ message: "Servico nao encontrado" });
            res.status(200).json({ message: "Servico removido com sucesso" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

export default serviceRouter;
