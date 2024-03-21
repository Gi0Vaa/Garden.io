import GreenhouseSteps from "../components/greenhouseSteps";

function FirstGreenhouse() {
    return (
        <div className='grid md:grid-cols-4 place-content-center grid-cols-1 p-3 h-screen bg-green-100'>
            <div></div>
            <div className='md:col-span-2 flex flex-col gap-2 text-center '>
                <GreenhouseSteps message={`Hi ${localStorage.getItem('name')}, create your first greenhouse`} />
            </div>
            <div></div>
        </div>
    )
}

export default FirstGreenhouse;