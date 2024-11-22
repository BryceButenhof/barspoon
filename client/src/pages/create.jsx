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
        ],
        ingredientString: ''
    };

    const [recipe, setRecipe] = useState(blankRecipe);
    const navigate = useNavigate();

    const encodeIngredients = ingredientString => {
        const inputs = ingredientString.split('\n');
        return inputs.map(input => {
            let splitInput = input.split(' ');
            if (splitInput.length > 2) {
                splitInput = [...splitInput.splice(0, 2), splitInput.join(' ')];
                return {
                    quantity: splitInput[0],
                    unit: splitInput[1],
                    name: splitInput[2]
                };
            }
        }).filter(x => !!x);
    }

    const saveRecipe = async (recipe) => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URI}/recipes`, { ...recipe, ingredients: encodeIngredients(recipe.ingredientString)});
            toast.success('Recipe created successfully!');            
            navigate('/');
        } catch (error) {
            toast.error('Recipe creation failed...')
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="mx-4 w-full md:mx-0 md:w-1/2">
                <p className="text-3xl font-bold m-12 text-center">Create Recipe</p>
                <RecipeForm recipe={recipe} setRecipe={setRecipe} saveRecipe={saveRecipe}/>
            </div>
        </div>
    );
};

export default Create;