import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ReviewLanding from "./Reviews/ReviewLanding";

function PublicRecipeDetails() {
    const params = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("recipe"); // Default to 'recipe' if no tab is specified

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    const getRecipeDetails = async () => {
        try {
            const response = await fetch(`https://ga-p3-backend.onrender.com/recipes/show/${params.id}`, {
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

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tabParam = searchParams.get('tab');
    
        if (tabParam === 'review') {
          setActiveTab('review');
        } else {
          // Default case or handle other tabs as needed
          setActiveTab('recipe');
        }
      }, [location.search]);

    return (

        <>
        <div role="tablist" className="tabs tabs-bordered">
            <input type="radio" onChange={() => handleTabChange("recipe")} checked={activeTab === "recipe"} name="my_tabs_1" role="tab" className="tab" aria-label="Recipe" />
            <div role="tabpanel" className="tab-content p-10">
            <div className="flex space-x-20 bg-gray-700 shadow-md rounded px-8 pt-6 pb-8">
            <div className='w-1/2'>
                {recipeDetails && (
                    <div>
                        <h1 className="text-gray-300 font-bold text-3xl mb-5">{recipeDetails.title}</h1>
                        <div className='mb-8'>
                            <p className="mb-2 font-bold text-gray-300">Author: </p>
                            <span className="text-gray-300 block break-words">{ }</span>
                        </div>
                        <div className='mb-8'>
                            <p className="font-bold text-gray-300">Tags: </p>
                            <span className="text-gray-300 block break-words">{recipeDetails.tags.join(', ')}</span>
                        </div>
                        <div className='mb-8'>
                            <p className="font-bold text-gray-300">Ingredients: </p>
                            <span className="text-gray-300 block break-words">{recipeDetails.ingredients.join(', ')}</span>
                        </div>
                        <div className='mb-8'>
                            <p className="mb-2 font-bold text-gray-300">Prep Time: </p>
                            <span className="text-gray-300 block break-words">{recipeDetails.preptime}</span>
                        </div>
                        <div className='mb-8'>
                            <p className="mb-2 font-bold text-gray-300">Instructions: </p>
                            <ol className="list-decimal list-inside text-gray-300 block break-words">
                                {recipeDetails.instructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ol>
                        </div>
                        <div className='flex'>
                            <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
                            <button className="btn btn-primary ml-4"  onClick={() => navigate(`/reviews/${params.id}`)}>Reviews</button>
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
            </div>

            <input type="radio" onChange={() => handleTabChange("review")} checked={activeTab === "review"} name="my_tabs_1" role="tab" className="tab" aria-label="Review"  />
            <div role="tabpanel" className="tab-content p-10">
                <ReviewLanding recipeId={params.id}/>
            </div>

        </div>
        </>


        
    );
}

export default PublicRecipeDetails;