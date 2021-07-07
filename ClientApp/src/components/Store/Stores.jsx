import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Pagination } from 'semantic-ui-react';
import AddNewStore from './AddNewStore';
import DeleteStoreModal from './DeleteStoreModal';
import UpdateStoreModal from './UpdateStoreModal';

/************************************* 
 * Class to CURD the Store data
 **************************************/
export class Stores extends Component {
    static displayName = Stores.name;

    /***********************Constructor************/
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            loaded: false,
            openCreateModal: false,
            openDeleteModal: false,
            openUpdateModal: false,
            store: {},
            totalStoresRec: 0,
            currentPage: 1,
            totalPage: 1
        };
        this.fetchStoreData = this.fetchStoreData.bind(this);
    }


    /************************************* 
     * Function to Add/Create the Store
     **************************************/
    fetchStoreData() {
        
        axios.get('/Stores/GetStore')
            .then((res) => {
                // handle success
                
                this.setState({
                    Store: res.data,
                    loaded: true,
                    totalStoresRec: res.data.length,
                    totalPage: Math.ceil(res.data.length / 4)
                })
                /* To fix the last Page Refresh on Delete to move to previous page */
                if (((res.data.length % 4) === 0) && (this.state.currentPage > Math.ceil(res.data.length / 4))) {
                    
                    this.setState({
                        currentPage: (this.state.currentPage ===1) ? 1 : this.state.currentPage - 1
                    })

                }
            })
            .catch((err) => {
                // handle error
                
                this.setState({ loaded: false })
            })
            .then(() => {
                // always executed
                
            });

    }

    /************************************************************* 
     * Functions to Learn about the life Cycle of React components
     *************************************************************/
    componentDidMount() {
        

        this.fetchStoreData();
    }

    /************************************************************* 
     * Functions to  toggle the status of openCreateModal between true and false
     * to Open or notopen the Modal(Child Component AddNewStore)
     *************************************************************/
    toggleCreateModal = () => {
        this.setState({ openCreateModal: !this.state.openCreateModal })
        
    }

    /************************************************************* 
     * Functions to  toggle the status of openDeleteModal between true and false
     * to Open or notopen the Modal(Child Component DeleteStoreModal)
     *************************************************************/

    toggleDeleteModal = () => {
        this.setState({
            openDeleteModal: !this.state.openDeleteModal
        })

        

    }


    /************************************************************* 
     * Functions setStateDeleteModal  copy the Store Row to customer variable which can be passed to
     *  the DeleteStoreModal(Child Component )
     *************************************************************/
    setStateDeleteModal = (store) => {
        this.setState({ store: store })
        
        this.toggleDeleteModal();
    }

    /************************************************************* 
    * Functions to  toggle the status of openUpdateModal between true and false
    * to Open or notopen the Modal(Child Component UpdateStoreModal)
    *************************************************************/
    toggleUpdateModal = () => {
        this.setState({
            openUpdateModal: !this.state.openUpdateModal
        })

        

    }

    /************************************************************* 
  * Functions setStateUpdateModal copy the Store Row to customer variable which can be passed to
  *  the UpdateStoreModal(Child Component )
  *************************************************************/
    setStateUpdateModal = (store) => {
        this.setState({ store: store })
        
        this.toggleUpdateModal();
    }
    /************************************************************* 
       * Functions pageChange set the Pagination attributes
       *************************************************************/
    pageChange = (e, pagData) => {
        this.setState({ currentPage: pagData.activePage, totalPage: pagData.totalPages })
       
    }

    /************************************* 
     * Using Semantic UI Modal & Form  as UI
     **************************************/
    render() {
        
        const Store = this.state.Store;
        const loaded = this.state.loaded;
        const openCreateModal = this.state.openCreateModal;
        const openDeleteModal = this.state.openDeleteModal;
        const openUpdateModal = this.state.openUpdateModal;
        const store = this.state.store;
        const totalStoresRec = this.state.totalStoresRec;
        const currentPage = this.state.currentPage;

        
        if (loaded) {
            return (
                <div>
                    <AddNewStore
                        open={openCreateModal}
                        toggleCreateModal={() => this.toggleCreateModal()}
                        fetchStoreData={() => this.fetchStoreData()}
                        name={store.name} />

                    <DeleteStoreModal
                        open={openDeleteModal}
                        toggleDeleteModal={() => this.toggleDeleteModal()}
                        fetchStoreData={() => this.fetchStoreData()}
                        store={store} />

                    <UpdateStoreModal
                        open={openUpdateModal}
                        toggleUpdateModal={() => this.toggleUpdateModal()}
                        fetchStoreData={() => this.fetchStoreData()}
                        store={store} />
                    
                    <Button color='blue' content='New Store' onClick={this.toggleCreateModal} />
                    <Table celled>
                        <Table.Header>
                            <Table.Row>

                                <Table.HeaderCell>Store Name</Table.HeaderCell>
                                <Table.HeaderCell>Store Address</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {Store.map((s, index) => {
                                if ((index >= ((currentPage * 4) - 4)) && (index < (currentPage * 4))) {
                                    console.log("inside if:" + index)

                                    return (
                                        <Table.Row key={s.id}>

                                            <Table.Cell>{s.name}</Table.Cell>
                                            <Table.Cell>{s.address}</Table.Cell>
                                            <Table.Cell>
                                                <Button color='yellow' content='Edit' icon='edit' onClick={() => this.setStateUpdateModal(s)} /></Table.Cell>
                                                <Table.Cell> <Button color='red' content='Delete' icon='trash' onClick={() => this.setStateDeleteModal(s)} />
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                }})}
                        </Table.Body>
                    </Table>
                    <Pagination
                        boundryRange={0}
                        activePage={currentPage}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={0}
                        totalPages={Math.ceil(totalStoresRec / 4)}
                        onPageChange={(e, pageData) => this.pageChange(e, pageData)}

                    />

                    <h2> {currentPage}</h2>
                </div>
            );
        } else {
            return (
                <div>
                    <h2> </h2>
                </div>);
        }
    }
}