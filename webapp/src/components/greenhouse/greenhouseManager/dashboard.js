//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faCircleCheck, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'

const Dashboard = ({ warningCount, greenhouse }) => {
    return (
        <div className="p-3 bg-slate-50 text-green-dark rounded-md shadow-md flex flex-col gap-2">
            <div className='flex flex-row place-content-between'>
                <h3>{greenhouse.name}</h3>
            </div>
            <div className="grid grid-cols-2">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-3">
                        <h4 className="font-normal">Temperature:</h4>
                        <h4 className="font-bold">{greenhouse.temperature}°C</h4>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <h4 className="font-normal">Humidity:</h4>
                        <h4 className="font-bold">{greenhouse.humidity}%</h4>
                    </div>
                </div>
                {
                    warningCount > 0 &&
                    <div className="flex flex-col gap-4 items-center">
                        <div className='text-8xl'>
                            <FontAwesomeIcon icon={faTriangleExclamation} className='text-red-500' />
                        </div>
                        <h4 className='text-red-500'>Your greenhouse has {warningCount} warning(s)!</h4>
                    </div>

                }
                {
                    warningCount === 0 &&
                    <div className="flex flex-col gap-2 items-center">
                        <div className='text-8xl'>
                            <FontAwesomeIcon icon={faCircleCheck} className='text-green-500' />
                        </div>
                        <h4>Your greenhouse is in good condition!</h4>
                    </div>
                }
                {
                    warningCount === null &&
                    <div className="flex flex-col gap-2 items-center">
                        <div className='text-8xl'>
                            <FontAwesomeIcon icon={faHourglassHalf} className='text-blue-500' />
                        </div>
                    </div>
                }
            </div>
            <div className='p-3'>

            </div>
        </div>
    );
}

export default Dashboard;