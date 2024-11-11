import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const defaultImgUrl = 'https://i.etsystatic.com/19543171/r/il/3d2d17/5752287345/il_fullxfull.5752287345_gb9t.jpg';
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
                    <li key={recipe._id} className="border border-gray-300 rounded-md p-4 shadow-lg cursor-pointer w-96" onClick={() => navigate(`/${recipe.slug}`)}>
                        <img src={recipe.imageUrl || defaultImgUrl} alt={recipe.name} className="w-full h-60 object-cover mb-4 rounded-md" />
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