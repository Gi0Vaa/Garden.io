import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePlantInGreenhouse, patchPlantInGreenhouse } from '@services/greenhouses';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faTrash, faAdd, faMinus, faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons'

const Plant = ({ plant, greenhouse, plants, setPlants, count, setCount }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(plant.quantity);
    const [isGoodHumidity, setIsGoodHumidity] = useState({ state: null, message: '', value: null });
    const [isGoodTemperature, setIsGoodTemperature] = useState({ state: null, message: '', value: null });

    useState(() => {
        if (greenhouse.humidity < plant.minHumidity) {
            setIsGoodHumidity({ state: false, message: `The humidity is too low minimum is`, value: `${plant.minHumidity}%` });
        }
        else if (greenhouse.humidity > plant.maxHumidity) {
            setIsGoodHumidity({ state: false, message: `The humidity is too high maximum is`, value: `${plant.maxHumidity}%` });
        }
        else {
            setIsGoodHumidity({ state: true, message: 'The humidity is good' });
        }
        
        const temperature = parseFloat(greenhouse.temperature);
        if (temperature < parseFloat(plant.minTemperature)) {
            setIsGoodTemperature({ state: false, message: `The temperature is too low minimum is`, value: `${plant.minTemperature}°C` });
        }
        else if (temperature > parseFloat(plant.maxTemperature)) {
            setIsGoodTemperature({ state: false, message: `The temperature is too high maximum is`, value: `${plant.maxTemperature}°C` });
        }
        else {
            setIsGoodTemperature({ state: true, message: 'The temperature is good' });
        }
    }, []);

    useEffect(() => {
        setQuantity(plant.quantity);
    }, [plant]);

    function goToInfoPlant() {
        navigate('/plant', { state: { plant: plant, greenhouse: greenhouse } });
    }

    function addPlant() {
        setQuantity(quantity + 1);
        updateQuantity(1);
        setCount(count + 1);
        plants.find(p => p.plant_id === plant.plant_id).quantity++;
    }

    function removePlant() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            updateQuantity(-1);
            setCount(count - 1);
            plants.find(p => p.plant_id === plant.plant_id).quantity--;
        }
    }

    function updateQuantity(value) {
        patchPlantInGreenhouse(greenhouse.greenhouse, plant.plant_id, value)
    }

    function deletePlant() {
        deletePlantInGreenhouse(plant.greenhouse_id, plant.plant_id)
            .then(() => {
                setPlants(plants.filter(p => p.plant_id !== plant.plant_id));
            });
    }

    return (
        <div className="flex flex-col gap-2 p-3 rounded-md bg-amber-200 text-green-dark">
            <div className="flex flex-row w-full place-content-between items-center">
                <h3>{plant.name}</h3>
                <FontAwesomeIcon icon={faBook} onClick={goToInfoPlant} className="cursor-pointer p-1 sm:p-2 hover:bg-green-900 text-green-900 hover:text-green-100 rounded-md md:rounded-full transition-colors duration-300" />
            </div>
            <div>
                {
                    isGoodHumidity.state ?
                        <div className='flex flex-row gap-2 items-center'>
                            <FontAwesomeIcon icon={faCheck} className='text-green-400 p-1 text-lg' />
                            <p>{isGoodHumidity.message}</p>
                        </div>
                        :
                        <div className='flex flex-row gap-2 items-center'>
                            <FontAwesomeIcon icon={faExclamation} className='text-red-400 p-1 px-2 text-lg' />
                            <p>{isGoodHumidity.message} <span className='font-semibold'>{isGoodHumidity.value}</span></p>
                        </div>
                }

                {
                    isGoodTemperature.state ?
                        <div className='flex flex-row gap-2 items-center'>
                            <FontAwesomeIcon icon={faCheck} className='text-green-400 p-1 text-lg' />
                            <p>{isGoodTemperature.message}</p>
                        </div>
                        :
                        <div className='flex flex-row gap-2 items-center'>
                            <FontAwesomeIcon icon={faExclamation} className='text-red-400 p-1 px-2 text-lg' />
                            <p>{isGoodTemperature.message} <span className='font-semibold'>{isGoodTemperature.value}</span></p>
                        </div>
                }
            </div>
            <div className="flex flex-row w-full place-content-between items-center">
                <div className='flex flex-row '>
                    <FontAwesomeIcon icon={faMinus} onClick={removePlant} className=" p-1 text-white bg-red-400 hover:bg-red-600 transition-colors rounded-l-md" />
                    <p className=' px-2 bg-green-50'>{quantity}</p>
                    <FontAwesomeIcon icon={faAdd} onClick={addPlant} className=" p-1 text-white bg-sky-400 hover:bg-sky-600 transition-colors rounded-r-md" />
                </div>
                <FontAwesomeIcon icon={faTrash} onClick={deletePlant} className="cursor-pointer p-1 sm:p-2 text-red-400 hover:bg-red-400 hover:text-white rounded-md md:rounded-full transition-colors duration-300" />
            </div>
        </div>
    )
}

export default Plant;
