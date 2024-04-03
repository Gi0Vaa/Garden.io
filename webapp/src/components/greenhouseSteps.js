import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddPlant from "./createGreenhouse/addPlant";
import AddGreenhouse from "./createGreenhouse/addGreenhouse";

function CreateGreenhouse({ message, welcome = false }) {
    const [greenhouse, setGreenhouse] = useState({});
    const [plant, setPlant] = useState({ plant_id: 1 });
    const [content, setContent] = useState("");
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(greenhouse);
        console.log(plant);
        switch (step) {
            case 1:
                setContent(<AddGreenhouse message={message} />);
                break;
            case 2:
                setContent(<AddPlant plant={plant} />);
                break;
            case 3:
                const obj = greenhouse;
                obj.email = localStorage.getItem('email');
                axios.post('http://localhost:8080/greenhouses', obj)
                    .then(response => {
                        const obj = {
                            plant_id: plant.plant_id,
                            greenhouse_id: response.data.greenhouse_id

    //FIXME: Do not save te correct plant
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
                    console.log(obj);
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
                        axios.post('http://localhost:8080/mapplants', obj)
                            .then(response => {
                                setTimeout(() => {
                                    const obj = greenhouse;
                                    obj.greenhouse_id = response.data.greenhouse_id;
                                    if (welcome) {
                                        navigate('/welcome');
                                    }
                                    else {
                                        navigate('/greenhouse', { state: { greenhouse: obj } });
                                    }
                                }, 1000);
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
                    setContent(<div>Creating Greenhouse...</div>);
                break;
            default:
                setContent("<div>Not Found</div>");
                break;
        }
    }, [step, plant, message, greenhouse, navigate, welcome]);

    function next() {
        switch (step) {
            case 1:
                if (document.getElementById('greenhouseName') !== null && document.getElementById('greenhouseName').value !== '') {
                    setGreenhouse({
                        name: document.getElementById('greenhouseName').value,
                        description: document.getElementById('greenhouseDescription').value
                    });
                    setStep(step + 1);
                }
                break;
            case 2:
                if (document.getElementById('plants') !== null) {
                    setPlant({
                        plant_id: parseInt(document.getElementById('plants').value)
                    });
                    setStep(step + 1);
                }
                break;
            default:
                setStep(step + 1);
                break;
        }
    }

    function back() {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    return (
        <div className='md:col-span-2 flex flex-col gap-2 text-center '>
            <div className="p-2 rounded-md text-left  bg-green-300 shadow-md flex flex-col gap-2">
                {content}
                <div className='flex flex-row place-content-between p-3'>
                    <button id="backBtn" className="p-2 text-green-950 font-semibold hover:bg-green-200 rounded-md transition-colors" onClick={back}>Back</button>
                    <button id="nextBtn" className="p-2 bg-green-600 hover:bg-green-700 transition-colors text-white rounded-md" onClick={next}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default CreateGreenhouse;