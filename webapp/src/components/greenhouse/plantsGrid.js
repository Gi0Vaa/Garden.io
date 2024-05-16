import React from 'react';

import { useEffect, useState } from 'react';
import { getPlantsInGreenhouse } from '../../services/greenhouses';

import PlantInGreenhouse from './plantInGreenhouse';
import ModalPlant from './modalPlant';

const PlantsGrid = ({ id }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        setPlants([]);
        getPlantsInGreenhouse(id)
            .then(response => {
                setPlants(response.data);
            });
    }, [id]);

    const deleteCallback = (plant_id) => {
        setPlants(plants.filter(p => p.plant_id !== plant_id));
    };

    return (
        <React.Fragment>
            <ModalPlant isOpen={modalOpen} greenhouseId={id} onClose={() => setModalOpen(false)} />
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-2' id='grid'>
                <button className='xl:col-span-2' onClick={() => setModalOpen(true)} >
                    <div className=" flex place-content-center gap-2 p-3 rounded-md border-2 hover:bg-green-200 border-amber-400 border-dashed hover:border-solid transition-all text-green-dark">
                        <div className="flex flex-row place-content-between items-center">
                            <h3>Add Plant</h3>
                        </div>
                    </div>
                </button>
                {plants.map((plant, index) => {
                    return (
                        <PlantInGreenhouse key={index} plant={plant} deleteCallback={deleteCallback} />
                    );
                })}
            </div>
        </React.Fragment>
    )
}

export default PlantsGrid; 