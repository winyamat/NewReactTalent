import React, { useState, useEffect } from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

 
   /* Function to Update the Store**/

const UpdateStoreModal = (props) => {

  /* const {open, toggleUpdateModal, fetchStoreData, id, name, address} = props; */
  const { open, toggleUpdateModal, fetchStoreData, store } = props;

  const [updateNameStatus, setupdateNameStatus] = useState(false)
  const [updateAddressStatus, setupdateAddressStatus] = useState(false)
  const [sname, setsname] = useState("");
  const [saddress, setsaddress] = useState(props.store.name);

 

 /* useEffect(() => {
    console.log("UpdateStores:useEffect:Name: " + sname + " address: " + saddress);

    return () => {
      console.log("UpdateStore:UnMount a Component using Hook")
    }
  })

  
   /* Function to Update the Store*/
  const updateName = (e) => {
    setsname(e.target.value)
    setupdateNameStatus(true)
    //console.log("UpdateStoreModal:updateName:" + e.target.value)
  }


  
   /* Function to Update the Address field*/
  const updateAddress = (e) => {
    setsaddress(e.target.value)
    setupdateAddressStatus(true)
    //console.log("UpdateStoreModal:updateAddress:" + e.target.value)
  }

   
  /* Function to Update the Store*/
  const updateStore = (ccid) => {
    var msg = "";
    //console.log("UpdateStores:updateStore:Cid=" + ccid + " CName: " + sname + " CAddress: " + saddress);

    let store1 = {
      id: ccid,
      name: updateNameStatus ? sname : store.name,
      address: updateAddressStatus ? saddress : store.address
    }
    setsname(updateNameStatus ? sname : store.name)
    setsaddress(updateAddressStatus ? saddress : store.address);
    console.log("UpdateCustomers:updateCustomer:customer1:Cid=" + store1.id + " CName: " + store1.name + " CAddress: " + store1.address);
    if (sname != null && saddress != null) {
      if ((sname.localeCompare("") !== 0 && saddress.localeCompare("") !== 0)) {
        axios.put(`/Stores/PutStore/${ccid}`, store1)
          .then(function (res) {
            console.log(res);
            fetchStoreData();
            setupdateNameStatus(false)
            setupdateAddressStatus(false)
            toggleUpdateModal();
          })
          .catch(function (err) {
            console.log(err);
            setupdateNameStatus(false)
            setupdateAddressStatus(false)
            toggleUpdateModal();
          });
      } else {
        /* Show Alert on blank Sales details */
        if (sname.localeCompare("") === 0) {
          msg = "Customer Name field is empty..\n"
        }
        if (saddress.localeCompare("") === 0) {
          msg = msg + "Customer Address field is empty..\n"
        }
        msg = msg + "Please enter the correct Customer Details\n"
        alert(msg)
      }
    } else {
      /* Show Alert on null Sales details */
      if (sname == null) {
        msg = "Customer Name field is empty..\n"
      }
      if (saddress == null) {
        msg = msg + "Customer Address field is empty..\n"
      }
      msg = msg + "Please enter the correct Customer Details\n"
      alert(msg)
    }

  }

   
  /* Using Semantic UI Portal & Form  as UI */


return (
   
  <Modal
  
    open={open}
    
  >
      
        <Header>Edit Store </Header>
        <Modal.Content>
        <Form>
          <Form.Field>
            <label> Name</label>
            <input  name='sname' defaultValue={store.name} onChange={(e) => updateName(e)} />
          </Form.Field>
          <Form.Field>
            <label> Address</label>
            <input  name='saddress' defaultValue={store.address} onChange={(e) => updateAddress(e)} />
          </Form.Field>
        </Form>
        </Modal.Content>
        <Modal.Actions>
        <Button
          color='black'
          negative
          onClick={() => toggleUpdateModal()}
        >Cancel</Button>

        <Button
          content="Edit"
          labelPosition='right'
          icon='checkmark'
          onClick={() => updateStore(store.id)}
          positive
        /></Modal.Actions>
    </Modal>

  )
}

export default UpdateStoreModal
