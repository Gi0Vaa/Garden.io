import React from "react";

import { useEffect, useState } from 'react';

import PlantCard from "./plantCard";
import { getPlants, getPlantsByName } from '../../services/plants';

const Plants = ({name}) => {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        document.title = `Herbarium | ${process.env.REACT_APP_NAME}`;

        if(name !== ""){
            getPlantsByName(name)
                .then(res => {
                    setPlants(res.data)
                }
        );
        }
        else{
            getPlants()
                .then(res => setPlants(res.data));
        }
    }, [name]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2' id='greenhouses'>
            {plants.map((p, index) => <PlantCard key={index} plant={p} /> )}
        </div>
    )
}

export default Plants;