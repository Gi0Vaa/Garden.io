import React from 'react';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

import User from '../assets/icons/user.js'
import Add from '../assets/icons/add.js'
import Logout from '../assets/icons/logout.js';

const DropdownMenu = () => {
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);

    function logout(){
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    }

    return (
        <div className="p-1 bg-green-800 rounded-md text-white flex flex-col gap-2 text-lg font-semibold">
            <button className='flex flex-row gap-3 items-center hover:bg-green-700 transition-colors rounded-md p-2'>
                <div className='w-7 h-7'>
                    <User />
                </div>
                <p>{user.name || ''} {user.surname || ''}</p>
            </button>
            <a href='/createGreenhouse' className='flex flex-row gap-3 items-center hover:bg-green-700 transition-colors rounded-md p-2'>
                <div className='w-7 h-7'>
                    <Add />
                </div>
                <p>Add Greenhouse</p>
            </a>
            <button onClick={logout} className='flex flex-row gap-3 items-center hover:bg-red-500 transition-colors rounded-md p-2'>
                <div className='w-7 h-7'>
                    <Logout />
                </div>
                <p>Logout</p>
            </button>
        </div>
    );
}

export default DropdownMenu;