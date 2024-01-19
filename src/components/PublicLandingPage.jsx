import React from 'react';
import PublicAsianRecipes from './PublicAsianRecipes';
import PublicWesternRecipes from './PublicWesternRecipes';
import PublicVegetarianRecipes from './PublicVegetarianRecipes';
import PublicDessertRecipes from './PublicDessertRecipes';

function PublicLandingPage() {
    return (
        <div style={{
            backgroundImage: `url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp9167602.jpg&f=1&nofb=1&ipt=a78e7e83b74edaceef0cad0670dcebcea13ed975dca1ae76e25415fca8d57efb&ipo=images')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className='flex justify-center'>
                <h1 className='font-bold text-5xl mb-1 text-white mt-10'>DISHCOVER</h1>
            </div>

            <PublicAsianRecipes />

            <PublicWesternRecipes />

            <PublicVegetarianRecipes />

            <PublicDessertRecipes />
        </div>
    );
}

export default PublicLandingPage;