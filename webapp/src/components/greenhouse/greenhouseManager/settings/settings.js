import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteGreenhouse, updateGreenhouse } from "@services/greenhouses";

import ModalUser from './modalUser';
import RedButton from '@inputs/buttons/redButton';
import SkyButton from '@inputs/buttons/skyButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

const Settings = ({ greenhouse, setGreenhouse }) => {
    const [actualGreenhouse, setActualGreenhouse] = useState({ name: '', description: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setActualGreenhouse(greenhouse);
    }, [greenhouse]);

    function setChanges() {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        setActualGreenhouse({ name: name, description: description });
    }

    function save() {
        const name = actualGreenhouse.name;
        const description = actualGreenhouse.description;
        const obj = {
            name: name,
            description: description,
            type: "greenhouse"
        }
        updateGreenhouse(greenhouse.id, obj)
            .then(() => {
                setGreenhouse({ ...greenhouse, name: name, description: description });
            })
    }

    function removeGreenhouse() {
        deleteGreenhouse(greenhouse.id)
            .then(() => {
                navigate('/');
            })
    }

    return (
        <div className="flex flex-col gap-2 text-green-dark">
            {
                isModalOpen && <ModalUser greenhouseId={greenhouse.greenhouse} setIsModalOpen={setIsModalOpen} />
            }
            <div className="flex flex-col gap-1 p-3 rounded-md shadow-md">
                <h3>Greenhouse info:</h3>
                <input onChange={setChanges} type="text" id="name" defaultValue={greenhouse.name} className="p-1 rounded-md border-2 border-green-300 focus:border-green-600 focus:outline-none transition-colors" />
                <textarea onChange={setChanges} id="description" defaultValue={greenhouse.description} className="p-1 h-32 rounded-md border-2 border-green-300 focus:border-green-600 focus:outline-none transition-colors  resize-none"></textarea>
                <SkyButton text="Save" onClick={save} isActive={
                    actualGreenhouse.name !== greenhouse.name ||
                    actualGreenhouse.description !== greenhouse.description
                } />
            </div>
            <div className="flex flex-row place-content-between gap-1 p-3 rounded-md shadow-md">
                <div className="flex flex-col">
                    <h4 className="font-semibold">Add user</h4>
                    <h5 className="font-normal">Add a user to this greenhouse</h5>
                </div>
                <div className="flex items-center">
                    <SkyButton
                        icon={<FontAwesomeIcon icon={faUserPlus} />}
                        isActive={false}
                        padding={'px-2 py-1'}
                    />
                </div>
            </div>
            <div className="flex flex-row place-content-between gap-1 p-3 rounded-md shadow-md">
                <div className="flex flex-col">
                    <h4 className="font-semibold">Delete greenhouse</h4>
                    <h5 className="font-normal">Once you delete a greenhouse, there is no going back. Please be certain.</h5>
                </div>
                <div className="flex items-center">
                    <RedButton text="DELETE" onClick={removeGreenhouse} />
                </div>
            </div>
        </div>
    );
}

export default Settings;