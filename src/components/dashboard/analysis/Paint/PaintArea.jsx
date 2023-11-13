import React, { useRef, useEffect } from 'react';
import './PaintArea.css';

const CanvasComponent = ({ image }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 이미지 로드와 상자 그리기
    const imageObj = new Image();
    imageObj.onload = () => {
      // 이미지를 캔버스에 그림
      context.drawImage(imageObj, 0, 0);
      // 상자를 그림
      drawBox(context);
    };
    imageObj.src = image;
  }, [image]);

  // 상자 그리는 함수
  const drawBox = (ctx) => {
    ctx.fillStyle = 'red';
    const boxWidth = 100; // 가로 크기
    const boxHeight = 400; // 세로 크기
    ctx.fillRect(0, 0, boxWidth, boxHeight); // 위치 조정 필요
  };

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default CanvasComponent;
