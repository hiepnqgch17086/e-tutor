import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Example = () => {
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink href="#" active>Stream</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">People</NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink href="#">Another Link</NavLink>
        </NavItem> */}
      </Nav>
    </div>
  );
}

export default Example;
