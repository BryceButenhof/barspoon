import mongoose from 'mongoose';
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [
        {
            type: String,
            required: true
        },
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