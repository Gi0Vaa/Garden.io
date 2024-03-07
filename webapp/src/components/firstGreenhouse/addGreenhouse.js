import { useEffect } from 'react';
import greenhouseImg from '../../assets/img/background/greenhouse.svg';

function AddGreenhouse(greenhouse){
    useEffect(() => {
        document.getElementById('greenhouseName').value = greenhouse.name;
        document.getElementById('greenhouseDescription').value = greenhouse.description;
    }, [greenhouse]);
    return (
        <div>
            <h3 className=" font-bold text-green-950 p-3" >Hi {localStorage.getItem('name')}, add your first greenhouse</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2" >
                <div className="hidden xl:block h-80">
                    <img src={greenhouseImg} alt="greenhouse" className="h-full w-full object-cover" />
                </div>
                <div className='flex flex-col gap-1'>
                    <input type="text" placeholder="Greenhouse Name" className="p-2 m-2 rounded-md focus:outline-none" id='greenhouseName' />
                    <textarea placeholder="Description" className="p-2 m-2 resize-none rounded-md focus:outline-none h-full" id='greenhouseDescription'></textarea>
                </div>
            </div>
        </div>
    )
}

export default AddGreenhouse;