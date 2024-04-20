import React from 'react';

import { UserContext } from '../context/userContext';
import GreenhouseSteps from "../components/greenhouseSteps";

const FirstGreenhouse = () => {
    const { user } = React.useContext(UserContext);
    return (
        <div className='grid md:grid-cols-4 place-content-center grid-cols-1 p-3 h-screen bg-green-100'>
            <div></div>
            <div className='md:col-span-2 flex flex-col gap-2 text-center '>
                <GreenhouseSteps message={`Hi ${user.name}, create your first greenhouse`} welcome={true} />
            </div>
            <div></div>
        </div>
    )
}

export default FirstGreenhouse;