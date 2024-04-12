import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import checkImg from '../../assets/img/welcome.svg';

const Welcome = () => {
    useEffect(() =>{
        document.title = 'Welcome | Garden.io';
    }, []);
    
    return (
        <div className='grid md:grid-cols-4 place-content-center grid-cols-1 p-3 h-screen bg-green-100'>
            <div></div>
            <div className='md:col-span-2 flex flex-col text-green-900 gap-4 items-center'>
                <img src={checkImg} alt="check" className="h-80 w-80 object-fit" />
                <div className='text-center'>
                    <h2>Congratulations!</h2>
                    <h3 className='font-normal'>Thank you for start using Garden.io</h3>
                </div>
                <Link to='/' className='bg-green-900 hover:bg-green-800 text-white px-2 py-1 rounded-md transition-colors'>Go home</Link>
            </div>
            <div></div>
        </div>
    )
}

export default Welcome;