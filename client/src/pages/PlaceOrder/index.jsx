import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getPlanById } from '../../api/plansAPI';
import Loading from '../Shared/Loading';
import Banner from './Banner';
import PlaceOrderForm from './PlaceOrderForm';
import PlanDescription from './PlanDescription';
import Reviews from './PlanReviews';

const PlaceOrder = () => {
    const [data, setData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    const { planId } = useParams();

    useEffect(() => {
        getPlanById(planId).then(res => {
            const data = res.data.data.value;
            data.payable = data.price - (data.price * ((data.globalDiscount || 0) / 100));
            return data;
        }).then(setData).catch(error => console.warn(error.message))
            .finally(() => setLoading(false));
    }, [planId]);

    if (loading) {
        return <Loading height="60" />
    }

    return (
        <Container>
            <Banner handleShowForm={setShowForm} {...data} />
            {showForm && <PlaceOrderForm
                onClose={() => setShowForm(false)}
                {...data}
            />}
            <PlanDescription description={data.description} />
            <Reviews />
        </Container>
    );
};

export default PlaceOrder;