const RedButton = ({ text, icon, onClick, isActive=true, padding }) => {
    return (
        <button
            className={`
                p-2 text-white font-semibold  rounded-md 
                transition-colors border-b-4  border-2
                ${isActive ? 'hover:bg-red-600 border-red-800 bg-red-500' : 'bg-gray-300 border-gray-400'}
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

export default RedButton;