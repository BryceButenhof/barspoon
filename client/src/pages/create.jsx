import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Create = () => {
    const commonLabelStyle = 'block m-2 text-md font-medium text-white';
    const commonInputStyle = 'border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white';
    const ingredientInputStyle = 'border text-md rounded-lg mb-2 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white';

    const blankIngredient = {
        id: uuid(),
        name: '',
        note: '',
        quantity: 0,
        unit: 'oz'
    };
    
    const blankRecipe = {
        name: '',
        description: '',
        instructions: '',
        imageUrl: ''
    };

    const [ingredients, setIngredients] = useState([ blankIngredient ]);
    const [recipe, setRecipe] = useState(blankRecipe);
    const navigate = useNavigate();

    const saveRecipe = async (recipe) => {
        try {
            await axios.post('http://localhost:5050/recipes', recipe);
            toast.success('Recipe created successfully!');            
            navigate('/');
        } catch (error) {
            toast.error('Recipe creation failed...')
            console.log(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const slug = recipe.name.trim().toLowerCase().replace(' ', '-');
        saveRecipe({...recipe, ingredients, slug});
    }

    const addIngredient = () => {
        setIngredients([...ingredients, {...blankIngredient, id: uuid()}]);
    };

    const deleteIngredient = (id) => {
        const newIngredients = ingredients.filter((ingredient) => ingredient.id !== id);
        setIngredients(newIngredients);
    }

    const updateIngredient = (propName, value, id) => {
        const newIngredients = [...ingredients];
        newIngredients.find((ingredient) => ingredient.id === id)[propName] = value;
        setIngredients(newIngredients);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="container mx-auto w-5/6 md:w-1/2">
                <p className="text-3xl font-bold m-12 text-center">Create Recipe</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={commonLabelStyle}>Name</label>
                        <input className={commonInputStyle} type="text" value={recipe.name} onChange={(e) => setRecipe({...recipe, name: e.target.value})} />
                    </div>
                    <div>
                        <label className={commonLabelStyle}>Description</label>
                        <input className={commonInputStyle} type="text" value={recipe.description} onChange={(e) => setRecipe({...recipe, description: e.target.value})} />
                    </div>
                    <div>
                        <label className={commonLabelStyle}>Instructions</label>
                        <input className={commonInputStyle} type="text" value={recipe.instructions} onChange={(e) => setRecipe({...recipe, instructions: e.target.value})} />
                    </div>
                    <div>
                        <label className={commonLabelStyle}>Image URL</label>
                        <input className={commonInputStyle} type="text" value={recipe.imageUrl} onChange={(e) => setRecipe({...recipe, imageUrl: e.target.value})} />
                    </div>
                    <div>
                        <label className={commonLabelStyle}>Ingredients</label>
                        {ingredients.map((ingredient) => (
                            <div className="flex" key={ingredient.id}>
                                <button type="button" className="text-md rounded-lg bg-red-500 text-white w-[46px] h-[46px] mr-2" onClick={() => deleteIngredient(ingredient.id)}>
                                    <FontAwesomeIcon icon={faTrash} size="sm" className="cursor-pointer"/>
                                </button>
                                <input className={ingredientInputStyle + ' mr-2 w-1/6'} type="number" step={0.01} onChange={(e) => updateIngredient('quantity', e.target.value, ingredient.id)} />
                                <select className={ingredientInputStyle + ' mr-2'} onChange={(e) => updateIngredient('unit', e.target.value, ingredient.id)}>
                                    <option value="oz">oz</option>
                                    <option value="dash">dash</option>
                                </select>
                                <input className={ingredientInputStyle + ' flex-grow'} type="text" onChange={(e) => updateIngredient('name', e.target.value, ingredient.id)}/>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="block text-md rounded-lg bg-blue-500 text-white w-[46px] h-[46px] mr-2" onClick={addIngredient}>
                        <FontAwesomeIcon icon={faPlus} size="sm" className="cursor-pointer"/>
                    </button>                    
                    <button className="float-right block w-1/5 mb-24 p-2.5 border text-md rounded-lg bg-green-500 border-green-600 text-white" type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default Create;