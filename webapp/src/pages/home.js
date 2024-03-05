import axios from 'axios';
import { useEffect } from 'react';

import Header from '../components/header';

async function Home() {
    useEffect(() => {
        generatePLantCard();
    }, []);

    const email = localStorage.getItem('email');
    const greenhouse = [];
    await axios.get(`http://localhost:8080/greenhouse/users/${email}`).then((response) => {
        greenhouse.push(response.data);
    }).catch((error) => {
        window.location.href = '/greenhouse';
    });

    function generatePLantCard(){
        const container = document.getElementById('plantsContainer');
        axios.get('http://localhost:8080/plants').then((response) => {
            container.innerHTML = '';
            response.data.forEach((element) => {
                const card = `
                <div class='bg-green-400 p-3 rounded-md' id='plantCard'>
                    <h3>${element.name}</h3>
                    <h4>${element.description}</h4>
                </div>
                `;
                container.innerHTML += card;
            });
        });
    }

    return(
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