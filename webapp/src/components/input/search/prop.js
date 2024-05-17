const Prop = ({prop, setSearch}) => {
    return (
        <button
            onClick={() => setSearch(prop.name)}
            className="flex flex-row place-content-between bg-green-200 hover:bg-green-100 p-1 rounded-sm transition-colors"
        >
            <p>{prop.name}</p>
            <p>#{prop.plant_id}</p>
        </button>
    )
}

export default Prop;