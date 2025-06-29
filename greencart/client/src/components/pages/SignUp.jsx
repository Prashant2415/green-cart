import React, { useState } from 'react';
import "../styles/styles.css"
import { signUp } from '../../utils/userUtils';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [input, setInput] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const validateError = (value) => {
    const newError = {};
    if (!value.name.trim()) newError.name = "Name field is required";
    if (!value.email.trim()) newError.email = "Email field is required";
    if (!value.password.trim()) newError.password = "Password field is required";
    if (!value.phone.trim()) newError.phone = "Phone field is required";
    return newError;
  };

  const handleForm = (e) => {
    e.preventDefault();
    const errorValue = validateError(input);
    setError(errorValue);

    if (Object.keys(errorValue).length === 0) {
      console.log("Form submitted:", input);
      // handle successful submission here
      signUp(input);
      alert("User registered");
      setInput({ name: "", email: "", password: "", phone: "" })
      navigate("/signin")
    }
  };

  return (
    <div className="page page-section">
      <div className="form-main-container">
        <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleForm} className="sign-form">
          <label>Full Name</label>
          <input type="text" value={input.name} name="name" onChange={handleInput} />
          {error.name && <div className="error-text">{error.name}</div>}

          <label>Email</label>
          <input type="email" value={input.email} name="email" onChange={handleInput} />
          {error.email && <div className="error-text">{error.email}</div>}

          <label>Password</label>
          <input type="password" value={input.password} name="password" onChange={handleInput} />
          {error.password && <div className="error-text">{error.password}</div>}

          <label>Phone</label>
          <input type="tel" value={input.phone} name="phone" onChange={handleInput} />
          {error.phone && <div className="error-text">{error.phone}</div>}

          <button type="submit" className="form-button">Sign Up</button>
          <div className="extra">
            <p>If you already have an account? <Link className='extra-link' to="/signin">Sign In</Link></p>
          </div>
        </form>
        
      </div>
      </div>
    </div>
  );
};

export default SignUp;
