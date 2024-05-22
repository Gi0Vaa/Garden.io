const SkyButton = ({ text, icon, onClick, isActive=true, padding }) => {
    return (
        <button
            className={`
                p-2 text-white font-semibold  rounded-md 
                transition-colors border-b-4  border-2
                ${isActive ? ' hover:bg-sky-600 border-sky-800 bg-sky-500' : 'bg-gray-300 border-gray-400'}
                ${padding || 'p-2'}
            `}
            onClick={() => {
                if(isActive) onClick();
            }}
        >
            {text || ""}
            {icon || null}
        </button>
    );
}

export default SkyButton;