
// import { useRef, useState, useEffect } from "react";
// import axios from "axios";


// function MainComponent() {
//   const [image, setImage] = useState(null);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [backgroundRemoved, setBackgroundRemoved] = useState(false);
//   const [isDragActive, setIsDragActive] = useState(false);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (imageLoaded && image) {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         drawCheckerboard(ctx, canvas.width, canvas.height); // Draw checkerboard first
//         const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);
//         const scaledWidth = img.width * scaleFactor;
//         const scaledHeight = img.height * scaleFactor;
//         const offsetX = (canvas.width - scaledWidth) / 2;
//         const offsetY = (canvas.height - scaledHeight) / 2;
//         ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
//       };
//       img.src = image;
//     }
//   }, [image, imageLoaded]);

//   function drawCheckerboard(ctx, width, height, tileSize = 20) {
//     for (let x = 0; x < width; x += tileSize * 2) {
//       for (let y = 0; y < height; y += tileSize * 2) {
//         ctx.fillStyle = '#efefef';
//         ctx.fillRect(x, y, tileSize, tileSize);
//         ctx.fillRect(x + tileSize, y + tileSize, tileSize, tileSize);
//       }
//     }
//   }

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImage(e.target.result);
//         setImageLoaded(true);
//         setBackgroundRemoved(false);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveBackground = () => {
//     const apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY;
//     axios.post(
//       "https://api.remove.bg/v1.0/removebg",
//       {
//         image_file_b64: image.split(",")[1],
//         size: "auto",
//       },
//       {
//         headers: {
//           "X-Api-Key": apiKey,
//         },
//         responseType: "blob",
//       }
//     ).then((response) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result);
//         setBackgroundRemoved(true);
//       };
//       reader.readAsDataURL(response.data);
//     }).catch((error) => {
//       console.error("Error removing background:", error);
//       alert("Error removing background: " + error.message);
//     });
//   };

//   const handleDownloadImage = () => {
//     const link = document.createElement("a");
//     link.href = image;
//     link.download = "processed-image.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     setIsDragActive(true);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setIsDragActive(false);
//     const files = event.dataTransfer.files;
//     if (files && files.length > 0) {
//       const file = files[0];
//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setImage(e.target.result);
//           setImageLoaded(true);
//           setBackgroundRemoved(false);
//         };
//         reader.readAsDataURL(file);
//       }
//     }
//   };

//   const handleDragEnter = (event) => {
//     event.preventDefault();
//     setIsDragActive(true);
//   };

//   const handleDragLeave = (event) => {
//     event.preventDefault();
//     setIsDragActive(false);
//   };

//   return (
//     <div className="flex flex-col h-screen justify-center items-center text-center font-poppins">
//       <header className="bg-[#FEFEFE] text-black p-5 w-full text-left mb-5 !bg-opacity-90 !backdrop-blur-lg !shadow-sm fixed top-0 left-0 right-0">
//         <h1 className="text-3xl">bg remove</h1>
//       </header>
//       {!imageLoaded ? (
//         <main className="flex flex-col flex-1 items-center justify-center">
//           <div
//             className={`h-96 w-96 flex flex-col justify-center items-center bg-white shadow-2xl ${
//               isDragActive ? "bg-blue-100" : ""
//             } rounded-xl`}
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}
//             onDragEnter={handleDragEnter}
//             onDragLeave={handleDragLeave}
//           >
//             <div className="flex flex-col items-center mb-5">
//               <input
//                 type="file"
//                 id="fileInput"
//                 onChange={handleImageChange}
//                 accept="image/*"
//                 className="hidden"
//               />
//               <label
//                 htmlFor="fileInput"
//                 className="bg-[#0F70E6] text-white py-2.5 px-5 rounded-full cursor-pointer"
//               >
//                 Choose Image
//               </label>
//               <div className="hidden sm:flex flex-col items-center mt-5 gap-1.5">
//                 <p className="font-bold text-xl">or drop a file,</p>
//                 <span className="text-sm">
//                   paste image or <a href="#" className="underline">URL</a>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </main>
//       ) : (
//         <div className="flex flex-row-reverse items-center flex-1 justify-center mt-10">
//           <div className="flex flex-col">
//             <button onClick={handleRemoveBackground} disabled={!image} className="bg-[#0F70E6] text-white py-2.5 px-5 cursor-pointer rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
//               Remove Background
//             </button>
//             {backgroundRemoved && (
//               <button onClick={handleDownloadImage} className="bg-[#0F70E6] text-white py-2.5 px-5 border-none rounded-lg cursor-pointer mt-5">
//                 Download Image
//               </button>
//             )}
//           </div>
//           <canvas ref={canvasRef} width="365" height="347" className="border border-[#afafaf] rounded-xl mt-5"></canvas>
//         </div>
//       )}
//       <footer className="bg-[#54616C] text-white py-2.5 text-center w-full fixed bottom-0">
//         <p>© bg remove</p>
//       </footer>
//     </div>
//   );
// }

// export default MainComponent;


import { useState } from "react";
import axios from "axios";
import CanvasContainer from './components/CanvasContainer';
import ImageUploader from './components/ImageUploader';
import ActionButtons from './components/ActionButtons';

function MainComponent() {
    const [image, setImage] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [backgroundRemoved, setBackgroundRemoved] = useState(false);

    const handleImageUpload = (uploadedImage) => {
        setImage(uploadedImage);
        setImageLoaded(true);
        setBackgroundRemoved(false);
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
                        <CanvasContainer image={image} />
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
