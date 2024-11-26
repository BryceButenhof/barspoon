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
        const result = [];
        const ingredientStrings = ingredientString.split(/\r?\n/).filter(x => !!x);
        ingredientStrings.forEach(x => {
            const ingredient = x.match(/((\d+)?.?\d+)|((?<=\d\s?)\w+)|((?<=\w\s).*)/gi);
            if (ingredient.length === 3) {
                result.push({
                    quantity: ingredient[0],
                    unit: ingredient[1],
                    name: ingredient[2]
                });
            }
        });

        return result;
    }

    const saveRecipe = async (recipe) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URI}/recipes`, { ...recipe, ingredients: encodeIngredients(recipe.ingredientString)});
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