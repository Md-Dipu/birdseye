import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { updatePlanById } from '../../../api/plansAPI';
import useAuth from '../../../hooks/useAuth';
import { parseDigitStrings } from '../../../utilities/utilities';

const DiscountDetails = ({ id, globalDiscount, promoCode, onUpdate }) => {
    const [edit, setEdit] = useState(false);
    const [addPromoCode, setAddPromoCode] = useState(false);

    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (promoCode && promoCode[0] && promoCode[1]) {
            setAddPromoCode(true);
        }
    }, [promoCode]);

    const onSubmit = (data) => {
        parseDigitStrings(data);
        if (addPromoCode) {
            data.promoCode = [data.promoString, data.promoPercentage];
        } else {
            data.promoCode = null;
        }

        delete data.promoString;
        delete data.promoPercentage;

        updatePlanById(id, data)
            .then(res => {
                if (res.data.data?.modifiedCount > 0) {
                    onUpdate();
                }
            })
            .catch(console.warn)
            .finally(() => {
                reset();
                setEdit(false);
            });
    };

    const onCancel = () => {
        reset();
        setEdit(false);
    };

    return (
        <div className="my-3">
            <div className="d-flex justify-content-between">
                <div className="h5 text-secondary">Discounts</div>
                {user.role === 'admin' && <Button variant="link" onClick={() => setEdit(true)}>Edit</Button>}
            </div>
            <table>
                <tbody>
                    <tr>
                        <th className="text-nowrap pe-3" style={{ verticalAlign: 'baseline' }}>Discount:</th>
                        <td>{globalDiscount || 0}% </td>
                    </tr>
                    <tr>
                        <th className="text-nowrap pe-3" style={{ verticalAlign: 'baseline' }}>Promo code:</th>
                        <td>{promoCode ? `${promoCode[1]}% (Code: ${promoCode[0]})` : 'Not added'} </td>
                    </tr>
                </tbody>
            </table>
            {edit && <Form className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '25rem', maxWidth: '98%' }} onSubmit={handleSubmit(onSubmit)}>
                <Form.Text className="d-block text-center mb-3 fw-bold fs-6">Edit General Information</Form.Text>
                <Form.Group className="mb-3">
                    <Form.Label>Global Discount</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control type="number" defaultValue={globalDiscount || 0} {...register('globalDiscount', { required: true, min: 0, max: 100 })} />
                        <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>
                    {addPromoCode && <>
                        <Form.Label>Promo code</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="text" defaultValue={promoCode && promoCode[0]} placeholder="Code" {...register('promoString', { required: true })} />
                            <Form.Control type="number" defaultValue={promoCode && promoCode[1]} placeholder="Discount" {...register('promoPercentage', { required: true, min: 0, max: 100 })} />
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                    </>}
                    <Button variant="success" size="sm" type="submit">Update</Button>{" "}
                    <Button variant="secondary" size="sm" onClick={() => setAddPromoCode(!addPromoCode)}>{addPromoCode ? 'Remove' : 'Add'} Promo code</Button>{" "}
                    <Button variant="outline-secondary" size="sm" onClick={onCancel}>Cancel</Button>
                </Form.Group>
            </Form>}
        </div>
    );
};

export default DiscountDetails;