import React from 'react';

import { useState } from 'react';

import Header from "../components/header";
import Plants from '../components/plants/plants';
import Searchbar from '../components/input/search/searchbar';

const Herbarium = () => {
    const [search, setSearch] = useState('');
    /*
    function searchPlant() {
        const name = document.getElementById('search').value;
        if(name === ''){
            getPlants() 
                .then(res => setPlants(res.data));
            return;
        }
        getPlantsByName(name)
            .then(res => {
                setPlants(res.data);
            })
            .catch(() => {
                setPlants([]);
            });
    }*/

    return(
        <React.Fragment>
            <Header index={1}/>
            <div className='mt-14 grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2 flex flex-col gap-2 justify-center items-center'>
                    <div className='w-full md:w-2/3'>
                        <Searchbar search={search} setSearch={setSearch} />
                    </div>
                    <div className="w-full">
                        <Plants name={search} />
                    </div>  
                </div>
                <div></div>
            </div>
        </React.Fragment>
    );
}

export default Herbarium;