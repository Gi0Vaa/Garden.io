import axios from 'axios'
import Header from "../components/header";
import PlantCard from "../components/plantCard";
import React from 'react';
import { useEffect, useState } from 'react';

axios.defaults.withCredentials = true;

const Herbarium = () => {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        document.title = `Herbarium | ${process.env.REACT_APP_NAME}`;

        axios.get(`/api/plants`)
            .then(response => setPlants(response.data));
    }, []);

    function searchPlant() {
        const name = document.getElementById('search').value;
        if(name === ''){
            axios.get(`/api/plants`)
                .then(response => setPlants(response.data));
            return;
        }
        axios.get(`/api/plants/research/${name}`)
            .then(response => {
                setPlants(response.data);
            })
            .catch(() => {
                setPlants([]);
            });
    }

    return(
        <React.Fragment>
            <Header index={1}/>
            <div className='mt-14 grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2' id='greenhouses'>
                    <div className='col-span-full place-items-center'>
                        <div className='flex flex-row place-content-center'>
                            <input onChange={searchPlant} id='search' type='text' placeholder='Search a Plant' className=' w-full md:w-3/4 bg-green-200 px-3 py-2 rounded-md focus:outline-none text-green-900'></input>
                        </div>
                    </div>
                    {plants.map((p, index) => <PlantCard key={index} plant={p} /> )}
                </div>
                <div></div>
            </div>
        </React.Fragment>
    );
}

export default Herbarium;