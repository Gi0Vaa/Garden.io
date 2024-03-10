import axios from 'axios'
import Header from "../components/header";
import PlantCard from "../components/plantCard";

import { useEffect, useState } from 'react';


function Herbarium(){
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/plants')
            .then(response => setPlants(response.data));
    }, []);

    return(
        <div>
            <Header index={1}/>
            <div className='grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-2' id='greenhouses'>
                    <div className='col-span-3 place-items-center'>
                        <div className='flex flex-row'>
                            <input type='text' placeholder='Search a Plant' className=' w-1/2 bg-green-200 p-1 rounded-md focus:outline-none text-white'></input>
                        </div>
                    </div>
                    {plants.map((p, index) => <PlantCard key={index} plant={p} /> )}
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default Herbarium;