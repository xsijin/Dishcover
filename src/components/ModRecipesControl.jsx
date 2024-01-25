import React, { useState } from 'react';
import ModRecipesList from './ModRecipesList';
import ModRecipeDetails from './ModRecipeDetails';

function ModRecipesControl() {

    const [allRecipes, setAllRecipes] = useState([]);

    return (
        <div>
            <h1 className='font-bold text-xl mb-4 ml-4'>Moderator Recipes Control</h1>

            <ModRecipesList allRecipes={allRecipes} setAllRecipes={setAllRecipes} />

            <ModRecipeDetails allRecipes={allRecipes} setAllRecipes={setAllRecipes} />
        </div>
    );
}

export default ModRecipesControl;
