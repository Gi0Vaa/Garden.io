import { useEffect, useState } from "react";

import { addPlantInGreenhouse, patchPlantInGreenhouse } from "@services/greenhouses";
import { getPlantById } from "@services/plants";

import SearchbarProp from "@inputs/search/searchbarProp";
import GreenButton from "@inputs/buttons/greenButton";
import RedButton from "@inputs/buttons/redButton";

//services
import { getPlantsByName } from "@services/plants";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const ModalPlant = ({ setIsModalOpen, greenhouseId, plants, setPlants }) => {
    const [plant, setPlant] = useState({ plant_id: 0, name: '', description: '' });
    const [selectedProp, setSelectedProp] = useState({ id: null, name: null });

    useEffect(() => {
        if (selectedProp.id === null) return;
        getPlantById(selectedProp.id)
            .then(p => setPlant(p));
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
                                <RedButton icon={<FontAwesomeIcon icon={faXmark} />} onClick={() => setIsModalOpen(false)} padding={'px-2 py-1'} />
                            </div>
                            <SearchbarProp setSelectedProp={setSelectedProp} searchResults={getPlantsByName} />
                            <div className="flex flex-col gap-2">
                                <p>{plant.description}</p>
                            </div>
                        </div>
                        <div className="flex flex-row place-content-between items-center">
                            <div></div>
                            <GreenButton text="Add Plant" onClick={addPlant} />
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default ModalPlant;