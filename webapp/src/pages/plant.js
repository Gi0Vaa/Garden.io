import React, { useEffect } from 'react';
import Header from "../components/header"
import defaultImg from '../assets/img/plants/default.svg'
import { useLocation } from 'react-router-dom';

const Plant = () => {
    const location = useLocation();

    useEffect(() => {
        document.title = `${location.state.plant.name} | ${process.env.REACT_APP_NAME}`;
    }, [location.state.plant.name]);

    const plant = location.state.plant;
    let imgURL;
    try{
        imgURL = require(`../assets/img/plants/${plant.name.toLowerCase().replace(/\s/g, '')}.jpg`);
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
                        <h3 className='font-normal p-3 bg-green-100 rounded-b-md xl:rounded-r-md xl:rounded-bl-none'>{plant.description}</h3>
                    </div>
                </div>
                <div></div>
            </div>
        </React.Fragment>
    )
}

export default Plant;