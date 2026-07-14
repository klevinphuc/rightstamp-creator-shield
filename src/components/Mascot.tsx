import React from 'react';

export default function Mascot() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center pointer-events-auto select-none transition-transform duration-300 hover:scale-105">
      
      {/* Bong bóng thoại nhỏ xinh trên đầu Mascot */}
      <div className="bg-[#8B1E22] text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-lg mb-1 animate-bounce">
        Righty tư vấn miễn phí!
      </div>

      {/* Khung chứa Linh Vật */}
      <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center bg-transparent">
        <img
          src="/righty-scan.gif" // Gọi file GIF trong suốt của bạn
          alt="Righty Mascot"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
