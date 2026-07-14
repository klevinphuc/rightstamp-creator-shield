import React from 'react';

export default function Mascot() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center pointer-events-auto select-none transition-transform duration-300 hover:scale-105">
      
      {/* Bong bóng thoại nhỏ xinh ở trên đầu Mascot */}
      <div className="bg-[#8B1E22] text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-lg mb-1 animate-bounce">
        Righty tư vấn miễn phí!
      </div>

      {/* Khung chứa Video Mascot (Đã chỉnh kích thước chuẩn để linh vật hiện đẹp, không đè component khác) */}
      <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center bg-transparent">
        <video
          src="/righty-scan" // Đường dẫn đã cập nhật chính xác theo file trên GitHub của bạn
          autoPlay
          loop
          muted
          playsInline
          type="video/mp4" // Khai báo kiểu để trình duyệt hiểu file video không có đuôi này
          className="w-full h-full object-contain" // Giữ nguyên tỷ lệ chuẩn của video xóa nền
        />
      </div>
    </div>
  );
}
