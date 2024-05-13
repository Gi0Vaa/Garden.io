import React from 'react';
import axios from 'axios';

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

import AddPlant from "./createGreenhouse/addPlant";
import AddGreenhouse from "./createGreenhouse/addGreenhouse";
import Loading from "../pages/status/loading";

axios.defaults.withCredentials = true;

function CreateGreenhouse({ message, welcome = false }) {
    const { user } = React.useContext(UserContext);

    const [greenhouse, setGreenhouse] = useState({});
    const [plant, setPlant] = useState({ plant_id: 1 });
    const [content, setContent] = useState("");
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        switch (step) {
            case 1:
                document.getElementById('btnContainer').classList.remove('place-content-between');
                document.getElementById('btnContainer').classList.add('place-content-end');
                document.getElementById('backBtn').classList.add('hidden');
                setContent(<AddGreenhouse message={message} greenhouse={greenhouse} />);
                break;
            case 2:
                document.getElementById('btnContainer').classList.remove('place-content-end');
                document.getElementById('btnContainer').classList.add('place-content-between');
                document.getElementById('backBtn').classList.remove('hidden');
                setContent(<AddPlant plant={plant} />);
                break;
            case 3:
                setContent(<Loading message={"Creando la tua serra..."} />);
                const obj = greenhouse;
                obj.email = user.email;
                axios.post(`/api/greenhouses`, obj)
                    .then(response => {
                        axios.post(`/api/greenhouses/${response.data.greenhouse_id}/plants`, {
                            plant_id: plant.plant_id,
                            quantity: 1
                        })
                        .then(() => {
                            setTimeout(() => {
                                if(welcome) navigate('/welcome');
                                else navigate('/greenhouse', { state : { greenhouse_id: response.data.greenhouse_id } });
                            }, 300);
                        });
                    });
                break;
            default:
                setContent(<div>Not Found</div>);
                break;
        }
    }, [step, plant, message, greenhouse, navigate, welcome, user.email]);

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
                console.log(document.getElementById('plants'));
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
        <div className='md:col-span-2 flex flex-col gap-2 text-center'>
            <div className="p-2 rounded-md text-left  bg-green-300 shadow-md flex flex-col gap-2">
                {content}
                <div id="btnContainer" className='flex flex-row p-3'>
                    <button id="backBtn" className="p-2 text-green-950 font-semibold hover:bg-green-200 rounded-md transition-colors" onClick={back}>Back</button>
                    <button id="nextBtn" className="p-2 bg-green-600 hover:bg-green-700 transition-colors text-white rounded-md" onClick={next}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default CreateGreenhouse;