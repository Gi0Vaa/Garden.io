import React from 'react';

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import { createGreenhouse, addPlantInGreenhouse } from '../../../services/greenhouses';

import AddPlant from "./addPlant";
import AddGreenhouse from "./addGreenhouse";
import Loading from "@components/status/loading";
import GreenButton from "@inputs/buttons/greenButton";
import RedButton from '@inputs/buttons/redButton';

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
                setContent(<AddGreenhouse message={message} greenhouse={greenhouse} setGreenhouse={setGreenhouse} />);
                break;
            case 2:
                setContent(<AddPlant plant={plant} setPlant={setPlant} />);
                break;
            case 3:
                setContent(<Loading message={"Creando la tua serra..."} />);
                const obj = greenhouse;
                obj.userId = user.id;
                createGreenhouse(obj)
                    .then(g => {
                        addPlantInGreenhouse(g.id, plant.plant_id, 1)
                        .then(() => {
                            setTimeout(() => {
                                if(welcome) navigate('/welcome');
                                else navigate('/greenhouse', { state : { greenhouse: g.id } });
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
                <div id="btnContainer" className='flex flex-row p-3 place-content-between'>
                    <RedButton text={"Back"} onClick={back} isActive={step > 1} />
                    <GreenButton text={"Next"} onClick={next} isActive={
                        (step === 1 && (greenhouse?.name !== undefined && greenhouse?.name !== "")) ||
                        (step === 2 && plant !== undefined) ||
                        (step === 3)
                    } />
                </div>
            </div>
        </div>
    );
}

export default CreateGreenhouse;