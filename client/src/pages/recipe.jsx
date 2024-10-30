import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const Recipe = () => {
    const { slug } = useParams();
    const [ recipe, setRecipe ] = useState({});
    const imgUrl = 'https://tinyurl.com/mai-tai-photo';

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5050/recipes/${slug}`);
                console.log(response.data.ingredients[0].name);
                setRecipe(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchRecipe();
    }, [slug]);

    const getFormattedIngredients = (ingredient) => {
        return `${ingredient.quantity} ${recipe.units} ${ingredient.name}`;
    };
    
    return (
        <div className="flex items-center justify-center">
            <div className="container mx-auto max-w-sm my-8">
                <div className="border border-gray-300 rounded-md p-4 shadow-lg">
                <img src={recipe.imageUrl || imgUrl} alt={recipe.name} className="w-full h-60 object-cover mb-4 rounded-md" />
                <h1 className="text-3xl font-bold my-8">{recipe.name}</h1>
                <p className="my-4">{recipe.description}</p>
                <p className="my-4 font-bold">Ingredients:</p>
                <ul className="mx-8 my-4 list-disc">
                    {recipe.ingredients?.map((ingredient) => (
                        <li key={ingredient._id}>
                            <p>{getFormattedIngredients(ingredient)}</p>
                        </li>
                    ))}
                </ul>
                <p className="my-4 font-bold">Instructions:</p>
                <p className="my-4">{recipe.instructions}</p>
                </div>
            </div>
        </div>
    );
};

export default Recipe;
