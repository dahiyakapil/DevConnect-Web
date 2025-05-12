import React, { useState } from 'react'
import axios from "axios"

const Login = () => {

  const [email, setEmail] = useState("elon@gmail.com");
  const [password, setPassword] = useState("Elon@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password }, { withCredentials: true });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <div>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Email </legend>
              <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset my-3 ">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <div className="card-actions justify-center my-2">
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
