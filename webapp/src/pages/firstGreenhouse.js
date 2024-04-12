import { useCookies } from 'react-cookie';
import GreenhouseSteps from "../components/greenhouseSteps";

function FirstGreenhouse() {
    const [Cookie] = useCookies(['user']);
    return (
        <div className='grid md:grid-cols-4 place-content-center grid-cols-1 p-3 h-screen bg-green-100'>
            <div></div>
            <div className='md:col-span-2 flex flex-col gap-2 text-center '>
                <GreenhouseSteps message={`Hi ${Cookie.user.name}, create your first greenhouse`} welcome={true} />
            </div>
            <div></div>
        </div>
    )
}

export default FirstGreenhouse;