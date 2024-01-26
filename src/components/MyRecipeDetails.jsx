import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function MyRecipeDetails() {
    const params = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [authorId, setAuthorId] = useState(null);
    const [authorFirstName, setAuthorFirstName] = useState(null);
    const [authorLastName, setAuthorLastName] = useState(null);
    const navigate = useNavigate();

    const getRecipeDetails = async () => {
        try {
            const response = await fetch(`https://ga-p3-backend.onrender.com/recipes/showone/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.recipe.user);
                setRecipeDetails(data.recipe);
                setAuthorId(data.recipe.user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRecipeDetails();
    }, [params.id]);

    const getAuthor = async () => {
        try {
            const response = await fetch(`https://ga-p3-backend.onrender.com/users/showOne/${authorId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.user.firstName);
                console.log(data.user.lastName);
                setAuthorFirstName(data.user.firstName);
                setAuthorLastName(data.user.lastName);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAuthor();
    }, [authorId]);


    const handleEditButtonClick = () => {
        navigate(`/myrecipeediting/${params.id}`);
    };

    const handleDeleteRecipe = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            if (!token) throw new Error('Token not found');

            const response = await fetch(`https://ga-p3-backend.onrender.com/recipes/delete/${params.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the authorization header
                },
            });

            if (response.ok) {
                navigate('/myrecipes');
                console.log('Recipe deleted');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex space-x-20 bg-secondary-content shadow-md rounded px-8 pt-6 pb-8">
            <div className='w-1/2'>
                {recipeDetails && (
                    <div>
                        <h1 className="font-bold text-3xl mb-5">{recipeDetails.title}</h1>
                        <div className='mb-8'>
                            <p className="mb-2 font-bold">Author: </p>
                            <span className="block break-words">{`${authorFirstName} ${authorLastName}`}</span>
                        </div>
                        <div className='mb-8'>
                            <p className="font-bold">Tags: </p>
                            <span className="block break-words">{recipeDetails.tags.join(', ')}</span>
                        </div>
                        <div className='mb-8'>
                            <p className="font-bold">Ingredients: </p>
                            <span className="block break-words">{recipeDetails.ingredients.join(', ')}</span>
                        </div>
                        <div className='mb-8'>
                            <p className="mb-2 font-bold">Prep Time: </p>
                            <span className="block break-words">{recipeDetails.preptime}</span>
                        </div>
                        <div className='mb-8'>
                            <p className="mb-2 font-bold">Instructions: </p>
                            <ol className="list-decimal list-inside block break-words">
                                {recipeDetails.instructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ol>
                        </div>
                        <div className='flex'>
                            <button className="btn btn-accent mr-3" onClick={handleEditButtonClick}>Edit Recipe</button>
                            <button className="btn btn-error mr-3" onClick={handleDeleteRecipe}>Delete Recipe</button>
                            <button className="btn btn-primary" onClick={() => navigate('/myrecipes')}>Back to My Recipes</button>
                        </div>
                    </div>
                )}
            </div>
            <div className='mb-8 w-1/2 rounded-lg'>

                {/* Checks if recipeDetails exists before trying to access its properties. 
                This can be done with a logical AND (&&) operation. Or else it'd treat picture_url 
                as null and error will occur. */}
                {recipeDetails && recipeDetails.picture_url
                    ? <img src={recipeDetails.picture_url} alt="Picture Unavailable" className="w-3/4 h-auto rounded-lg" />
                    : <p className="text-gray-300"></p>
                }
            </div>
        </div>
    );
}

export default MyRecipeDetails;