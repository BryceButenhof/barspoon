import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-gray-500 py-6 sticky top-0">
            <div className="container mx-6 flex justify-between items-center">
                <h1 className="font-bold cursor-pointer" onClick={() => navigate('/')}>barspoon.io</h1>
            </div>
        </nav>
    );
};

export default NavBar;