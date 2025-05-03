import React, { useState } from 'react';
import styles from './RegistrationForm.module.css';
import axios from 'axios'; // Assuming axios is configured
import { useNavigate } from 'react-router-dom';

const RegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    confirmPassword: '', // Added confirm password state
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

    // Frontend validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Hasła nie są identyczne.');
      return; // Stop submission if passwords don't match
    }

    try {
      // Prepare data for backend (exclude confirmPassword if backend doesn't need it, but current DTO expects it)
      const dataToSend = {
        userName: formData.userName,
        password: formData.password,
        confirmPassword: formData.confirmPassword, // Send confirmPassword as DTO expects it
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      const response = await axios.post('/register', dataToSend);
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
      {/* Added Confirm Password Field */}
      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
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

