import React from 'react';
import axios from 'axios';

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import { createGreenhouse, addPlantInGreenhouse } from '../../../services/greenhouses';

import AddPlant from "./addPlant";
import AddGreenhouse from "./addGreenhouse";
import Loading from "../../../pages/status/loading";

axios.defaults.withCredentials = true;

function CreateGreenhouse({ message, welcome = false }) {
    const { user } = React.useContext(UserContext);

    const [greenhouse, setGreenhouse] = useState(undefined);
    const [plant, setPlant] = useState(undefined);
    const [content, setContent] = useState("");
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        switch (step) {
            case 1:
                document.getElementById('btnContainer').classList.remove('place-content-between');
                document.getElementById('btnContainer').classList.add('place-content-end');
                document.getElementById('backBtn').classList.add('hidden');
                setContent(<AddGreenhouse message={message} greenhouse={greenhouse} setGreenhouse={setGreenhouse} />);
                break;
            case 2:
                document.getElementById('btnContainer').classList.remove('place-content-end');
                document.getElementById('btnContainer').classList.add('place-content-between');
                document.getElementById('backBtn').classList.remove('hidden');
                setContent(<AddPlant plant={plant} setPlant={setPlant} />);
                break;
            case 3:
                setContent(<Loading message={"Creando la tua serra..."} />);
                const obj = greenhouse;
                obj.userId = user.id;
                createGreenhouse(obj)
                    .then(response => {
                        addPlantInGreenhouse(response.data.id, plant.plant_id, 1)
                        .then(() => {
                            setTimeout(() => {
                                if(welcome) navigate('/welcome');
                                else navigate('/greenhouse', { state : { greenhouse: response.data.id } });
                            }, 300);
                        });
                    });
                break;
            default:
                setContent(<div>Not Found</div>);
                break;
        }
    }, [step, plant, message, greenhouse, navigate, welcome, user.id]);

    function next() {
        setStep(step + 1);
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