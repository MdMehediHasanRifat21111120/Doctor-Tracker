import Doctors from "../models/Doctors.js";
import AppError from "../utils/AppError.js";

export const createDoctorService = async (doctorData) => {
  const { name, specialization, hospital, phone, email } = doctorData;

  const existingDoctor = await Doctors.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingDoctor) {
    throw new AppError("Doctor with this email or phone already exists", 409);
  }

  const doctor = await Doctors.create({
    name,
    specialization,
    hospital,
    phone,
    email,
  });

  return doctor;
};

export const getDoctorsService = async (queryParams) => {
  const page = Number(queryParams.page) || 1;
  const limit = Math.min(Number(queryParams.limit) || 2, 2);
  const skip = (page - 1) * limit;

  const doctors = await Doctors.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalDoctors = await Doctors.countDocuments();
  const totalPages = Math.ceil(totalDoctors / limit);

  return {
    doctors,
    pagination: {
      page,
      limit,
      totalDoctors,
      totalPages,
    },
  };
};

export const getDoctorService = async (doctorId) => {
  const doctor = await Doctors.findById(doctorId);

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  return doctor;
};

export const updateDoctorService = async (doctorId, doctorData) => {
  const doctor = await Doctors.findById(doctorId);

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  const updatedDoctor = await Doctors.findByIdAndUpdate(doctorId, doctorData, {
    new: true,
    runValidators: true,
  });

  return updatedDoctor;
};

export const deleteDoctorService = async (doctorId) => {
  const doctor = await Doctors.findById(doctorId);

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  await Doctors.findByIdAndDelete(doctorId);

  return doctor;
};
