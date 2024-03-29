import React, { useEffect, useState } from 'react';
import { getToken } from '../util/security';

function MyRecipeForm({ handleSaveNewRecipe }) {
    
    const [userId, setUserId] = useState(null);

    const [form, setForm] = useState({
        title: '',
        tags: [],
        ingredients: [],
        preptime: '',
        instructions: [],
        picture_url: ''
    });

    useEffect(() => {
        const token = getToken();
        const payload = token ? JSON.parse(atob(token.split(".")[1])).payload : null;
        console.log("payload", payload);
        if (payload && payload.userId) {
            setUserId(payload.userId);
        }
      }, []);

    const handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            if (!token) throw new Error('Token not found');
    
            const response = await fetch(`https://ga-p3-backend.onrender.com/recipes/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the authorization header
                },
                body: JSON.stringify({
                    user: userId,
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

            setForm({
                title: '',
                tags: [],
                ingredients: [],
                preptime: '',
                instructions: [],
                picture_url: ''
            })

        } catch(err) {
            console.error(err);
        }

    };

    return (
        <form onSubmit={handleSubmit} className="bg-secondary-content shadow-md rounded px-8 pt-6 pb-8 mb-4">

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="title">
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
                <label className="block text-sm font-bold mb-2" htmlFor="tags">
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
                <label className="block text-sm font-bold mb-2" htmlFor="ingredients">
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
                <label className="block text-sm font-bold mb-2" htmlFor="preptime">
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
                <label className="block text-sm font-bold mb-2" htmlFor="instructions">
                    Instructions (each step on a new line):
                </label>
                <textarea placeholder="Type here" className="input input-bordered input-primary w-1/2 h-[15rem]"
                    id="instructions"
                    type="text"
                    name="instructions"
                    value={form.instructions.join('\n')}
                    onChange={(evt) => setForm({
                        ...form,
                        instructions: evt.target.value.split('\n')
                    })} />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="picture_url">
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