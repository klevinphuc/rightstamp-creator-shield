// src/components/FloatingRightyMascot.tsx
import { useEffect, useState } from 'react';

interface ActionStep {
  id: number;
  message: string;
}

// Tổng thời lượng chạy hết 1 vòng của file GIF (9.2 giây = 9200ms)
const TOTAL_GIF_DURATION = 9200; 

const mascotGifUrl = '/gifs/rightyrighty-ezgif.com-remove-background%20%282%29.gif';

const actionSteps: ActionStep[] = [
  { id: 1, message: 'Đã xác thực – bằng chứng rõ ràng.' },
  { id: 2, message: 'Tự do sáng tạo, RightStamp bảo vệ bạn.' },
  { id: 3, message: 'Quét QR – minh bạch chủ sở hữu.' },
  { id: 4, message: 'Lá chắn vững chắc chống đạo nhái.' },
  { id: 5, message: 'RightStamp – Đồng hành cùng tác phẩm của bạn.' },
];

export default function FloatingRightyMascot() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [gifKey, setGifKey] = useState<number>(Date.now()); // Chỉ dùng để reset GIF khi click thủ công

  useEffect(() => {
    if (startTime === null) return;

    // Sử dụng bộ kiểm tra chu kỳ cứ mỗi 100ms để đảm bảo độ chính xác cực cao và mượt mà
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = (now - startTime) % TOTAL_GIF_DURATION;
      const elapsedSec = elapsedMs / 1000;

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
    }, 100);

    return () => clearInterval(interval);
  }, [startTime]);

  // Kích hoạt bộ đếm thời gian ngay khi ảnh GIF load thành công
  const handleImageLoad = () => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
  };

  // Reset thủ công khi click chuột vào chú mascot
  const handleMascotClick = () => {
    setGifKey(Date.now());
    setStartTime(null); // Tạm dừng bộ đếm giây cho đến khi GIF mới được tải xong
    setCurrentStepIndex(0);
  };

  const currentStep = actionSteps[currentStepIndex];

  return (
    /* Container tổng thể được kéo sát đáy và dịch trái theo đúng tỉ lệ bạn chọn */
    <div className="fixed bottom-[-17px] left-0.5 z-50 flex flex-col items-center select-none pointer-events-auto">
      
      {/* Bong bóng lời thoại màu đỏ đậm, ngắn gọn và kéo sát mascot xuống 2.5cm (translate-y-[38px]) */}
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
          // ĐÃ SỬA: Key chỉ thay đổi khi click thủ công (gifKey), giúp ảnh không bị tải lại liên tục khi đổi text
          key={gifKey}
          src={`${mascotGifUrl}?v=${gifKey}`}
          alt="Righty Live Mascot"
          draggable={false}
          className="relative z-10 block w-full h-full object-contain bg-transparent"
          onLoad={handleImageLoad}
        />
      </button>
    </div>
  );
}
