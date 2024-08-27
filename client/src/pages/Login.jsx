import React, { useState } from 'react';
// Import the mock authentication function
import { ToastContainer, toast } from 'react-toastify'; // Assuming you have ToastContainer imported
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for ToastContainer
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../context/userContext'
import axios from 'axios';
import Loader from '../components/Loader'
import { CiLogin } from "react-icons/ci";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useContext(userContext);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userData = { email: email, password: password };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}users/login`, userData);
      const user = response.data;

      if (response.status === 200 && user) {
        setCurrentUser(user);
        toast.success("Login Successful");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
    },
    loginContainer: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '400px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '24px'
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontSize: '16px',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
    },
  };
  if (loading) return <Loader />
  return (
    <div style={styles.container}>
      <div style={styles.loginContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login <CiLogin /></button>
        </form>
      </div>
      <ToastContainer position="bottom-left" />

    </div>
  );
};

export default Login;
