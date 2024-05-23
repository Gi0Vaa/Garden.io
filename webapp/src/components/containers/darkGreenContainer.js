const DarkGreenContainer = ({icon, title, content}) => {
    return (
        <div className={`
            p-2 bg-green-50  border-green-dark text-green-dark
            transition-colors border-b-4  border-2 rounded-sm
        `}>
            <div className='flex flex-row items-center gap-2'>
                {icon}
                <h4 className='font-semibold'>{title}</h4>
            </div>
        </div>
    );
};

export default DarkGreenContainer;