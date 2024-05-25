import { useRef, useEffect } from 'react';

const CanvasContainer = ({ image }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && image) {
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawCheckerboard(ctx, canvas.width, canvas.height);
                const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);
                const scaledWidth = img.width * scaleFactor;
                const scaledHeight = img.height * scaleFactor;
                const offsetX = (canvas.width - scaledWidth) / 2;
                const offsetY = (canvas.height - scaledHeight) / 2;
                ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
            };
            img.src = image;
        }
    }, [image]);

    function drawCheckerboard(ctx, width, height, tileSize = 20) {
        for (let x = 0; x < width; x += tileSize * 2) {
            for (let y = 0; y < height; y += tileSize * 2) {
                ctx.fillStyle = '#efefef';
                ctx.fillRect(x, y, tileSize, tileSize);
                ctx.fillRect(x + tileSize, y + tileSize, tileSize, tileSize);
            }
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-full">
            <canvas ref={canvasRef} width="365" height="347" style={{
                border: '1px solid #afafaf',
                borderRadius: '8px'
            }}></canvas>
        </div>
    );
};

export default CanvasContainer;
