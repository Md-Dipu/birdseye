import React from 'react';
import { Container, Pagination } from 'react-bootstrap';

const PaginationContainer = ({ numberOfButtons, currentPage, onClick, ...rest }) => {
    return (
        <Container fluid {...rest}>
            <Pagination className="justify-content-center">
                {[...Array(numberOfButtons).keys()]
                    .map(page => (
                        <Pagination.Item
                            key={page}
                            active={(page + 1) === currentPage}
                            onClick={() => onClick(page + 1)}
                        >{page + 1}</Pagination.Item>
                    ))}
            </Pagination>
        </Container>
    );
};

export default PaginationContainer;