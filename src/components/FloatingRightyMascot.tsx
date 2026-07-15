// src/components/FloatingRightyMascot.tsx
import { useEffect, useState } from 'react';

interface ActionStep {
  id: number;
  message: string;
  gifUrl: string;
}

// Định nghĩa một nguồn GIF duy nhất chạy xuyên suốt cho cả 5 bước
const mascotGifUrl = '/gifs/rightyrighty-ezgif.com-remove-background%20%282%29.gif';

const actionSteps: ActionStep[] = [
  {
    id: 1,
    message: 'Đã xác thực – bằng chứng rõ ràng.',
    gifUrl: mascotGifUrl,
  },
  {
    id: 2,
    message: 'Tự do sáng tạo, RightStamp bảo vệ bạn.',
    gifUrl: mascotGifUrl,
  },
  {
    id: 3,
    message: 'Quét QR – minh bạch chủ sở hữu.',
    gifUrl: mascotGifUrl,
  },
  {
    id: 4,
    message: 'Lá chắn vững chắc chống đạo nhái.',
    gifUrl: mascotGifUrl,
  },
  {
    id: 5,
    message: 'RightStamp – Đồng hành cùng tác phẩm của bạn.',
    gifUrl: mascotGifUrl,
  },
];

export default function FloatingRightyMascot() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Thay đổi tần suất chạy: Cứ mỗi 3 giây (3000ms) sẽ đổi lời thoại một lần
    const interval = window.setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % actionSteps.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const handleMascotClick = () => {
    setCurrentStepIndex((prev) => (prev + 1) % actionSteps.length);
  };

  const currentStep = actionSteps[currentStepIndex];

  return (
    /* ĐÃ SỬA: Dịch sát sang bên trái thêm (từ left-6 thành left-2) */
    <div className="fixed bottom-6 left-2 z-50 flex flex-col items-center select-none pointer-events-auto">
      
      {/* Bong bóng lời thoại nhỏ xuất hiện trên đầu chú Mascot */}
      <div className="mb-3 max-w-[220px] bg-[#0a1e36]/95 text-white text-xs font-medium p-3 rounded-2xl border border-slate-700/50 shadow-xl relative animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-sm text-center">
        Chào bạn! {currentStep.message}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a1e36] rotate-45 border-r border-b border-slate-700/50" />
      </div>

      <button
        type="button"
        onClick={handleMascotClick}
        /* ĐÃ SỬA: Phóng to kích thước từ 112px (w-28) lên 1.5 lần thành 168px (w-[168px]) */
        className="relative w-[168px] h-[168px] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 animate-float bg-transparent border-0 p-0"
        title="Click để chuyển hành động!"
        aria-label="Righty mascot"
      >
        <span className="absolute inset-0 rounded-full bg-teal-400/15 blur-xl pointer-events-none" />

        <img
          key={currentStep.id}
          src={currentStep.gifUrl}
          alt="Righty Live Mascot"
          draggable={false}
          className="relative z-10 block w-full h-full object-contain bg-transparent"
        />
      </button>
    </div>
  );
}
