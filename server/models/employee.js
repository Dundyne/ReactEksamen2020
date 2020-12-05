import mongoose from 'mongoose';
const { Schema } = mongoose;

const EmployeeSchema = new Schema(
    {
        name: {
            type: String,
            required: false
        },
        position: {
            type: String,
        },
        image: {
            //hva skal vi ha med her? sende med imageSchema?
        },
        
    }
)

export default mongoose.model('Employee', EmployeeSchema);