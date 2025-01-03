import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
    const navigate = useNavigate();

    const getLinks = () => {
        if (localStorage.getItem("token")) {
            return <FontAwesomeIcon icon={faPlus} size="lg" className="cursor-pointer" onClick={() => navigate('/create')}/>;
        } else {
            return <p className="font-bold cursor-pointer text-xl" onClick={() => navigate('/login')}>Login</p>;
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