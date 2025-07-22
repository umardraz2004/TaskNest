import mongoose from "mongoose";

const nestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Nest = mongoose.model("Nest", nestSchema);
export default Nest;
