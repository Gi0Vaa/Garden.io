import { useEffect } from "react";

function Header({index, greenhouse}) {
    useEffect(() => {
        const links = document.getElementById('pagesLinks');
        if(index !== undefined){
            links.children[index].classList.add('font-bold');
        }
    }, [index]);

    return(
        <header className='grid grid-cols-4 p-3 bg-green-300 text-green-800'>
           <div className="flex flex-row items-center gap-2">
                <a href="/"><h2>Garden.io</h2></a>
                <h3 className="font-medium">{greenhouse ? ` / ${greenhouse}` : "" }</h3>
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