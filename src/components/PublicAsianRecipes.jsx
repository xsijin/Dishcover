import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

function PublicAsianRecipes() {

    const [asianRecipes, setAsianRecipes] = useState([]);

    const getAsianRecipes = async () => {
        try {
            const response = await fetch('http://localhost:3000/recipes/show?search=asian');
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setAsianRecipes(data.recipes);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };


    useEffect(() => {
        getAsianRecipes();
    }, []);


    return (
        <div className='text-white'>
            <Wrapper>
                <h1 className='font-bold text-xl mb-4 ml-4'>Asian</h1>

                <h2 className='text-xl mb-4 ml-4'>
                    "Embark on a culinary journey through the heart of Asia: where flavors dance, spices sing, and every recipe tells a delicious story!"
                </h2>

                <Splide options={{
                    perPage: 4,
                    drag: 'free',
                    pagination: false,
                    gap: '3rem'
                }}>
                    {asianRecipes.map((recipe) => {
                        return (
                            <SplideSlide key={recipe._id} className='ml-4'>
                                <Card>
                                    <Link to={`/publicrecipedetails/${recipe._id}`} className="text-inherit no-underline block">
                                        <h2>{recipe.title}</h2>
                                        <img src={recipe.picture_url} alt="Picture Unavailable" />
                                        <Gradient />
                                    </Link>

                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
margin: 4rem 0rem;
`;

const Card = styled.div`
min-height: 10rem;
border-radius: 2rem;
overflow: hidden;
position: relative;

// all the images in the card div
img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

h2{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}
`;

const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default PublicAsianRecipes;