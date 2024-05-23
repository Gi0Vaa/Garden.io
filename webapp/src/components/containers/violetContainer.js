const VioletContainer = ({icon, title, content}) => {
    return (
        <div className={`
            p-2 bg-slate-50  border-violet-800 text-violet-500
            transition-colors border-b-4  border-2 rounded-sm items-center
        `}>
            <div className='flex flex-row items-center gap-2'>
                {icon}
                <h4 className='font-semibold'>{title}</h4>
            </div>
        </div>
    );
};

export default VioletContainer;