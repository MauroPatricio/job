import express from 'express';
import { isAdmin, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import DocumentType from "../models/DocumentTypeModel.js";

const documentRouter = express.Router();

// Create a new document type
documentRouter.post(
    '/',
    isAuth, 
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const documentType = new DocumentType(req.body);
            await documentType.save();
            res.status(201).json(documentType);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
);

// Get all document types
documentRouter.get(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const documentTypes = await DocumentType.find();
            res.status(200).json(documentTypes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Get a single document type by ID
documentRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const documentType = await DocumentType.findById(req.params.id);
            if (!documentType) return res.status(404).json({ message: "Document Type not found" });
            res.status(200).json(documentType);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Update a document type by ID
documentRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const documentType = await DocumentType.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!documentType) return res.status(404).json({ message: "Document Type not found" });
            res.status(200).json(documentType);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

// Delete a document type by ID
documentRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        try {
            const documentType = await DocumentType.findByIdAndDelete(req.params.id);
            if (!documentType) return res.status(404).json({ message: "Document Type not found" });
            res.status(200).json({ message: "Document Type deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
);

export default documentRouter;
