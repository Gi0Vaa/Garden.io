import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/header.js';
import PlantsGrid from '../components/plantsGrid.js';
import Dashboard from '../components/dashboard.js';
import axios from 'axios';

function Greenhouse({menuIndex = 0}) {
    const location = useLocation();
    const [greenhouse] = useState(location.state.greenhouse);
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(menuIndex);
    const [content, setContent] = useState(<div></div>);

    useEffect(() => {
        const menu = document.getElementById('menu');
        menu.children[index].classList.add('border-b-2', 'border-green-300');
        
        
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
                    <h2>Settings</h2>
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
        menu.children[index].classList.remove('border-b-2', 'border-green-300');
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
            <div className='grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2' id='greenhouses'>
                    <div className='flex flex-row gap-2 my-2 text-green-900 text-lg' id='menu'>
                        <button className='font-normal p-1' onClick={() => handleClick(0)}>Dashboard</button>
                        <button className='font-normal p-1' onClick={() => handleClick(1)}>Plants</button>
                        <button className='font-normal p-1' onClick={() => handleClick(2)}>Settings</button>
                    </div>
                    {content}
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Greenhouse;