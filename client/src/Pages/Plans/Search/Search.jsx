import React, { useRef } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Search = ({ text }) => {
    const textRef = useRef(null);
    const sortRef = useRef(null);
    const history = useHistory();

    const handleSearch = () => {
        let str = '?';
        if (textRef.current.value) {
            str += `search=${textRef.current.value}`;
        }
        if (sortRef.current.value) {
            if (textRef.current.value) str += '&';
            str += `sort=${sortRef.current.value}`;
        }

        history.replace(str);
    }

    const onSubmit = e => {
        e.preventDefault();
        handleSearch();
    }

    return (
        <Row className="my-4 justify-content-center">
            <Col md="10" lg="8">
                <Form onSubmit={onSubmit}>
                    <InputGroup size="sm">
                        <Form.Select ref={sortRef} onChange={handleSearch}>
                            <option value="">Default</option>
                            <option value="-updatedAt">New Plans</option>
                            <option value="-views">Popular</option>
                            <option value="-price">High Price</option>
                            <option value="price">Low Price</option>
                            <option value="-rating">High Rating</option>
                            <option value="rating">Low Rating</option>
                        </Form.Select>
                        <Form.Control
                            type="text"
                            ref={textRef}
                            style={{ minWidth: '70%' }}
                            defaultValue={text}
                        />
                        <Button
                            type="submit"
                            variant="secondary"
                        ><FontAwesomeIcon icon={faSearch} /></Button>
                    </InputGroup>
                </Form>
            </Col>
        </Row>
    );
};

export default Search;