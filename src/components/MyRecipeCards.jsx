import React from "react";
import { Link } from "react-router-dom";




function MyRecipeCards({ recipe, handleDeleteRecipe }) {
    console.log(recipe)
    return (
        <>
            <Link to={`/myrecipedetails/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="my-recipe-card">
                    <h2>{recipe.title}</h2>
                </div>
            </Link>
            <button onClick={() => handleDeleteRecipe(recipe._id)}>DELETE</button>
        </>
    );
}

export default MyRecipeCards;