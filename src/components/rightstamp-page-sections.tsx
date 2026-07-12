import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Barcode,
  Bot,
  FileCheck2,
  Fingerprint,
  QrCode,
  ShieldCheck,
  Sparkles,
  Stamp,
  Upload,
} from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="gioi-thieu"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#141a24]"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.62) 42%, rgba(0,0,0,0.42) 100%), url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-x relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur md:text-sm">
            Công cụ bảo vệ tác phẩm số
          </div>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl md:text-7xl">
            Đóng dấu vân tay <br className="hidden sm:block" />
            cho từng nét <span className="text-coral">sáng tạo</span> của bạn
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            RightStamp đồng hành cùng creator Việt — designer, photographer, nhà văn, content
            creator — lưu lại chứng cứ quyền tác giả minh bạch, có giá trị pháp lý, để mỗi giọt chất
            xám đều được ghi nhận đúng người, đúng lúc.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/tinh-nang"
              className="inline-flex items-center gap-2 rounded-md bg-maroon px-6 py-3.5 font-bold text-white shadow-lg transition-colors hover:bg-maroon-deep"
            >
              Bắt đầu miễn phí
              <ArrowRight size={18} />
            </Link>
            <a
              href="#cach-thuc"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Tìm hiểu thêm
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-coral" />
              Hash + Timestamp
            </div>
            <div className="flex items-center gap-2">
              <QrCode size={18} className="text-coral" />
              QR xác minh công khai
            </div>
            <div className="flex items-center gap-2">
              <FileCheck2 size={18} className="text-coral" />
              Evidence Pack
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section
      id="ly-do-chon"
      className="relative overflow-hidden bg-ink py-20 md:py-28"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.34) 48%, rgba(0,0,0,0.52) 100%), url('/images/creator-section-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-x relative z-10">
        <div className="rightstamp-red-divider mb-12" />
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-coral">
            Vì sao chọn RightStamp
          </p>
          <h2 className="mt-3 font-display text-3xl text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-5xl">
            LÝ DO CREATOR VIỆT TIN DÙNG
          </h2>
          <p className="mt-4 text-white/85">
            Sáu lý do khiến RightStamp trở thành người bạn đồng hành đáng tin cậy trong hành trình
            bảo vệ chất xám của bạn.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(
            [
              {
                icon: Sparkles,
                title: "DỄ DÙNG CHO CREATOR CÁ NHÂN",
                desc: "Thiết kế tối giản dành cho freelancer, sinh viên, nghệ sĩ độc lập. Đăng ký tác phẩm chỉ trong vài phút, không cần kiến thức pháp lý phức tạp.",
                color: "coral",
              },
              {
                icon: Fingerprint,
                title: "DẤU VÂN TAY SỐ (HASH FILE)",
                desc: "Mỗi tác phẩm được băm SHA-256 kết hợp timestamp, xác thực chính xác thời điểm công bố và bảo đảm tính toàn vẹn tuyệt đối của tệp gốc.",
                color: "maroon",
              },
              {
                icon: QrCode,
                title: "TÌM KIẾM & XÁC MINH QUA QR",
                desc: "Bất kỳ ai cũng có thể quét mã QR để tra cứu, xác minh tác giả và thời điểm công bố tác phẩm trên cơ sở dữ liệu công khai của RightStamp.",
                color: "royal",
              },
              {
                icon: Stamp,
                title: "WATERMARK & TEM RIGHTSTAMP VERIFIED",
                desc: "Đính kèm watermark và tem “RightStamp Verified” trực quan, thẩm mỹ lên tác phẩm số — vừa bảo vệ, vừa nâng tầm hình ảnh cá nhân của bạn.",
                color: "sun",
              },
              {
                icon: FileCheck2,
                title: "EVIDENCE PACK CHO TRANH CHẤP",
                desc: "Bộ hồ sơ chứng cứ đóng gói chuẩn pháp lý gồm hash, timestamp, log truy cập, chứng chỉ — sẵn sàng phục vụ giải quyết tranh chấp thực tế.",
                color: "maroon",
              },
              {
                icon: Bot,
                title: "TRỢ LÝ AI “RIGHTY”",
                desc: "Righty hướng dẫn bạn từng bước xử lý pháp lý sở hữu trí tuệ: từ đăng ký, phát hiện vi phạm đến gửi thông báo gỡ bỏ nội dung.",
                color: "coral",
              },
            ] as const
          ).map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section id="cach-thuc" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-maroon">
            Quy trình 3 bước
          </p>
          <h2 className="mt-3 font-display text-3xl text-maroon md:text-5xl">
            CÁCH THỨC HOẠT ĐỘNG
          </h2>
          <p className="mt-4 text-muted-foreground">
            Chỉ ba bước đơn giản để tác phẩm của bạn được bảo vệ toàn diện.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 items-start gap-10 md:grid-cols-3 md:gap-6">
          {[
            {
              n: 1,
              icon: Upload,
              title: "Tải tác phẩm lên",
              desc: "Tải lên dễ dàng các định dạng PDF, MP3, hình ảnh, video... chỉ trong vài bước đơn giản.",
            },
            {
              n: 2,
              icon: Barcode,
              title: "Hệ thống tạo mã bản quyền",
              desc: "Hệ thống tự động tạo dấu vân tay số (hash), timestamp, mã QR và lưu hồ sơ tác giả đầy đủ.",
            },
            {
              n: 3,
              icon: Award,
              title: "Nhận chứng chỉ & watermark",
              desc: "Nhận chứng chỉ bản quyền kèm link tra cứu, watermark tem Verified — sẵn sàng chia sẻ và thương mại hóa.",
            },
          ].map((step, index) => (
            <div key={step.n} className="group relative flex flex-col items-center text-center">
              {index < 2 && (
                <ArrowDots className="absolute top-16 -right-8 hidden text-muted-foreground/50 md:block lg:-right-12" />
              )}
              <div className="relative">
                <span className="absolute -top-2 -left-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-maroon font-display text-white shadow-md">
                  {step.n}
                </span>
                <div className="grid h-36 w-36 place-items-center rounded-full border-2 border-maroon bg-white transition-all duration-300 group-hover:scale-105 group-hover:bg-maroon group-hover:shadow-xl group-hover:shadow-maroon/30">
                  <step.icon
                    size={52}
                    strokeWidth={1.8}
                    className="text-maroon transition-colors duration-300 group-hover:text-white"
                  />
                </div>
              </div>
              <h3 className="mt-6 font-display text-xl text-ink">{step.title}</h3>
              <p className="mt-3 max-w-xs text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section id="bang-gia" className="bg-ink py-20 text-white md:py-28">
      <div className="container-x">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-coral">
            Bảng giá linh hoạt
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">TRẢ THEO NHU CẦU SỬ DỤNG</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Không ràng buộc, không phí ẩn — bạn chỉ trả cho những gì thực sự dùng.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
          {[
            {
              title: "ĐĂNG KÝ TÁC PHẨM",
              desc: "Dành cho nhà văn, nhạc sĩ, nhiếp ảnh gia, họa sĩ, designer, developer. Tạo dấu vân tay số, timestamp và chứng chỉ bản quyền có giá trị pháp lý toàn cầu.",
              extra:
                "Bảo vệ chất xám của bạn trong kỷ nguyên AI: khai báo tác phẩm 100% con người hay có hỗ trợ AI.",
              price: "150.000 VNĐ + VAT",
              cta: "Đăng ký tác phẩm",
            },
            {
              title: "XÁC THỰC & WATERMARK",
              desc: "Đóng dấu tem “RightStamp Verified” và watermark thẩm mỹ lên tác phẩm số. Xác thực chính xác thời điểm, địa điểm ghi nhận từ thiết bị di động.",
              extra: "Một trong sáu dịch vụ tạo chứng cứ của RightStamp Evidence.",
              price: "Từ 49.000 VNĐ + VAT",
              cta: "Xác thực ngay",
            },
            {
              title: "EVIDENCE PACK",
              desc: "Bộ hồ sơ chứng cứ tranh chấp đóng gói chuẩn pháp lý: hash, timestamp, chứng chỉ, log truy cập và biên bản xác nhận — sẵn sàng nộp cho luật sư hoặc tòa án.",
              extra: "Được hỗ trợ bởi trợ lý AI Righty và mạng lưới luật sư đối tác.",
              price: "Từ 500.000 VNĐ + VAT",
              cta: "Tạo Evidence Pack",
            },
          ].map((plan, index) => (
            <div
              key={plan.title}
              className={`flex flex-col items-center px-6 py-4 text-center md:px-10 ${
                index > 0 ? "border-white/15 md:border-l" : ""
              }`}
            >
              <h3 className="font-display text-2xl text-coral md:text-3xl">{plan.title}</h3>
              <p className="mt-6 leading-relaxed text-white/80">{plan.desc}</p>
              <p className="mt-5 text-sm italic text-white/60">{plan.extra}</p>
              <p className="mt-6 text-lg font-bold text-white">{plan.price}</p>
              <Link
                to="/tinh-nang"
                className="mt-6 w-full max-w-xs rounded-full border border-white/20 bg-black py-3.5 font-bold text-white transition-colors hover:bg-maroon"
              >
                {plan.cta}
              </Link>
              <Link
                to="/tinh-nang"
                className="mt-4 text-sm text-white/70 underline underline-offset-4 hover:text-white"
              >
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  color: "coral" | "maroon" | "royal" | "sun";
}) {
  const map: Record<string, { outer: string; inner: string; text: string }> = {
    coral: { outer: "bg-coral/30", inner: "bg-coral", text: "text-coral" },
    maroon: { outer: "bg-maroon/20", inner: "bg-maroon", text: "text-maroon" },
    royal: { outer: "bg-royal/25", inner: "bg-royal", text: "text-royal" },
    sun: { outer: "bg-sun/40", inner: "bg-sun", text: "text-ink" },
  };
  const style = map[color];
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/80 bg-white p-8 text-center shadow-[0_22px_70px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
      <div className={`relative grid h-20 w-20 place-items-center rounded-full ${style.outer}`}>
        <div
          className={`absolute inset-2 grid place-items-center rounded-full ${style.inner} shadow-md`}
        >
          <Icon size={30} className="text-white" />
        </div>
      </div>
      <h3 className={`mt-6 font-display text-lg leading-snug ${style.text}`}>{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function ArrowDots({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" width="120" height="40" fill="none" className={className} aria-hidden>
      <path
        d="M2 30 C 30 5, 70 5, 110 25"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 6"
        strokeLinecap="round"
      />
      <path
        d="M100 20 L112 25 L104 33"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
