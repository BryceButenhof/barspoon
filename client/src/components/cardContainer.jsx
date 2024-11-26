import React from 'react';
import RecipePreviewCard from './recipePreviewCard';

const CardContainer = (props) => {
    const { recipes } = props;

    const NoResults = () => {
        if (recipes.length > 0) {
            return null;
        }

        return (
            <li>
                <p>No Results</p>
            </li>
        );
    };

    return (
        <ul className="flex flex-wrap justify-center gap-6 mt-12">
            {recipes.map((recipe) => (
                <RecipePreviewCard recipe={recipe} key={recipe._id}/>
            ))}
            <NoResults />
        </ul>
    )
};

export default CardContainer;