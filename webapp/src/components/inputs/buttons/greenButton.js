const GreenButton = ({ text, icon, onClick, isActive=true, padding }) => {
    return (
        <button
            className={`
                 text-white font-semibold  rounded-md 
                transition-colors border-b-4  border-2
                ${isActive ?  'hover:bg-green-600 border-green-dark bg-green-500' : 'bg-gray-300 border-gray-400' }
                ${padding || 'p-2'}
            `}
            onClick={() => {
                if(isActive) onClick();
            }}
        >
            {icon || null}
            {text || ""}
        </button>
    );
}

export default GreenButton;