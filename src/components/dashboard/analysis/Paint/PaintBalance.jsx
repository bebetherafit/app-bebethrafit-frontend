import React, { useRef, useEffect, useState } from 'react';

const GradientOverlay = ({ imageUrl, percentageLeft, percentageRight }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      // 이미지를 캔버스에 그림
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // 왼쪽 발에 그라데이션 적용
      const gradientLeft = context.createLinearGradient(0, 0, 0, canvas.height);
      gradientLeft.addColorStop(0, `rgba(0, 0, 255, ${percentageLeft / 100})`); // 투명도를 수치에 따라 조정
      gradientLeft.addColorStop(1, 'rgba(0, 0, 255, 0)');

      // 오른쪽 발에 그라데이션 적용
      const gradientRight = context.createLinearGradient(canvas.width, 0, canvas.width, canvas.height);
      gradientRight.addColorStop(0, `rgba(255, 0, 0, ${percentageRight / 100})`); // 투명도를 수치에 따라 조정
      gradientRight.addColorStop(1, 'rgba(255, 0, 0, 0)');

      // 왼쪽 발 그라데이션 적용
      context.fillStyle = gradientLeft;
      context.fillRect(0, 0, canvas.width / 2, canvas.height);

      // 오른쪽 발 그라데이션 적용
      context.fillStyle = gradientRight;
      context.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    };

    image.src = imageUrl;
  }, [imageUrl, percentageLeft, percentageRight]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

const GradientOverlayExample = () => {
    const [percentageLeft, setPercentageLeft] = useState(0);
    const [percentageRight, setPercentageRight] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
        setPercentageLeft((percentageLeft) => (percentageLeft + 1) % 101);
        setPercentageRight((percentageRight) => (percentageRight + 1) % 101);
        }, 50);
    
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className='overlay-container'>
        <GradientOverlay imageUrl="https://picsum.photos/id/237/800/600" percentageLeft={percentageLeft} percentageRight={percentageRight} />
        </div>
    );
    };

export default GradientOverlayExample;