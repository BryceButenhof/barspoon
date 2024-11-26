import mongoose from 'mongoose';
const { Schema } = mongoose;

const MenuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    sections: [
        {
            name: {
                type: String,
                required: true
            },
            recipes: [
                {
                    type: String
                }
            ]
        }
    ],
    slug: {
        type: String,
        required: true,
    }
});

export const MenuModel = mongoose.model('menus', MenuSchema);