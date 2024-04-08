import axios from 'axios'
import Header from "../components/header";
import PlantCard from "../components/plantCard";

import { useEffect, useState } from 'react';


function Herbarium(){
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/plants`)
            .then(response => setPlants(response.data));
    }, []);

    function searchPlant() {
        const name = document.getElementById('search').value;
        if(name === ''){
            axios.get(`${process.env.REACT_APP_API_URL}/plants`)
                .then(response => setPlants(response.data));
            return;
        }
        axios.get(`${process.env.REACT_APP_API_URL}/plants/research/${name}`)
            .then(response => {
                setPlants(response.data);
            })
            .catch(() => {
                setPlants([]);
            });
    }

    return(
        <div>
            <Header index={1}/>
            <div className=' mt-14 grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-2' id='greenhouses'>
                    <div className='col-span-3 place-items-center'>
                        <div className='flex flex-row place-content-center'>
                            <input onChange={searchPlant} id='search' type='text' placeholder='Search a Plant' className=' w-3/4 bg-green-200 px-3 py-2 rounded-md focus:outline-none text-green-900'></input>
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