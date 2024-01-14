import React, { useEffect, useState } from 'react';
import MyRecipeCard from './MyRecipeCards';

function MyRecipesList({ userRecipes, setUserRecipes }) {


    const getAllRecipes = async () => {
        try {
            const response = await fetch('http://localhost:3000/recipes/show');
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUserRecipes(data.recipes);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };


    useEffect(() => {
        getAllRecipes();
    }, []);


    const handleDeleteRecipe = async (recipeId) => {
        console.log(recipeId);
        try {
            const response = await fetch(`http://localhost:3000/recipes/delete/${recipeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedRecipes = userRecipes.filter((recipe) => recipe._id !== recipeId);
                setUserRecipes(updatedRecipes);
                console.log('Recipe deleted');
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div >
            <h1>My Recipes</h1>
            {userRecipes.map((recipe) => (

                <MyRecipeCard key={recipe._id} recipe={recipe} handleDeleteRecipe={handleDeleteRecipe} />

            ))}
        </div>
    );
}

export default MyRecipesList;