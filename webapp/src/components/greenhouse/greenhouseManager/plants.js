import React from 'react';

import { useEffect, useState } from 'react';
import { getPlantsInGreenhouse } from '@services/greenhouses';

import Plant from './plant';
import ModalPlant from './modalPlant';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

const Plants = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [plants, setPlants] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setPlants([]);
        getPlantsInGreenhouse(id)
            .then(response => {
                setPlants(response.data);
                countPlants(response.data);
            });
    }, [id]);

    useEffect(() => {
        countPlants(plants);
    }, [plants]);

    async function countPlants(data) {
        let c = 0;
        for (let p of data) {
            c += p.quantity;
        }
        setCount(c);
    }

    return (
        <React.Fragment>
            {
                isModalOpen && <ModalPlant greenhouseId={id} setIsModalOpen={setIsModalOpen} plants={plants} setPlants={setPlants} />
            }
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-2 text-green-dark' id='grid'>
                <div className='xl:col-span-2 p-2 flex flex-row place-content-between'>
                    <h4 className='font-semibold'>Number of plants: {count}</h4>
                    <button className='xl:col-span-2 px-2 rounded-sm text-white bg-green-600 hover:bg-green-500 transition-colors' onClick={() => setIsModalOpen(true)} >
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>
                {plants.map((plant) => {
                    return (
                        <Plant key={plant.plant_id} plant={plant} setPlants={setPlants} count={count} setCount={setCount} plants={plants} />
                    );
                })}
            </div>
        </React.Fragment>
    )
}

export default Plants; 