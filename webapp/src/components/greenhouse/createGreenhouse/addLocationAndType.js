import React from 'react';

import { useEffect, useState } from 'react';
import { getLocations } from '@services/locations';

import locationImg from '@images/location.svg'
import DarkGreenContainer from '@components/containers/darkGreenContainer';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faSeedling } from '@fortawesome/free-solid-svg-icons'

const AddLocationAndType = ({ greenhouse, setGreenhouse }) => {
    const [locations, setLocations] = useState([]);
    //const [types, setTypes] = useState([]);
    useEffect(() => {
        getLocations()
            .then(l => {
                setLocations(l);
                setGreenhouse({ ...greenhouse, location: l[0].locationId, type: "greenhouse" })                
            });
    }, [greenhouse, setGreenhouse]);

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
                        title={`Location: ${locations[0]?.country || ""} - ${locations[0]?.city || ""}`}
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