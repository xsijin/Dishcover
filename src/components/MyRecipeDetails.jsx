import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MyRecipeDetails() {
    const params = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const navigate = useNavigate();

    const getRecipeDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/recipes/show/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setRecipeDetails(data.recipe);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRecipeDetails();
    }, [params.id]);


    const handleEditButtonClick = () => {
        navigate(`/myrecipeediting/${params.id}`);
    };


    return (
        <div>
            {recipeDetails && (
                <div>
                    <h1>{recipeDetails.title}</h1>
                    <p>Tags: {recipeDetails.tags.join(', ')}</p>
                    <p>Ingredients: {recipeDetails.ingredients.join(', ')}</p>
                    <p>Prep Time: {recipeDetails.preptime}</p>
                    <p>Instructions: {recipeDetails.instructions}</p>
                    <button onClick={handleEditButtonClick}>Edit Recipe</button>
                </div>
            )}
        </div>
    );
}

export default MyRecipeDetails;