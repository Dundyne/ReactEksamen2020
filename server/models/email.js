import mongoose from "mongoose";
const { Schema } = mongoose;

const EmailSchema = new Schema(
  {
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
    email: {
        type:String,
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.model("Email", EmailSchema);
