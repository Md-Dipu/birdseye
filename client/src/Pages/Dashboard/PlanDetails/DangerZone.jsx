import React from 'react';
import { Button } from 'react-bootstrap';

const DangerZone = ({ id, status }) => {
    return (
        <div className="my-3">
            <div className="h5 text-secondary mb-3">Danger zone</div>
            {[
                {
                    message: `This plan is currently ${status} now. Please change status as requirements.`,
                    buttonValue: 'Change status',
                    buttonVariant: 'warning'
                },
                {
                    message: `If the plan is not exist anymore, please delete this plan.`,
                    buttonValue: 'Delete plan',
                    buttonVariant: 'danger'
                }
            ].map((item, _idx) => <div key={_idx} className="mb-3 d-flex justify-content-between align-items-center border shadow-sm rounded p-3">
                <p className="text-secondary me-3">{item.message}</p>
                <Button variant={item.buttonVariant}>{item.buttonValue}</Button>
            </div>)}
        </div>
    );
};

export default DangerZone;