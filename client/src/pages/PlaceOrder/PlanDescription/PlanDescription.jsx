import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

const PlanDescription = ({ description = [] }) => {
    return (
        <Tabs
            defaultActiveKey={description[0]?.title.toLowerCase()}
            className="mb-3"
        >
            {description?.map((item, _idx) => <Tab
                key={_idx}
                eventKey={item.title.toLowerCase()}
                title={item.title}
                className="mb-3"
            >
                <div>{item.contentText}</div>
            </Tab>)}
        </Tabs>
    );
};

export default PlanDescription;