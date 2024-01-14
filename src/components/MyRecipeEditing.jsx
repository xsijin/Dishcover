import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MyRecipeEditing() {
    const params = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [preptime, setPreptime] = useState('');
    const [instructions, setInstructions] = useState('');


    const fetchCurrentRecipeDetails = async () => {

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
                setTitle(data.recipe.title);
                setTags(data.recipe.tags ? data.recipe.tags : []);
                setIngredients(data.recipe.ingredients ? data.recipe.ingredients : []);
                setPreptime(data.recipe.preptime);
                setInstructions(data.recipe.instructions);
            }

        } catch (error) {
            console.error('Error fetching recipe details for editing:', error);
        }
    };


    useEffect(() => {
        fetchCurrentRecipeDetails();
    }, [params.id]);


    const handleSaveChanges = async () => {

        try {

            const response = await fetch(`http://localhost:3000/recipes/update/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    tags: tags.join(', '), // convert tags to a string
                    ingredients: ingredients.join(', '), // convert ingredients to a string
                    preptime,
                    instructions,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate(`/myrecipedetails/${params.id}`);
            }

        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };


    return (
        <div>
            <h2>Edit Recipe</h2>
            <div>
                <div>Recipe Title:</div>
                <input
                    type="text"
                    value={title}
                    onChange={(evt) => setTitle(evt.target.value)} />
            </div>

            <div>
                <div>Tags: </div>
                <textarea
                    type="text"
                    value={tags ? tags.join(', ') : ''}
                    onChange={(evt) => setTags(evt.target.value.split(', '))} />
            </div>

            <div>
                <div>Ingredients: </div>
                <textarea
                    type="text"
                    value={ingredients ? ingredients.join(', ') : ''}
                    onChange={(evt) => setIngredients(evt.target.value.split(', '))} />
            </div>

            <div>
                <div>Prep Time:</div>
                <textarea
                    type="text"
                    value={preptime}
                    onChange={(evt) => setPreptime(evt.target.value)} />
            </div>

            <div>
                <div>Instructions:</div>
                <textarea
                    type="text"
                    value={instructions}
                    onChange={(evt) => setInstructions(evt.target.value)} />
            </div>

            {/* triggers the handleSaveChanges function, which sends a PATCH request to update the recipe details. */}
            <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
};

export default MyRecipeEditing;