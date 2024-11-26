import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipePreviewCard = (props) => {
    const defaultImgUrl = 'https://i.etsystatic.com/19543171/r/il/3d2d17/5752287345/il_fullxfull.5752287345_gb9t.jpg';
    const { recipe } = props;
    const navigate = useNavigate();

    const getIngredientsDisplay = (recipe) => {
        return recipe.ingredients.map(ingredient => ingredient.name).join(', ');
    };

    return (
        <li className="border bg-gray-700 border-gray-600 rounded-lg p-4 cursor-pointer w-96" onClick={() => navigate(`/${recipe.slug}`)}>
            <img src={recipe.imageUrl || defaultImgUrl} alt={recipe.name} className="w-full h-60 object-cover mb-4 rounded-lg" />
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{recipe.name}</h2>
            </div>
            <p className="my-4 italic">{recipe.description}</p>
            <p className="my-4">{getIngredientsDisplay(recipe)}</p>
        </li>
    )
};

export default RecipePreviewCard;
