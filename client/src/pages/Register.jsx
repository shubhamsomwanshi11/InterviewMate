import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { FaGoogle } from "react-icons/fa";


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    mobile: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success('Registration successful!');
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const handleNext = () => {
    if (step === 1) {
      const step1Fields = ['name', 'email', 'mobile'];
      const newErrors = {};
      step1Fields.forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = 'This field is required';
        }
      });
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        setStep(2);
      }
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
    },
    registerContainer: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '500px',
      margin: '120px 20px',

    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '35px',
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
    error: {
      color: 'red',
      fontSize: '14px',
      marginTop: '5px',
    },
    button: {
      width: '100%',
      padding: '12px',
      // backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '100px',
      cursor: 'pointer',
      fontSize: '18px',
      marginTop: '10px',
    },
    buttonSecondary: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
      marginTop: '10px',
    },
    '@media (max-width: 768px)': {
      registerContainer: {
        padding: '20px',
      },
      title: {
        fontSize: '28px',
      },
      button: {
        fontSize: '16px',
      },
      buttonSecondary: {
        fontSize: '16px',
      },
    },
  };

  const registerUser = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setErrors({});

    // Create a new FormData object
    const data = new FormData();

    // Append all form data to the FormData object
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}users/register`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setIsLoading(false);
      if (response && response.data) {
        toast.success('Registration successful!');
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } else {
        toast.error('Could not register user. Please try again later.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred');
    }

  };

  if (isLoading) return <Loader />
  return (
    <div style={styles.container}>
      <div style={styles.registerContainer}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit}>
          {['name', 'email'].map((field) => (
            <div className="form-group" style={styles.formGroup} key={field}>
              <label htmlFor={field} style={styles.label}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                style={styles.input}
              />
              {errors[field] && <p style={styles.error}>{errors[field]}</p>}
            </div>
          ))}

          {['password', 'password2'].map((field) => (
            <div className="form-group" style={styles.formGroup} key={field}>
              <label htmlFor={field} style={styles.label}>
                {field === 'password2' ? ' Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={'password'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          ))}

          <button type="submit" style={{ ...styles.button, background: '#007bff' }} onClick={registerUser}>
            Register
          </button>

        </form>
        <p className='text-center mt-3 mb-3'>or</p>
        <button type="button" style={{ background: 'black', ...styles.button }} onClick={handleBack}>
          <FaGoogle className='mx-2' style={{marginTop:'-2px'}} />  Continue with Google
        </button>
      </div>
      <ToastContainer />

    </div>
  );
};

export default Register;
