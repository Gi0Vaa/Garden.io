import React from 'react';

import Header from '../components/header';
import Greenhouses from '../components/greenhouses/greenhouses';

const Home = () => {

    return (
        <React.Fragment>
            <Header index={0} />
            <div className='mt-14 grid md:grid-cols-4 grid-cols-1 p-3'>
                <div></div>
                <Greenhouses />
                <div></div>
            </div>
        </React.Fragment>
    );
}

export default Home;