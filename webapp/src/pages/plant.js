import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Header from "../components/header"
import defaultImg from '@images/plants/default.svg'

const Plant = () => {
    const location = useLocation();

    useEffect(() => {
        document.title = `${location.state.plant.name} | ${process.env.REACT_APP_NAME}`;
    }, [location.state.plant.name]);

    const plant = location.state.plant;
    let imgURL;
    try{
        imgURL = require(`../assets/img/plants/${plant.plant_id}.jpg`);
    }
    catch (e){
        imgURL = defaultImg;
    }

    return(
        <React.Fragment>
            <Header />
            <div className='mt-14 grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2' id='greenhouses'>
                    <div className='flex flex-row place-content-between py-3 items-baseline'>
                        <h2 className=''>{plant.name}</h2>
                        <h3 className='font-normal'>#{plant.plant_id}</h3>
                    </div>
                    <div className='grid xl:grid-cols-2'>
                        <img src={ imgURL } alt={plant.name} className='h-80 object-cover bg-orange-200 rounded-t-md xl:rounded-l-md xl:rounded-tr-none w-full' />
                        <div className='flex flex-col gap-2 p-3 bg-green-100 rounded-b-md xl:rounded-r-md xl:rounded-bl-none'>
                            <div className='flex flex-col'>
                                <h3 className='font-semibold'>Description</h3>
                                <h3 className='font-normal'>{plant.description}</h3>
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='font-semibold'>Humidity</h3>
                                <h3 className='font-normal'>{plant.minHumidity} - {plant.maxHumidity}%</h3>
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='font-semibold'>Temperature</h3>
                                <h3 className='font-normal'>{plant.minTemperature} - {plant.maxTemperature}°C</h3>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div></div>
            </div>
        </React.Fragment>
    )
}

export default Plant;