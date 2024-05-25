const ActionButtons = ({ image, onRemoveBackground, backgroundRemoved, onDownloadImage }) => {
    return (
        <div className="flex flex-col w-full">
            <button onClick={onRemoveBackground} disabled={!image} className="bg-[#0F70E6] text-white py-2.5 px-5 cursor-pointer rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
                Remove Background
            </button>
            {backgroundRemoved && (
                <button onClick={onDownloadImage} className="bg-[#0F70E6] text-white py-2.5 px-5 border-none rounded-lg cursor-pointer mt-5">
                    Download Image
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
