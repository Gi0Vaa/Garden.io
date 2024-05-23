import React, { useEffect, useCallback} from 'react';
import axios from 'axios';

import { UserContext } from '../../context/userContext';

import DarkGreenButton from '@inputs/buttons/darkGreenButton';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Logo from '@icons/logo';

const Login = () => {
    const { setUser } = React.useContext(UserContext);

    const setUserData = useCallback(() => {
        axios.get('/api/auth/user')
        .then(res => {
            const user = res.data;
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            window.history.replaceState({}, document.title, "/");
        })
        .catch(err => {
            generateBanner(err.response.data.code, err.response.data.message);
        });
    }, [setUser]);

    useEffect(() => {
        document.title = `Login | ${process.env.REACT_APP_NAME}`;
        //get params from url
        const url = new URL(window.location.href);
        const success = url.searchParams.get('success');
        if (success) {
            setUserData();
        }
    }, [setUserData]);

    function generateBanner(code, message) {
        const container = document.getElementById('container');
        const banner = `
            <div class='bg-red-400 p-3 rounded-md absolute m-3 top-0 text-left text-white w-[30rem]' id='banner'>
                <h4>Error: ${code}</h4>
                <h5 class=' font-normal'>${message}</h5>
            </div>
        `;
        container.innerHTML += banner;
        //remove banner
        setTimeout(() => {
            const banner = document.getElementById('banner');
            banner.remove();
        }, 4000);
    }

    return (
        <div className='grid md:grid-cols-3 p-3 h-screen'>
            <div></div>
            <div className="flex flex-col h-full p-3 place-content-center text-center items-center gap-8" id='container'>
                <div className='flex flex-col gap-10 items-center'>
                    <div className="text-green-500 p-8 border-b-green-900 border-b-2 flex flex-col gap-1 items-center">
                        <div className=' h-40 w-40'>
                            <Logo stroke={"#1F482E"} />
                        </div>

                        <h4 className=' font-normal'>sign in</h4>
                        <h1>{process.env.REACT_APP_NAME}</h1>
                    </div>
                    <DarkGreenButton 
                        text='Sign in with Google' 
                        icon={<FontAwesomeIcon icon={faGoogle} />} 
                        onClick={() => window.location.href = '/api/auth/google'}
                    />
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Login;