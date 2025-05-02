import React, { useState } from 'react';
import styles from './RegistrationForm.module.css';
import axios from 'axios'; // Assuming axios is configured
import { useNavigate } from 'react-router-dom';

const RegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      // Use environment variable for backend URL ideally
      const response = await axios.post('/register', formData);
      const { token } = response.data; 
      localStorage.setItem('token', token); // Store token
      console.log('Registration successful, token stored.');
      // Redirect to dashboard after successful registration
      navigate('/dashboard'); 
      if (onSuccess) {
        onSuccess(); // Close modal if onSuccess callback is provided
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registrationForm}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.formGroup}>
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>Register</button>
    </form>
  );
};

export default RegistrationForm;

