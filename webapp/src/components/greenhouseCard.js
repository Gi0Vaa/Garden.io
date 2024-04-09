import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import plant from '../assets/img/wateringPlant.svg'

function GreenhouseCard({ data }) {
    const [greenhouse, setGreenhouse] = useState({});
    const imageBGRef = useRef(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/greenhouses/${data.greenhouse_id}`)
            .then(response => {
                setGreenhouse(response.data);
            });
    }, [data]);

    function handleMouseOver() {
        const imageBG = imageBGRef.current;
        imageBG.style.transition = 'all 0.3s';
        imageBG.classList.remove('bg-violet-400');
        imageBG.classList.add('bg-amber-100');
    }

    function handleMouseOut() {
        const imageBG = imageBGRef.current;
        imageBG.style.transition = 'all 0.3s';
        imageBG.classList.remove('bg-amber-100');
        imageBG.classList.add('bg-violet-400');
    }

    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="rounded-md text-green-900 grid grid-cols-3 md:grid-cols-1 md:grid-rows-2 shadow-md hover:shadow-xl transition-all">
            <div ref={imageBGRef} className='bg-violet-400 rounded-l-md md:rounded-bl-none md:rounded-t-md p-2'>
                <img src={plant} alt='Plant' className='object-cover'></img>
            </div>
            <div className='flex flex-col gap-1 p-2 col-span-2 md:col-span-1 rounded-r-md md:rounded-tr-none md:rounded-b-md'>
                <h3>{greenhouse.name}</h3>
                <p>{greenhouse.description}</p>
            </div>

        </div>
    )
}

export default GreenhouseCard;