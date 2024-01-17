import React, { useState } from 'react';

function MyRecipeForm({ handleSaveNewRecipe }) {
    const [form, setForm] = useState({
        title: '',
        tags: [],
        ingredients: [],
        preptime: '',
        instructions: '',
        picture_url: ''
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
                picture_url: form.picture_url,
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
        <form onSubmit={handleSubmit} className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">
                    Title:
                </label>
                <input placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs"
                    id="title"
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="tags">
                    Tags (comma separated):
                </label>
                <textarea placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs h-[5rem]"
                    id="tags"
                    type="text"
                    name="tags"
                    value={form.tags.join(', ')}
                    onChange={(evt) => setForm({
                        ...form,
                        tags: evt.target.value.split(', ')
                    })} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="ingredients">
                    Ingredients (comma separated):
                </label>
                <textarea placeholder="Type here" className="input input-bordered input-primary w-1/2 h-[15rem]"
                    id="ingredients"
                    type="text"
                    name="ingredients"
                    value={form.ingredients.join(', ')}
                    onChange={(evt) => setForm({
                        ...form,
                        ingredients: evt.target.value.split(', ')
                    })} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="preptime">
                    Prep Time:
                </label>
                <input placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs"
                    id="preptime"
                    type="text"
                    name="preptime"
                    value={form.preptime}
                    onChange={handleInputChange} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="instructions">
                    Instructions:
                </label>
                <textarea placeholder="Type here" className="input input-bordered input-primary w-1/2 h-[15rem]"
                    id="instructions"
                    type="text"
                    name="instructions"
                    value={form.instructions}
                    onChange={handleInputChange} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="picture_url">
                    Picture URL:
                </label>
                <input placeholder="Type here" className="input input-bordered input-primary w-1/2"
                    id="picture_url"
                    type="text"
                    name="picture_url"
                    value={form.picture_url}
                    onChange={handleInputChange} />
            </div>

            <button className="btn btn-accent" type="submit">
                Save Recipe
            </button>

        </form>
    );
}

export default MyRecipeForm;