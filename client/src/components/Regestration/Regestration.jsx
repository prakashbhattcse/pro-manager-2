import React, { useState } from 'react';
import styles from "./Regestration.module.css";
import hero from "../../assets/hero.svg";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../apis/auth";
import { CiUser, CiMail, CiLock } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



const Regestration = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLoginSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert("Fields can't be empty");
      return;
    }

    const result = await loginUser(formData);
    if (result) {
      navigate("/dashboard", { state: { name: formData.name } });
    }
  };

  const handleRegisterSubmit = async () => {
    if (!formData.name || !formData.email ||!formData.password ||  !formData.confirmPassword) {
      alert("Fields can't be empty");
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
        autoClose: 1000 
      });
    } else {
      alert("User not registered or incorrect credentials"); 
  }
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
            <div className={styles.formFieldOutline}>
              <CiUser />
              <input className={styles.input} name="name" value={formData.name} onChange={handleFormChange} type="text" placeholder="Name"/>
            </div>

            <div className={styles.formFieldOutline}>
              <CiMail />
              <input className={styles.input} name="email" value={formData.email} onChange={handleFormChange} type="email" placeholder="Email"
              />
            </div>

            <div className={styles.formFieldOutline}>
              <CiLock />
              <input className={styles.input} name="password" value={formData.password} onChange={handleFormChange} type="password" placeholder="Password"
              />
            </div>

            <div className={styles.formFieldOutline}>
              <CiLock />
              <input className={styles.input} name="confirmPassword" value={formData.confirmPassword} onChange={handleFormChange} type="password" placeholder="Confirm Password"
              />
            </div>

            <button onClick={handleRegisterSubmit} className={styles.btnBlue}>Create Account</button>
            <p>Already have an account?</p>
            <button className={styles.btnOBlue} onClick={() => setLogin(true)}>Log in</button>
          </div>
        ) : (
          <div className={styles.formOutline}>
            <div className={styles.formFieldOutline}>
              <CiMail />
              <input className={styles.input} name="email" value={formData.email} onChange={handleFormChange} type="email" placeholder="Email"
              />
            </div>

            <div className={styles.formFieldOutline}>
              <CiLock />
              <input className={styles.input} name="password" value={formData.password} onChange={handleFormChange} type="password" placeholder="Password"
              />
            </div>

            <button onClick={handleLoginSubmit} className={styles.btnBlue}>Login</button>
            <p>Don't have an account?</p>
            <button className={styles.btnOBlue} onClick={() => setLogin(false)}>Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Regestration;
