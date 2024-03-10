import { useNavigate } from 'react-router-dom';

function PlantCard({plant}){
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/plant?id=${plant.plant_id}`);
    }

    return(
        <div className="flex flex-col gap-2 p-3 rounded-md bg-amber-200 hover:bg-amber-400 hover:shadow-md transition-all text-green-900" onClick={handleClick}>
            <div className="flex flex-row place-content-between items-center">
                <h3>{plant.name}</h3>
                <h4 className="font-normal">#{plant.plant_id}</h4>
            </div>
        </div>
    )
}

export default PlantCard;