import React, { useState, useEffect } from 'react'
import {  Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
 * Function to get approval to Delete the Customer
 **************************************/

const DeleteCustomerModal = (props) => {
  const { open, toggleDeleteModal, fetchCustomerData, customer } = props;
/** useEffect(() => {
    console.log("UnMount a Component using Hook")
    return () => {
      console.log("UnMount a Component using Hook1")
    }
  }, [])**/

  /************************************* 
  * Function to Delete the Customer
  **************************************/
  const deleteCustomer = (id) => {
    //console.log("Customers:deleteCustomer")
    axios.delete(`/Customers/DeleteCustomer/${id}`)
      .then(function (res) {
       // console.log(res);
        fetchCustomerData();
        toggleDeleteModal();
      })
      .catch(function (err) {
        // handle error

       // console.log(err);
        toggleDeleteModal();
      })

  }


  /************************************* 
   * Using Semantic UI Modal & ribbon Labels as UI
   **************************************/
  return (
    <Modal
      open={open}
    ><Header>Customer </Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Are you sure want to delete?</Header>
        
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleDeleteModal()}>
          Cancel
        </Button>
        <Button
          content="Delete"
          color='red'
          icon='remove'
          onClick={() => deleteCustomer(customer.id)}
          negative
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteCustomerModal