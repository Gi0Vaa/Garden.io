import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/header.js';
import PlantsGrid from '../components/plantsGrid.js';
import axios from 'axios';

function Greenhouse() {
    const location = useLocation();
    const [greenhouse, setGreenhouse] = useState({});
    const [data, setData] = useState([]);

    useEffect(() => {
        setGreenhouse(location.state.greenhouse);
        axios.get(`http://localhost:8080/mapplants/${location.state.greenhouse.greenhouse_id}`)
            .then(response => {
                setData(response.data);
            })
    }, [location.state.greenhouse]);

    return (
        <div>
            <Header greenhouse={greenhouse.name}/>
            <div className='grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2' id='greenhouses'>
                    <div className='flex flex-row gap-2 my-3 text-white'>
                        <h3 className='font-normal bg-green-700 p-1'>Dashboard</h3>
                        <h3 className='font-normal bg-green-700 p-1'>Plants</h3>
                        <h3 className='font-normal bg-green-700 p-1'>Settings</h3>
                    </div>
                    <PlantsGrid greenhousePlantsId={data} />
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Greenhouse;