import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Register = () => {

    function generateBanner(code, message){
        const container = document.getElementById('container');
        const banner = `
            <div class='bg-red-400 p-3 rounded-md absolute m-3 top-0 text-left text-white w-[30rem]' id='banner'>
                <h4>Error: ${code}</h4>
                <h5 class=' font-normal'>${message}</h5>
            </div>
        `;
        container.innerHTML += banner;
        //remove banner
        setTimeout(() => {
            const banner = document.getElementById('banner');
            banner.remove();
        }, 4000);
    }

    function signup(data){
        const user = {
            email: data.email,
            name: data.given_name || '',
            surname: data.family_name || ''
        }
        axios.post(`${process.env.REACT_APP_API_URL}/users`, user).then((response) => {
            window.location.href = '/';
        }).catch((error) => {
            const data = error.response.data;            
            generateBanner(data.code, data.message);
        });
    }

    return (
        <div className='grid md:grid-cols-3 p-3 h-screen'>
            <div></div>
            <div className="flex flex-col h-full p-3 place-content-center text-center items-center gap-8" id='container'>
                <div className="text-green-400 p-8 border-b-green-900 border-b-2">
                    <h4 className=' font-normal'>signup to</h4>
                    <h1>Garden.io</h1>
                </div>
                <GoogleOAuthProvider clientId="72101962094-ki6ncu1pgmq7tr564v12q40udvgactsm.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const token = credentialResponse.credential;
                            const decodedToken = jwtDecode(token);
                            signup(decodedToken);
                        }}
                        onError={() => {
                            generateBanner(500, 'Login Google Fallito');
                        }}
                    />
                </GoogleOAuthProvider>
                <h5 className=' font-normal'>Your account already exist? <a href='/' className='text-violet-600 font-semibold'>Sign in</a></h5>
            </div>
            <div></div>
        </div>
    )
}

export default Register;