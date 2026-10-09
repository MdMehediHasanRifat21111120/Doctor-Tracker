import AppError from "../utils/AppError.js";

const validateDoctor = (doctorData) => {
  const { name, specialization, hospital, phone, email } = doctorData;

  if (!name || !name.trim()) {
    throw new AppError("Doctor name is required", 400);
  }

  if (!specialization || !specialization.trim()) {
    throw new AppError("Specialization is required", 400);
  }

  if (!hospital || !hospital.trim()) {
    throw new AppError("Hospital is required", 400);
  }

  if (!phone || !phone.trim()) {
    throw new AppError("Phone is required", 400);
  }

  if (!email || !email.trim()) {
    throw new AppError("Email is required", 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email address", 400);
  }

  return true;
};

export default validateDoctor;
