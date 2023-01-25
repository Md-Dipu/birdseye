import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ChangeStatus from './ChangeStatus';
import DeletePlan from './DeletePlan';

const DangerZone = ({ id, status, onUpdate }) => {
    const [show, setShow] = useState(null); // status, delete

    return (
        <div className="my-3">
            <div className="h5 text-secondary mb-3">Danger zone</div>
            {[
                {
                    message: `This plan is currently ${status} now. Please change status as requirements.`,
                    buttonValue: 'Change status',
                    buttonVariant: 'warning',
                    action: () => setShow('status')
                },
                {
                    message: `If the plan is not exist anymore, please delete this plan.`,
                    buttonValue: 'Delete plan',
                    buttonVariant: 'danger',
                    action: () => setShow('delete')
                }
            ].map((item, _idx) => <div key={_idx} className="mb-3 d-flex justify-content-between align-items-center border shadow-sm rounded p-3">
                <p className="text-secondary me-3">{item.message}</p>
                <Button variant={item.buttonVariant} onClick={item.action}>{item.buttonValue}</Button>
            </div>)}
            {show === 'status' && <ChangeStatus
                id={id}
                status={status}
                onUpdate={onUpdate}
                onClose={() => setShow(null)}
            />}
            {show === 'delete' && <DeletePlan
                id={id}
                onClose={() => setShow(null)}
            />}
        </div>
    );
};

export default DangerZone;