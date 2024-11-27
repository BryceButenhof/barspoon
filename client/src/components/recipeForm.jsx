import React from 'react';

const RecipeForm = (props) => {
    const commonLabelStyle = 'block m-2 text-md font-medium text-white';
    const commonInputStyle = 'border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white';
    const { recipe, setRecipe, saveRecipe } = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        const slug = recipe.name.trim().toLowerCase().replace(/\(|\)/g, "").replaceAll(' ', '-');
        saveRecipe({...recipe, slug});
    }

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
                <textarea className={commonInputStyle} rows="8" value={recipe.ingredientString} onChange={(e) => setRecipe({...recipe, ingredientString: e.target.value})} />
            </div>             
            <button className="float-right mt-4 block w-1/5 p-2.5 border text-md rounded-lg bg-green-500 border-green-600 text-white" 
                type="submit">Save</button>
        </form>
    );
};

export default RecipeForm;