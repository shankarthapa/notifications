import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
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

    socket.on('notifications', (message) => {
      var msg = (message.msg.length > 10) ? String(message.msg).substr(0, 10) + '...' : message.msg;
      this.setState({
        notificationList: [...this.state.notificationList, { msg: msg }]
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
      items.push(<DropdownItem key={i} value={this.state.notificationList[i].msg}>{this.state.notificationList[i].msg}</DropdownItem>);
    }
    return items;
  }
  render() {


    return (
      <Navbar color="inverse" light expand="md">
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.dropdownToggle}>
                <DropdownToggle>
                  <FontAwesomeIcon icon={faBell} />
                  ( {this.state.notificationList.length} ) notifications
                </DropdownToggle>
                <DropdownMenu style={{ maxHeight: '200px', overflowY: 'scroll' }} right={true}>
                  {this.generateItems()}
                </DropdownMenu>
              </ButtonDropdown>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/shankarthapa/notifications" target="_blank">Github</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default HeaderContent
