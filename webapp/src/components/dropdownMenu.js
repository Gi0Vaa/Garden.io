import React from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const DropdownMenu = () => {
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);

    function logout() {
        axios.get('/api/auth/logout')
            .then(() => {
                localStorage.removeItem('user');
                setUser(null);
                navigate('/');
            })
    }

    return (
        <div className="p-1 bg-green-dark rounded-md text-white flex flex-col gap-1 text-lg font-semibold">
            <button className='flex flex-row gap-2 w-full items-center hover:bg-green-700 transition-colors rounded-md p-2'>
                <FontAwesomeIcon icon={faUser} />
                <p>{user.name || ''} {user.surname || ''}</p>
            </button>
            <a href='/createGreenhouse' className='flex flex-row gap-2 items-center hover:bg-green-700 transition-colors rounded-md p-2'>
                <FontAwesomeIcon icon={faPlus} />
                <p>Add Greenhouse</p>
            </a>
            <button onClick={logout} className='flex flex-row gap-2 items-center hover:bg-red-500 transition-colors rounded-md p-2'>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <p>Logout</p>
            </button>
        </div>
    );
}

export default DropdownMenu;