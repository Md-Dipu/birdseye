import React from 'react';
import { useLocation } from 'react-router';
import { backToTop } from '../../utilities/utilities';
import Banner from './Banner';
import Feature from './Feature';
import HappyClient from './HappyClient';
import ShowPlans from './ShowPlans';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    const location = useLocation();
    if (!location.hash) {
        backToTop();
    }

    return (
        <>
            <Helmet title="Birdseye Travel Planner: Let your eye to see the beauty of the earth" />
            <Banner />
            <Feature />
            <ShowPlans />
            <HappyClient />
        </>
    );
};

export default Home;