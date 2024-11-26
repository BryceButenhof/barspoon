import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardContainer from '../components/cardContainer';

const Home = () => {
    const [ recipes, setRecipes ] = useState([]);
    const [ filteredRecipes, setFilteredRecipes ] = useState([]);
    const [ loading, setLoading ] = useState(true);

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
            <CardContainer recipes={filteredRecipes} />
            <div className="h-8"></div>
        </div>
    );
};

export default Home;