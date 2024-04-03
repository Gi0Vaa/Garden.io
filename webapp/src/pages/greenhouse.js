import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/header.js';
import PlantsGrid from '../components/plantsGrid.js';
import Dashboard from '../components/greenhouse/dashboard.js';
import Settings from '../components/greenhouse/settings.js';
import axios from 'axios';

function Greenhouse({menuIndex = 0}) {
    const location = useLocation();
    const [greenhouse] = useState(location.state.greenhouse);
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(menuIndex);
    const [content, setContent] = useState(<div></div>);

    useEffect(() => {
        document.title = `${greenhouse.name} | Garden.io`;

        const menu = document.getElementById('menu');
        menu.children[index].classList.remove('border-green-100');
        menu.children[index].classList.add('border-green-500');
        
        
        switch(index){
            case 0:
                setContent(
                    <Dashboard greenhouse={greenhouse}/>
                );
                break;
            case 1:
                setContent(
                    <PlantsGrid greenhouseMap={data}/>
                );
                break;
            case 2:
                setContent(
                    <Settings greenhouse={greenhouse}/>
                );
                break;
            default:
                setContent(
                    <div>
                        <h1>Dashboard</h1>
                    </div>
                );
                break;
        }
    }, [greenhouse, index, data]);

    function handleClick(i){
        const menu = document.getElementById('menu');
        menu.children[index].classList.remove('border-green-500');
        menu.children[index].classList.add('border-green-100');
        if(i === 1){
            axios.get(`http://localhost:8080/mapplants/${greenhouse.greenhouse_id}`)
                .then(response => {
                    setData(response.data);
                })
                .then(() => {
                    setIndex(i);
                });
        }
        else{
            setIndex(i);
        }
    }

    return (
        <div>
            <Header greenhouse={greenhouse}/>
            <div className='mt-14 grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2' id='greenhouses'>
                    <div className='flex flex-row gap-2 my-2 text-green-900 text-lg' id='menu'>
                        <button className='flex-grow font-normal p-1 border-b-2 border-green-100 hover:border-green-700 transition-colors' onClick={() => handleClick(0)}>Dashboard</button>
                        <button className='flex-grow font-normal p-1 border-b-2 border-green-100 hover:border-green-700 transition-colors' onClick={() => handleClick(1)}>Plants</button>
                        <button className='flex-grow font-normal p-1 border-b-2 border-green-100 hover:border-green-700 transition-colors' onClick={() => handleClick(2)}>Settings</button>
                    </div>
                    {content}
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Greenhouse;