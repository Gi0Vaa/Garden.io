import axios from 'axios';
import { useEffect } from 'react';

import Header from '../components/header';

function Home() {
    useEffect(() => {
        document.title = 'Home | Garden.io';
    });

    const email = localStorage.getItem('email');
    const greenhouse = [];
    axios.get(`http://localhost:8080/mapgreenhouses/${email}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err.response.data);
        });

    return (
        <div>
            <Header />
            <div className='grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2 flex flex-col gap-2' id='plantsContainer'>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default Home;