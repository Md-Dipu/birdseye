import React from 'react';
import { useLocation } from 'react-router';
import { backToTop } from '../../../utilities/utilities';
import Banner from '../Banner/Banner';
import ShowPlans from '../ShowPlans/ShowPlans';

const Home = () => {
    const location = useLocation();
    if (!location.hash) {
        backToTop();
    }
    
    return (
        <div id="home">
            <Banner />
            <ShowPlans />
        </div>
    );
};

export default Home;