import React from 'react'

const Login = () => {
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <div>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Email</legend>
              <input type="text" className="input" />
            </fieldset>
            <fieldset className="fieldset my-3 ">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input" />
            </fieldset>
          </div>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
