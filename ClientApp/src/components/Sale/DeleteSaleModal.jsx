import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import axios from 'axios';

function DeleteSaleModal(props) {
    const { open, toggleDeleteModal, fetchSales, idToDelete } = props;

    const submit = () => {
        axios.delete(`Sales/DeleteSales/${idToDelete}`)
            .then(() => {
                fetchSales();
                toggleDeleteModal();
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <Modal
            open={open}
        >
            <Modal.Header>Delete Sales</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>Are you sure?</Header>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggleDeleteModal()}>
                    Cancel
                </Button>
                <Button
                    content="Delete"
                    labelPosition='right'
                    icon='remove'
                    onClick={() => submit()}
                    color='red'
                />
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteSaleModal;