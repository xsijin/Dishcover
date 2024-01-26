import React from 'react';
import PublicAsianRecipes from './PublicAsianRecipes';
import PublicWesternRecipes from './PublicWesternRecipes';
import PublicVegetarianRecipes from './PublicVegetarianRecipes';
import PublicDessertRecipes from './PublicDessertRecipes';

function PublicLandingPage() {
    return (
        <div style={{
            // backgroundImage: `url('https://i.imgur.com/McGrLCC.png')`,
            backgroundRepeat: 'repeat-y',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'right'
        }}>
            <div className='flex justify-center'>
                <h1 className='font-bold text-5xl mb-1 mt-10'>DISHCOVER</h1>
            </div>

            <PublicAsianRecipes />

            <PublicWesternRecipes />

            <PublicVegetarianRecipes />

            <PublicDessertRecipes />
        </div>
    );
}

export default PublicLandingPage;