import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import MenuForm from '../components/menuForm';

const CreateMenu = () => {
    const blankSection = {
        id: uuid(),
        name: '',
        recipes: []
    };
    
    const blankMenu = {
        name: '',
        description: '',
        sections: [ blankSection ]
    };

    const [ recipes, setRecipes ] = useState([]);
    const [ menu, setMenu ] = useState(blankMenu);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    const saveMenu = async (menu) => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URI}/menus`, menu);
            toast.success('Menu created successfully!');            
            navigate('/');
        } catch (error) {
            toast.error('Menu creation failed...')
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/recipes`);
                setRecipes(response.data.map(recipe => {
                    return {
                        value: recipe.slug,
                        label: recipe.name
                    };
                }));
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="mx-4 w-full md:mx-0 md:w-1/2">
                <p className="text-3xl font-bold m-12 text-center">Create Menu</p>
                <MenuForm menu={menu} setMenu={setMenu} saveMenu={saveMenu} recipes={recipes} />
            </div>
        </div>
    );
};

export default CreateMenu;