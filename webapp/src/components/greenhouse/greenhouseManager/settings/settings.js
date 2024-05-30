import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteGreenhouse, updateGreenhouse } from "@services/greenhouses";
import { getCities, getCountries } from '@services/locations';
import { getWeather } from '@services/weather';

import ModalUser from './modalUser';
import RedButton from '@inputs/buttons/redButton';
import SkyButton from '@inputs/buttons/skyButton';
import SettingContainer from './settingContainer';
import LightGreenSelect from '@inputs/selects/lightGreenSelect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

const Settings = ({ greenhouse, setGreenhouse }) => {
    const [actualGreenhouse, setActualGreenhouse] = useState(greenhouse);
    const [country, setCountry] = useState({value: greenhouse.country || null, label: greenhouse.country || null});
    const [location, setLocation] = useState({value: greenhouse.location || null, label: greenhouse.city || null});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

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
            type: "greenhouse",
            location: location.value
        }
        updateGreenhouse(greenhouse.id, obj)
            .then(() => {
                if(location.value !== greenhouse.location){
                    getWeather(location.value)
                        .then(l => {
                            setGreenhouse(
                                { ...greenhouse, name: name, description: description, 
                                    location: location.value, country: country.label, city: location.label,
                                    temperature: l?.temperature || undefined, humidity: l?.humidity || undefined
                                });
                        });
                }
                else{
                    setGreenhouse({ ...greenhouse, name: name, description: description, location: location.value, country: country.label, city: location.label});
                }
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
                <input onChange={setChanges} type="text" id="name" defaultValue={greenhouse.name} className="p-1 rounded-md border-2 border-green-light focus:border-green-600 focus:outline-none transition-colors" />
                <textarea onChange={setChanges} id="description" defaultValue={greenhouse.description} className="p-1 h-32 rounded-md border-2 border-green-light focus:border-green-600 focus:outline-none transition-colors  resize-none"></textarea>
                <LightGreenSelect
                    title="Country"
                    optionsFunction={getCountries}
                    setSelectedItem={setCountry}
                    fieldShowed="country"
                    fieldValue="country"
                    defaultValue={{country: country.value}}
                />
                <LightGreenSelect
                    title="City"
                    optionsFunction={country.value ? () => getCities(country.value) : null}
                    setSelectedItem={setLocation}
                    fieldShowed="city"
                    fieldValue="locationId"
                    defaultValue={{city: greenhouse.city, locationId: greenhouse.location}}
                />
                <SkyButton 
                    text="Save" 
                    onClick={save} isActive={
                        actualGreenhouse.name !== greenhouse.name ||
                        actualGreenhouse.description !== greenhouse.description ||
                        location.value !== greenhouse.location
                    } 
                />
            </div>
            <SettingContainer
                title="Add user"
                description="Add a user to this greenhouse"
                button={
                    <SkyButton
                        icon={<FontAwesomeIcon icon={faUserPlus} />}
                        isActive={true}
                        onClick={() => setIsModalOpen(true)}
                        padding={'px-2 py-1'}
                    />
                }
            />
            <SettingContainer
                title="DELETE greenhouse"
                description="Once you delete a greenhouse, there is no going back. Please be certain."
                button={
                    <RedButton text="DELETE" onClick={removeGreenhouse} />
                }
            />
        </div>
    );
}

export default Settings;