import { useEffect, useState } from "react";
import axios from "axios";

function ModalPlant({ isOpen, onClose, greenhouseId }) {
    const [plant, setPlant] = useState({ plant_id: 0, name: '', description: '' });
    useEffect(() => {

    }, [plant]);

    function searchPlant() {
        const name = document.getElementById('plants').value;
        const description = document.getElementById('plantDescription');
        axios.get(`${process.env.REACT_APP_API_URL}/plants/research/${name}`)
            .then(response => {
                setPlant(response.data[0]);
                description.innerHTML = response.data[0].description;
            })
            .catch(() => {
                description.innerHTML = 'No plant found';
            });
    }

    function addPlant() {
        axios.post(`${process.env.REACT_APP_API_URL}/mapplants`, {
            greenhouse_id: greenhouseId,
            plant_id: plant.plant_id
        })
        .then(() => {
            onClose();
        });
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="top-0 left-0 absolute z-50 h-full w-full  bg-[rgba(255,255,255,0.7)]">
            <div className="grid md:grid-cols-3">
                <div></div>
                <div className="p-3 flex place-content-center items-center h-screen">
                    <div className="bg-green-500 rounded-md flex flex-col gap-4 p-3 w-full text-green-950">
                        <div className="flex flex-row place-content-between items-center">
                            <h3>Add Plant</h3>
                            <button onClick={onClose} className="px-3 py-2 text-white bg-red-500 hover:bg-red-600 transition-colors rounded-md font-semibold">Exit</button>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <input type="text" name='plants' id='plants' placeholder="Search a Plant" className=' focus:outline-none p-1 rounded-md' onChange={searchPlant} />
                            <div className=" h-56" id='plantDescription'></div>
                        </div>
                        <div className="flex flex-row place-content-between items-center">
                            <div></div>
                            <button onClick={addPlant} className="px-3 py-2 text-white bg-green-500 hover:bg-green-600 transition-colors rounded-md font-semibold">Add Plant</button>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default ModalPlant;