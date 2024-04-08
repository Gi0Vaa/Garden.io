import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

import Header from '../components/header';
import GreenhouseCard from '../components/greenhouseCard';

function Home() {
    const email = localStorage.getItem('email');
    const [greenhouses, setGreenhouses] = useState([]);
    
    useEffect(() => {
        document.title = 'Home | Garden.io';

        axios.get(`${process.env.REACT_APP_API_URL}/mapgreenhouses/${email}`)
        .then(response => {
            setGreenhouses(response.data);
        })
        .catch(err => {
            if(err.response.data.code === 404){
                window.location.href = '/start';
            }
        });
    }, [email]);
    


    return (
        <React.Fragment>
            <Header index={0}/>
            <div className='mt-14 grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2' id='greenhouses'>
                    {greenhouses.map((g, index) => <GreenhouseCard key={index} data={g} />)}
                </div>
                <div></div>
            </div>
        </React.Fragment>
    );
}

export default Home;