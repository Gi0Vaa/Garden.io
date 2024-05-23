const DarkGreenButton = ({ text, icon, onClick, isActive=true, padding }) => {
    return (
        <button
            className={`
                 text-green-dark font-semibold  rounded-md 
                transition-colors border-b-4  border-2 flex flex-row gap-1 items-center
                ${isActive ?  'hover:bg-green-100 bg-green-light border-green-dark' : 'bg-gray-300 border-gray-400' }
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

export default DarkGreenButton;