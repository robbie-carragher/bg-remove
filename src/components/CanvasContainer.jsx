

import { useRef, useEffect } from 'react';
import CanvasControls from './CanvasControls';

const CanvasContainer = ({ image, scale, setScale }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && image) {
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawCheckerboard(ctx, canvas.width, canvas.height);
                const initialScale = Math.min(canvas.width / img.width, canvas.height / img.height);
                setScale(initialScale);
                drawImage(ctx, img, initialScale);
            };
            img.src = image;
        }
    }, [image]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && image) {
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawCheckerboard(ctx, canvas.width, canvas.height);
                drawImage(ctx, img, scale);
            };
            img.src = image;
        }
    }, [scale]);

    const drawCheckerboard = (ctx, width, height, tileSize = 20) => {
        for (let x = 0; x < width; x += tileSize * 2) {
            for (let y = 0; y < height; y += tileSize * 2) {
                ctx.fillStyle = '#efefef';
                ctx.fillRect(x, y, tileSize, tileSize);
                ctx.fillRect(x + tileSize, y + tileSize, tileSize, tileSize);
            }
        }
    };

    const drawImage = (ctx, img, scale) => {
        const canvas = canvasRef.current;
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const offsetX = (canvas.width - scaledWidth) / 2;
        const offsetY = (canvas.height - scaledHeight) / 2;
        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
    };

    const handleZoomIn = () => {
        setScale((prevScale) => Math.min(prevScale + 0.1, 3));
    };

    const handleZoomOut = () => {
        setScale((prevScale) => Math.max(prevScale - 0.1, 0.1));
    };

    const handleUndo = () => {
        // Implement undo logic here
    };

    const handleRedo = () => {
        // Implement redo logic here
    };

    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="flex justify-center items-center w-full h-full">
                <canvas ref={canvasRef} width="365" height="347" style={{
                    border: '4px solid #ededed',
                    borderRadius: '8px'
                }}></canvas>
            </div>
            <CanvasControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onUndo={handleUndo} onRedo={handleRedo} />
        </div>
    );
};

export default CanvasContainer;

