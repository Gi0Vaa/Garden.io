import greenhouseImg from '@images/greenhouse.svg';

function AddGreenhouse({message, greenhouse, setGreenhouse}){
    function setInputs(){
        console.log(document.getElementById('greenhouseName').value);
        setGreenhouse({
            name: document.getElementById('greenhouseName').value,
            description: document.getElementById('greenhouseDescription').value
        });
    }

    return (
        <div>
            <h3 className=" font-bold text-green-950 p-3" >{message}</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2" >
                <div className="hidden xl:block h-80">
                    <img src={greenhouseImg} alt="greenhouse" className="h-full w-full object-cover" />
                </div>
                <div className='flex flex-col gap-1'>
                    <input type="text" placeholder="Greenhouse Name" onChange={setInputs} className="p-2 m-2 rounded-md focus:outline-none" id='greenhouseName' />
                    <textarea placeholder="Description" onChange={setInputs} className="p-2 m-2 resize-none rounded-md focus:outline-none h-full" id='greenhouseDescription'></textarea>
                </div>
            </div>
        </div>
    )
}

export default AddGreenhouse;