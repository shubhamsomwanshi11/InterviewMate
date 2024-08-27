import React from 'react'
import HomeImage from '../images/home.png'
import { FaArrowRightToBracket } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";
import { Link } from 'react-router-dom'
import Carousle from '../components/Carousle';
const Home = () => {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col p-5 d-flex justify-content-center align-items-center">
                    <img src={HomeImage} alt="" />
                </div>
                <div className="col d-flex justify-content-center align-items-center">
                    <div className='text-center'>
                        <h1 className='project-title'>PrepSmartAI</h1>
                        <p className='text-secondary fs-5 text-center'>Empowering candidates with tailored interview questions generated from their unique profiles for effective preparation and success.</p>
                        <Link to={'prepare'} className='center'><button className='btn btn-outline-success btn-lg'>Get Started <FaArrowRightToBracket /></button> </Link>
                        {/* <Link className='center'><button className='btn btn-warning btn-lg mx-2'>More Info <CiCircleInfo /></button> </Link> */}
                    </div>
                </div>
            </div>
            {/* <Carousle /> */}
        </div>
    )
}

export default Home