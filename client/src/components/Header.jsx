import React from 'react'
import { CiLogin } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">PrepSmartAI</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home <FaHome /></a>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to={'prepare'} >Prepare Now</Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> */}
                        {/* <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">About</a>
                        </li> */}
                    </ul>
                    <div className="">
                        {/* <Link to={'register'}><button className="btn btn-primary mx-2" >Register</button></Link>
                        <Link to={'login'}><button className="btn btn-outline-primary" >Log In <CiLogin /> </button></Link> */}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header