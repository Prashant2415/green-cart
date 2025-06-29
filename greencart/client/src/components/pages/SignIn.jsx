import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../utils/userUtils';
import { useDispatch } from 'react-redux';
import { userDetails } from '../../redux/slice/userSlice';

const SignIn = () => {
    const [input, setInput] = useState({email: "", password: ""});
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const validateError = (value) => {
    const newError = {};
    if (!value.email.trim()) newError.email = "Email field is required";
    if (!value.password.trim()) newError.password = "Password field is required";
    return newError;
  };

  const handleForm = async(e) => {
    e.preventDefault();
    const errorValue = validateError(input);
    setError(errorValue);

    if (Object.keys(errorValue).length === 0) {
      console.log("Form submitted:", input);
      // handle successful submission here
      const response = await signIn(input)
      console.log(response)
      dispatch(userDetails(response))
      localStorage.setItem("userDetail",JSON.stringify(response))
      localStorage.setItem("token",JSON.stringify(response.token))
      setInput({email: "", password: ""})
      navigate("/greencart")
    }
  };
  return (
    <div className="page page-section">
      <div className="form-main-container margin">
        <div className="form-container">
        <h2 className="form-title">Sign In</h2>
        <form onSubmit={handleForm} className="sign-form">
          <label>Email</label>
          <input type="email" value={input.email} name="email" onChange={handleInput} />
          {error.email && <div className="error-text">{error.email}</div>}

          <label>Password</label>
          <input type="password" value={input.password} name="password" onChange={handleInput} />
          {error.password && <div className="error-text">{error.password}</div>}

          <button type="submit" className="form-button">Sign In</button>
          <div className="extra">
            <p>If you does not have an account? <Link className='extra-link' to="/signup">Sign Up</Link></p>
          </div>
        </form>
        
      </div>
      </div>
    </div>
  )
}

export default SignIn
