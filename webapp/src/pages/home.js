import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Header from '../components/header';
import GreenhouseCard from '../components/greenhouseCard';

const Home = () => {
    const [Cookies] = useCookies(['user']);
    const [greenhouses, setGreenhouses] = useState([]);

    useEffect(() => {
        const email = Cookies?.user?.email;
        if(!email) return;
        document.title = 'Home | Garden.io';

        axios.get(`${process.env.REACT_APP_API_URL}/users/${email}/greenhouses`)
            .then(response => {
                setGreenhouses(response.data);
            })
            .catch(err => {
                if (err.response.data.code === 404) {
                    window.location.href = '/start';
                }
            });

    }, [Cookies]);

    return (
        <React.Fragment>
            <Header index={0} />
            <div className='mt-14 grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2 grid md:grid-cols-2 2xl:grid-cols-3 gap-2' id='greenhouses'>
                    {greenhouses.map((g, index) =>
                        <Link to={'/greenhouse'} state={g} key={index}>
                            <GreenhouseCard key={index} data={g} />
                        </Link>
                    )}
                </div>
                <div></div>
            </div>
        </React.Fragment>
    );
}

export default Home;