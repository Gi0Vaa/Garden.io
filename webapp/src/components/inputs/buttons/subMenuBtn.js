const SubMenuBtn = ({ title, onClick, isActive = false }) => {
    return (
        <button className={`flex-grow font-normal p-1 border-b-2 border-green-100 hover:border-green-dark transition-colors ${isActive ? 'border-green-light' : ''}`}
            onClick={onClick}>
            {title}
        </button>
    );
}

export default SubMenuBtn;