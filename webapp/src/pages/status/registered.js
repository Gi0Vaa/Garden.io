import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import registeredImg from '../../assets/img/registered.svg';

const Registered = () => {
    useEffect(() =>{
        document.title = `Success | ${process.env.REACT_APP_NAME}`;
    }, []);

    return (
        <div className='grid md:grid-cols-4 place-content-center grid-cols-1 p-3 h-screen bg-green-100'>
            <div></div>
            <div className='md:col-span-2 flex flex-col text-green-900 gap-4 items-center'>
                <img src={registeredImg} alt="thank you for registration" className="h-80 w-80 object-fit" />
                <div className='text-center'>
                    <h2>Thank You!</h2>
                    <h3 className='font-normal'>You have been registered to {process.env.REACT_APP_NAME}</h3>
                </div>
                <Link to='/' className='bg-green-900 hover:bg-green-800 text-white px-2 py-1 rounded-md transition-colors'>Go to Login</Link>
            </div>
            <div></div>
        </div>
    );
};

export default Registered;