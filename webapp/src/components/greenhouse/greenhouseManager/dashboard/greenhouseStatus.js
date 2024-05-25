const GreenhouseStatus = ({ icon, text, textColor }) => {
    return (
        <div className={`flex flex-row xl:flex-col gap-2 items-center ${textColor}`}>
            <div className='text-4xl xl:text-8xl'>
                {icon}
            </div>
            <h4 className='text-base xl:text-lg'>
                {text}
            </h4>
        </div>
    );
}

export default GreenhouseStatus;