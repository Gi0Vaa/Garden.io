import { useNavigate } from 'react-router-dom';

const PlantCard = ({plant}) => {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/plant', {state: {plant}});
    }

    return(
        <button className="flex flex-col gap-2 p-3 rounded-md bg-amber-200 hover:bg-amber-400 hover:shadow-md transition-all text-green-900" onClick={handleClick}>
            <div className="flex flex-row w-full place-content-between items-center">
                {
                    plant.name.length > 12 ? <h4>{plant.name}</h4> : <h3>{plant.name}</h3>
                }
                <h4 className="font-normal">#{plant.plant_id}</h4>
            </div>
        </button>
    )
}

export default PlantCard;