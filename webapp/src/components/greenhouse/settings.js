import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Settings({greenhouse}){
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
        const obj = {
            name: name,
            description: description
        }
        axios.put(`http://localhost:8080/greenhouses/${greenhouse.greenhouse_id}`, obj)
            .then(response => {
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return(
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 p-3 rounded-md shadow-md">
                <h3>Greenhouse:</h3>
                <input type="text" onChange={activeBtn} id="name" defaultValue={greenhouse.name} className="p-1 rounded-md border-2 border-green-300 focus:border-green-600 focus:outline-none transition-colors"/>
                <textarea onChange={activeBtn} id="description" defaultValue={greenhouse.description} className="p-1 h-32 rounded-md border-2 border-green-300 focus:border-green-600 focus:outline-none transition-colors  resize-none"></textarea>
                <button id="saveBtn" className="p-1 bg-gray-300 text-white rounded-md font-semibold transition-colors">Save</button>
            </div>
        </div>
    );
}

export default Settings;