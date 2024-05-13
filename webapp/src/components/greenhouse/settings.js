import axios from "axios";

import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const Settings = ({greenhouse}) => {
    const navigate = useNavigate();

    function activeBtn(){
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const saveBtn = document.getElementById('saveBtn');
        
        if(name !== greenhouse.name || description !== greenhouse.description){
            saveBtn.classList.remove('bg-gray-300');
            saveBtn.classList.add('bg-green-400', 'hover:bg-green-500');
            saveBtn.addEventListener('click', save);
        }
        else{
            saveBtn.classList.remove('bg-green-400', 'hover:bg-green-500');
            saveBtn.classList.add('bg-gray-300');
            saveBtn.removeEventListener('click', save);
        }
    }

    function save(){
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        console.log(greenhouse);
        const obj = {
            name: name,
            description: description,
            temperature: greenhouse.temperature,
            humidity: greenhouse.humidity
        }
        axios.put(`/api/greenhouses/${greenhouse.greenhouse_id}`, obj)
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    }

    function deleteGreenhouse(){
        axios.delete(`/api/greenhouses/${greenhouse.greenhouse_id}`)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return(
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 p-3 rounded-md shadow-md">
                <h3>Greenhouse info:</h3>
                <input type="text" onChange={activeBtn} id="name" defaultValue={greenhouse.name} className="p-1 rounded-md border-2 border-green-300 focus:border-green-600 focus:outline-none transition-colors"/>
                <textarea onChange={activeBtn} id="description" defaultValue={greenhouse.description} className="p-1 h-32 rounded-md border-2 border-green-300 focus:border-green-600 focus:outline-none transition-colors  resize-none"></textarea>
                <button id="saveBtn" className="p-1 bg-gray-300 text-white rounded-md font-semibold transition-colors">Save</button>
            </div>
            <div className="flex flex-row place-content-between gap-1 p-3 rounded-md shadow-md">
                <div className="flex flex-col">
                    <h4 className="font-semibold">Delete greenhouse</h4>
                    <h5 className="font-normal">Once you delete a greenhouse, there is no going back. Please be certain.</h5>
                </div>
                <div className="flex items-center">
                    <button onClick={deleteGreenhouse} className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold transition-colors">DELETE</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;