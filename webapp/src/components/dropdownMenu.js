import User from '../assets/icons/user.js'
import Add from '../assets/icons/add.js'
import Logout from '../assets/icons/logout.js';

function DropdownMenu() {
    return (
        <div className="p-1 bg-green-800 rounded-md text-white flex flex-col gap-2 text-lg font-semibold">
            <button className='flex flex-row gap-3 items-center hover:bg-green-700 transition-colors rounded-md p-2'>
                <div className='w-7 h-7'>
                    <User />
                </div>
                <p>{localStorage.getItem('name')} {localStorage.getItem('surname')}</p>
            </button>
            <button className='flex flex-row gap-3 items-center hover:bg-green-700 transition-colors rounded-md p-2'>
                <div className='w-7 h-7'>
                    <Add />
                </div>
                <p>Add Greenhouse</p>
            </button>
            <button className='flex flex-row gap-3 items-center hover:bg-red-500 transition-colors rounded-md p-2'>
                <div className='w-7 h-7'>
                    <Logout />
                </div>
                <p>Logout</p>
            </button>
        </div>
    );
}

export default DropdownMenu;