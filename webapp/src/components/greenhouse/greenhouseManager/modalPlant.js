import { useEffect, useState } from "react";

import { addPlantInGreenhouse, patchPlantInGreenhouse } from "@services/greenhouses";
import { getPlantById } from "@services/plants";

import SearchbarProp from "@inputs/search/searchbarProp";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faSquarePlus } from '@fortawesome/free-solid-svg-icons'

const ModalPlant = ({ setIsModalOpen, greenhouseId, plants, setPlants }) => {
    const [plant, setPlant] = useState({ plant_id: 0, name: '', description: '' });
    const [selectedProp, setSelectedProp] = useState({ id: null, name: null });

    useEffect(() => {
        if (selectedProp.id === null) return;
        getPlantById(selectedProp.id)
            .then(res => setPlant(res.data));
    }, [selectedProp]);

    function addPlant() {
        const p = plants.find(p => p.plant_id === plant.plant_id)
        if (p) {
            patchPlantInGreenhouse(greenhouseId, plant.plant_id, 1)
                .then(() => {
                    setSelectedProp({ id: null, name: null });
                    setPlant({ plant_id: 0, name: '', description: '' });
                    setIsModalOpen(false);
                    setPlants(plants.map(p => {
                        if (p.plant_id === plant.plant_id) {
                            return { ...p, quantity: p.quantity + 1 };
                        }
                        return p;
                    }));
                });
        }
        else {
            addPlantInGreenhouse(greenhouseId, plant.plant_id, 1)
                .then(() => {
                    setSelectedProp({ id: null, name: null });
                    setPlant({ plant_id: 0, name: '', description: '' });
                    setPlants([...plants, { ...plant, quantity: 1 }]);
                    setIsModalOpen(false);
                });
        }
    }

    return (
        <div className="top-0 left-0 absolute z-50 h-full w-full  bg-[rgba(255,255,255,0.7)]">
            <div className="grid md:grid-cols-3">
                <div></div>
                <div className="p-3 flex place-content-center items-center h-screen">
                    <div className="bg-green-light rounded-md flex flex-col gap-4 p-3 w-full h-2/4 place-content-between text-green-dark">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row place-content-between items-center">
                                <h3>Add Plant</h3>
                                <button onClick={(e) => setIsModalOpen(false)} className="p-1 px-2 text-white bg-red-500 hover:bg-red-400 transition-colors rounded-md font-semibold">
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                            <SearchbarProp setSelectedProp={setSelectedProp} />
                            <div className="flex flex-col gap-2">
                                <p>{plant.description}</p>
                            </div>
                        </div>
                        <div className="flex flex-row place-content-between items-center">
                            <div></div>
                            <button onClick={addPlant} className="p-1 px-2 text-white bg-green-600 hover:bg-green-500 transition-colors rounded-md font-semibold">
                                <FontAwesomeIcon icon={faSquarePlus} />
                            </button>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default ModalPlant;