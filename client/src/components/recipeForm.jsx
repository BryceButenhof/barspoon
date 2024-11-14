import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuid } from 'uuid';

const RecipeForm = (props) => {
    const commonLabelStyle = 'block m-2 text-md font-medium text-white';
    const commonInputStyle = 'border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white';
    const ingredientInputStyle = 'border text-md rounded-lg mb-2 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white';

    const blankIngredient = {
        id: uuid(),
        name: '',
        note: '',
        quantity: '',
        unit: 'oz'
    };

    const { recipe, setRecipe, saveRecipe } = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        const slug = recipe.name.trim().toLowerCase().replaceAll(' ', '-');
        saveRecipe({...recipe, slug});
    }

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, {...blankIngredient, id: uuid()}]});
    };

    const deleteIngredient = (id) => {
        const newIngredients = recipe.ingredients.filter((ingredient) => ingredient.id !== id);
        setRecipe({...recipe, ingredients: newIngredients});
    }

    const updateIngredient = (propName, value, id) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients.find((ingredient) => ingredient.id === id)[propName] = value;
        setRecipe({...recipe, ingredients: newIngredients});
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className={commonLabelStyle}>Name</label>
                <input className={commonInputStyle} type="text" value={recipe.name} onChange={(e) => setRecipe({...recipe, name: e.target.value})} />
            </div>
            <div>
                <label className={commonLabelStyle}>Description</label>
                <textarea className={commonInputStyle} rows="3" value={recipe.description} onChange={(e) => setRecipe({...recipe, description: e.target.value})} />
            </div>
            <div>
                <label className={commonLabelStyle}>Instructions</label>
                <textarea className={commonInputStyle} rows="3" value={recipe.instructions} onChange={(e) => setRecipe({...recipe, instructions: e.target.value})} />
            </div>
            <div>
                <label className={commonLabelStyle}>Image URL</label>
                <input className={commonInputStyle} type="url" value={recipe.imageUrl} onChange={(e) => setRecipe({...recipe, imageUrl: e.target.value})} />
            </div>
            <div>
                <label className={commonLabelStyle}>Ingredients</label>
                {recipe.ingredients?.map((ingredient) => (
                    <div className="flex" key={ingredient.id}>
                        <button type="button" className="text-md rounded-lg bg-red-500 text-white w-[46px] h-[46px] mr-2" 
                            onClick={() => deleteIngredient(ingredient.id)}>
                            <FontAwesomeIcon icon={faTrash} size="sm" className="cursor-pointer"/>
                        </button>
                        <input className={ingredientInputStyle + ' mr-2 w-1/6'} 
                            value={ingredient.quantity} type="number" step={0.01} 
                            onChange={(e) => updateIngredient('quantity', e.target.value, ingredient.id)} />
                        <select className={ingredientInputStyle + ' mr-2'} value={ingredient.unit} onChange={(e) => updateIngredient('unit', e.target.value, ingredient.id)}>
                            <option value="oz">oz</option>
                            <option value="dash">dash</option>
                        </select>
                        <input className={ingredientInputStyle + ' flex-grow'} value={ingredient.name}
                            type="text" onChange={(e) => updateIngredient('name', e.target.value, ingredient.id)}/>
                    </div>
                ))}
            </div>
            <button type="button" className="block text-md rounded-lg bg-blue-500 text-white w-[46px] h-[46px] mr-2" onClick={addIngredient}>
                <FontAwesomeIcon icon={faPlus} size="sm" className="cursor-pointer"/>
            </button>                    
            <button className="float-right block w-1/5 mb-24 p-2.5 border text-md rounded-lg bg-green-500 border-green-600 text-white" 
                type="submit">Save</button>
        </form>
    );
};

export default RecipeForm;