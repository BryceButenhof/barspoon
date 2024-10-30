import mongoose from 'mongoose';
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    ingredients: [
        {
            name: {
                type: String,
                required: true
            },
            note: {
                type: String,
                required: false
            },
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            }
        }
    ],
    instructions: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    slug: {
        type: String,
        required: true,
    }
});

export const RecipeModel = mongoose.model('recipes', RecipeSchema);