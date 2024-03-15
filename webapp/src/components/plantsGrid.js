import { useEffect, useState } from 'react';
import PlantCard from './plantCard';
import axios from 'axios';

function PlantsGrid({greenhousePlantsId}){
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        if(greenhousePlantsId.length === 0){
            return;
        }
        const p = [];
        greenhousePlantsId.forEach((plant) => {
            axios.get(`http://localhost:8080/plants/${plant.plant_id}`)
                .then(response => {
                    p.push(response.data);
                })
                .then(() => {
                    setPlants(p);
                })
        });
    }, [greenhousePlantsId]);
    
    return(
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {plants.map((p, index) => <PlantCard key={index} plant={p} /> )}
        </div>
    );
}

export default PlantsGrid; 