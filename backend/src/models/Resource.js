import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["hospital", "shelter", "police"],
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    availability: {
      type: String,
      enum: ["available", "limited", "full"],
      default: "available"
    }
  },
  { timestamps: true }
);

resourceSchema.index({ latitude: 1, longitude: 1 });

export default mongoose.model("Resource", resourceSchema);
