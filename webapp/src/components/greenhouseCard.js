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
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="rounded-md text-green-900 grid grid-rows-2 shadow-md hover:shadow-xl transition-all">
            <div ref={imageBGRef} className='bg-violet-400 h-32 md:h-full rounded-t-md '>
                <img src={plant} alt='Plant' className=' object-contain h-full w-full '></img>
            </div>
            <div className='flex flex-col gap-1 p-2 md:col-span-1 rounded-b-md overflow-auto whitespace-normal'>
                <h3>{greenhouse.name}</h3>
                <p>{greenhouse.description}</p>
            </div>

        </div>
    )
}

export default GreenhouseCard;