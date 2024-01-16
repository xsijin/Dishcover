import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MyRecipeEditing() {
    const params = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        tags: [],
        ingredients: [],
        preptime: '',
        instructions: ''
    });

    const handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

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
                setForm({
                    title: data.recipe.title,
                    tags: data.recipe.tags ? data.recipe.tags : [],
                    ingredients: data.recipe.ingredients ? data.recipe.ingredients : [],
                    preptime: data.recipe.preptime,
                    instructions: data.recipe.instructions
                });
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
                    title: form.title,
                    tags: form.tags,
                    ingredients: form.ingredients,
                    preptime: form.preptime,
                    instructions: form.instructions,
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
                    name="title"
                    value={form.title}
                    onChange={handleInputChange} />
            </div>

            <div>
                <div>Tags: </div>
                <textarea
                    type="text"
                    name="tags"
                    value={form.tags ? form.tags.join(', ') : ''}
                    onChange={(evt) => setForm({
                        ...form,
                        tags: evt.target.value.split(', ')
                    })} />
            </div>

            <div>
                <div>Ingredients: </div>
                <textarea
                    type="text"
                    name="ingredients"
                    value={form.ingredients ? form.ingredients.join(', ') : ''}
                    onChange={(evt) => setForm({
                        ...form,
                        ingredients: evt.target.value.split(', ')
                    })} />
            </div>

            <div>
                <div>Prep Time:</div>
                <textarea
                    type="text"
                    name='preptime'
                    value={form.preptime}
                    onChange={handleInputChange} />
            </div>

            <div>
                <div>Instructions:</div>
                <textarea
                    type="text"
                    name='instructions'
                    value={form.instructions}
                    onChange={handleInputChange} />
            </div>

            {/* triggers the handleSaveChanges function, which sends a PATCH request to update the recipe details. */}
            <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
};

export default MyRecipeEditing;