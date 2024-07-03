import React, { useState } from 'react';
import styles from "./Regestration.module.css";
import hero from "../../assets/hero.svg";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../apis/auth";
import { CiUser, CiMail, CiLock } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsEyeSlash, BsEye } from "react-icons/bs";

const Regestration = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' }); // Clear error message for the field being edited
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateFields = (fields) => {
    const newErrors = {};
    if (fields.includes('name') && !formData.name) newErrors.name = 'This field is required';
    if (fields.includes('email') && !formData.email) newErrors.email = 'This field is required';
    if (fields.includes('password') && !formData.password) newErrors.password = 'This field is required';
    if (fields.includes('confirmPassword') && !formData.confirmPassword) newErrors.confirmPassword = 'This field is required';
    if (fields.includes('email') && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    }
    if (fields.includes('password') && formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (fields.includes('confirmPassword') && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleLoginSubmit = async () => {
    const newErrors = validateFields(['email', 'password']);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await loginUser(formData);
    if (result) {
      navigate("/dashboard", { state: { name: formData.name } });
    }
  };

  const handleRegisterSubmit = async () => {
    const newErrors = validateFields(['name', 'email', 'password', 'confirmPassword']);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await registerUser(formData);
    if (result) {
      setLogin(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      toast.success('User registered successfully', {
        position: 'top-right',
        autoClose: 1000,
      });
    } else {
      toast.error('An error occurred during registration. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  const handleToggle = () => {
    setLogin(!login);
    setErrors({}); 
  };

  return (
    <div className={styles.regestirSection}>
      <div className={styles.leftContainer}>
        <img src={hero} alt="Hero" />
        <h2>Welcome aboard my friend</h2>
        <p>Just a couple of clicks and we start</p>
      </div>
      <ToastContainer />
      <div className={styles.rightContainer}>
        <div className={styles.title}>{!login ? "Register" : "Login"}</div>
        {!login ? (
          <div className={styles.formOutline}>
            <div style={{ width: "60%" }}>
              <div className={styles.formFieldOutline}>
                <CiUser />
                <input className={styles.input} name="name" value={formData.name} onChange={handleFormChange} type="text" placeholder="Name" />
              </div>
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </div>
            <div style={{ width: "60%" }}>
              <div className={styles.formFieldOutline}>
                <CiMail />
                <input className={styles.input} name="email" value={formData.email} onChange={handleFormChange} type="email" placeholder="Email" />
              </div>
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>
            <div style={{ width: "60%" }}>
              <div className={styles.formFieldOutline}>
                <CiLock />
                <input className={styles.input} name="password" value={formData.password} onChange={handleFormChange} type={showPassword ? "text" : "password"} placeholder="Password" />
                <span
                  className={`${styles.eyeIcon} ${showPassword ? styles.showPassword : ''}`}
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
              {errors.password && <div className={styles.error}>{errors.password}</div>}
            </div>
            <div style={{ width: "60%" }}>
              <div className={styles.formFieldOutline}>
                <CiLock />
                <input className={styles.input} name="confirmPassword" value={formData.confirmPassword} onChange={handleFormChange} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" />
                <span
                  className={`${styles.eyeIcon} ${showConfirmPassword ? styles.showPassword : ''}`}
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
              {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
            </div>
            <button onClick={handleRegisterSubmit} className={styles.btnBlue}>Create Account</button>
            <p>Already have an account?</p>
            <button className={styles.btnOBlue} onClick={handleToggle}>Log in</button>
          </div>
        ) : (
          <div className={styles.formOutline}>
            <div style={{ width: "60%" }}>
              <div className={styles.formFieldOutline}>
                <CiMail />
                <input className={styles.input} name="email" value={formData.email} onChange={handleFormChange} type="email" placeholder="Email" />
              </div>
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>
            <div style={{ width: "60%" }}>
              <div className={styles.formFieldOutline}>
                <CiLock />
                <input className={styles.input} name="password" value={formData.password} onChange={handleFormChange} type={showPassword ? "text" : "password"} placeholder="Password" />
                <span
                  className={`${styles.eyeIcon} ${showPassword ? styles.showPassword : ''}`}
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
              {errors.password && <div className={styles.error}>{errors.password}</div>}
            </div>
            <button onClick={handleLoginSubmit} className={styles.btnBlue}>Login</button>
            <p>Don't have an account?</p>
            <button className={styles.btnOBlue} onClick={handleToggle}>Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Regestration;
