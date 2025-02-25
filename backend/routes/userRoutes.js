import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin, generateToken, sendSMSToUSendIt } from '../utils.js';
import User from '../models/UserModel.js';

const userRouter = express.Router();

// Registro de usuário
userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    try {
      const { name, email, password, phoneNumber, userType, province } = req.body;
      const userExists = await User.findOne({ email });

      if (userExists) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = bcrypt.hashSync(password, 8);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        userType,
        province,
      });

      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
);

// Login do usuário
userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          isBanned: user.isBanned,
          isApproved: user.isApproved,
          userType: user.userType,
          province: user.province,
          token: generateToken(user),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

// Obter todos os usuários (Admin)
userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const users = await User.find().populate('userType province');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

// Obter usuário por ID
userRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('userType province');
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

// Atualizar perfil
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

// Excluir usuário (Admin)
userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

export default userRouter;
