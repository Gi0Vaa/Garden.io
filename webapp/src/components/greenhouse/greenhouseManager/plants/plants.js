import React from 'react';

import { useEffect, useState } from 'react';

import Plant from './plant';
import ModalPlant from './modalPlant';
import GreenButton from '@inputs/buttons/greenButton';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

const Plants = ({plants, setPlants, greenhouse }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        countPlants(plants);
    }, [greenhouse, plants]);

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
                isModalOpen && <ModalPlant greenhouseId={greenhouse.greenhouse} setIsModalOpen={setIsModalOpen} plants={plants} setPlants={setPlants} />
            }
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-2 text-green-dark' id='grid'>
                <div className='xl:col-span-2 p-2 flex flex-row place-content-between'>
                    <h4 className='font-semibold'>Number of plants: {count}</h4>
                    <GreenButton icon={<FontAwesomeIcon icon={faAdd} />} onClick={() => setIsModalOpen(true)} padding={'px-2 py-1 '} />
                </div>
                {plants.map((plant) => {
                    return (
                        <Plant key={plant.plant_id} plant={plant} greenhouse={greenhouse} setPlants={setPlants} count={count} setCount={setCount} plants={plants} />
                    );
                })}
            </div>
        </React.Fragment>
    )
}

export default Plants; 