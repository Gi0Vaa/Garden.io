import { useEffect, useState } from 'react';
import axios from 'axios'
import plant from '../assets/img/wateringPlant.svg'

function GreenhouseCard({data}) {
    const [greenhouse, setGreenhouse] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8080/greenhouses/${data.greenhouse_id}`)
            .then(response => {
                setGreenhouse(response.data);
            });
    },[]);

    return(
        <div className="p-3 bg-sky-200 hover:bg-violet-300 rounded-md text-green-900 flex flex-col gap-3 hover:shadow-md transition-all">
            <h3>{greenhouse.name}</h3>
            <img src={plant} alt='Plant'></img>
            <h4 className="font-normal">{greenhouse.description}</h4>
        </div>
    )
}

export default GreenhouseCard;