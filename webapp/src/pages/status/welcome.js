import checkImg from '../../assets/img/welcome.svg';

function Welcome() {
    function goHome() {
        window.location.href = '/';
    }

    return (
        <div className='grid md:grid-cols-4 place-content-center grid-cols-1 p-3 h-screen bg-green-100'>
            <div></div>
            <div className='md:col-span-2 flex flex-col text-green-900 gap-4 items-center'>
                <img src={checkImg} alt="check" className="h-80 w-80 object-fit" />
                <div className='text-center'>
                    <h2>Congratulations!</h2>
                    <h3 className='font-normal'>Thank you for start using Garden.io</h3>
                </div>
                <button className='px-3 py-2 bg-green-900 hover:bg-green-800 transition-colors rounded-md text-green-50' onClick={goHome}>Go Home</button>
            </div>
            <div></div>
        </div>
    )
}

export default Welcome;