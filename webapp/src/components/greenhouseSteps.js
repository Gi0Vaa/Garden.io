import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddPlant from "./createGreenhouse/addPlant";
import AddGreenhouse from "./createGreenhouse/addGreenhouse";

function CreateGreenhouse({ message }) {
    const [greenhouse, setGreenhouse] = useState({ name: '', description: '' });
    const [plant, setPlant] = useState({ plant_id: 1 });
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    function next() {
        saveData();
        setStep(step + 1);
        if (step === 2) {
            const obj = greenhouse;
            obj.email = localStorage.getItem('email');
            axios.post('http://localhost:8080/greenhouses', obj)
                .then(response => {
                    const obj = {
                        plant_id: plant.plant_id,
                        greenhouse_id: response.data.greenhouse_id
                    }
                    axios.post('http://localhost:8080/mapplants', obj)
                        .then(response => {
                            if (response.status === 201) {
                                navigate('/welcome');
                            }
                        })
                })
                .catch(error => {
                    console.log(error);
                    navigate('/error', {
                        state: {
                            code: error.response.status,
                            status: error.response.statusText,
                            message: error.response.data.message
                        }
                    });
                });
        }
    }

    function back() {
        if (step > 1) {
            saveData();
            setStep(step - 1);
        }
    }

    function saveData() {
        if (document.getElementById('greenhouseName') !== null && document.getElementById('greenhouseDescription') !== null) {
            setGreenhouse({
                name: document.getElementById('greenhouseName').value,
                description: document.getElementById('greenhouseDescription').value
            });
        }
        if (document.getElementById('plants') !== null) {
            setPlant({
                plant_id: parseInt(document.getElementById('plants').value)
            })
        }
    }

    let content = '';
    switch (step) {
        case 1:
            content = <AddGreenhouse message={message} />
            break;
        case 2:
            content = <AddPlant plant={plant} />
            break;
        default:
            content = <AddPlant plant={plant} />
    }

    return (
        <div className='md:col-span-2 flex flex-col gap-2 text-center '>
            <div className="p-2 rounded-md text-left  bg-green-300 shadow-md flex flex-col gap-2">
                {content}
                <div className='flex flex-row place-content-between p-3'>
                    <button className="p-2 text-green-950 font-semibold hover:bg-green-200 rounded-md transition-colors" onClick={back}>Back</button>
                    <button className="p-2 bg-green-600 hover:bg-green-700 transition-colors text-white rounded-md" onClick={next}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default CreateGreenhouse;