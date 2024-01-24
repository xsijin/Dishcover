import React, { useState } from 'react';
import MyRecipeForm from './MyRecipeForm';
import MyRecipesList from './MyRecipesList';
import MyRecipeDetails from './MyRecipeDetails';

function MyRecipes() {

    const [userRecipes, setUserRecipes] = useState([]);

    const handleSaveNewRecipe = (newRecipe) => {
        // handleSaveRecipe here is triggered with the newRecipe data from MyRecipeForm.
        // setUserRecipes is used to update the state, adding the new recipe to the existing list.
        setUserRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    };

    return (
        <div>
            <h1 className='font-bold text-xl mb-4 ml-4'>Create Your Own Recipe</h1>

            {/* callback function passed as prop to MyRecipeForm */}
            <MyRecipeForm handleSaveNewRecipe={handleSaveNewRecipe} />

            {/* userRecipes and setUserRecipes passed as props to MyRecipesList */}
            <MyRecipesList userRecipes={userRecipes} setUserRecipes={setUserRecipes} />

            <MyRecipeDetails userRecipes={userRecipes} setUserRecipes={setUserRecipes} />
        </div>
    );
}

export default MyRecipes;
