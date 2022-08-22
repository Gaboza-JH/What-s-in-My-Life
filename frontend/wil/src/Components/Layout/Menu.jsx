// import React from 'react'
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import BigSlide from './BigSlide';


// const Menu = () => {
//   return (
//     <>
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//       <Container>
//         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#features">Features</Nav.Link>
//             <Nav.Link href="#pricing">Pricing</Nav.Link>
//             <NavDropdown title="dropdown" id="collasible-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <Nav>
//             <Nav.Link href="#deets">More deets</Nav.Link>
//             <Nav.Link eventKey={2} href="#memes">
//               Dank memes
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//     </>
//   )
// }

// export default Menu

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import "../../Menu.css";
import WilLogo from "../../src_assets/WILlogo.png"

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="logo">
          <a href="/"><img src={WilLogo} /></a>
        </div>
        <ul className={isNavOpen ? "nav-links open" : "nav-links"}>
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/" className="nav-link">
            Login
          </a>
          <a href="/" className="nav-link">
            MyPage
          </a>
          <a href="/" className="nav-link">
            Contact
          </a>
        </ul>
        <FiMenu
          className={isNavOpen ? "burger inactive" : "burger"}
          onClick={toggleNav}
        />
        <CgClose
          className={isNavOpen ? "close" : "close inactive"}
          onClick={toggleNav}
        />
      </div>
    </nav>
  );
}