import React from 'react';
import { useLocation } from 'react-router';
import { backToTop } from '../../utilities/utilities';
import Banner from './Banner';
import Feature from './Feature';
import HappyClient from './HappyClient';
import ShowPlans from './ShowPlans';

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