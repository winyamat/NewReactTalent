import React, { useEffect} from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
 * Function to get approval to Delete the Product
 **************************************/
 const DeleteProductModal = (props) => {
  const {open, toggleDeleteModal, fetchProductData, product } = props;

 /*** * useEffect(() => {
    console.log("UnMount a Component using Hook")
return() => {
  console.log("UnMount a Component using Hook1")
}
  },[])

 /************************************* 
 * Function to Delete the Product
 **************************************/
const deleteProduct = (id) =>  {
        console.log("Products:deleteProduct")
        axios.delete(`/Products/DeleteProduct/${id}`)
            .then( function(res)  {
                // handle success
                
                //console.log(res);
                fetchProductData();
                toggleDeleteModal();
            })
            .catch(function(err)  {
                // handle error
                
                //console.log(err);
                toggleDeleteModal();
            })

    }

/************************************* 
 * Using Semantic UI Modal & ribbon Labels as UI
 **************************************/
  return (
    <Modal
     open={open}
     >
      <Modal.Header> Product </Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          <Header>Are you sure you want to delete?</Header>
         
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleDeleteModal()}>
          Cancel
        </Button>
        <Button
          content="Delete"
          color='black'
          icon='remove'
          onClick={() => deleteProduct(product.id)}
          negative
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteProductModal