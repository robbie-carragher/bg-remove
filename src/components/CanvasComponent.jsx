

const CanvasContainer = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="pointer-events-auto flex justify-center">
                <div className="konvajs-content" role="presentation" style={{
                    position: 'relative', 
                    userSelect: 'none', 
                    width: '365.056px', 
                    height: '347.944px'
                }}>
                    <canvas width="365" height="347" style={{
                        padding: 0, 
                        margin: 0, 
                        border: 0, 
                        background: 'transparent', 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '365.056px', 
                        height: '347.944px', 
                        display: 'block'
                    }}></canvas>
                    {/* Additional canvas elements can be added or adjusted as needed */}
                </div>
            </div>
        </div>
    );
}

export default CanvasContainer;
