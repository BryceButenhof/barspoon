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
    units: {
        type: String,
        required: true
    },
    ingredients: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
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
    }
});

export const RecipeModel = mongoose.model('recipes', RecipeSchema);