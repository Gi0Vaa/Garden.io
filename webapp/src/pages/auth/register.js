import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Register() {
    return (
        <div className='grid md:grid-cols-3 p-3 h-screen'>
            <div></div>
            <div className="flex flex-col h-full p-3 place-content-center text-center items-center gap-8">
                <div></div>
                <h1 className="text-green-400 p-8 border-b-green-900 border-b-2">Garden.io</h1>
                <GoogleOAuthProvider clientId="72101962094-ki6ncu1pgmq7tr564v12q40udvgactsm.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const token = credentialResponse.credential;
                            const decodedToken = jwtDecode(token);
                            console.log(decodedToken);
                        }}
                        onError={() => {
                            console.log('Login Google Fallito');
                        }}
                    />
                </GoogleOAuthProvider>
                <h5 className=' font-normal'>Non hai un account <a href='/login' className='text-violet-600 font-semibold'>Accedi</a></h5>
            </div>
            <div></div>
        </div>
    )
}

export default Register;