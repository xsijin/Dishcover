import React, { useState } from 'react';

function MyRecipeForm({ handleSaveNewRecipe }) {
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

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const response = await fetch('http://localhost:3000/recipes/create', {
            method: 'POST',
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
                    name="title"
                    value={form.title}
                    onChange={handleInputChange} />
            </div>
            <div>
                Tags (comma separated):
                <textarea
                    type="text"
                    name="tags"
                    value={form.tags.join(', ')}
                    onChange={(evt) => setForm({
                        ...form,
                        tags: evt.target.value.split(', ')
                    })} />
            </div>
            <div>
                Ingredients (comma separated):
                <textarea
                    type="text"
                    name="ingredients"
                    value={form.ingredients.join(', ')}
                    onChange={(evt) => setForm({
                        ...form,
                        ingredients: evt.target.value.split(', ')
                    })} />
            </div>
            <div>
                Prep Time:
                <input
                    type="text"
                    name="preptime"
                    value={form.preptime}
                    onChange={handleInputChange} />
            </div>
            <div>
                Instructions:
                <textarea
                    type="text"
                    name="instructions"
                    value={form.instructions}
                    onChange={handleInputChange} />
            </div>
            <button type="submit">Create Recipe</button>
        </form>
    );
}

export default MyRecipeForm;