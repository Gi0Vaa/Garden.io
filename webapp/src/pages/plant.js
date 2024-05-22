import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Header from "../components/header"
import defaultImg from '@images/plants/default.svg'
import InfoPlantCard from '@components/plants/infoPlantCard';

const Plant = () => {
    const location = useLocation();

    useEffect(() => {
        document.title = `${location.state.plant.name} | ${process.env.REACT_APP_NAME}`;
    }, [location.state.plant.name]);

    const plant = location.state.plant;
    const greenhouse = location.state.greenhouse;
    let imgURL;
    try{
        imgURL = require(`@images/plants/${plant.plant_id}.jpg`);
    }
    catch (e){
        imgURL = defaultImg;
    }

    return(
        <React.Fragment>
            <Header greenhouse={greenhouse} />
            <InfoPlantCard plant={plant} imgURL={imgURL} />
        </React.Fragment>
    )
}

export default Plant;