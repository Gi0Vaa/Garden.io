import Bell from '../assets/icons/bell';
import Check from '../assets/icons/check';

function Dashboard({ greenhouse }) {
    return (
        <div className="p-3 bg-violet-600 text-white rounded-md flex flex-col gap-2">
            <div className='flex flex-row place-content-between'>
                <h3>{greenhouse.name}</h3>
                <div className='w-6 h-6 transition duration-300 fill-current text-slate-300 hover:text-slate-50'>
                    <Bell />
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-3">
                        <h4 className="font-normal">Temperature:</h4>
                        <h4 className="font-bold">32°C</h4>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <h4 className="font-normal">Humidity:</h4>
                        <h4 className="font-bold">78%</h4>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <div className='w-32 h-32 text-slate-50'>
                        <Check />
                    </div>
                    <h4>La tua serra è in buone condizioni!</h4>
                </div>
            </div>
            <div className='p-3'>
                
            </div>
        </div>
    );
}

export default Dashboard;