import SearchbarProp from "@inputs/search/searchbarProp";
import SkyButton from "@inputs/buttons/skyButton";
import RedButton from "@inputs/buttons/redButton";

//services
//import { getUsersByName } from "@services/plants";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const ModalUser = ({ setIsModalOpen, greenhouseId, users, setUsers }) => {
    //const [user, setUser] = useState({ plant_id: 0, name: '', description: '' });
    //const [selectedProp, setSelectedProp] = useState({ id: null, name: null });

    /*
    useEffect(() => {
        if (selectedProp.id === null) return;
        getPlantById(selectedProp.id)
            .then(p => setUser(p));
    }, [selectedProp]);

    
    function addUser() {

    }
    */

    return (
        <div className="top-0 left-0 absolute z-50 h-full w-full  bg-[rgba(255,255,255,0.7)]">
            <div className="grid md:grid-cols-3">
                <div></div>
                <div className="p-3 flex place-content-center items-center h-screen">
                    <div className="bg-green-light rounded-md flex flex-col gap-4 p-3 w-full h-2/4 place-content-between text-green-dark">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row place-content-between items-center">
                                <h3>Add Plant</h3>
                                <RedButton icon={<FontAwesomeIcon icon={faXmark} />} onClick={() => setIsModalOpen(false)} padding={'px-2 py-1'} />
                            </div>
                            <SearchbarProp />
                            <div className="flex flex-col gap-2">
                                <p>{}</p>
                            </div>
                        </div>
                        <div className="flex flex-row place-content-between items-center">
                            <div></div>
                            <SkyButton text="Add Plant" />
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default ModalUser;