import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    specialization: {
      type: String,
      trim: true,
      required: true,
    },
    hospital: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

doctorSchema.index({ name: 1 });
doctorSchema.index({ createdAt: -1 });

const Doctors = mongoose.model("Doctors", doctorSchema);

export default Doctors;
