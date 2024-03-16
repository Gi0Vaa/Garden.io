import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
function Header({index, greenhouse}) {
    const navigate = useNavigate();

    useEffect(() => {
        const links = document.getElementById('pagesLinks');
        if(index !== undefined){
            links.children[index].classList.add('font-bold');
        }
    }, [index]);

    function handleClick() {
        navigate('/greenhouse', {state: {greenhouse: greenhouse}});
    }

    return(
        <header className='grid grid-cols-4 p-3 bg-green-300 text-green-800'>
        <div className="flex flex-row items-center gap-1 md:gap-2">
            <a href="/"><h2>Garden.io</h2></a>
            {greenhouse !== undefined && (
                <button onClick={handleClick}><h3 className="font-medium">{greenhouse.name ? ` / ${greenhouse.name}` : "" }</h3></button>
            )}
        </div>
            <div className='col-span-2'></div>
            <div className="flex flex-row gap-10 place-content-end items-center font-normal text-2xl" id="pagesLinks">
                <a href="/" className="">Home</a>
                <a href="/herbarium">Herbarium</a>
                <h3 className="">{localStorage.getItem('name')}</h3>
            </div>
        </header>
    );
}

export default Header;