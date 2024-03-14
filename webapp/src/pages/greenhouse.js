import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/header.js';
import axios from 'axios';

function Greenhouse() {
    const [greenhouse, setGreenhouse] = useState({});
    const location = useLocation();
    useState(() => {
        setGreenhouse(location.state.greenhouse);
    }, [location.state.greenhouse]);

    return(
        <div>
            <Header />
            <div className='grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <div className='md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2' id='greenhouses'>
                    <h3>{greenhouse.name}</h3>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Greenhouse;