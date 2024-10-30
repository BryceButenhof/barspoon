import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const imgUrl = 'https://tinyurl.com/mai-tai-photo';
    const [ recipes, setRecipes ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:5050/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipes();
    }, []);

    const getIngredientsDisplay = (recipe) => {
        return recipe.ingredients.map(ingredient => ingredient.name).join(', ');
    };

    return (
        <div className="container mx-auto px-4 h-screen w-screen">
            <h1 className="text-3xl font-bold m-12 text-center">
            	Recipes
            </h1>

            <ul className="flex flex-wrap justify-center gap-6 m-10">
                {recipes.map((recipe) => (
                    <li key={recipe._id} className="border border-gray-300 rounded-md p-4 shadow-lg cursor-pointer max-w-sm" onClick={() => navigate(`/${recipe.slug}`)}>
                        <img src={recipe.imageUrl || imgUrl} alt={recipe.name} className="w-full h-60 object-cover mb-4 rounded-md" />
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">{recipe.name}</h2>
                        </div>
                        <p className="my-4 italic">{recipe.description}</p>
                        <p className="my-4">{getIngredientsDisplay(recipe)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;