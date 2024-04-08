import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import plant from '../assets/img/wateringPlant.svg'

function GreenhouseCard({data}) {
    const [greenhouse, setGreenhouse] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/greenhouses/${data.greenhouse_id}`)
            .then(response => {
                setGreenhouse(response.data);
            });
    },[data]);

    function handleClick() {
        navigate('/greenhouse', {state: {greenhouse: greenhouse}});
    }

    return(
        <div onClick={handleClick} className="p-3 bg-sky-200 hover:bg-violet-300 rounded-md text-green-900 flex flex-col gap-3 hover:shadow-md transition-all">
            <h3>{greenhouse.name}</h3>
            <img src={plant} alt='Plant'></img>
            <h4 className="font-normal">{greenhouse.description}</h4>
        </div>
    )
}

export default GreenhouseCard;