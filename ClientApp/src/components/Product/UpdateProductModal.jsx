import React, { useState } from 'react'
import { Form, Button,  Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
   * Function to Update the Product
**************************************/
const UpdateProductModal = (props) => {
  const { open, toggleUpdateModal, fetchProductData, product } = props;
  const [updateNameStatus, setupdateNameStatus] = useState(false)
  const [updatePriceStatus, setupdatePriceStatus] = useState(false)
  const [pname, setpname] = useState(product.name);
  const [pprice, setpprice] = useState(product.price);
  /*useEffect(() => {
    console.log("UpdateProducts:useEffect:Name: " + pname + " price: " + pprice);
    return () => {
      
    }
  }, [pname, pprice])****/

  /************************************* 
    * Function to Update the Product Name field
    **************************************/
  const updateName = (e) => {
    setpname(e.target.value)
    setupdateNameStatus(true)
    
  }

  /************************************* 
   * Function to Update the Product Price field
   **************************************/
  const updatePrice = (e) => {
    setpprice(e.target.value)
    setupdatePriceStatus(true)
    
  }

  /************************************* 
   * Function to Update the Product
   **************************************/
  const updateProduct = (ccid) => {
    var msg = ""
    

    let product1 = {
      id: ccid,
      name: updateNameStatus ? pname : product.name,
      price: updatePriceStatus ? pprice : product.price
    }
    setpname(updateNameStatus ? pname : product.name);
    setpprice(updatePriceStatus ? pprice : product.price);

    if (pname != null && pprice != null) {
      if ((pname.localeCompare("") !== 0 && pprice > 0.0)) {

        axios.put(`/Products/PutProduct/${ccid}`, product1)
          .then(function (res) {
            
            fetchProductData();
            toggleUpdateModal();
          })
          .catch(function (err) {
            
            setupdateNameStatus(false)
            setupdatePriceStatus(false)
            toggleUpdateModal();
          });
      } else {
        /* Show Alert on blank Sales details */
        if (pname.localeCompare("") === 0) {
          msg = "Product Name field is empty..\n"
        }
        if (pprice === 0.0) {
          msg = msg + "Product Price field is empty..\n"
        }
        msg = msg + "Please enter the correct Product Details\n"
        alert(msg)
           }
    } else {
      /* Show Alert on null Sales details */
      if (pname == null) {
        msg = "Product Name field is empty..\n"
      }
      if (pprice == null) {
        msg = msg + "Product Price field is empty..\n"
      }
      msg = msg + "Please enter the correct Customer Details\n"
      alert(msg)
    }
  }

  /************************************* 
  * Using Semantic UI Modal & Form as UI
  **************************************/
  return (
    <Modal
      open={open}
    >
      <Modal.Header>Edit Product</Modal.Header>
      <Modal.Content>

        <Modal.Description>
          

          <Form>
            <Form.Field>
              <label> Name</label>
              <input  name='pname' defaultValue={product.name} onChange={(e) => updateName(e)} />
            </Form.Field>
            <Form.Field>
              <label> Price</label>
              <input  name='pprice' defaultValue={product.price} onChange={(e) => updatePrice(e)} />
            </Form.Field>
          </Form></Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleUpdateModal()}>
          Cancel
        </Button>
        <Button
          content="Edit"
          labelPosition='right'
          icon='checkmark'
          onClick={() => updateProduct(product.id)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default UpdateProductModal
