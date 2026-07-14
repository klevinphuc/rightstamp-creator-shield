// src/components/FloatingRightyMascot.tsx
import { useEffect, useState } from 'react';

interface ActionStep {
  id: number;
  message: string;
  gifUrl: string;
}

const publicAsset = (fileName: string) => `${import.meta.env.BASE_URL}${fileName}`;

const actionSteps: ActionStep[] = [
  {
    id: 1,
    message: 'Đã xác thực – bằng chứng rõ ràng.',
    gifUrl: publicAsset('01_verified.gif'),
  },
  {
    id: 2,
    message: 'Tự do sáng tạo, RightStamp bảo vệ bạn.',
    gifUrl: publicAsset('02_creativity.gif'),
  },
  {
    id: 3,
    message: 'Quét QR – minh bạch chủ sở hữu.',
    gifUrl: publicAsset('03_qr_scan.gif'),
  },
  {
    id: 4,
    message: 'Lá chắn vững chắc chống đạo nhái.',
    gifUrl: publicAsset('04_protector.gif'),
  },
  {
    id: 5,
    message: 'RightStamp – Đồng hành cùng tác phẩm của bạn.',
    gifUrl: publicAsset('05_trust.gif'),
  },
];

export default function FloatingRightyMascot() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % actionSteps.length);
    }, 6000);

    return () => clearInterval(interval);
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
        className="w-28 h-28 relative cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300 animate-float bg-transparent border-0 p-0"
        title="Click để chuyển hành động!"
      >
        <span className="absolute inset-0 rounded-full bg-teal-400/15 blur-xl pointer-events-none" />

        <img
          src={currentStep.gifUrl}
          alt="Righty Live Mascot"
          className="block w-full h-full object-contain bg-transparent"
        />
      </button>
    </div>
  );
}
