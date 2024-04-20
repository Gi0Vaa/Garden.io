import React from 'react';
import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from '../components/header.js';
import PlantsGrid from '../components/greenhouse/plantsGrid.js';
import Dashboard from '../components/greenhouse/dashboard.js';
import Settings from '../components/greenhouse/settings.js';

axios.defaults.withCredentials = true;

const Greenhouse = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [greenhouseId, setGreenhouseId] = useState(null);
    const [greenhouse, setGreenhouse] = useState({});
    const [index, setIndex] = useState(setFirstIndex());
    const [content, setContent] = useState(<div></div>);

    function setFirstIndex(){
        if(window.location.hash === '#/dashboard') return 0;
        else if(window.location.hash === '#/plants') return 1;
        else if(window.location.hash === '#/settings') return 2;
        else return 0;
    }

    useEffect(() => {
        if(location.state !== null){
            setGreenhouseId(location.state.greenhouse_id);
        }
    }, [location.state, setGreenhouseId]);

    useEffect(() => {
        if(greenhouseId === null) return;
        axios.get(`${process.env.REACT_APP_API_URL}/greenhouses/${greenhouseId}`)
            .then(response => {
                setGreenhouse(response.data);
            })
    }, [greenhouseId, setGreenhouse])

    useEffect(() => {
        document.title = `${greenhouse.name} | Garden.io`;
    }, [greenhouse]);

    //change index
    useEffect(() => {
        if(index === undefined) return;
        const menu = document.getElementById('menu');
        menu.children[index].classList.remove('border-green-100');
        menu.children[index].classList.add('border-green-500');
        
        if(greenhouseId === null) return;
        switch (index) {
            case 0:
                navigate('/greenhouse/#/dashboard', { state: { greenhouse_id: greenhouseId } });
                setContent(
                    <Dashboard greenhouse={greenhouse} />
                );
                break;
             case 1:
                navigate('/greenhouse/#/plants', { state: { greenhouse_id: greenhouseId } });
                setContent(
                    <PlantsGrid id={greenhouseId} />
                );
                break;
            
            case 2:
                navigate('/greenhouse/#/settings', { state: { greenhouse_id: greenhouseId } });
                setContent(
                    <Settings greenhouse={greenhouse} />
                );
                break;
            default:
                setContent(
                    <div>
                        <h1>Not A Page</h1>
                    </div>
                );
                break;
        }
    }, [index, greenhouse, greenhouseId, navigate]);

    function handleClick(i) {
        const menu = document.getElementById('menu');
        menu.children[index].classList.remove('border-green-500');
        menu.children[index].classList.add('border-green-100');
        setIndex(i);
    }

    return(
        <React.Fragment>
            <Header greenhouse={greenhouse} />
            <div className='mt-14 grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2' id='greenhouses'>
                    <div className='flex flex-row gap-2 my-2 text-green-900 text-lg' id='menu'>
                        <button className='flex-grow font-normal p-1 border-b-2 border-green-100 hover:border-green-700 transition-colors' onClick={() => handleClick(0)}>Dashboard</button>
                        <button className='flex-grow font-normal p-1 border-b-2 border-green-100 hover:border-green-700 transition-colors' onClick={() => handleClick(1)}>Plants</button>
                        <button className='flex-grow font-normal p-1 border-b-2 border-green-100 hover:border-green-700 transition-colors' onClick={() => handleClick(2)}>Settings</button>
                    </div>
                    {content}
                </div>
                <div></div>
            </div>
        </React.Fragment>
    )
}

export default Greenhouse;
