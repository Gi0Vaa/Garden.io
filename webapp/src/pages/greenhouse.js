const { useEffect } = require("react")

function Greenhouse() {
    useEffect(() => {
        const msg = document.getElementById('welcomeMsg');
        msg.innerHTML = `Welcome ${localStorage.getItem('name')} to your Greenhouse!`;
    })

    return (
        <div className='grid md:grid-cols-4 grid-cols-1 p-3'>
            <div></div>
            <div className='md:col-span-2 flex flex-col gap-2 text-center'>
                <h2 className=" font-medium" id="welcomeMsg"></h2>
                <div className="p-2 rounded-md text-left bg-slate-50 shadow-md">
                    <h3 className="font-medium">Add your Greenhouse</h3>
                    <div className="grid grid-cols-2">
                        <div></div>
                        <div></div>
                    </div>
                </div>
                
            </div>
            <div></div>
        </div>
    )
}

export default Greenhouse;