import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink} from 'react-router-dom';


export default class NavBarSemanticUI extends Component {
    state = { activeItem: 'Customers' }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu inverted>
                
                <Menu.Item
                    as={NavLink} to="/"
                    name='React'
                    active={activeItem === 'React'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    as={NavLink} to="/Customer/Customers"
                    name='Customers'
                    active={activeItem === 'Customers'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    as={NavLink} to="/Product/Products"
                    name='Products'
                    active={activeItem === 'Products'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    as={NavLink} to="/Store/Stores"
                    name='Stores'
                    active={activeItem === 'Stores'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    as={NavLink} to="/Sale/Sales"
                    name='Sales'
                    active={activeItem === 'Sales'}
                    onClick={this.handleItemClick}
                />
                
                 
      </Menu >
    )
    }
}