import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const Pagination = (props) => {
    return (
        <ButtonGroup className="text-center">
            {[...Array(props.numberOfButtons).keys()]
                .map(page => (
                    <Button
                        key={page}
                        variant={(page + 1) === props.currentPage ? 'primary' : 'outline-primary'}
                        onClick={() => props.changePage(page + 1)}
                    >{page + 1}</Button>
                ))}
        </ButtonGroup>
    );
};

export default Pagination;