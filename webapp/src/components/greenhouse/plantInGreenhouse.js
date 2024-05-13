import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlantById } from '../../services/plants';
import { deletePlantInGreenhouse, patchPlantInGreenhouse  } from '../../services/greenhouses';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faTrash, faAdd, faMinus } from '@fortawesome/free-solid-svg-icons'

const PlantInGreenhouse = ({ plant, deleteCallback }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(plant.quantity);
    const [plantInfo, setPlantInfo] = useState({});

    useState(() => {
        getPlantById(plant.plant_id)
            .then(response => {
                setPlantInfo(response.data);
            });
    }, []);

    function goToInfoPlant() {
        navigate('/plant', {state: {plant: plantInfo}});
    }

    function addPlant() {
        setQuantity(quantity + 1);
        updateQuantity(1);
    }

    function removePlant() {
        if(quantity > 1) {
            setQuantity(quantity - 1);
            updateQuantity(-1);
        }
    }

    function updateQuantity(value) {
        patchPlantInGreenhouse(plant.greenhouse_id, plant.plant_id, value)
    }

    function deletePlant() {
        deletePlantInGreenhouse(plant.greenhouse_id, plant.plant_id)
            .then(() => {
                deleteCallback(plant.plant_id);
            });
    }

    return(
        <div className="flex flex-col gap-2 p-3 rounded-md bg-amber-200 text-green-900">
            <div className="flex flex-row w-full place-content-between items-center">
                <h3>{plantInfo.name}</h3>
                <FontAwesomeIcon icon={faBook} onClick={goToInfoPlant} className="cursor-pointer p-1 sm:p-2 hover:bg-green-900 text-green-900 hover:text-green-100 rounded-md md:rounded-full transition-colors duration-300"/>
            </div>
            <div>
                <p>{plantInfo.description}</p>
            </div>
            <div className="flex flex-row w-full place-content-between items-center">
                <div className='flex flex-row '>
                    <FontAwesomeIcon icon={faMinus} onClick={removePlant} className=" p-1 text-white bg-red-400 hover:bg-red-600 transition-colors rounded-l-md"/>
                    <p className=' px-2 bg-green-50'>{quantity}</p>
                    <FontAwesomeIcon icon={faAdd} onClick={addPlant} className=" p-1 text-white bg-sky-400 hover:bg-sky-600 transition-colors rounded-r-md"/>
                </div>
                <FontAwesomeIcon icon={faTrash} onClick={deletePlant} className="cursor-pointer p-1 sm:p-2 text-red-400 hover:bg-red-400 hover:text-white rounded-md md:rounded-full transition-colors duration-300"/>
            </div>
        </div>
    )
}

export default PlantInGreenhouse;
