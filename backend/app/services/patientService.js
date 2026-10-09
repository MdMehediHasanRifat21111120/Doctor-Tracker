import Patients from "../models/Patients.js";
import Doctors from "../models/Doctors.js";
import AppError from "../utils/AppError.js";

// Create patient under a specific doctor
export const createPatientService = async (doctorId, patientData) => {
  const doctor = await Doctors.findById(doctorId);

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  const existingPatient = await Patients.findOne({
    doctor: doctorId,
    $or: [{ email: patientData.email }, { phone: patientData.phone }],
  });

  if (existingPatient) {
    throw new AppError(
      "Patient with this email or phone already exists for this doctor",
      409,
    );
  }

  const patient = await Patients.create({
    ...patientData,
    doctor: doctorId,
  });

  return patient;
};

// Get all patients
export const getPatientsService = async () => {
  const patients = await Patients.find()
    .populate("doctor", "name specialization")
    .sort({ createdAt: -1 });

  return patients;
};

// Get a single patient
export const getPatientService = async (patientId) => {
  const patient = await Patients.findById(patientId).populate(
    "doctor",
    "name specialization",
  );

  if (!patient) {
    throw new AppError("Patient not found", 404);
  }

  return patient;
};

// Get all patients belonging to a specific doctor
export const getDoctorPatientsService = async (doctorId) => {
  const doctor = await Doctors.findById(doctorId);

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  const patients = await Patients.find({ doctor: doctorId }).sort({
    createdAt: -1,
  });

  return patients;
};

// Update patient
export const updatePatientService = async (patientId, patientData) => {
  const patient = await Patients.findById(patientId);

  if (!patient) {
    throw new AppError("Patient not found", 404);
  }

  const updatedPatient = await Patients.findByIdAndUpdate(
    patientId,
    patientData,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedPatient;
};

// Delete patient
export const deletePatientService = async (patientId) => {
  const patient = await Patients.findById(patientId);

  if (!patient) {
    throw new AppError("Patient not found", 404);
  }

  await Patients.findByIdAndDelete(patientId);

  return patient;
};

// Delete patient from a specific doctor's patient list
export const deleteDoctorPatientService = async (doctorId, patientId) => {
  const patient = await Patients.findOneAndDelete({
    _id: patientId,
    doctor: doctorId,
  });

  if (!patient) {
    throw new AppError("Patient not found for this doctor", 404);
  }

  return patient;
};
