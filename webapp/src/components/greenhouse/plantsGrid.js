import { useEffect, useState } from 'react';
import PlantCard from '../plantCard';
import axios from 'axios';
import ModalPlant from './modalPlant';

function PlantsGrid({ greenhouseMap }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [content, setContent] = useState([]);

    useEffect(() => {
        setContent([]);
        greenhouseMap.forEach(p => {
            axios.get(`http://localhost:8080/plants/${p.plant_id}`)
                .then(response => {
                    setContent(prevContent => {
                        const newContent = <PlantCard key={p.plant_id} plant={response.data} />;
                        const isDuplicate = prevContent.some(item => item.key === newContent.key);
                        if (!isDuplicate) {
                            return [...prevContent, newContent];
                        }
                        return prevContent;
                    })
                });
        });
    }, [greenhouseMap]);

    function addPlant() {
        setModalOpen(true);
    }

    return (
        <div>
            <ModalPlant isOpen={modalOpen} greenhouseId={greenhouseMap[0].greenhouse_id} onClose={() => setModalOpen(false)} />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2' id='grid'>
                {content}
                <button className='col-span-2' onClick={addPlant}>
                    <div className=" flex place-content-center gap-2 p-3 rounded-md border-2 hover:bg-green-200 border-amber-400 border-dashed hover:border-solid transition-all text-green-900">
                        <div className="flex flex-row place-content-between items-center">
                            <h3>Add Plant</h3>
                        </div>
                    </div>
                </button>
            </div>
        </div>

    );
}

export default PlantsGrid; 