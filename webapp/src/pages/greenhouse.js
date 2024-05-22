import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from '../components/header.js';
import Plants from '@greenhouse/greenhouseManager/plants/plants.js';
import Dashboard from '@greenhouse/greenhouseManager/dashboard.js';
import Settings from '@greenhouse/greenhouseManager/settings/settings.js';
import SubMenuBtn from '@inputs/buttons/subMenuBtn.js';

import { getPlantsInGreenhouse, getGreenhouse } from '@services/greenhouses.js';

const Greenhouse = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const greenhouseId = location.state.greenhouse;

    const [plants, setPlants] = useState([]);
    const [greenhouse, setGreenhouse] = useState({});
    const [currentPanel, setCurrentPanel] = useState('dashboard');
    const [warningCount, setWarningCount] = useState(null);
    

    useEffect(() => {
        if (greenhouseId === null) return navigate('/');
        getGreenhouse(greenhouseId)
            .then(g => {
                if(!g) return navigate('/');
                setGreenhouse(g);
            });
    }, [greenhouseId, setGreenhouse, navigate]);

    useEffect(() => {
        document.title = `${greenhouse.name || "Dashboard"} | ${process.env.REACT_APP_NAME}`;
    }, [greenhouse]);

    useEffect(() => {
        if (greenhouseId === null) return;
        getPlantsInGreenhouse(greenhouseId)
            .then(response => {
                setPlants(response);
            })
            .catch(err => {
                setPlants([]);
            });
    }, [greenhouseId, setPlants]);

    useEffect(() => {
        if (plants.length === 0 || Object.keys(greenhouse).length === 0) return;
        let count = 0;
        for (let plant of plants) {
            if(plant.minHumidity > greenhouse.humidity || plant.maxHumidity < greenhouse.humidity) {
                count++;
            }
            if(parseFloat(plant.minTemperature) > parseFloat(greenhouse.temperature) || parseFloat(plant.maxTemperature) < parseFloat(greenhouse.temperature)) {
                count++;
            }
        }
        setWarningCount(count);
    }, [plants, greenhouse]);

    const renderContent = () => {
        switch (currentPanel) {
            case 'dashboard':
                return <Dashboard warningCount={warningCount} greenhouse={greenhouse} />;
            case 'plants':
                return <Plants plants={plants} setPlants={setPlants} greenhouse={greenhouse} />;
            case 'settings':
                return <Settings greenhouse={greenhouse} setGreenhouse={setGreenhouse} />;
            default:
                return <Dashboard warningCount={warningCount} greenhouse={greenhouse} />;
        }
    }

    if (greenhouseId === null) return <div></div>;
    return (
        <React.Fragment>
            <Header greenhouse={greenhouse} />
            <div className='mt-14 grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2' id='greenhouses'>
                    <div className='flex flex-row gap-2 my-2 text-green-dark text-lg' id='menu'>
                        <SubMenuBtn title='Dashboard' onClick={() => setCurrentPanel('dashboard')} isActive={currentPanel === 'dashboard'} />
                        <SubMenuBtn title='Plants' onClick={() => setCurrentPanel('plants')} isActive={currentPanel === 'plants'} />
                        <SubMenuBtn title='Settings' onClick={() => setCurrentPanel('settings')} isActive={currentPanel === 'settings'} />
                    </div>
                    {renderContent()}
                </div>
                <div></div>
            </div>
        </React.Fragment>
    )

}

export default Greenhouse;