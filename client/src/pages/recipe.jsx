import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const Recipe = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [ recipe, setRecipe ] = useState({});
    const defaultImgUrl = 'https://i.etsystatic.com/19543171/r/il/3d2d17/5752287345/il_fullxfull.5752287345_gb9t.jpg';

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5050/recipes/${slug}`);
                setRecipe(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchRecipe();
    }, [slug]);

    const getFormattedIngredients = (ingredient) => {
        return `${ingredient.quantity} ${ingredient.unit || recipe.units} ${ingredient.name}`;
    };

    const deleteRecipe = async () => {
        try {
            await axios.delete(`http://localhost:5050/recipes/${recipe.slug}`);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <>
            <p className="text-3xl font-bold m-12 text-center cursor-pointer" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} size="xs"/> Back
            </p>
            <div className="flex items-center justify-center">
                <div className="container mx-auto w-96">
                    <div className="border border-gray-300 rounded-md p-4 shadow-lg">
                        <img src={recipe.imageUrl || defaultImgUrl} alt={recipe.name} className="w-full h-60 object-cover mb-4 rounded-md" />
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
                    <div>
                        <button className="float-right mt-2 mb-24 p-2.5 text-md rounded-lg bg-red-500 border-red-600 text-white" onClick={() => deleteRecipe()}>Delete Recipe</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Recipe;
