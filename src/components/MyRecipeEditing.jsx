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
        instructions: [],
        picture_url: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: name === 'instructions' ? value.split('\n') : value
        });
    };

    const fetchCurrentRecipeDetails = async () => {

        try {

            const response = await fetch(`https://ga-p3-backend.onrender.com/recipes/showone/${params.id}`, {
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
                    instructions: data.recipe.instructions ? data.recipe.instructions : [],
                    picture_url: data.recipe.picture_url
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

            const response = await fetch(`https://ga-p3-backend.onrender.com/recipes/update/${params.id}`, {
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
                    picture_url: form.picture_url,
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
        <div className="bg-secondary-content shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="font-bold text-3xl mb-5">Edit Recipe</h1>
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

            {/* triggers the handleSaveChanges function, which sends a PATCH request to update the recipe details. */}
            <button className="btn btn-accent mr-3" onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
};

export default MyRecipeEditing;