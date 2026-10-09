import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    phone: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },

    condition: {
      type: String,
      trim: true,
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctors",
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

patientSchema.index({ doctor: 1 });
patientSchema.index({ createdAt: -1 });
patientSchema.index({ condition: 1 });

const Patients = mongoose.model("Patients", patientSchema);

export default Patients;
