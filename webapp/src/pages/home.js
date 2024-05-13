import React from 'react';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

import Header from '../components/header';
import GreenhouseCard from '../components/greenhouseCard';

import { getGreenhouses } from '../services/greenhouses'

const Home = () => {
    const { user } = React.useContext(UserContext);
    const [greenhouses, setGreenhouses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const email = user.email;
        if(!email) return;
        document.title = `Home | ${process.env.REACT_APP_NAME}`;

        getGreenhouses(user.email)
            .then(res => {
                setGreenhouses(res.data);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    navigate('/createGreenhouse', { state: { first: true } });
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