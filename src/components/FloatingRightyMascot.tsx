// src/components/FloatingRightyMascot.tsx
import { useEffect, useRef, useState } from 'react';

interface ActionStep {
  id: number;
  message: string;
  type: 'video' | 'image';
  src: string;
}

const actionSteps: ActionStep[] = [
  {
    id: 1,
    message: 'Đã xác thực – bằng chứng rõ ràng.',
    type: 'video',
    src: '/gifs/01_verified.mp4',
  },
  {
    id: 2,
    message: 'Tự do sáng tạo, RightStamp bảo vệ bạn.',
    type: 'image',
    src: '/gifs/02_creativity.gif',
  },
  {
    id: 3,
    message: 'Quét QR – minh bạch chủ sở hữu.',
    type: 'image',
    src: '/gifs/03_qr_scan.gif',
  },
  {
    id: 4,
    message: 'Lá chắn vững chắc chống đạo nhái.',
    type: 'image',
    src: '/gifs/04_protector.gif',
  },
  {
    id: 5,
    message: 'RightStamp – Đồng hành cùng tác phẩm của bạn.',
    type: 'image',
    src: '/gifs/05_trust.gif',
  },
];

function ChromaKeyVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;

    let animationFrameId = 0;
    let isRunning = true;

    const drawFrame = () => {
      if (!isRunning || video.paused || video.ended) {
        animationFrameId = window.requestAnimationFrame(drawFrame);
        return;
      }

      const width = video.videoWidth || 512;
      const height = video.videoHeight || 512;

      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;

      context.clearRect(0, 0, width, height);
      context.drawImage(video, 0, 0, width, height);

      const frame = context.getImageData(0, 0, width, height);
      const pixels = frame.data;

      for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];

        const strongestNonGreen = Math.max(red, blue);
        const greenDominance = green - strongestNonGreen;

        if (green > 95 && greenDominance > 25) {
          const removeAmount = Math.min(1, (greenDominance - 25) / 85);
          pixels[i + 3] = Math.round(pixels[i + 3] * (1 - removeAmount));
        }

        if (pixels[i + 3] > 0 && green > red && green > blue) {
          pixels[i + 1] = Math.max(strongestNonGreen, green - greenDominance * 0.6);
        }
      }

      context.putImageData(frame, 0, 0);
      animationFrameId = window.requestAnimationFrame(drawFrame);
    };

    const startVideo = async () => {
      try {
        await video.play();
      } catch {
        // Browser may wait for user interaction. The canvas will start after play is allowed.
      }

      drawFrame();
    };

    video.addEventListener('loadeddata', startVideo);
    video.addEventListener('play', drawFrame);

    if (video.readyState >= 2) {
      startVideo();
    }

    return () => {
      isRunning = false;
      window.cancelAnimationFrame(animationFrameId);
      video.removeEventListener('loadeddata', startVideo);
      video.removeEventListener('play', drawFrame);
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        className="hidden"
      />

      <canvas
        ref={canvasRef}
        className={className}
      />
    </>
  );
}

export default function FloatingRightyMascot() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % actionSteps.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  const handleMascotClick = () => {
    setCurrentStepIndex((prev) => (prev + 1) % actionSteps.length);
  };

  const currentStep = actionSteps[currentStepIndex];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center select-none pointer-events-auto">
      <div className="mb-3 max-w-[220px] bg-[#0a1e36]/95 text-white text-xs font-medium p-3 rounded-2xl border border-slate-700/50 shadow-xl relative animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-sm text-center">
        Chào bạn! {currentStep.message}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a1e36] rotate-45 border-r border-b border-slate-700/50" />
      </div>

      <button
        type="button"
        onClick={handleMascotClick}
        className="relative w-28 h-28 cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300 animate-float bg-transparent border-0 p-0"
        title="Click để chuyển hành động!"
        aria-label="Righty mascot"
      >
        <span className="absolute inset-0 rounded-full bg-teal-400/15 blur-xl pointer-events-none" />

        {currentStep.type === 'video' ? (
          <ChromaKeyVideo
            key={currentStep.id}
            src={currentStep.src}
            className="relative z-10 block w-full h-full object-contain bg-transparent"
          />
        ) : (
          <img
            key={currentStep.id}
            src={currentStep.src}
            alt="Righty Live Mascot"
            draggable={false}
            className="relative z-10 block w-full h-full object-contain bg-transparent"
          />
        )}
      </button>
    </div>
  );
}
