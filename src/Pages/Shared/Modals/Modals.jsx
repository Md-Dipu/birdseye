import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const WarnModal = props => {
    const { heading, messageText, buttonVariant, show = false, handleClose = () => {}, handleAction = () => {} } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{messageText}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant={buttonVariant} onClick={handleAction}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const InfoModal = props => {
    const { heading, messageText, buttonVariant, show = false, handleClose = () => {}} = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{messageText}</Modal.Body>
            <Modal.Footer>
                <Button variant={buttonVariant} onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export { WarnModal, InfoModal };