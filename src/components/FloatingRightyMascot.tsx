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
    /* Vị trí cố định Z-50 để luôn nổi trên cùng toàn sàn web */
    /* ĐÃ SỬA: Chuyển vị trí từ bottom-6 (24px) xuống thấp hơn tầm 1,2cm (khoảng 45px) */
    /* Giá trị mới là bottom-[-21px] (24px - 45px = -21px) để chú mascot cực kỳ sát đáy web */
    <div className="fixed bottom-[-21px] left-0.5 z-50 flex flex-col items-center select-none pointer-events-auto">
      
      {/* Bong bóng lời thoại xuất hiện trên đầu chú Mascot */}
      {/* Giữ nguyên max-width [170px] đã được thu ngắn và margin-bottom [mb-1] đã kéo thấp */}
      <div className="mb-1 max-w-[170px] bg-[#0a1e36]/95 text-white text-xs font-medium p-3 rounded-2xl border border-slate-700/50 shadow-xl relative animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-sm text-center">
        {currentStep.message}
        {/* Mũi tên nhọn chỉ xuống chú mascot */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a1e36] rotate-45 border-r border-b border-slate-700/50" />
      </div>

      <button
        type="button"
        onClick={handleMascotClick}
        /* Giữ nguyên kích thước 1.5x (168px) và hiệu ứng animate-float */
        className="relative w-[168px] h-[168px] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 animate-float bg-transparent border-0 p-0"
        title="Click để chuyển hành động!"
        aria-label="Righty mascot"
      >
        {/* Hiệu ứng hào quang phát sáng nhẹ phía sau (có thể bị mép trình duyệt che một phần khi kéo xuống) */}
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
