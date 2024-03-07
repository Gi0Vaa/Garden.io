import { useEffect, useRef } from 'react';
import plantsImg from '../../assets/img/background/Potted-plants.svg'
import axios from 'axios'

function AddPlant(plant) {
    let dataRef = useRef();
    useEffect(() => {
        axios.get('http://localhost:8080/plants')
            .then(response => {
                const select = document.getElementById('plants');
                select.innerHTML = '';
                dataRef.current = response.data;
                dataRef.current.forEach(p => {
                    const option = document.createElement('option');
                    option.value = p.plant_id;
                    option.text = p.name;
                    if (p.plant_id === plant.plant_id) {
                        option.selected = true;
                        document.getElementById('plantDescription').innerHTML = p.description;
                    }
                    select.appendChild(option);
                });

            });
    }, [plant]);

    function addDescription() {
        const description = document.getElementById('plantDescription');
        const id = parseInt(document.getElementById('plants').value);
        const text = dataRef.current.find(p => p.plant_id === id).description;
        description.innerHTML = text;
    }

    return (
        <div>
            <h3 className=" font-bold text-green-950 p-3" >Add your first Plant</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2" >
                <div className="hidden xl:block h-80">
                    <img src={plantsImg} alt="greenhouse" className="h-full w-full object-cover" />
                </div>
                <div className='flex flex-col gap-3 p-2'>
                    <select name='plants' id='plants' className=' focus:outline-none p-1 rounded-md' onChange={addDescription}>
                    </select>
                    <div id='plantDescription'></div>
                </div>
            </div>
        </div>
    )
}

export default AddPlant;