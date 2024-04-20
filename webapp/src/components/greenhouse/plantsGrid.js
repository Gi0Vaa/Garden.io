import React from 'react';
import axios from 'axios';

import { useEffect, useState } from 'react';

import PlantInGreenhouse from './plantInGreenhouse';
import ModalPlant from './modalPlant';

axios.defaults.withCredentials = true;

const PlantsGrid = ({ id }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [content, setContent] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/greenhouses/${id}/plants`)
            .then(response => {
                setContent([]);
                response.data.forEach(p => {
                    setContent(content => [...content, <PlantInGreenhouse key={p.plant_id} plant={p} />]);
                });
            });
    }, [id]);

    return (
        <React.Fragment>
            <ModalPlant isOpen={modalOpen} greenhouseId={id} onClose={() => setModalOpen(false)} />
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-2' id='grid'>
                {content}
                <button className='xl:col-span-2' onClick={() => setModalOpen(true)} >
                    <div className=" flex place-content-center gap-2 p-3 rounded-md border-2 hover:bg-green-200 border-amber-400 border-dashed hover:border-solid transition-all text-green-900">
                        <div className="flex flex-row place-content-between items-center">
                            <h3>Add Plant</h3>
                        </div>
                    </div>
                </button>
            </div>
        </React.Fragment>
    )
}

export default PlantsGrid; 