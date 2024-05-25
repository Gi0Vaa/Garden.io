//components
import GreenhouseStatus from './greenhouseStatus';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faCircleCheck, faHourglassHalf, faLocationDot, faExclamation } from '@fortawesome/free-solid-svg-icons'

const Dashboard = ({ warningCount, greenhouse }) => {
    return (
        <div className="p-3 bg-slate-50 text-green-dark rounded-md shadow-md flex flex-col gap-2">
            <div className='flex flex-row place-content-between'>
                <h3>{greenhouse.name}</h3>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-3">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <h4 className="font-bold">{greenhouse.country} - {greenhouse.city}</h4>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <h4 className="font-normal">Temperature:</h4>
                        <h4 className="font-bold">{greenhouse.temperature || "--"}°C</h4>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <h4 className="font-normal">Humidity:</h4>
                        <h4 className="font-bold">{greenhouse.humidity || "--"}%</h4>
                    </div>
                </div>
                {
                    warningCount > 0 &&
                    <GreenhouseStatus
                        icon={<FontAwesomeIcon icon={faTriangleExclamation} />}
                        text={`${warningCount} warning(s) detected!`}
                        textColor={'text-red-400'}
                    />
                }
                {
                    warningCount === 0 &&
                    <GreenhouseStatus
                        icon={<FontAwesomeIcon icon={faCircleCheck} />}
                        text={`All good!`}
                        textColor={'text-green-400'}
                    />
                }
                {
                    !warningCount && warningCount !== 0 &&
                    <GreenhouseStatus
                        icon={<FontAwesomeIcon icon={faHourglassHalf} />}
                        textColor={'text-blue-400'}
                    />
                }
            </div>
            {
                greenhouse.country === null && greenhouse.city === null &&
                <div className=' bg-red-400 rounded-sm p-3 text-white flex flex-row gap-2 items-center font-semibold'>
                    <FontAwesomeIcon icon={faExclamation} />
                    <p>Weather data not available, please go to options and update location of your {greenhouse.type}!</p>
                </div>
            }
        </div>
    );
}

export default Dashboard;