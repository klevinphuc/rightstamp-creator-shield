// src/components/FloatingRightyMascot.tsx
import { useEffect, useState } from 'react';

interface ActionStep {
  id: number;
  message: string;
  gifUrl: string;
}

// Thay đổi con số này thành TỔNG THỜI GIAN thực tế của file GIF (tính bằng mili-giây)
// Ví dụ: Nếu GIF dài chính xác 9.2 giây, hãy để là 9200
const TOTAL_GIF_DURATION = 9200; 

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
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [gifKey, setGifKey] = useState<number>(Date.now()); // Dùng để reset GIF khi click

  useEffect(() => {
    let animationFrameId: number;

    const updateTimer = () => {
      const now = Date.now();
      // Tính toán thời gian trôi qua trong vòng lặp của GIF (mili-giây)
      const elapsedMs = (now - startTime) % TOTAL_GIF_DURATION;
      const elapsedSec = elapsedMs / 1000; // Đổi sang giây

      // Phân chia khoảng thời gian hiển thị lời thoại theo yêu cầu của bạn
      let activeIndex = 4; // Mặc định là Message 5 (từ 7.2 giây đến hết GIF)
      
      if (elapsedSec >= 0 && elapsedSec < 1.9) {
        activeIndex = 0; // Message 1
      } else if (elapsedSec >= 1.9 && elapsedSec < 3.3) {
        activeIndex = 1; // Message 2
      } else if (elapsedSec >= 3.3 && elapsedSec < 5.3) {
        activeIndex = 2; // Message 3
      } else if (elapsedSec >= 5.3 && elapsedSec < 7.2) {
        activeIndex = 3; // Message 4
      }

      setCurrentStepIndex(activeIndex);
      animationFrameId = requestAnimationFrame(updateTimer);
    };

    animationFrameId = requestAnimationFrame(updateTimer);
    return () => cancelAnimationFrame(animationFrameId);
  }, [startTime]);

  // Khi click vào chú mascot, reset cả thời gian chạy lẫn ảnh GIF về vạch xuất phát
  const handleMascotClick = () => {
    setStartTime(Date.now());
    setGifKey(Date.now());
    setCurrentStepIndex(0);
  };

  const currentStep = actionSteps[currentStepIndex];

  return (
    /* ĐÃ SỬA: Kéo vị trí tổng thể lên cao (bottom-[-66px] thành bottom-10) để hiển thị trọn vẹn 100% mascot */
    <div className="fixed bottom-10 left-0.5 z-50 flex flex-col items-center select-none pointer-events-auto">
      
      {/* Bong bóng lời thoại xuất hiện trên đầu chú Mascot */}
      {/* ĐÃ SỬA: Chuyển màu nền thành ĐỎ ĐẬM chuyên nghiệp (bg-[#800000]/95) */}
      {/* ĐVÀ ĐÃ SỬA: Loại bỏ translate-y-[40px] để ô thoại đỏ nằm đúng vị trí ngay trên đầu chú mascot */}
      <div className="mb-1 max-w-[170px] bg-[#800000]/95 text-white text-xs font-medium p-3 rounded-2xl border border-red-900/50 shadow-xl relative animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-sm text-center z-20">
        {currentStep.message}
        {/* Mũi tên nhọn hướng xuống - đã đổi màu trùng với nền đỏ đậm */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#800000] rotate-45 border-r border-b border-red-900/50" />
      </div>

      <button
        type="button"
        onClick={handleMascotClick}
        /* Giữ nguyên kích thước lớn 1.5x (168px) và hiệu ứng lơ lửng nhịp nhàng */
        className="relative w-[168px] h-[168px] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 animate-float bg-transparent border-0 p-0 z-10"
        title="Click để chạy lại từ đầu vòng tuần hoàn!"
        aria-label="Righty mascot"
      >
        <span className="absolute inset-0 rounded-full bg-teal-400/15 blur-xl pointer-events-none" />

        <img
          // Cung cấp key động có chứa timestamp để ép trình duyệt load lại GIF từ frame 0 mỗi khi reset
          key={`${currentStep.id}-${gifKey}`}
          src={`${currentStep.gifUrl}?v=${gifKey}`}
          alt="Righty Live Mascot"
          draggable={false}
          className="relative z-10 block w-full h-full object-contain bg-transparent"
        />
      </button>
    </div>
  );
}
