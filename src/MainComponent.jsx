

import { useState } from "react";
import axios from "axios";
import CanvasContainer from './components/CanvasContainer';
import ImageUploader from './components/ImageUploader';
import ActionButtons from './components/ActionButtons';

function MainComponent() {
    const [image, setImage] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [backgroundRemoved, setBackgroundRemoved] = useState(false);
    const [scale, setScale] = useState(1); // Added scale state

    const handleImageUpload = (uploadedImage) => {
        setImage(uploadedImage);
        setImageLoaded(true);
        setBackgroundRemoved(false);
        setScale(1); // Reset scale when a new image is uploaded
    };

    const handleRemoveBackground = () => {
        const apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY;
        axios.post(
            "https://api.remove.bg/v1.0/removebg",
            {
                image_file_b64: image.split(",")[1],
                size: "auto",
            },
            {
                headers: {
                    "X-Api-Key": apiKey,
                },
                responseType: "blob",
            }
        ).then((response) => {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setBackgroundRemoved(true);
                setScale(1); // Reset scale when background is removed
            };
            reader.readAsDataURL(response.data);
        }).catch((error) => {
            console.error("Error removing background:", error);
            alert("Error removing background: " + error.message);
        });
    };

    const handleDownloadImage = () => {
        const link = document.createElement("a");
        link.href = image;
        link.download = "processed-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center text-center font-poppins">
            <header className="bg-[#FEFEFE] text-black p-5 w-full text-left mb-5 !bg-opacity-90 !backdrop-blur-lg !shadow-sm fixed top-0 left-0 right-0">
                <h1 className="text-3xl">bg remove</h1>
            </header>
            <div className="flex flex-col flex-1 items-center justify-center">
                {!imageLoaded ? (
                    <ImageUploader onImageUpload={handleImageUpload} />
                ) : (
                    <div className="flex flex-row-reverse items-center flex-1 justify-center mt-10">
                        <ActionButtons
                            image={image}
                            onRemoveBackground={handleRemoveBackground}
                            backgroundRemoved={backgroundRemoved}
                            onDownloadImage={handleDownloadImage}
                        />
                        <CanvasContainer image={image} scale={scale} setScale={setScale} />
                    </div>
                )}
            </div>
            <footer className="bg-[#54616C] text-white py-2.5 text-center w-full fixed bottom-0">
                <p>© bg remove</p>
            </footer>
        </div>
    );
}

export default MainComponent;
