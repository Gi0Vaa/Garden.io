import React from 'react';

const Searchbar = ({ search, setSearch }) => {
    return (
        <React.Fragment>
            <input type='text' id='search' 
                className=' bg-green-100 px-2 py-1 w-full rounded-sm outline-none' placeholder='Search' value={search} 
                onChange={(e) => {
                        setSearch(e.target.value)
                    }
                }
            />
        </React.Fragment>
    );
}

export default Searchbar;