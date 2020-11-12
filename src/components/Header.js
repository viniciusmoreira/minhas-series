import React, { useState, useCallback } from 'react';
import { 
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler

} from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen( prevState => !prevState );
  },[])

  return (
    <Navbar color="light" light expand="md">
      <div className="container">
        <NavbarBrand tag={Link} to="/">Minhas Séries</NavbarBrand>
        <NavbarToggler onClick={ toggle }/>
        <Collapse isOpen={ open } navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/series">Series</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/genres">Genêros</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default Header;