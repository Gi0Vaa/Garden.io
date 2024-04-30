import Header from "../components/header";
import GreenhouseSteps from "../components/greenhouseSteps";
import { useEffect } from "react";
import React from "react";

function CreateGreenhouse() {
    useEffect(() => {
        document.title = `Create Greenhouse | ${process.env.REACT_APP_NAME}`;
    }, []);

    return (
        <React.Fragment>
            <Header /> 
            <div className='grid md:grid-cols-4 grid-cols-1 p-3 place-content-center h-screen'>
                <div></div>
                <div className='md:col-span-2'>
                    <GreenhouseSteps message={`Create a new Greenhouse`}/>
                </div>
                <div></div>
            </div>
        </React.Fragment>
    );
}

export default CreateGreenhouse;