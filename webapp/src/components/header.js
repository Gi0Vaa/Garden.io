import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import DropdownMenu from "./dropdownMenu";

function Header({index, greenhouse}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const links = document.getElementById('pagesLinks');
        if(index !== undefined){
            links.children[index].classList.add('font-bold');
        }

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
    }, [index]);

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

    return(
        <header className='fixed top-0 w-screen z-50 flex flex-row px-4 py-2 bg-green-300 text-green-800'>
            <div className="flex flex-row flex-grow items-center gap-1 md:gap-2">
                <a href="/"><h2>Garden.io</h2></a>
                {greenhouse !== undefined && (
                    <button onClick={goToGreenhouse}><h3 className="font-medium">{greenhouse.name ? ` / ${greenhouse.name}` : "" }</h3></button>
                )}
            </div>
            <div className="flex flex-row flex-grow gap-10 place-content-end items-center font-normal text-2xl" id="pagesLinks">
                <a href="/" className="">Home</a>
                <a href="/herbarium">Herbarium</a>
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