import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { toast } from "react-toastify";

const Recipe = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [ recipe, setRecipe ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const defaultImgUrl = 'https://i.etsystatic.com/19543171/r/il/3d2d17/5752287345/il_fullxfull.5752287345_gb9t.jpg';

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5050/recipes/${slug}`);
                setRecipe(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchRecipe();
    }, [slug]);

    const getFormattedIngredients = (ingredient) => {
        let unit = ingredient.unit;
        if (unit === 'dash' && ingredient.quantity > 1) {
            unit = 'dashes';
        }
        return `${ingredient.quantity} ${unit} ${ingredient.name}`;
    };

    const deleteRecipe = async () => {
        try {
            await axios.delete(`http://localhost:5050/recipes/${recipe.slug}`);
            toast.success('Recipe successfully deleted');
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    const editRecipe = async () => {
        navigate('edit');
    };
    
    if (loading) {
        return null;
    }
    
    return (
        <>
            <p className="text-3xl font-bold m-12 text-center cursor-pointer" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} size="xs"/> Back
            </p>
            <div className="flex items-center justify-center">
                <div className="container mx-auto w-96">
                    <div className="border bg-gray-700 border-gray-600 rounded-lg p-4 cursor-pointer w-96">
                        <img src={recipe.imageUrl || defaultImgUrl} alt={recipe.name} className="w-full h-60 object-cover mb-4 rounded-lg" />
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
                        <button className="float-right mt-2 mb-24 p-2.5 text-md rounded-lg bg-red-500 text-white w-24" onClick={() => deleteRecipe()}>
                            Delete
                        </button>
                        <button className="float-right mt-2 mb-24 mr-2 p-2.5 text-md rounded-lg bg-blue-500 text-white w-24" onClick={() => editRecipe()}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Recipe;
