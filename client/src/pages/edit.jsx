import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RecipeForm from '../components/recipeForm.jsx';
import NotFound from '../components/notFound.jsx';
import cookies from 'js-cookie';

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
        ],
        ingredientString: ''
    };

    const [ recipe, setRecipe ] = useState(blankRecipe);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();
    const { slug } = useParams();

    const decodeIngredients = ingredients => {
        let ingredientString = '';
        ingredients.forEach(ingredient => {
            ingredientString += `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}\n`
        });
        return ingredientString.trim();
    }

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

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/recipes/${slug}`);
                setRecipe({
                    ...response.data, 
                    ingredients: response.data.ingredients.map(ingredient => {
                        return {
                            ...ingredient,
                            id: uuid()
                        };
                    }),
                    ingredientString: decodeIngredients(response.data.ingredients)
                });
                setLoading(false);
            } catch (err) {
                setRecipe({});
                setLoading(false);
                console.log(err);
            }
        };
        
        fetchRecipe();
    }, [slug]);

    const saveRecipe = async (recipe) => {
        try {
            const headers = { headers: {"Authorization" : `Bearer ${cookies.get("token")}`}};
            await axios.patch(`${import.meta.env.VITE_BACKEND_URI}/recipes/${slug}`, { ...recipe, ingredients: encodeIngredients(recipe.ingredientString)}, headers);
            toast.success('Recipe edited successfully!');            
            navigate('/');
        } catch (error) {
            toast.error('Recipe edit failed...')
            console.log(error);
        }
    };

    if (loading) {
        return null;
    }

    if (Object.keys(recipe).length === 0) {
        return <NotFound />;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="mx-4 w-full md:mx-0 md:w-1/2">
                <p className="text-3xl font-bold m-12 text-center">Edit Recipe</p>
                <RecipeForm recipe={recipe} setRecipe={setRecipe} saveRecipe={saveRecipe} />
            </div>
        </div>
    );
};

export default Edit;