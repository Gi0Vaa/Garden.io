import { useEffect, useState, useRef } from "react";
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import DropdownMenu from "./dropdownMenu";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPlantWilt } from '@fortawesome/free-solid-svg-icons'

const Header = ({index, greenhouse}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            const pfp = document.getElementById('pfp');
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                pfp.classList.remove('bg-green-100');
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function goToGreenhouse() {
        navigate('/greenhouse', {state: {greenhouse: greenhouse}});
    }

    function openMenu(){
        const pfp = document.getElementById('pfp');
        const dropMenu = document.getElementById('dropMenu');
        console.log(open);
        //close
        if(open){
            pfp.classList.remove('bg-green-100');
            dropMenu.classList.add('hidden');
            setOpen(false);
        }
        //open
        else{
            pfp.classList.add('bg-green-100');
            dropMenu.classList.remove('hidden');
            setOpen(true);
        }
    }

    const navclass = ({ isActive }) => [
        isActive ? ' flex fle-row gap-2 items-center font-bold bg-green-100 p-1 rounded-full md:p-0 md:bg-inherit transition-all' : 'text-green-700 font-normal flex fle-row gap-2 p-1 md:p-0 items-center transition-all hover:bg-green-100 hover:rounded-full md:hover:bg-inherit md:hover:rounded-none',
    ];

    return(
        <header className='fixed top-0 w-screen z-50 flex flex-row p-2 md:px-4 md:py-2 bg-green-300 text-green-800'>
            <div className="flex flex-col sm:flex-row flex-grow gap-1 md:gap-2 place-content-start">
                <Link to="/"><h2>Garden.io</h2></Link>
                {greenhouse !== undefined && (
                    <button onClick={goToGreenhouse}><h3 className="hidden sm:block font-medium">{greenhouse.name ? ` / ${greenhouse.name}` : "" }</h3></button>
                )}
            </div>
            <div className="flex flex-row flex-grow gap-5 md:gap-5 xl:gap-10 place-content-end items-center font-normal text-2xl" id="pagesLinks">
                <NavLink to="/" className={navclass}>
                    <FontAwesomeIcon icon={faHouse} />
                    <p className="hidden md:block">Home</p>
                </NavLink>
                <NavLink to="/herbarium" className={navclass}>
                    <FontAwesomeIcon icon={faPlantWilt} />
                    <p className="hidden md:block">Herbarium</p>
                </NavLink>
                <div className="group relative flex flex-col items-center">
                    <button className="rounded-full transition-colors duration-200 hover:bg-green-100" id="pfp" onClick={openMenu}>
                        <img src={localStorage.getItem('picture')} className="w-10 h-10 rounded-full p-1" alt="profile"/>
                    </button>
                    <div ref={menuRef} className="hidden absolute w-max mt-16 right-0 transition-all duration-300" id="dropMenu">
                        <Transition
                            show={open}
                            enter="transition-opacity duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <DropdownMenu />
                        </Transition>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;