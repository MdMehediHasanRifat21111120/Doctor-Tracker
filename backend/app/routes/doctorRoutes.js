import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminOnly.js";

import {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

// Create doctor
router.post("/", authMiddleware, adminOnly, createDoctor);

// Get all doctors
router.get("/", authMiddleware, adminOnly, getDoctors);

// Get single doctor
router.get("/:doctorId", authMiddleware, adminOnly, getDoctor);

// Update doctor
router.put("/:doctorId", authMiddleware, adminOnly, updateDoctor);

// Delete doctor
router.delete("/:doctorId", authMiddleware, adminOnly, deleteDoctor);

export default router;
