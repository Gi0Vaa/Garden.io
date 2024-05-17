import Suggestions from './suggestions';

const Searchbar = ({ search, setSearch }) => {
    return (
        <div className='flex flex-col gap-1 bg-green-light rounded-md p-1 text-green-dark'>
            <input type='text' id='search' className=' bg-green-100 px-2 py-1 w-full rounded-sm outline-none' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
            {
                search !== '' && (
                    <div className=' relative z-20'>
                        <Suggestions name={search} setSearch={setSearch} />
                    </div>
                )
            }

        </div>
    );
}

export default Searchbar;