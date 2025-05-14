import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice'; // ✅ import user slice
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/auth/signup",
                { email, password, firstName, lastName },
                { withCredentials: true }
            );

            dispatch(addUser(res.data.data)); // ✅ Save user to Redux
            navigate("/profile");             // ✅ 
        } catch (error) {
            setError(error?.response?.data?.error || "Something went wrong");
            console.log(error);
        }
    };

    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">Signup</h2>

                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">First Name</legend>
                        <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </fieldset>

                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </fieldset>

                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Email</legend>
                        <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>

                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>

                    {error && <p className='text-red-700'>{error}</p>}

                    <div className="card-actions justify-center my-2">
                        <button onClick={handleSignup} className="btn btn-primary">Signup</button>
                    </div>
                    <Link to="/login"><p className='pointer'>Existing user? Login here</p></Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
