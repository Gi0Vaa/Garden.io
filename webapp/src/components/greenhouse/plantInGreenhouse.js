import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faTrash, faAdd, faMinus } from '@fortawesome/free-solid-svg-icons'

const PlantInGreenhouse = ({ plant, id }) => {
    const navigate = useNavigate();
    function goToInfoPlant() {
        navigate('/plant', {state: {plant}});
    }

    function deletePlant() {
        axios.delete(`${process.env.REACT_APP_API_URL}/greenhouses/${id}/plants/${plant.plant_id}`)
            .then(() => {
                window.location.reload();
            });
    }

    return(
        <div className="flex flex-col gap-2 p-3 rounded-md bg-amber-200 text-green-900">
            <div className="flex flex-row w-full place-content-between items-center">
                <h3>{plant.name}</h3>
                <FontAwesomeIcon icon={faBook} onClick={goToInfoPlant} className="cursor-pointer p-1 sm:p-2 hover:bg-green-900 text-green-900 hover:text-green-100 rounded-full transition-colors duration-300"/>
            </div>
            <div>
                <p>{plant.description}</p>
            </div>
            <div className="flex flex-row w-full place-content-between items-center">
                <div className='flex flex-row '>
                    <FontAwesomeIcon icon={faMinus} className=" p-1 text-white bg-red-400 hover:bg-red-600 transition-colors rounded-l-md"/>
                    <p className=' px-2 bg-green-50'>1</p>
                    <FontAwesomeIcon icon={faAdd} className=" p-1 text-white bg-sky-400 hover:bg-sky-600 transition-colors rounded-r-md"/>
                </div>
                <FontAwesomeIcon icon={faTrash} onClick={deletePlant} className="cursor-pointer p-1 sm:p-2 text-red-400 hover:bg-red-400 hover:text-white rounded-full transition-colors duration-300"/>
            </div>
        </div>
    )
}

export default PlantInGreenhouse;
