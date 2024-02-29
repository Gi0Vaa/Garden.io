import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

function Login() {
    function generateBanner(code, message) {
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

    function sigin(data) {
        const email = data.email;
        axios.get(`http://localhost:8080/users/${email}`).then((response) => {
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('name', response.data.name);
            window.location.href = '/';
        }).catch((error) => {
            const data = error.response.data;
            generateBanner(data.code, data.message);
        })
    }

    return (
        <div className='grid md:grid-cols-3 p-3 h-screen'>
            <div></div>
            <div className="flex flex-col h-full p-3 place-content-center text-center items-center gap-8" id='container'>
                <div className="text-green-400 p-8 border-b-green-900 border-b-2">
                    <h4 className=' font-normal'>sign in</h4>
                    <h1>Garden.io</h1>
                </div>
                <GoogleOAuthProvider clientId="72101962094-ki6ncu1pgmq7tr564v12q40udvgactsm.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const token = credentialResponse.credential;
                            const decodedToken = jwtDecode(token);
                            sigin(decodedToken);
                        }}
                        onError={() => {
                            generateBanner(500, 'Login Google Fallito');
                        }}
                    />
                </GoogleOAuthProvider>
                <h5 className=' font-normal'>You don't have an account? <a href='/register' className='text-violet-600 font-semibold'>Signup</a></h5>
            </div>
            <div></div>
        </div>
    )
}

export default Login;