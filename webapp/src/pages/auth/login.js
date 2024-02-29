import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Login() {
    return (
        <div className='grid md:grid-cols-3 p-3 h-screen'>
            <div></div>
            <div className="flex flex-col h-full p-3 place-content-center text-center items-center gap-8">
            <div className="text-green-400 p-8 border-b-green-900 border-b-2">
                    <h4 className=' font-normal'>sign in</h4>
                    <h1>Garden.io</h1>
                </div>
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
                <h5 className=' font-normal'>You don't have an account? <a href='/register' className='text-violet-600 font-semibold'>Signup</a></h5>
            </div>
            <div></div>
        </div>
    )
}

export default Login;