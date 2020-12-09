import mongoose from 'mongoose';
const { Schema } = mongoose;

const ArticleSchema = new Schema(
    {
        
        title: {
            type: String,
            required: false
        },
        ingress: {
            type: String,
            required: false
        },
        content: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: false
        },
        author: {
            type: String,
            required: false
        },
        category:{
            type: String,
            required: false
        },
        clicks: {
            type: Number,
            required: false
        },
        admin: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: false,
        },
        secrets: {
            type: Boolean,
            required: false
        },
    },
        
        { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)
ArticleSchema.index({
    name: 'text',
    price: 'text',
  });

export default mongoose.model('Article', ArticleSchema);
//tittel - bruker skal skrive in dette selv
//ingress - 
//innhold
//dato
//forfatter - skal velge forfatter fra en statisk liste - Lars Larsen, Gunn Gundersen, Simen Simensen
//kategori - velges fra en statisk liste - skal kunne også legge til shit i denne lista..... 
