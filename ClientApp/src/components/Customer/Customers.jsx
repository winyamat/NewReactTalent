import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Pagination } from 'semantic-ui-react';
import AddNewCustomer from './AddNewCustomer';
import DeleteCustomerModal from './DeleteCustomerModal';
import UpdateCustomerModal from './UpdateCustomerModal';
//import { DataGrid } from '@material-ui/data-grid';
//import { TableSortLabel, TableBody, TableRow, TableCell, TableContainer, TableHead } from '@material-ui/core';
//import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Sort } from '@syncfusion/ej2-react-grids';


/************************************* 
 * Class to CURD the Customer data
 **************************************/
export class Customers extends Component {
    static displayName = Customers.name;

    /***********************Constructor************/
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            loaded: false,
            openCreateModal: false,
            openDeleteModal: false,
            openUpdateModal: false,
            customer: {},
            totalCustomersRec: 0,
            currentPage: 1,
            totalPage: 1,

        };
        this.fetchCustomerData = this.fetchCustomerData.bind(this);
    }


    /************************************* 
    * Function to Fetch the Customer Data
    **************************************/

    fetchCustomerData() {
       // console.log("Customers:fetchCustomerData")
        axios.get('/Customers/GetCustomer')
            .then((res) => {
                // handle success
                //console.log(res.data);
                this.setState({
                    customers: res.data,
                    loaded: true,
                    totalCustomersRec: res.data.length,
                    totalPage: Math.ceil(res.data.length / 4)
                })
                /* To fix the last Page Refresh on Delete to move to previous page */
                if (((res.data.length % 4) === 0) && (this.state.currentPage > Math.ceil(res.data.length / 4))) {
                   // console.log("Last Page= Current Page");
                    this.setState({
                        currentPage: (this.state.currentPage === 1) ? 1 : this.state.currentPage - 1
                    })

                }
            })
            .catch((err) => {
                // handle error
               // console.log(err);
                this.setState({ loaded: false })
            })
           // .then(() => {
                // always executed
               // console.log("Customers:fetchdata Always Executed");
           // });

    }

    /************************************************************* 
     * Functions to Learn about the life Cycle of React components
     *************************************************************/

    componentDidMount() {
        //console.log("Customers:componentDidMount");

        this.fetchCustomerData();
    }


    /************************************************************* 
   * Functions to  toggle the status of openCreateModal between true and false
   * to Open or notopen the Modal(Child Component AddNewCustomer)
   *************************************************************/
    toggleCreateModal = () => {
        this.setState({ openCreateModal: !this.state.openCreateModal })
        //console.log("Customers:toggleCreateModal")
    }

    /************************************************************* 
     * Functions to  toggle the status of openDeleteModal between true and false
     * to Open or notopen the Modal(Child Component DeleteCustomerModal)
     *************************************************************/
    toggleDeleteModal = () => {
        this.setState({
            openDeleteModal: !this.state.openDeleteModal
        })
       // console.log("Customers:toggleDeleteModal")
    }


    /************************************************************* 
     * Functions setStateDeleteModal  copy the Customer Row to customer variable which can be passed to
     *  the DeleteCustomerModal(Child Component )
     *************************************************************/
    setStateDeleteModal = (customer) => {
        this.setState({ customer: customer })
      //  console.log("Customers:setStateDeleteModal:Name: " + customer.name + " address: " + customer.address);
        this.toggleDeleteModal();
    }

    /************************************************************* 
    * Functions to  toggle the status of openUpdateModal between true and false
    * to Open or notopen the Modal(Child Component UpdateCustomerModal)
    *************************************************************/
    toggleUpdateModal = () => {
        this.setState({
            openUpdateModal: !this.state.openUpdateModal
        })
       // console.log("Customers:toggleUpdateModal")
    }

    /************************************************************* 
     * Functions setStateUpdateModal copy the Customer Row to customer variable which can be passed to
     *  the UpdateCustomerModal(Child Component )
     *************************************************************/
    setStateUpdateModal = (customer) => {
        this.setState({ customer: customer })
     //   console.log("Customers:setStateUpdateModal:Name: " + customer.name + " address: " + customer.address);
        this.toggleUpdateModal();
    }
    /************************************************************* 
        * Functions pageChange set the Pagination attributes
        *************************************************************/
    pageChange = (e, pagData) => {
        this.setState({
            currentPage: pagData.activePage,
            totalPage: pagData.totalPages
        })
       // console.log(pagData);
        //console.log("Customers:pageChange:Saleid: Product id: Store id: Sale Time: ");
    }
   
  

        /************************************* 
         * Using Semantic UI Modal & Form  as UI
         **************************************/
        render() {
          //  console.log("Customers:render");
            const customers = this.state.customers;
            const loaded = this.state.loaded;
            const openCreateModal = this.state.openCreateModal;
            const openDeleteModal = this.state.openDeleteModal;
            const openUpdateModal = this.state.openUpdateModal;
            const customer = this.state.customer;
            const totalCustomersRec = this.state.totalCustomersRec;
            const currentPage = this.state.currentPage;
           
           
           // console.log("Customers:render:Name: " + customer.name + " address: " + customer.address);
            if (loaded) {
                return (
                    <div>
                        <AddNewCustomer
                            open={openCreateModal}
                            toggleCreateModal={() => this.toggleCreateModal()}
                            fetchCustomerData={() => this.fetchCustomerData()}
                        />

                        <DeleteCustomerModal
                            open={openDeleteModal}
                            toggleDeleteModal={() => this.toggleDeleteModal()}
                            fetchCustomerData={() => this.fetchCustomerData()}
                            customer={customer} />

                        <UpdateCustomerModal
                            open={openUpdateModal}
                            toggleUpdateModal={() => this.toggleUpdateModal()}
                            fetchCustomerData={() => this.fetchCustomerData()}
                            customer={customer} />

                        <h1> </h1>
                        <Button color='blue' content=' New Customer' onClick={this.toggleCreateModal} />
                        

                        <Table celled >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell 
                                    >
                                        Customer Name
                                </Table.HeaderCell>
                                    <Table.HeaderCell
                                       
                                    >
                                        Address
                                </Table.HeaderCell>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {customers.map((c, index) => {
                                    if ((index >= ((currentPage * 4) - 4)) && (index < (currentPage * 4))) {
                                       // console.log("inside if:" + index)

                                        return (
                                            <Table.Row key={c.id}>
                                                <Table.Cell>{c.name}</Table.Cell>
                                                <Table.Cell>{c.address}</Table.Cell>
                                                <Table.Cell>
                                                    <Button color='yellow' content='Edit' icon='edit' onClick={() => this.setStateUpdateModal(c)} /> </Table.Cell>
                                                    <Table.Cell> <Button color='red' content='Delete' icon='trash' onClick={() => this.setStateDeleteModal(c)} />
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    }
                                })}
                            </Table.Body>
                        </Table>

                        <Pagination
                            boundryRange={0}
                            activePage={currentPage}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={0}
                            totalPages={Math.ceil(totalCustomersRec / 4)}
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
