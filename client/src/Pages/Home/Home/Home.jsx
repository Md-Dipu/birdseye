import React from 'react';
import { useLocation } from 'react-router';
import { backToTop } from '../../../utilities/utilities';
import Banner from '../Banner/Banner';
import Feature from '../Feature/Feature';
import HappyClient from '../HappyClient/HappyClient';
import ShowPlans from '../ShowPlans/ShowPlans';

const Home = () => {
    const location = useLocation();
    if (!location.hash) {
        backToTop();
    }
    
    return (
        <>
            <Banner />
            <Feature />
            <ShowPlans />
            <HappyClient />
        </>
    );
};

export default Home;