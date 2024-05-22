import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Header from "../components/header"
import InfoPlantCard from '@components/plants/infoPlantCard';
import defaultImg from '@images/plants/default.svg'

const Plant = () => {
    const location = useLocation();
    const plant = location.state.plant;
    const greenhouse = location.state.greenhouse;

    let img;
    try{
        img = require(`../assets/img/plants/${plant.plant_id}.jpg`);
    }
    catch (e){
        img = defaultImg;
    }

    useEffect(() => {
        document.title = `${plant.name} | ${process.env.REACT_APP_NAME}`;
    }, [plant.name]);


    return(
        <React.Fragment>
            <Header greenhouse={greenhouse} />
            <InfoPlantCard plant={plant} img={img} />
        </React.Fragment>
    )
}

export default Plant;