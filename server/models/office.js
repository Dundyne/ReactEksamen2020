import mongoose from 'mongoose';
const { Schema } = mongoose;

const OfficeSchema = new Schema(
    {
        name: {
            type: String,
            required: false
        },
        number: {
            type: Number,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        }
    }
)

export default mongoose.model('Office', OfficeSchema);