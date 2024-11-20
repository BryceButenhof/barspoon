import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { v4 as uuid } from 'uuid';
import RecipeForm from "../components/recipeForm.jsx"

const Create = () => {
    const blankRecipe = {
        name: '',
        description: '',
        instructions: '',
        imageUrl: '',
        ingredients: [
            {
                id: uuid(),
                name: '',
                note: '',
                quantity: '',
                unit: 'oz'
            }
        ]
    };

    const [recipe, setRecipe] = useState(blankRecipe);
    const navigate = useNavigate();

    const saveRecipe = async (recipe) => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URI}/recipes`, recipe);
            toast.success('Recipe created successfully!');            
            navigate('/');
        } catch (error) {
            toast.error('Recipe creation failed...')
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="container mx-4 md:mx-0 md:w-1/2">
                <p className="text-3xl font-bold m-12 text-center">Create Recipe</p>
                <RecipeForm recipe={recipe} setRecipe={setRecipe} saveRecipe={saveRecipe}/>
            </div>
        </div>
    );
};

export default Create;