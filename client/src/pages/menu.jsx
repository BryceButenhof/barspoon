import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import NotFound from '../components/notFound.jsx';
import CardContainer from '../components/cardContainer.jsx';

const Menu = () => {
    const { slug } = useParams();
    const [ menu, setMenu ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/menus/${slug}`);
                const sections = [];
                for await (const section of response.data.sections) {
                    const recipes = (await axios.post(`${import.meta.env.VITE_BACKEND_URI}/recipes`, section.recipes)).data;
                    sections.push({
                        ...section,
                        recipes
                    });
                }

                setMenu({
                    ...response.data,
                    sections
                });
                setLoading(false);
                console.log({menu});
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        };
        
        fetchMenu();
    }, [slug]);

    if (loading) {
        return null;
    }

    if (Object.keys(menu).length === 0) {
        return <NotFound />;
    }
    
    return (
        <div className="px-4">
            {menu.sections.map((section) => (
                <>
                    <h1 className="text-3xl font-bold m-12 text-center">{section.name}</h1>
                    <CardContainer recipes={section.recipes} />
                </>
            ))}
        </div>
    );
};

export default Menu;
