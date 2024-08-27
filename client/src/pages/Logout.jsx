import React, { useContext } from 'react'
import { userContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const {setCurrentUser} = useContext(userContext);
  const navigate = useNavigate();
  setCurrentUser(null)
  navigate('/login')
  return (
    <></>
  )
}

export default Logout