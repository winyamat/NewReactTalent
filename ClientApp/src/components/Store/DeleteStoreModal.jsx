import React, {} from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
 * Function to get approval to Delete the Store
 **************************************/
const DeleteStoreModal = (props) => {
  const {open, toggleDeleteModal, fetchStoreData, store } = props;
   
  

  
/************************************* 
 * Function to Delete the Store
 **************************************/
const deleteStore = (id) =>  {
        
        axios.delete(`/Stores/DeleteStore/${id}`)
            .then( function(res)  {
            
                
                fetchStoreData();
                toggleDeleteModal();
            })
            .catch(function(err)  {
                // handle error
                
                
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
      <Modal.Header>Store </Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          <Header>Are you sure you want to delete Store ?</Header>
        
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
          onClick={() => deleteStore(store.id)}
          negative
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteStoreModal