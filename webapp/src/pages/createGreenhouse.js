import React from "react";

import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { UserContext } from "../context/userContext";

import Header from "../components/header";
import GreenhouseSteps from "../components/greenhouseSteps";

const CreateGreenhouse = ({first}) => {
    const location = useLocation();
    first = location.state ? location.state.first : first;

    const { user } = React.useContext(UserContext);

    useEffect(() => {
        document.title = `Create Greenhouse | ${process.env.REACT_APP_NAME}`;
    }, []);

    return (
        <React.Fragment>
            { first ? "" : <Header />}
            <div className='grid md:grid-cols-4 grid-cols-1 p-3 place-content-center h-screen'>
                <div></div>
                <div className='md:col-span-2'>
                    <GreenhouseSteps message={ first ? `Hi ${user.name}, create your first greenhouse` : `Create a new Greenhouse`} welcome={ first }/>
                </div>
                <div></div>
            </div>
        </React.Fragment>
    );
}

export default CreateGreenhouse;