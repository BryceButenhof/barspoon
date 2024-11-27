import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { v4 as uuid } from 'uuid';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const CreateMenu = () => {
    const commonLabelStyle = 'block m-2 text-md font-medium text-white';
    const commonInputStyle = 'border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white';
    
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

    const classNames = {
        control: (state) => {
            return '!shadow-none !bg-gray-700 !rounded-lg ' + (state.isFocused ? '!border-white' : '!border-gray-600')
        },
        input: () => 'bg-gray-700 !text-white !p-2 !m-0',
        dropdownIndicator: () => 'bg-gray-700 rounded-r-lg',
        clearIndicator: () => 'bg-gray-700',
        indicatorsContainer: () => 'bg-gray-700 rounded-r-lg',
        menuList: () => 'bg-gray-700',
        valueContainer: () => 'bg-gray-700 rounded-l-lg',
        multiValue: () => '!bg-gray-500 !rounded-md',
        multiValueLabel: () => 'bg-gray-500 !rounded-l-md !text-white',
        multiValueRemove: () => 'bg-gray-500 !rounded-r-md',
        option: (state) => state.isFocused ? '!bg-gray-500' : '',
    };

    const [ recipes, setRecipes ] = useState([]);
    const [ menu, setMenu ] = useState(blankMenu);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    const updateSectionRecipes = (recipes, id) => {
        const sections = [ ...menu.sections ].map(section => {
            return section.id === id ? { ...section, recipes: recipes.map(recipe => recipe.value) } : { ...section };
        });
        setMenu({ ...menu, sections });
    };

    const updateSectionName = (name, id) => {
        const sections = [ ...menu.sections ].map(section => {
            return section.id === id ? { ...section, name } : { ...section };
        });
        setMenu({ ...menu, sections });
    };

    const addSection = (e) => {
        e.preventDefault();
        setMenu({...menu, sections: [ ...menu.sections, blankSection ]})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const slug = menu.name.trim().toLowerCase().replace(/\(|\)/g, "").replaceAll(' ', '-');
        saveMenu({...menu, slug});
    }

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
                <form onSubmit={handleSubmit} >
                    <label className={commonLabelStyle} >Menu Name</label>
                    <input className={commonInputStyle} type="text" onChange={(e) => setMenu({...menu, name: e.target.value})} />
                    <label className={commonLabelStyle}>Description</label>
                    <textarea className={commonInputStyle} rows="3" onChange={(e) => setMenu({...menu, description: e.target.value})} />
                    {menu.sections.map((section, idx) => (
                        <div key={section.id} className='my-4'>
                            <p className="text-2xl font-bold">{`Section ${idx + 1}`}</p>
                            <div>
                                <label className={commonLabelStyle} >Section Name</label>
                                <input className={commonInputStyle} type="text" onChange={(e) => updateSectionName(e.target.value, section.id)} />
                            </div>
                            <div>
                                <label className={commonLabelStyle}>Recipes</label>
                                <Select classNames={classNames} isMulti={true} options={recipes} onChange={(e) => updateSectionRecipes(e, section.id)}/>
                            </div>
                        </div>
                    ))}
                    <button className="float-right mt-4 block w-1/5 p-2.5 border text-md rounded-lg bg-green-500 border-green-600 text-white" 
                        type="submit">Save</button>
                    <button className="float-right mt-4 mr-2 block p-2.5 border text-md rounded-lg bg-blue-500 border-green-600 text-white" 
                        onClick={(e) => addSection(e)}>Add Section</button>
                </form>
            </div>
        </div>
    );
};

export default CreateMenu;