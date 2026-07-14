// src/components/FloatingRightyMascot.tsx
import { useState, useEffect } from 'react';

// Import trực tiếp 5 file GIF hành động không nền từ thư mục src/assets/gifs
import gif01Verified from '../assets/gifs/01_verified.gif';
import gif02Creativity from '../assets/gifs/02_creativity.gif';
import gif03QrScan from '../assets/gifs/03_qr_scan.gif';
import gif04Protector from '../assets/gifs/04_protector.gif';
import gif05Trust from '../assets/gifs/05_trust.gif';

interface ActionStep {
  id: number;
  message: string;
  gifUrl: string;
}

// Cấu hình nội dung và thứ tự chạy liên tục của Righty
const actionSteps: ActionStep[] = [
  {
    id: 1,
    message: 'Đã xác thực – bằng chứng rõ ràng.',
    gifUrl: gif01Verified,
  },
  {
    id: 2,
    message: 'Tự do sáng tạo, RightStamp bảo vệ bạn.',
    gifUrl: gif02Creativity,
  },
  {
    id: 3,
    message: 'Quét QR – minh bạch chủ sở hữu.',
    gifUrl: gif03QrScan,
  },
  {
    id: 4,
    message: 'Lá chắn vững chắc chống đạo nhái.',
    gifUrl: gif04Protector,
  },
  {
    id: 5,
    message: 'RightStamp – Đồng hành cùng tác phẩm của bạn.',
    gifUrl: gif05Trust,
  },
];

export default function FloatingRightyMascot() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Cơ chế tự động chạy liên tục: Cứ mỗi 6 giây chú mascot tự đổi sang cử động/nhiệm vụ mới
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % actionSteps.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  // Hàm xử lý khi người dùng click chuột trực tiếp vào chú mascot đang cử động
  const handleMascotClick = () => {
    setCurrentStepIndex((prev) => (prev + 1) % actionSteps.length);
  };

  const currentStep = actionSteps[currentStepIndex];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center select-none pointer-events-auto">
      
      {/* 1. Bong bóng lời thoại nhỏ xinh xuất hiện ngay trên đầu chú Mascot GIF */}
      <div className="mb-3 max-w-[220px] bg-[#0a1e36]/95 text-white text-xs font-medium p-3 rounded-2xl border border-slate-700/50 shadow-xl relative animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-sm text-center">
        {currentStep.message}
        {/* Mũi tên nhọn chỉ xuống chú mascot */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a1e36] rotate-45 border-r border-b border-slate-700/50"></div>
      </div>

      {/* 2. Thực thể Linh vật Righty - Hoàn toàn là file GIF di chuyển, cử động lơ lửng */}
      <div 
        onClick={handleMascotClick}
        className="w-28 h-28 relative cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300 animate-float"
        title="Click vào tôi để chuyển hành động!"
      >
        {/* Hiệu ứng hào quang phát sáng nhẹ phía sau để làm nổi bật mascot khỏi nền web */}
        <div className="absolute inset-0 rounded-full bg-teal-400/15 blur-xl pointer-events-none"></div>
        
        {/* Đổ trực tiếp file GIF lên màn hình */}
        <img 
          src={currentStep.gifUrl} 
          alt="Righty Live Mascot" 
          className="w-full h-full object-contain mix-blend-normal"
        />
      </div>

    </div>
  );
}
