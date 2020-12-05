import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Fyll ut epost'],
      unique: true, // unique index and value
      match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Eposten er ikke gyldig'],
    },
    password: {
      type: String,
      required: [true, 'Fyll ut passord'],
      minlength: [4, 'Passordet må minmum bestå av 4 verdier'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: 'Rolle ikke fylt ut',
      },
      default: 'user',
      required: false
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const User = mongoose.model('User', UserSchema);

export default User;