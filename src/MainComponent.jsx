import  { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function MainComponent() {
    const [image, setImage] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [backgroundRemoved, setBackgroundRemoved] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (imageLoaded && image) {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            };
            img.src = image;
        }
    }, [image, imageLoaded]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                setImageLoaded(true);
                setBackgroundRemoved(false);
            };
            reader.readAsDataURL(file);
        }
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
                    'X-Api-Key': apiKey,
                },
                responseType: 'blob',
            }
        ).then((response) => {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setBackgroundRemoved(true);
            };
            reader.readAsDataURL(response.data);
        }).catch((error) => {
            console.error("Error removing background:", error);
            alert("Error removing background: " + error.message);
        });
    };

    const handleDownloadImage = () => {
        const link = document.createElement('a');
        link.href = image;
        link.download = "processed-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col min-h-screen justify-center items-center text-center  font-poppins">
            <header className="bg-[#FEFEFE] text-black p-5 w-full text-left mb-5 
            !bg-opacity-90 !backdrop-blur-lg !shadow-sm fixed z-50 top-0 d-none-mobile-app">
                <h1 className='text-3xl'>bg remove</h1>
            </header>
            <main className="flex-1 flex flex-row-reverse items-center justify-center p-5 w-full max-w-md mx-auto mt-5">
                {!imageLoaded && (
                    <div className="flex flex-col items-center mb-5">
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <label htmlFor="fileInput" className="bg-[#0F70E6] text-white py-2.5 px-5 rounded cursor-pointer mr-2.5">
                            Choose Image
                        </label>
                    </div>
                )}
                {imageLoaded && (
                    <>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={handleRemoveBackground}
                                disabled={!image}
                                className="bg-[#0F70E6] text-white py-2.5 px-5 border-none rounded cursor-pointer mt-5 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Remove Background
                            </button>
                            {backgroundRemoved && (
                                <button onClick={handleDownloadImage} className="bg-[#0F70E6] text-white py-2.5 px-5 border-none rounded cursor-pointer mt-5">
                                    Download Image
                                </button>
                            )}
                        </div>
                        <canvas ref={canvasRef} width="365" height="347" className="border-3 border-gray-400 rounded-xl mt-5"></canvas>
                    </>
                )}
            </main>
            <footer className="bg-[#54616C] text-white py-2.5 text-center w-full">
                <p>© Orcafin Web Solutions</p>
            </footer>
        </div>
    );
}

export default MainComponent;
