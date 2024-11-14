import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RecipeForm from '../components/recipeForm.jsx';

const Edit = () => {
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
    const { slug } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5050/recipes/${slug}`);
                setRecipe({
                    ...response.data, 
                    ingredients: response.data.ingredients.map(ingredient => {
                        return {
                            ...ingredient,
                            id: uuid()
                        };
                    })
                });
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchRecipe();
    }, [slug]);

    const saveRecipe = async (recipe) => {
        try {
            await axios.patch(`http://localhost:5050/recipes/${slug}`, recipe);
            toast.success('Recipe edited successfully!');            
            navigate('/');
        } catch (error) {
            toast.error('Recipe edit failed...')
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="container mx-auto w-5/6 md:w-1/2">
                <p className="text-3xl font-bold m-12 text-center">Edit Recipe</p>
                <RecipeForm recipe={recipe} setRecipe={setRecipe} saveRecipe={saveRecipe} />
            </div>
        </div>
    );
};

export default Edit;