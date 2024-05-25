import React from 'react';

import { useEffect, useState } from 'react';
import { getCountries, getCities } from '@services/locations';

import locationImg from '@images/location.svg'
import DarkGreenContainer from '@components/containers/darkGreenContainer';
import DarkGreenSelect from '@inputs/selects/darkGreenSelect';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faSeedling } from '@fortawesome/free-solid-svg-icons'

const AddLocationAndType = ({ greenhouse, setGreenhouse }) => {
    const [country, setCountry] = useState(null);
    const [location, setLocation] = useState([]);
    //const [type, setType] = useState([]);

    useEffect(() => {
        document.title = `Create Greenhouse | ${process.env.REACT_APP_NAME}`;
    }, []);

    useEffect(() => {
        setGreenhouse(prevGreenhouse => ({
            ...prevGreenhouse,
            location: location,
            type: 'greenhouse'
        }));
    }, [location, setGreenhouse]);

    return (
        <React.Fragment>
            <h3 className=" font-bold text-green-950 p-3" >Select Location and Type</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2" >
                <div className="hidden xl:block h-80">
                    <img src={locationImg} alt="greenhouse" className="h-full w-full object-cover" />
                </div>
                <div className='flex flex-col gap-3 p-2'>
                    <DarkGreenContainer 
                        icon={<FontAwesomeIcon icon={faLocationDot}/>}
                        title={`Location`}
                        content={
                            <div className='flex flex-col gap-2'>
                                <DarkGreenSelect
                                    title="Select Country"
                                    optionsFunction={
                                        getCountries
                                    }
                                    setSelectedItem={setCountry}
                                    fieldShowed="country"
                                    fieldValue="country"
                                />
                                <DarkGreenSelect
                                    title="Select City"
                                    optionsFunction={
                                        country ? () => getCities(country) : null
                                    }
                                    setSelectedItem={setLocation}
                                    fieldShowed="city"
                                    fieldValue="locationId"
                                />
                            </div>
                        }
                    />
                    <DarkGreenContainer 
                        icon={<FontAwesomeIcon icon={faSeedling}/>}
                        title={`Type: Greenhouse`}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddLocationAndType;