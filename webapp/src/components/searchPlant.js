const searchPlant = () => {
    return (
        <div className="relative flex flex-col gap-1 bg-white rounded-t-md p-2 z-30">
            <input type="text" name='plants' id='plants' placeholder="Search a Plant" className=' outline-4 p-2 outline-offset-2 rounded-xl outline-green-500' onChange={searchPlant} />
            <ul id="searchSuggestions" className=" bg-white absolute mt-12 w-full left-0 p-1 rounded-b-md">
            </ul>
        </div>
    )
}

export default searchPlant;