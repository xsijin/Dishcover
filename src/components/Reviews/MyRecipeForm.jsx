import React, { useState } from 'react';

function MyRecipeForm({ handleSaveNewRecipe }) {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [preptime, setPreptime] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const response = await fetch('http://localhost:3000/recipes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                tags: tags.split(',').map(tag => tag.trim()),
                ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
                preptime,
                instructions,
            }),
        });

        if (response.ok) {
            const newRecipe = await response.json();
            console.log(newRecipe);
            handleSaveNewRecipe(newRecipe);
        } else {
            console.error('Failed to create new recipe');
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(evt) => setTitle(evt.target.value)} required />
            </div>
            <div>
                Tags (comma separated):
                <input
                    type="text"
                    value={tags}
                    onChange={(evt) => setTags(evt.target.value)} />
            </div>
            <div>
                Ingredients (comma separated):
                <input
                    type="text"
                    value={ingredients}
                    onChange={(evt) => setIngredients(evt.target.value)} />
            </div>
            <div>
                Prep Time:
                <input
                    type="text"
                    value={preptime}
                    onChange={(evt) => setPreptime(evt.target.value)} />
            </div>
            <div>
                Instructions:
                <input
                    type="text"
                    value={instructions}
                    onChange={(evt) => setInstructions(evt.target.value)} />
            </div>
            <button type="submit">Create Recipe</button>
        </form>
    );
}

export default MyRecipeForm;