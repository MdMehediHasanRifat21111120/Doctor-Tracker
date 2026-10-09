import AppError from "../utils/AppError.js";

const validatePatient = (patientData) => {
  const { name, age, gender, phone, email, condition } = patientData;

  if (!name || !name.trim()) {
    throw new AppError("Patient name is required", 400);
  }

  if (age === undefined || age === null || age === "") {
    throw new AppError("Patient age is required", 400);
  }

  if (!Number.isInteger(Number(age)) || Number(age) < 0) {
    throw new AppError("Patient age must be a valid number", 400);
  }

  if (!gender) {
    throw new AppError("Patient gender is required", 400);
  }

  if (!["male", "female", "other"].includes(gender.toLowerCase())) {
    throw new AppError("Invalid gender", 400);
  }

  if (!phone || !phone.trim()) {
    throw new AppError("Patient phone is required", 400);
  }

  if (!email || !email.trim()) {
    throw new AppError("Patient email is required", 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email address", 400);
  }

  if (!condition || !condition.trim()) {
    throw new AppError("Patient condition is required", 400);
  }

  return true;
};

export default validatePatient;
