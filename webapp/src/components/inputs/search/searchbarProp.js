import { useState } from 'react';   
import Suggestions from './suggestions';

const SearchbarProp = ({ setSelectedProp }) => {
    const [search, setSearch] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    return (
        <div className='flex flex-col bg-green-dark rounded-md p-1 text-green-dark'>
            <input type='text' id='search' 
                className=' bg-green-100 px-2 py-1 w-full rounded-sm outline-none' placeholder='Search' value={search} 
                onChange={(e) => {
                        setSearch(e.target.value)
                        setIsSelected(false)
                    }
                }
            />
            {
                search.length > 0 && !isSelected && <Suggestions name={search} setSearch={setSearch} setSelectedProp={setSelectedProp} setIsSelected={setIsSelected} />
            }
        </div>
    );
}

export default SearchbarProp;