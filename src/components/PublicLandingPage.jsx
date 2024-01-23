import React from 'react';
import PublicAsianRecipes from './PublicAsianRecipes';
import PublicWesternRecipes from './PublicWesternRecipes';
import PublicVegetarianRecipes from './PublicVegetarianRecipes';
import PublicDessertRecipes from './PublicDessertRecipes';

function PublicLandingPage() {
    return (
        <div style={{
            backgroundImage: `url('https://th.bing.com/th/id/OIG4.N5we59DLEisD5PlAHg1Z?pid=ImgGn')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
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