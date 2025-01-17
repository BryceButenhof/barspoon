import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import cookies from 'js-cookie';
import { toast } from "react-toastify";

const NavBar = () => {
    const navigate = useNavigate();

    const logout = () => {
        cookies.remove('token');
        toast.info('You have been logged out'); 
        navigate('/');           
    };

    const getLinks = () => {
        if (cookies.get("token")) {
            return (
                <div>
                    <FontAwesomeIcon icon={faPlus} size="lg" className="cursor-pointer" onClick={() => navigate('/create')}/>
                    <FontAwesomeIcon icon={faRightFromBracket} size="lg" className="cursor-pointer pl-6" onClick={() => logout()}/>
                </div>
            );
        } else {
            return <FontAwesomeIcon icon={faRightToBracket} size="lg" className="cursor-pointer" onClick={() => navigate('/login')}/>
        }
        
    };

    return (
        <nav className="bg-gray-700 py-6 sticky top-0">
            <div className="mx-6 flex justify-between items-center">
                <p className="font-bold cursor-pointer text-xl" onClick={() => navigate('/')}>barspoon.io</p>
                {getLinks()}
            </div>
        </nav>
    );
};

export default NavBar;