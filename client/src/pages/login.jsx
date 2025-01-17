import React, { useState } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = () => {
    const commonLabelStyle = 'block m-2 text-md font-medium text-white';
    const commonInputStyle = 'border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white';
    
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();

    const authenticate = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/login`, userDetails);
            cookies.set("token", response.data.token, { expires: 1/1440 });
            toast.success('Successfully logged in!');            
            navigate('/');
        } catch {
            toast.error('Login failed...')
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        authenticate();
    }

    return (
        <div className="flex items-center justify-center">
            <div className="mx-4 w-full md:mx-0 md:w-1/2">
                <p className="text-3xl font-bold m-12 text-center">Login to your account</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={commonLabelStyle}>Email</label>
                        <input className={commonInputStyle} type="text" onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} />
                    </div>
                    <div>
                        <label className={commonLabelStyle}>Password</label>
                        <input className={commonInputStyle} type="password" onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} />
                    </div>
                    <button className="float-right mt-4 block w-1/5 p-2.5 border text-md rounded-lg bg-green-500 border-green-600 text-white" 
                        type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;