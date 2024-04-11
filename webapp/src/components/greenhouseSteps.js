import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddPlant from "./createGreenhouse/addPlant";
import AddGreenhouse from "./createGreenhouse/addGreenhouse";
import Loading from "../pages/status/loading";

function CreateGreenhouse({ message, welcome = false }) {
    const [greenhouse, setGreenhouse] = useState({});
    const [plant, setPlant] = useState({ plant_id: 1 });
    const [content, setContent] = useState("");
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        switch (step) {
            case 1:
                setContent(<AddGreenhouse message={message} greenhouse={greenhouse} />);
                break;
            case 2:
                setContent(<AddPlant plant={plant} />);
                break;
            case 3:
                setContent(<Loading message={"Creando la tua serra..."} />);
                const obj = greenhouse;
                obj.email = localStorage.getItem('email');
                axios.post(`${process.env.REACT_APP_API_URL}/greenhouses`, obj)
                    .then(response => {
                        axios.post(`${process.env.REACT_APP_API_URL}/mapplants`, {
                            greenhouse_id: response.data.greenhouse_id,
                            plant_id: plant.plant_id
                        })
                        .then(() => {
                            setTimeout(() => {
                                axios.get(`${process.env.REACT_APP_API_URL}/greenhouses/${response.data.greenhouse_id}`)
                                    .then(response => {
                                        navigate('/greenhouse', { state: { greenhouse_id: response.data.greenhouse_id  } });
                                    });
                            }, 300);
                        });
                    });
                break;
            default:
                setContent(<div>Not Found</div>);
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
                <div className='flex flex-row place-content-between p-3'>
                    <button id="backBtn" className="p-2 text-green-950 font-semibold hover:bg-green-200 rounded-md transition-colors" onClick={back}>Back</button>
                    <button id="nextBtn" className="p-2 bg-green-600 hover:bg-green-700 transition-colors text-white rounded-md" onClick={next}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default CreateGreenhouse;