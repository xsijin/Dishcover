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
                <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-gray-300 font-bold text-xl mb-2">{recipeDetails.title}</h1>
                    <p className="mb-2 font-bold text-gray-300">Author: </p><span className="text-gray-300">{ }</span>
                    <p className="font-bold text-gray-300">Tags: </p><span className="text-gray-300">{recipeDetails.tags.join(', ')}</span>
                    <p className="font-bold text-gray-300">Ingredients: </p><span className="text-gray-300">{recipeDetails.ingredients.join(', ')}</span>
                    <p className="mb-2 font-bold text-gray-300">Prep Time: </p><span className="text-gray-300">{recipeDetails.preptime}</span>
                    <p className="mb-2 font-bold text-gray-300">Instructions: </p><span className="text-gray-300">{recipeDetails.instructions}</span>
                    <p className="mb-2 font-bold text-gray-300">Picture URL: </p><span className="text-gray-300">{recipeDetails.picture_url}</span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditButtonClick}>Edit Recipe</button>
                </div>
            )}
        </div>
    );
}

export default MyRecipeDetails;