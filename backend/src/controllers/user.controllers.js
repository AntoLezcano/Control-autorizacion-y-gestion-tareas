import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../healpers/jwt.js";

export const registro = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.status(201).json({
      _id: userSaved._id,
      name: userSaved.name,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.status(200).json({
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "Cierre de sesión exitoso" });
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};
