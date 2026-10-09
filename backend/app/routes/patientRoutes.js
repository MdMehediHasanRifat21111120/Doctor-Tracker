import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminOnly.js";

import {
  createPatient,
  getPatients,
  getPatient,
  getDoctorPatients,
  updatePatient,
  deletePatient,
  deleteDoctorPatient,
} from "../controllers/patientController.js";

const router = express.Router();

// Get all patients
router.get("/", authMiddleware, adminOnly, getPatients);

// Get single patient
router.get("/:patientId", authMiddleware, adminOnly, getPatient);

// Update patient
router.put("/:patientId", authMiddleware, adminOnly, updatePatient);

// Delete patient
router.delete("/:patientId", authMiddleware, adminOnly, deletePatient);

// Get patients belonging to a doctor
router.get("/doctor/:doctorId", authMiddleware, adminOnly, getDoctorPatients);

// Create patient under a doctor
router.post("/doctor/:doctorId", authMiddleware, adminOnly, createPatient);

// Delete patient from a specific doctor
router.delete(
  "/doctor/:doctorId/:patientId",
  authMiddleware,
  adminOnly,
  deleteDoctorPatient,
);

export default router;
