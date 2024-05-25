import { useState } from 'react';

const ImageUploader = ({ onImageUpload }) => {
    const [isDragActive, setIsDragActive] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onImageUpload(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragActive(true);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragActive(false);
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    onImageUpload(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragActive(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragActive(false);
    };

    return (
        <div
            className={`h-96 w-96 flex flex-col justify-center items-center bg-white shadow-2xl ${
                isDragActive ? "bg-blue-100" : ""
            } rounded-xl`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            <div className="flex flex-col items-center mb-5">
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                />
                <label
                    htmlFor="fileInput"
                    className="bg-[#0F70E6] text-white py-2.5 px-5 rounded-full cursor-pointer"
                >
                    Choose Image
                </label>
                <div className="hidden sm:flex flex-col items-center mt-5 gap-1.5">
                    <p className="font-bold text-xl">or drop a file,</p>
                    <span className="text-sm">
                        paste image or <a href="#" className="underline">URL</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
