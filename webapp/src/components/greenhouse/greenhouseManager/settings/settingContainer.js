const SettingContainer = ({ title, description, button }) => {
    return (
        <div className="flex flex-row place-content-between gap-1 p-3 rounded-md shadow-md">
            <div className="flex flex-col">
                <h4 className="font-semibold">{title}</h4>
                <h5 className="font-normal">{description}</h5>
            </div>
            <div className="flex items-center">
                {button}
            </div>
        </div>
    );
};

export default SettingContainer;