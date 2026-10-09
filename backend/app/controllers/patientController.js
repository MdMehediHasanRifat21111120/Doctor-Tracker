import validatePatient from "../validators/patientValidator.js";

import {
  createPatientService,
  getPatientsService,
  getPatientService,
  getDoctorPatientsService,
  updatePatientService,
  deletePatientService,
  deleteDoctorPatientService,
} from "../services/patientService.js";

// Create patient under a doctor
export const createPatient = async (req, res) => {
  validatePatient(req.body);

  const patient = await createPatientService(req.params.doctorId, req.body);

  res.status(201).json({
    success: true,
    message: "Patient created successfully",
    data: patient,
  });
};

// Get all patients
export const getPatients = async (req, res) => {
  const patients = await getPatientsService();

  res.status(200).json({
    success: true,
    data: patients,
  });
};

// Get single patient
export const getPatient = async (req, res) => {
  const patient = await getPatientService(req.params.patientId);

  res.status(200).json({
    success: true,
    data: patient,
  });
};

// Get patients of a specific doctor
export const getDoctorPatients = async (req, res) => {
  const patients = await getDoctorPatientsService(req.params.doctorId);

  res.status(200).json({
    success: true,
    data: patients,
  });
};

// Update patient
export const updatePatient = async (req, res) => {
  validatePatient(req.body);

  const patient = await updatePatientService(req.params.patientId, req.body);

  res.status(200).json({
    success: true,
    message: "Patient updated successfully",
    data: patient,
  });
};

// Delete patient
export const deletePatient = async (req, res) => {
  const patient = await deletePatientService(req.params.patientId);

  res.status(200).json({
    success: true,
    message: "Patient deleted successfully",
    data: patient,
  });
};

// Delete patient from a specific doctor
export const deleteDoctorPatient = async (req, res) => {
  const patient = await deleteDoctorPatientService(
    req.params.doctorId,
    req.params.patientId,
  );

  res.status(200).json({
    success: true,
    message: "Patient removed from doctor successfully",
    data: patient,
  });
};
