import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGreenhouse, addPlantInGreenhouse } from '@services/greenhouses';
import Loading from '@components/status/loading';

const CreateLoading = ({ userId, greenhouse, plant, welcome = false }) => {
    const [obj] = useState({ userId: userId, name: greenhouse.name, description: greenhouse.description });
    const hasCreatedRef = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasCreatedRef.current) {
            createGreenhouse(obj)
                .then(g => {
                    addPlantInGreenhouse(g.id, plant.plant_id, 1)
                        .then(() => {
                            setTimeout(() => {
                                if (welcome) navigate('/welcome');
                                else navigate('/greenhouse', { state: { greenhouse: g.id } });
                            }, 300);
                        });
                });
            hasCreatedRef.current = true; // Imposta il ref a true dopo l'esecuzione
        }
    }, [navigate, obj, plant.plant_id, welcome]);



    return (
        <Loading message={"Creando la tua serra..."} />
    );
}

export default CreateLoading;