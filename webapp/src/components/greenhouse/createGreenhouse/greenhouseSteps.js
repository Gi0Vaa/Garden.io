import React from 'react';

import { useEffect, useState } from "react";
import { UserContext } from '../../../context/userContext';

import AddPlant from "./addPlant";
import AddGreenhouse from "./addGreenhouse";
import AddLocationAndType from './addLocationAndType';
import CreateLoading from "./createLoading";
import GreenButton from "@inputs/buttons/greenButton";
import RedButton from '@inputs/buttons/redButton';

function CreateGreenhouse({ message, welcome = false }) {
    const { user } = React.useContext(UserContext);

    const [greenhouse, setGreenhouse] = useState(undefined);
    const [plant, setPlant] = useState(undefined);
    const [content, setContent] = useState("");
    const [step, setStep] = useState(1);

    useEffect(() => {
        switch (step) {
            case 1:
                setContent(<AddGreenhouse message={message} greenhouse={greenhouse} setGreenhouse={setGreenhouse} />);
                break;
            case 2:
                setContent(<AddPlant plant={plant} setPlant={setPlant} />);
                break;
            case 3:
                setContent(<AddLocationAndType greenhouse={greenhouse} setGreenhouse={setGreenhouse} />);
                break;
            case 4:
                setContent(<CreateLoading userId={user.id} greenhouse={greenhouse} plant={plant} welcome={welcome} />);
                break;
            default:
                setContent(<div>Not Found</div>);
                break;
        }
    }, [step, greenhouse, plant, message, user.id, welcome]);

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
            <div className="p-2 rounded-md text-left  bg-green-light shadow-md flex flex-col gap-2">
                {content}
                <div id="btnContainer" className='flex flex-row p-3 place-content-between'>
                    <RedButton text={"Back"} onClick={back} isActive={step > 1} />
                    <GreenButton text={"Next"} onClick={next} isActive={
                        (step === 1 && (greenhouse?.name !== undefined && greenhouse?.name !== "")) ||
                        (step === 2 && plant) ||
                        (step === 3 && greenhouse?.location) ||
                        (step === 4)
                    } />
                </div>
            </div>
        </div>
    );
}

export default CreateGreenhouse;