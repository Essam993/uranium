import React from 'react'
import { Link } from "react-router-dom";
import { Container, Navbar } from 'react-bootstrap'
import logo from "../assets/logo.png"
import {
    BsChevronDown,
    BsFillBellFill,
  } from "react-icons/bs";

const Nav = () => {
  return (
    <Navbar className="bg-custom">
    <Container fluid className="d-flex justify-content-between">
      <Link to="/">
        <img className='logo' src={logo} width="125px" alt="" />
      </Link>
      <div className="row w-50 justify-content-end align-items-center py-2">
        <div className="col-md-1">
          <button
            type="button"
            className="btn p-0 position-relative bg-custom"
          >
            <BsFillBellFill className="text-light h4" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-1">
              2
            </span>
          </button>
        </div>
        <span className="custom-border"></span>
        <div className="col-md-3">
          <p className="user-name mb-0 text-center text-light">Ahmed Essam</p>
        </div>
        <div className="col-md-2">
          <span className="user-avatar">AE</span>
          <BsChevronDown className="icons text-light" />
        </div>
      </div>
    </Container>
  </Navbar>
  )
}

export default Nav