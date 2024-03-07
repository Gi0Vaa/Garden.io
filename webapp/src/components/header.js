function Header() {
    return(
        <header className='grid grid-cols-4 p-3 bg-green-300 text-green-800'>
            <h2>Garden.io</h2>
            <div className='col-span-2'></div>
            <div className="text-right">
                <h3>{localStorage.getItem('name')}</h3>
            </div>
        </header>
    );
}

export default Header;