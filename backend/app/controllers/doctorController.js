import {
  createDoctorService,
  getDoctorsService,
  getDoctorService,
  updateDoctorService,
  deleteDoctorService,
} from "../services/doctorService.js";
import validateDoctor from "../validators/doctorValidator.js";

export const createDoctor = async (req, res) => {
  validateDoctor(req.body);

  const doctor = await createDoctorService(req.body);

  res.status(201).json({
    success: true,
    message: "Doctor created successfully",
    data: doctor,
  });
};

export const getDoctors = async (req, res) => {
  const doctors = await getDoctorsService(req.query);

  res.status(200).json({
    success: true,
    data: doctors,
  });
};

export const getDoctor = async (req, res) => {
  const doctor = await getDoctorService(req.params.doctorId);

  res.status(200).json({
    success: true,
    data: doctor,
  });
};

export const updateDoctor = async (req, res) => {
  const doctor = await updateDoctorService(req.params.doctorId, req.body);

  res.status(200).json({
    success: true,
    message: "Doctor updated successfully",
    data: doctor,
  });
};

export const deleteDoctor = async (req, res) => {
  const doctor = await deleteDoctorService(req.params.doctorId);

  res.status(200).json({
    success: true,
    message: "Doctor deleted successfully",
    data: doctor,
  });
};
