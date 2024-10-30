import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const imgUrl = 'https://www.foodandwine.com/thmb/12UDMRbfmdAzBt9XJcCa-R2qqQ4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Mai-Tai-Cocktail-FT-BLOG1122-43e6748207e04826b57b8654cedb6bd8.jpg'
    const [recipes, setRecipes] = useState([]);

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

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold m-12 text-center">
            	Recipes
            </h1>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-10 ">
                {recipes.map((recipe) => (
                    <li key={recipe._id} className="border border-gray-300 rounded-md p-4 shadow-lg">
                        <img src={recipe.imageUrl || imgUrl} alt={recipe.name} className="w-full h-60 object-cover mb-4 rounded-md" />
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">{recipe.name}</h2>
                        </div>
                        <p className="text-gray-600 my-4">{recipe.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;