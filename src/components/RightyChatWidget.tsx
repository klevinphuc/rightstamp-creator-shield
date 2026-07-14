import { useState } from 'react';

// Đường dẫn ảnh đại diện tĩnh của Righty khi chưa mở hộp chat
import mascotAvatar from '../assets/images/mascot_avatar.png'; 

// Import các file GIF theo tên mới bạn đã đổi trong thư mục src/assets/gifs
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

// Cấu hình thứ tự xuất hiện và thông điệp chuẩn chỉnh của bạn
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

export default function RightyChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setCurrentStepIndex(0); // Reset về bước 1 mỗi khi mở hộp chat lên
    }
  };

  const nextStep = () => {
    setCurrentStepIndex((prev) => (prev + 1) % actionSteps.length);
  };

  const prevStep = () => {
    setCurrentStepIndex((prev) => (prev - 1 + actionSteps.length) % actionSteps.length);
  };

  const currentStep = actionSteps[currentStepIndex];

  return (
    /* Vị trí cố định ở góc dưới bên trái màn hình */
    <div className="fixed bottom-6 left-6 z-50 font-sans select-none">
      
      {/* 1. Nút bong bóng Chat (Avatar Mascot tròn góc dưới trái màn hình) */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="w-16 h-16 rounded-full overflow-hidden shadow-2xl border-4 border-white hover:scale-110 transition-all bg-[#0a1e36] flex items-center justify-center"
        >
          <img src={mascotAvatar} alt="Righty" className="w-full h-full object-cover" />
        </button>
      )}

      {/* 2. Cửa sổ giao diện tương tác chính */}
      {isOpen && (
        <div className="w-96 rounded-3xl shadow-2xl bg-[#0a1e36] text-white overflow-hidden flex flex-col transition-all duration-300">
          
          {/* Header thanh tiêu đề */}
          <div className="p-5 border-b border-gray-700/50 flex items-center justify-between bg-[#08172b]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-400 bg-white">
                <img src={mascotAvatar} alt="Righty Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-wide">Righty</h3>
                <p className="text-xs text-teal-400 font-medium">Trợ lý bảo vệ bản quyền</p>
              </div>
            </div>
            <button 
              onClick={toggleChat} 
              className="text-gray-400 hover:text-white text-3xl font-light p-1 transition-colors leading-none"
            >
              &times;
            </button>
          </div>

          {/* Body chứa nội dung GIF không nền và Message */}
          <div className="p-6 flex-grow flex flex-col items-center gap-5 bg-gradient-to-b from-[#0a1e36] to-[#061424]">
            
            {/* Khung hiển thị GIF chuyển động */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-slate-900/40 border border-slate-700/30 flex items-center justify-center p-2">
              <img
                src={currentStep.gifUrl}
                alt={`Righty step ${currentStep.id}`}
                className="max-w-full max-h-full object-contain mix-blend-normal"
              />
            </div>

            {/* Bong bóng hội thoại hiển thị nội dung Text */}
            <div className="w-full bg-[#162d4a] p-5 rounded-2xl rounded-bl-none border border-slate-700/40 shadow-lg relative min-h-[80px] flex items-center">
              <p className="text-sm font-medium leading-relaxed text-slate-100">
                {currentStep.message}
              </p>
            </div>
          </div>

          {/* Bộ điều hướng Footer (Trước / Sau) */}
          <div className="p-4 border-t border-gray-700/50 bg-[#051120] flex justify-between items-center px-6">
            <button
              onClick={prevStep}
              className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white text-xs font-semibold transition-all"
            >
              Trước
            </button>
            
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-slate-400 font-medium">
                {currentStep.id} / {actionSteps.length}
              </span>
              {/* Thanh tiến trình mini hiển thị trực quan */}
              <div className="flex gap-1">
                {actionSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-3 rounded-full transition-all duration-300 ${
                      index === currentStepIndex ? 'bg-teal-400 w-5' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextStep}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-bold hover:brightness-110 active:scale-95 transition-all text-xs shadow-md shadow-teal-500/20"
            >
              {currentStepIndex === actionSteps.length - 1 ? 'Xem lại từ đầu' : 'Tiếp theo'}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
