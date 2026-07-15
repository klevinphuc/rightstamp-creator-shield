// src/components/FloatingRightyMascot.tsx
import { useEffect, useState } from 'react';

interface ActionStep {
  id: number;
  message: string;
  gifUrl: string;
}

// ⚠️ ĐỒNG BỘ THỜI GIAN:
// Đảm bảo số này khớp chính xác với tổng thời lượng thực tế của file GIF (tính bằng mili-giây).
// Ví dụ: Nếu ảnh GIF của bạn chạy hết một vòng mất đúng 9.2 giây thì để 9200.
// Nếu file GIF thực tế của bạn dài 9.0 giây thì bạn hãy sửa số này thành 9000 nhé!
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
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [gifKey, setGifKey] = useState<number>(Date.now()); // Dùng để reset GIF khi click

  useEffect(() => {
    // Nếu ảnh GIF chưa load xong, không chạy bộ đếm thời gian để tránh lệch nhịp
    if (startTime === null) return;

    let animationFrameId: number;

    const updateTimer = () => {
      const now = Date.now();
      // Tính toán thời gian trôi qua trong vòng lặp của GIF (mili-giây)
      const elapsedMs = (now - startTime) % TOTAL_GIF_DURATION;
      const elapsedSec = elapsedMs / 1000; // Đổi sang giây

      // Phân chia khoảng thời gian hiển thị lời thoại khớp từng giây với GIF
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

  // Sự kiện kích hoạt khi ảnh GIF thực sự load thành công trên trình duyệt
  const handleImageLoad = () => {
    setStartTime(Date.now());
  };

  // Khi click vào chú mascot, reset lại key để tải lại ảnh và đặt startTime về null để chờ load xong mới đếm
  const handleMascotClick = () => {
    setGifKey(Date.now());
    setStartTime(null); // Tạm ngắt bộ đếm thời gian
    setCurrentStepIndex(0);
  };

  const currentStep = actionSteps[currentStepIndex];

  return (
    /* Giữ nguyên vị trí kéo sát đáy mép trái (bottom-[-17px] left-0.5) */
    <div className="fixed bottom-[-17px] left-0.5 z-50 flex flex-col items-center select-none pointer-events-auto">
      
      {/* Bong bóng lời thoại màu đỏ đậm và kéo thấp sát mascot (translate-y-[38px]) */}
      <div className="mb-1 max-w-[170px] bg-[#800000]/95 text-white text-xs font-medium p-3 rounded-2xl border border-red-900/50 shadow-xl relative animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-sm text-center transform translate-y-[38px] z-20">
        {currentStep.message}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#800000] rotate-45 border-r border-b border-red-900/50" />
      </div>

      <button
        type="button"
        onClick={handleMascotClick}
        className="relative w-[168px] h-[168px] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 animate-float bg-transparent border-0 p-0 z-10"
        title="Click để chạy lại từ đầu vòng tuần hoàn!"
        aria-label="Righty mascot"
      >
        <span className="absolute inset-0 rounded-full bg-teal-400/15 blur-xl pointer-events-none" />

        <img
          key={`${currentStep.id}-${gifKey}`}
          src={`${currentStep.gifUrl}?v=${gifKey}`}
          alt="Righty Live Mascot"
          draggable={false}
          className="relative z-10 block w-full h-full object-contain bg-transparent"
          onLoad={handleImageLoad} // Trọng tâm đồng bộ: Chờ ảnh load xong mới đếm giây
        />
      </button>
    </div>
  );
}
