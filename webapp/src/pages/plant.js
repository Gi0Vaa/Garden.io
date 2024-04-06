import axios from 'axios'
import Header from "../components/header"
import defaultImg from '../assets/img/plants/default.svg'
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function Plant(){
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [imageUrl, setImageUrl] = useState('');
    const [plant , setPlant] = useState({});

    useEffect(() => {
        if(id == null){
            navigate('/error', {
                state: {
                    code: 404,
                    status: "Page not Found",
                    message: "Sorry this page doesn't exist :/"
                }
            } );
        }
        else{
            axios.get(`http://localhost:8080/api/v1/plants/${id}`)
                .then(response => {
                    try{
                        setImageUrl(require(`../assets/img/plants/${plant.name.toLowerCase().replace(/\s/g, '')}.jpg`));
                    }
                    catch(e){
                        setImageUrl('');
                    }
                    setPlant(response.data)
                })
                .catch(() => {
                    navigate('/error', {
                        state: {
                            code: 404,
                            status: "Page not Found",
                            message: "Sorry this page doesn't exist :/"
                        }
                    } );
                });
        }
    }, [navigate, id, plant.name]);

    return(
        <div>
            <Header />
            <div className='grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2' id='greenhouses'>
                    <div className='flex flex-row place-content-between py-3 items-baseline'>
                        <h2 className=''>{plant.name}</h2>
                        <h3 className='font-normal'>#{plant.plant_id}</h3>
                    </div>
                    <div className='grid xl:grid-cols-2'>
                        <img src={imageUrl === '' ? defaultImg : imageUrl } alt={plant.name} className='h-80 object-cover bg-orange-200 rounded-t-md xl:rounded-l-md xl:rounded-tr-none w-full' />
                        <h3 className='font-normal p-3 bg-green-100 rounded-b-md xl:rounded-r-md xl:rounded-bl-none'>{plant.description}</h3>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Plant;