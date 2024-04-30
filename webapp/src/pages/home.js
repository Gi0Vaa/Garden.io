import React from 'react';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

import Header from '../components/header';
import GreenhouseCard from '../components/greenhouseCard';

axios.defaults.withCredentials = true;

const Home = () => {
    const { user } = React.useContext(UserContext);
    const [greenhouses, setGreenhouses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const email = user.email;
        if(!email) return;
        document.title = `Home | ${process.env.REACT_APP_NAME}`;

        axios.get(`${process.env.REACT_APP_API_URL}/users/${email}/greenhouses`)
            .then(response => {
                setGreenhouses(response.data);
            })
            .catch(err => {
                console.log(err);
                if (err.response.data.code === 404) {
                    navigate('/start');
                }
            });

    }, [user.email, navigate]);

    return (
        <React.Fragment>
            <Header index={0} />
            <div className='mt-14 grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2 grid md:grid-cols-2 2xl:grid-cols-3 gap-2' id='greenhouses'>
                    {greenhouses.map((greenhouse, index) => {
                        return (
                            <Link to='/greenhouse' state={greenhouse} key={index}>
                                <GreenhouseCard greenhouse={greenhouse} />
                            </Link>
                        );
                    })}
                </div>
                <div></div>
            </div>
        </React.Fragment>
    );
}

export default Home;