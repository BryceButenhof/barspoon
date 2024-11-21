import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const defaultImgUrl = 'https://i.etsystatic.com/19543171/r/il/3d2d17/5752287345/il_fullxfull.5752287345_gb9t.jpg';
    const [ recipes, setRecipes ] = useState([]);
    const [ filteredRecipes, setFilteredRecipes ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/recipes`);
                setRecipes(response.data);
                setFilteredRecipes(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipes();
    }, []);

    const filterRecipes = (filter) => {
        setFilteredRecipes(recipes.filter((recipe => recipe.name.toLowerCase().includes(filter.toLowerCase()))));
    };

    const getIngredientsDisplay = (recipe) => {
        return recipe.ingredients.map(ingredient => ingredient.name).join(', ');
    };

    const NoResults = () => {
        if (filteredRecipes.length > 0) {
            return null;
        }

        return (
            <li>
                <p>No Results</p>
            </li>
        );
    };

    if (loading) {
        return null;
    }

    return (
        <div className="px-4 w-screen">
            <h1 className="text-3xl font-bold m-12 text-center">
            	Recipes
            </h1>
            <div className="flex justify-center">
                <input type="text" className="border text-md rounded-lg block w-96 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    placeholder="Search" onChange={(e) => filterRecipes(e.target.value)}/>
            </div>
            <ul className="flex flex-wrap justify-center gap-6 mt-12">
                {filteredRecipes.map((recipe) => (
                    <li key={recipe._id} className="border bg-gray-700 border-gray-600 rounded-lg p-4 cursor-pointer w-96" onClick={() => navigate(`/${recipe.slug}`)}>
                        <img src={recipe.imageUrl || defaultImgUrl} alt={recipe.name} className="w-full h-60 object-cover mb-4 rounded-lg" />
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">{recipe.name}</h2>
                        </div>
                        <p className="my-4 italic">{recipe.description}</p>
                        <p className="my-4">{getIngredientsDisplay(recipe)}</p>
                    </li>
                ))}
                <NoResults />
            </ul>
            <div className="h-8"></div>
        </div>
    );
};

export default Home;