import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { toast } from "react-toastify";
import ConfirmDelete from '../components/confirmDelete';
import NotFound from '../components/notFound';
import cookies from 'js-cookie';

const Recipe = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [ recipe, setRecipe ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ showConfirm, setShowConfirm ] = useState(false);
    const defaultImgUrl = 'https://i.etsystatic.com/19543171/r/il/3d2d17/5752287345/il_fullxfull.5752287345_gb9t.jpg';

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/recipes/${slug}`);
                setRecipe(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
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
            const headers = { headers: {"Authorization" : `Bearer ${cookies.get("token")}`}};
            await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/recipes/${recipe.slug}`, headers);
            toast.success('Recipe successfully deleted');
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    const editRecipe = async () => {
        navigate('edit');
    };

    const onCancel = () => {
        setShowConfirm(false);
    };
    
    if (loading) {
        return null;
    }

    if (Object.keys(recipe).length === 0) {
        return <NotFound />;
    }

    const getButtons = () => {
        if (cookies.get("token")) {
            return (
                <div className="mt-4">
                    <button className="float-right p-2.5 text-md rounded-lg bg-red-500 text-white w-24" onClick={() => setShowConfirm(true)}>
                        Delete
                    </button>
                    <button className="float-right mr-2 p-2.5 text-md rounded-lg bg-blue-500 text-white w-24" onClick={() => editRecipe()}>
                        Edit
                    </button>
                </div>
            );
        } else {
            return null;
        }
    };
    
    return (
        <>
            <p className="text-3xl font-bold m-12 text-center cursor-pointer" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} size="xs"/> Back
            </p>
            <div className="px-4 w-full">
                <div className="flex items-center justify-center">
                    <div className="border bg-gray-700 border-gray-600 rounded-lg p-4 cursor-pointer max-w-96">
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
                        {getButtons()}
                    </div>
                </div>
            </div>
            <ConfirmDelete recipeName={recipe.name} showConfirm={showConfirm} onCancel={onCancel} onDelete={deleteRecipe} />
        </>
    );
};

export default Recipe;
