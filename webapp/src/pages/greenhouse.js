//import image
import greenhouseImg from '../assets/img/background/greenhouse.svg';
const { useEffect } = require("react")


function Greenhouse() {
    useEffect(() => {
        document.title = 'Greenhouse | Garden.io'
        const headerMsg = document.getElementById('headerMsg');
        headerMsg.innerText = `Hi ${localStorage.getItem('name')}, add your first greenhouse`;
    });

    let stepIndex = 0;
    const greenhouse = {
        name: '',
        description: ''
    }

    function next(){
        console.log(stepIndex);
        if(stepIndex === 0){
            greenhouse.name = document.getElementById('greenhouseName').value;
            greenhouse.description = document.getElementById('greenhouseDescription').value;
            const headerMsg = document.getElementById('headerMsg');
            headerMsg.innerText = 'Add your first plant';
        }
        stepIndex++;
    }

    function back(){
        if(stepIndex === 1){
            const headerMsg = document.getElementById('headerMsg');
            headerMsg.innerText = `Hi ${localStorage.getItem('name')}, add your first greenhouse`;
        }
        stepIndex--;
    }

    return (
        <div className='grid md:grid-cols-4 place-content-center grid-cols-1 p-3 h-screen bg-green-50'>
            <div></div>
            <div className='md:col-span-2 flex flex-col gap-2 text-center '>
                <div className="p-2 rounded-md text-left  bg-green-300 backdrop-blur-md shadow-md flex flex-col gap-2">
                    <h3 className=" font-bold text-green-950 p-3" id='headerMsg'>Add your first Greenhouse</h3>
                    <div className="grid grid-cols-1 xl:grid-cols-2">
                        <div className="hidden xl:block h-80">
                            <img src={greenhouseImg} alt="greenhouse" className="h-full w-full object-cover" />
                        </div>  
                        <div className='flex flex-col gap-1'>
                            <input type="text" placeholder="Greenhouse Name" className="p-2 m-2 rounded-md focus:outline-none" id='greenhouseName'/>
                            <textarea placeholder="Description" className="p-2 m-2 rounded-md focus:outline-none" id='greenhouseDescription'></textarea>
                        </div>
                    </div>
                    <div className='flex flex-row place-content-between p-3'>
                        <button className="p-2 text-green-950 font-semibold" onClick={back}>Back</button>
                        <button className="p-2 bg-green-600 hover:bg-green-700 transition-colors text-white rounded-md" onClick={next}>Next</button>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Greenhouse;