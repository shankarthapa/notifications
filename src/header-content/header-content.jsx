import React from 'react'
import styles from './header-content.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import socketIOClient from 'socket.io-client'

class HeaderContent extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      notificationList: [],
      endpoint: "http://127.0.0.1:8000"
    };
    const socket = socketIOClient(this.state.endpoint);
    socket.on('time', (timer) => {
      // setting the color of our button
      console.log(timer + " <<< got time ");
      //this.state.notificationList.push({});

      this.setState({
        notificationList: [...this.state.notificationList, {}]
      });
    })


  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  dropdownToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  generateItems() {
    var items = [];
    for (let i = 0; i < this.state.notificationList.length; i++) {
      items.push(<DropdownItem key={i} value={i}>{i}</DropdownItem>);
    }
    return items;
  }
  render() {
    
    
    return (
      <Navbar color="inverse" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.dropdownToggle}>
                <DropdownToggle>
                  <FontAwesomeIcon icon={faBell} />
                  ( {this.state.notificationList.length} ) notifications
                </DropdownToggle>
                <DropdownMenu right={true}>
                  {this.generateItems()}
                  {/* <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem> */}
                </DropdownMenu>
              </ButtonDropdown>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
export default HeaderContent