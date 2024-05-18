const Prop = ({ prop, setSearch, setSelectedProp, setIsSelected }) => {
    return (
        <button
            onClick={() => 
                {
                    setSearch(prop.name)
                    setSelectedProp({id: prop.plant_id, name: prop.name})
                    setIsSelected(true)
                }
            }
            className="flex flex-row place-content-between bg-green-600 hover:bg-green-500 text-white p-1 rounded-sm transition-colors"
        >
            <p>{prop.name}</p>
            <p>#{prop.plant_id}</p>
        </button>
    )
}

export default Prop;