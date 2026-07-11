import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroBg from "@/assets/hero-rightstamp.jpg.asset.json";
import {
  Menu,
  X,
  ShieldCheck,
  Fingerprint,
  QrCode,
  Stamp,
  FileCheck2,
  Bot,
  Upload,
  UploadCloud,
  Barcode,
  Award,
  Headphones,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  Smartphone,
  FolderArchive,
  Wand2,
  ScanSearch,
  PenTool,
  Check,
  MessageCircle,
  FileText,
  Tag,
  Palette,
  Globe,
  Scale,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const NAV = [
  { label: "Giới thiệu", href: "#gioi-thieu" },
  { label: "Tính năng", href: "#tinh-nang" },
  { label: "Cách thức hoạt động", href: "#cach-thuc" },
  { label: "Bảng giá", href: "#bang-gia" },
  { label: "Blog", href: "#blog" },
  { label: "Liên hệ", href: "#lien-he" },
];

function Landing() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="container-x flex items-center justify-between h-16 md:h-20 gap-4">
          {/* LOGO PLACEHOLDER — upload logo sau, thay <div> bằng <img src=... /> */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="h-10 w-10 rounded-full bg-maroon grid place-items-center text-white font-display text-lg">
              R
            </div>
            <span className="font-display text-xl text-maroon tracking-tight">
              RightStamp
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-semibold text-ink hover:text-maroon transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#dang-nhap"
              className="text-sm font-semibold text-ink hover:text-maroon px-3 py-2"
            >
              Đăng nhập
            </a>
            <a
              href="#dang-ky"
              className="text-sm font-bold text-white bg-maroon hover:bg-maroon-deep px-4 py-2.5 rounded-md transition-colors shadow-sm"
            >
              Đăng ký miễn phí
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-ink"
            onClick={() => setOpenMenu((v) => !v)}
            aria-label="Menu"
          >
            {openMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {openMenu && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="container-x py-4 flex flex-col gap-3">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpenMenu(false)}
                  className="text-sm font-semibold text-ink py-2"
                >
                  {n.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <a
                  href="#dang-nhap"
                  className="flex-1 text-center text-sm font-semibold border border-border rounded-md py-2"
                >
                  Đăng nhập
                </a>
                <a
                  href="#dang-ky"
                  className="flex-1 text-center text-sm font-bold text-white bg-maroon rounded-md py-2"
                >
                  Đăng ký miễn phí
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section
        id="gioi-thieu"
        className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#141a24]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(10,14,22,0.85) 0%, rgba(10,14,22,0.55) 45%, rgba(10,14,22,0.25) 100%), url(${heroBg.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-x relative z-10 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/25 px-4 py-1.5 text-xs md:text-sm font-semibold text-white backdrop-blur">
              Công cụ bảo vệ tác phẩm số
            </div>

            <h1 className="mt-6 font-display text-white text-4xl sm:text-5xl md:text-7xl leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
              Đóng dấu vân tay <br className="hidden sm:block" />
              cho từng nét{" "}
              <span className="text-coral">sáng tạo</span> của bạn
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
              RightStamp đồng hành cùng creator Việt — designer, photographer,
              nhà văn, content creator — lưu lại chứng cứ quyền tác giả minh
              bạch, có giá trị pháp lý, để mỗi giọt chất xám đều được ghi nhận
              đúng người, đúng lúc.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#dang-ky"
                className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white font-bold px-6 py-3.5 rounded-md transition-colors shadow-lg"
              >
                Bắt đầu miễn phí
                <ArrowRight size={18} />
              </a>
              <a
                href="#cach-thuc"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-md backdrop-blur transition-colors"
              >
                Tìm hiểu thêm
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-white/80 text-sm">
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

      {/* ================= LÝ DO CHỌN ================= */}
      <section id="tinh-nang" className="py-20 md:py-28 bg-cream">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-maroon font-bold text-sm tracking-widest uppercase">
              Vì sao chọn RightStamp
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl text-ink">
              LÝ DO CREATOR VIỆT TIN DÙNG
            </h2>
            <p className="mt-4 text-muted-foreground">
              Sáu lý do khiến RightStamp trở thành người bạn đồng hành đáng tin
              cậy trong hành trình bảo vệ chất xám của bạn.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {([
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
            ] as const).map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CÁCH THỨC HOẠT ĐỘNG ================= */}
      <section id="cach-thuc" className="py-20 md:py-28 bg-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-maroon font-bold text-sm tracking-widest uppercase">
              Quy trình 3 bước
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl text-maroon">
              CÁCH THỨC HOẠT ĐỘNG
            </h2>
            <p className="mt-4 text-muted-foreground">
              Chỉ ba bước đơn giản để tác phẩm của bạn được bảo vệ toàn diện.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-start relative">
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
            ].map((s, i) => (
              <div key={s.n} className="relative flex flex-col items-center text-center group">
                {i < 2 && (
                  <ArrowDots className="hidden md:block absolute top-16 -right-8 lg:-right-12 text-muted-foreground/50" />
                )}
                <div className="relative">
                  <span className="absolute -top-2 -left-2 z-10 h-8 w-8 rounded-full bg-maroon text-white font-display grid place-items-center shadow-md">
                    {s.n}
                  </span>
                  <div className="h-36 w-36 rounded-full border-2 border-maroon bg-white grid place-items-center transition-all duration-300 group-hover:bg-maroon group-hover:shadow-xl group-hover:shadow-maroon/30 group-hover:scale-105">
                    <s.icon
                      size={52}
                      strokeWidth={1.8}
                      className="text-maroon transition-colors duration-300 group-hover:text-white"
                    />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-xl text-ink">{s.title}</h3>
                <p className="mt-3 text-muted-foreground max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 9. TÍNH NĂNG NỔI BẬT (TABS) ================= */}
      <FeaturesTabsSection />

      {/* ================= 10. RIGHTY AI ================= */}
      <RightyAISection />

      {/* ================= 11. VÌ SAO KHÁC BIỆT ================= */}
      <DifferentiatorsSection />

      {/* ================= PAY PER USE ================= */}
      <section id="bang-gia" className="py-20 md:py-28 bg-ink text-white">
        <div className="container-x">
          <div className="text-center">
            <p className="text-coral font-bold text-sm tracking-widest uppercase">
              Bảng giá linh hoạt
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-6xl">
              TRẢ THEO NHU CẦU SỬ DỤNG
            </h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Không ràng buộc, không phí ẩn — bạn chỉ trả cho những gì thực sự
              dùng.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
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
            ].map((p, i) => (
              <div
                key={p.title}
                className={`px-6 md:px-10 py-4 flex flex-col items-center text-center ${
                  i > 0 ? "md:border-l border-white/15" : ""
                }`}
              >
                <h3 className="font-display text-2xl md:text-3xl text-coral">
                  {p.title}
                </h3>
                <p className="mt-6 text-white/80 leading-relaxed">{p.desc}</p>
                <p className="mt-5 text-white/60 italic text-sm">{p.extra}</p>
                <p className="mt-6 text-white text-lg font-bold">{p.price}</p>
                <a
                  href="#"
                  className="mt-6 w-full max-w-xs bg-black hover:bg-maroon transition-colors border border-white/20 text-white font-bold py-3.5 rounded-full"
                >
                  {p.cta}
                </a>
                <a href="#" className="mt-4 text-white/70 text-sm underline underline-offset-4 hover:text-white">
                  Xem chi tiết
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SOLUTION TAILORED ================= */}
      <section className="py-20 md:py-28 bg-ink text-white">
        <div className="container-x">
          <h2 className="font-display text-center leading-[0.95]">
            <span className="block text-coral text-3xl md:text-5xl">MỘT GIẢI PHÁP</span>
            <span className="block text-white text-4xl md:text-7xl mt-2">
              ĐƯỢC THIẾT KẾ RIÊNG CHO BẠN
            </span>
            <span className="block text-white text-4xl md:text-7xl mt-2">
              DÙ NHU CẦU CỦA BẠN LÀ GÌ
            </span>
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <SolutionCard
              bg="bg-coral"
              titleTop="BẠN MUỐN BẢO VỆ"
              titleBig="TÁC PHẨM CỦA MÌNH?"
              body="Dành cho nhà văn, nhạc sĩ, họa sĩ thị giác, nhiếp ảnh gia, designer, chuyên gia phim và hoạt hình, kiến trúc sư, developer phần mềm hoặc game, content creator,..."
              cta="Gói Cá Nhân"
            />
            <SolutionCard
              bg="bg-sun"
              titleTop="BẠN CẦN BẢO VỆ"
              titleBig="TÀI SẢN TRÍ TUỆ CỦA DOANH NGHIỆP?"
              body="Đăng ký thương hiệu và nội dung của doanh nghiệp: sản phẩm bản quyền, thiết kế, phần mềm, tài liệu kỹ thuật hoặc dự án marketing."
              cta="Gói Doanh Nghiệp"
            />
          </div>

          <div className="mt-6 rounded-2xl bg-royal p-8 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden">
            <div className="absolute top-0 left-6 w-2 h-24 bg-white/40" />
            <h3 className="font-display text-white text-3xl md:text-5xl leading-[0.95]">
              BẠN QUAN TÂM ĐẾN VIỆC <br />
              BẢO VỆ SHTT <br />
              CHO KHÁCH HÀNG <br />
              CỦA MÌNH?
            </h3>
            <div>
              <p className="text-white/95 leading-relaxed">
                Tăng lợi nhuận cho hoạt động tư vấn bằng cách quản lý thương hiệu
                và bản quyền của khách hàng từ một bảng điều khiển duy nhất. Cung
                cấp cho họ cổng tư vấn mang thương hiệu riêng, được vận hành bởi
                RightStamp.
              </p>
              <p className="mt-4 text-white/95 leading-relaxed">
                Dành cho luật sư, trường đại học, đơn vị tư vấn và các tổ chức
                có khách hàng hoặc người dùng.
              </p>
              <a
                href="#"
                className="mt-8 inline-block bg-black hover:bg-maroon-deep transition-colors text-white font-bold px-8 py-4 rounded-full"
              >
                Gói Enterprise
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY ================= */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="container-x">
          <h2 className="font-display text-center text-3xl md:text-5xl leading-tight max-w-4xl mx-auto">
            HƠN 800 TỔ CHỨC & 25.000 CREATOR <br className="hidden md:block" />
            ĐÃ TIN TƯỞNG SỬ DỤNG RIGHTSTAMP
          </h2>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {/* LOGO PLACEHOLDER — upload logo đối tác sau, thay <div> bằng <img /> */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-md border border-white/20 grid place-items-center text-white/40 text-xs font-semibold"
              >
                LOGO {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="lien-he" className="bg-ink text-white/80 pt-20 pb-8">
        <div className="container-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            {/* LOGO PLACEHOLDER — upload logo footer sau */}
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-maroon grid place-items-center text-white font-display">
                R
              </div>
              <span className="font-display text-xl text-white">RightStamp</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              Dấu vân tay bản quyền cho tác phẩm số. Đồng hành cùng creator Việt
              trên hành trình bảo vệ chất xám bằng công nghệ minh bạch và giá
              trị pháp lý.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full border border-white/20 grid place-items-center hover:bg-maroon hover:border-maroon transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Sản phẩm"
            items={["Tính năng", "Bảng giá", "Evidence Pack", "Trợ lý Righty", "API"]}
          />
          <FooterCol
            title="Công ty"
            items={["Giới thiệu", "Blog", "Đối tác", "Tuyển dụng", "Báo chí"]}
          />
          <FooterCol
            title="Hỗ trợ & Pháp lý"
            items={[
              "Trung tâm trợ giúp",
              "Liên hệ",
              "Điều khoản dịch vụ",
              "Chính sách bảo mật",
              "Xử lý tranh chấp",
            ]}
          />
        </div>

        <div className="container-x mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/50">
          <p>© 2026 RightStamp. Bảo lưu mọi quyền.</p>
          <p>hello@rightstamp.vn · Hà Nội, Việt Nam</p>
        </div>
      </footer>

      {/* ================= FLOATING CTA ================= */}
      <a
        href="#dang-ky"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white font-bold px-5 py-3.5 rounded-full shadow-2xl shadow-maroon/40 transition-colors"
      >
        <Headphones size={18} />
        Tư vấn miễn phí
      </a>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

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
  const c = map[color];
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
      <div className={`relative h-20 w-20 rounded-full ${c.outer} grid place-items-center`}>
        <div className={`absolute inset-2 rounded-full ${c.inner} grid place-items-center shadow-md`}>
          <Icon size={30} className="text-white" />
        </div>
      </div>
      <h3 className={`mt-6 font-display text-lg ${c.text} leading-snug`}>{title}</h3>
      <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function SolutionCard({
  bg,
  titleTop,
  titleBig,
  body,
  cta,
}: {
  bg: string;
  titleTop: string;
  titleBig: string;
  body: string;
  cta: string;
}) {
  return (
    <div className={`${bg} rounded-2xl p-8 md:p-10 relative overflow-hidden flex flex-col`}>
      <div className="absolute top-0 left-6 w-2 h-24 bg-white/40" />
      <h3 className="font-display leading-[0.95]">
        <span className="block text-white text-2xl md:text-3xl">{titleTop}</span>
        <span className="block text-ink text-3xl md:text-5xl mt-2">{titleBig}</span>
      </h3>
      <p className="mt-6 text-ink/85 leading-relaxed flex-1">{body}</p>
      <a
        href="#"
        className="mt-8 inline-block self-start bg-black hover:bg-maroon-deep transition-colors text-white font-bold px-8 py-4 rounded-full"
      >
        {cta}
      </a>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-display text-white text-sm tracking-widest uppercase">
        {title}
      </h4>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-white transition-colors">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowDots({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      width="120"
      height="40"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M2 30 C 30 5, 70 5, 110 25"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 6"
        strokeLinecap="round"
      />
      <path d="M100 20 L112 25 L104 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ============================================================
   9. FEATURES TABS SECTION
   ============================================================ */
const FEATURE_TABS = [
  {
    id: "upload",
    icon: UploadCloud,
    label: "Upload tác phẩm",
    title: "Tải lên mọi loại tác phẩm số",
    desc: "Hỗ trợ đa dạng định dạng: ảnh (PNG/JPG/PSD/AI/Procreate), video (MP4/MOV), âm thanh (MP3/WAV), văn bản (PDF/DOCX), thiết kế (poster/logo/brand guideline) và cả file gốc/phác thảo.",
    bullets: [
      "Tên tác phẩm, tác giả, chủ sở hữu",
      "Ngày hoàn thành & mô tả ý tưởng",
      "Quá trình sáng tạo, tuyên bố quyền",
    ],
    visual: "upload",
  },
  {
    id: "fingerprint",
    icon: Fingerprint,
    label: "Dấu vân tay số",
    title: "Tạo dấu vân tay số duy nhất",
    desc: "Hệ thống tự động sinh mã định danh, hash SHA-256, timestamp, QR code, metadata và lưu version history đầy đủ cho mỗi lần cập nhật.",
    bullets: [
      "Mã định danh RS-2026-000128",
      "Hash SHA-256 + Timestamp UTC",
      "QR Code + Version History",
    ],
    visual: "fingerprint",
  },
  {
    id: "watermark",
    icon: Stamp,
    label: "Watermark",
    title: "Watermark thẩm mỹ, không phá hỏng tác phẩm",
    desc: "Hai loại watermark linh hoạt: watermark nhìn thấy (logo/tên tác giả đè lên ảnh) và watermark ẩn/metadata (gắn ngầm vào file để truy vết vi phạm sau này).",
    bullets: [
      "Watermark nhìn thấy tuỳ biến",
      "Metadata ẩn không thể xóa dễ dàng",
      "Tem 'RightStamp Verified' đẹp mắt",
    ],
    visual: "watermark",
  },
  {
    id: "certificate",
    icon: Award,
    label: "Giấy chứng nhận",
    title: "Chứng chỉ bản quyền chuẩn văn bằng",
    desc: "Mỗi tác phẩm được cấp một giấy chứng nhận đầy đủ thông tin: tên tác phẩm, tác giả, mã định danh, ngày xác thực, hash file, QR xác minh và tuyên bố quyền.",
    bullets: [
      "Thiết kế khung viền trang trọng",
      "Xuất PDF chất lượng in ấn",
      "Chia sẻ link công khai dễ dàng",
    ],
    visual: "certificate",
  },
  {
    id: "verify",
    icon: Smartphone,
    label: "Trang xác minh QR",
    title: "Quét QR — Xác minh trong 2 giây",
    desc: "Bất kỳ ai quét mã QR đều thấy thông tin tác phẩm, tác giả, ngày xác thực, trạng thái (Verified / Disputed / Removed) cùng điều khoản sử dụng và nút liên hệ cấp phép.",
    bullets: [
      "Badge trạng thái xanh/vàng/đỏ",
      "Giao diện tối ưu di động",
      "Nút 'Yêu cầu cấp phép' tích hợp",
    ],
    visual: "verify",
  },
  {
    id: "evidence",
    icon: FolderArchive,
    label: "Evidence Pack",
    title: "Bộ hồ sơ chứng cứ tranh chấp",
    desc: "Khi bị vi phạm, chỉ một cú click để xuất bộ hồ sơ đầy đủ giá trị pháp lý: file gốc, hash, timestamp, phác thảo, certificate, ảnh chụp vi phạm, bảng so sánh và tuyên bố quyền tác giả.",
    bullets: [
      "File gốc + phác thảo + certificate",
      "Ảnh chụp vi phạm + bảng so sánh",
      "Tuyên bố quyền tác giả chuẩn form",
    ],
    visual: "evidence",
  },
] as const;

function FeaturesTabsSection() {
  const [active, setActive] = useState<(typeof FEATURE_TABS)[number]["id"]>("upload");
  const current = FEATURE_TABS.find((t) => t.id === active)!;

  return (
    <section id="tinh-nang-noi-bat" className="py-20 md:py-28 bg-cream">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-maroon font-bold text-sm tracking-widest uppercase">
            6 Module cốt lõi
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl text-ink">
            TÍNH NĂNG CỦA RIGHTSTAMP
          </h2>
          <p className="mt-4 text-muted-foreground">
            Click từng tab để khám phá cách RightStamp bảo vệ tác phẩm của bạn.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {FEATURE_TABS.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`group flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  isActive
                    ? "bg-maroon border-maroon text-white shadow-lg shadow-maroon/25"
                    : "bg-white border-border text-ink hover:border-maroon/50"
                }`}
              >
                <Icon size={26} strokeWidth={2} />
                <span className="text-xs md:text-sm font-bold text-center leading-tight">
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 bg-white rounded-3xl border border-border shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-maroon font-bold text-xs uppercase tracking-widest">
              <current.icon size={16} />
              {current.label}
            </div>
            <h3 className="mt-4 font-display text-2xl md:text-4xl text-ink leading-tight">
              {current.title}
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {current.desc}
            </p>
            <ul className="mt-6 space-y-3">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 h-6 w-6 rounded-full bg-maroon/10 text-maroon grid place-items-center shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-ink">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-maroon/5 via-cream to-coral/10 p-8 md:p-12 grid place-items-center border-t lg:border-t-0 lg:border-l border-border">
            <FeatureVisual kind={current.visual} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureVisual({ kind }: { kind: string }) {
  if (kind === "upload") {
    return (
      <div className="w-full max-w-md space-y-4">
        <div className="border-2 border-dashed border-maroon/40 rounded-2xl p-8 bg-white text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-maroon/10 grid place-items-center text-maroon">
            <UploadCloud size={28} />
          </div>
          <p className="mt-3 font-bold text-ink">Kéo & thả tệp vào đây</p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG · JPG · PSD · MP4 · MP3 · PDF · DOCX
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 space-y-3">
          <MockField label="Tên tác phẩm" value="Bộ tranh 'Hà Nội mùa thu'" />
          <MockField label="Tác giả" value="Nguyễn Minh Anh" />
          <MockField label="Ngày hoàn thành" value="12/03/2026" />
        </div>
      </div>
    );
  }
  if (kind === "fingerprint") {
    return (
      <div className="w-full max-w-md bg-white rounded-2xl border-2 border-maroon/30 p-6 shadow-lg relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-maroon to-transparent animate-pulse" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Mã định danh
            </p>
            <p className="font-display text-xl text-maroon mt-1">RS-2026-000128</p>
          </div>
          <div className="h-16 w-16 rounded-lg bg-ink grid place-items-center">
            <QrCode size={40} className="text-white" />
          </div>
        </div>
        <div className="mt-5 space-y-2 text-xs">
          <MockRow label="SHA-256" value="a3f9…82b1c" />
          <MockRow label="Timestamp" value="2026-03-12T09:41:22Z" />
          <MockRow label="Version" value="v1.0.0" />
          <MockRow label="Status" value="✓ Verified" valueColor="text-green-600" />
        </div>
      </div>
    );
  }
  if (kind === "watermark") {
    return (
      <div className="w-full max-w-md grid grid-cols-2 gap-3">
        <div className="rounded-xl overflow-hidden border border-border bg-gradient-to-br from-orange-300 to-pink-400 aspect-square grid place-items-center relative">
          <span className="text-white/90 font-bold text-xs absolute top-2 left-2 bg-black/30 px-2 py-0.5 rounded">
            GỐC
          </span>
          <ImageIcon size={40} className="text-white/70" />
        </div>
        <div className="rounded-xl overflow-hidden border border-border bg-gradient-to-br from-orange-300 to-pink-400 aspect-square grid place-items-center relative">
          <span className="text-white/90 font-bold text-xs absolute top-2 left-2 bg-maroon px-2 py-0.5 rounded">
            ĐÃ WATERMARK
          </span>
          <ImageIcon size={40} className="text-white/70" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="rotate-[-20deg] text-white/60 font-display text-lg tracking-widest">
              © RIGHTSTAMP
            </span>
          </div>
          <div className="absolute bottom-2 right-2 h-8 w-8 rounded bg-white grid place-items-center">
            <QrCode size={20} className="text-ink" />
          </div>
        </div>
      </div>
    );
  }
  if (kind === "certificate") {
    return (
      <div className="w-full max-w-md bg-white rounded-lg border-4 border-double border-maroon p-6 text-center shadow-xl">
        <p className="font-display text-maroon text-xs tracking-[0.3em]">
          RIGHTSTAMP CERTIFICATE
        </p>
        <div className="mt-3 h-px bg-maroon/30" />
        <p className="mt-4 text-xs text-muted-foreground uppercase">
          Chứng nhận tác phẩm
        </p>
        <p className="font-display text-xl text-ink mt-1">
          "Hà Nội mùa thu"
        </p>
        <p className="mt-2 text-sm text-ink">Nguyễn Minh Anh</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-left">
          <MockRow label="Mã" value="RS-2026-000128" />
          <MockRow label="Ngày" value="12/03/2026" />
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-3 items-end">
          <p className="text-[10px] text-muted-foreground leading-tight text-left">
            Hash SHA-256: a3f9…82b1c<br />
            Verified by RightStamp — Xác nhận quyền tác giả theo Luật SHTT Việt Nam.
          </p>
          <div className="h-14 w-14 rounded bg-ink grid place-items-center">
            <QrCode size={40} className="text-white" />
          </div>
        </div>
      </div>
    );
  }
  if (kind === "verify") {
    return (
      <div className="w-[260px] rounded-[2rem] border-[8px] border-ink bg-white overflow-hidden shadow-2xl">
        <div className="bg-ink text-white text-center py-2 text-xs">
          verify.rightstamp.vn
        </div>
        <div className="p-4 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <Check size={12} strokeWidth={3} /> VERIFIED
          </div>
          <div>
            <p className="font-display text-ink text-base leading-tight">
              "Hà Nội mùa thu"
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Nguyễn Minh Anh
            </p>
          </div>
          <div className="h-24 w-24 mx-auto rounded bg-ink grid place-items-center">
            <QrCode size={72} className="text-white" />
          </div>
          <div className="text-[11px] space-y-1 text-ink">
            <MockRow label="Xác thực" value="12/03/2026" />
            <MockRow label="Mã" value="RS-2026-000128" />
          </div>
          <button className="w-full bg-maroon text-white text-xs font-bold py-2 rounded-md">
            Yêu cầu cấp phép
          </button>
        </div>
      </div>
    );
  }
  if (kind === "evidence") {
    return (
      <div className="w-full max-w-md bg-white rounded-2xl border border-border p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-maroon/10 text-maroon grid place-items-center">
            <FolderArchive size={24} />
          </div>
          <div>
            <p className="font-display text-lg text-ink">Evidence Pack</p>
            <p className="text-xs text-muted-foreground">RS-2026-000128 · 8 tài liệu</p>
          </div>
        </div>
        <ul className="mt-5 space-y-2 text-sm">
          {[
            "File gốc tác phẩm",
            "Hash SHA-256 + Timestamp",
            "Bản phác thảo, file layer",
            "Certificate PDF",
            "Ảnh chụp bên vi phạm",
            "Bảng so sánh chi tiết",
            "Tuyên bố quyền tác giả",
          ].map((i) => (
            <li key={i} className="flex items-center gap-2 text-ink">
              <Check size={16} className="text-green-600 shrink-0" strokeWidth={3} />
              {i}
            </li>
          ))}
        </ul>
        <button className="mt-6 w-full bg-maroon hover:bg-maroon-deep transition-colors text-white font-bold py-3 rounded-lg shadow">
          Xuất hồ sơ chứng cứ
        </button>
      </div>
    );
  }
  return null;
}

function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="text-sm text-ink font-medium mt-0.5">{value}</p>
    </div>
  );
}
function MockRow({
  label,
  value,
  valueColor = "text-ink",
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="flex justify-between gap-2 border-b border-dashed border-border pb-1">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono ${valueColor}`}>{value}</span>
    </div>
  );
}

/* ============================================================
   10. RIGHTY AI SECTION
   ============================================================ */
const RIGHTY_CARDS = [
  {
    icon: Wand2,
    title: "AI Smart Classifier",
    desc: "Tự động phân tích tác phẩm và gợi ý loại quyền được bảo hộ (quyền tác giả, nhãn hiệu, kiểu dáng công nghiệp...).",
    demo: {
      user: "Vừa upload một bộ nhận diện thương hiệu cà phê.",
      righty:
        "Tác phẩm của bạn sẽ được bảo hộ tự động dưới dạng Quyền tác giả (mỹ thuật ứng dụng). Ngoài ra, mình đề xuất đăng ký thêm Nhãn hiệu cho logo và Kiểu dáng công nghiệp cho bao bì để bảo vệ toàn diện hơn.",
    },
  },
  {
    icon: ScanSearch,
    title: "AI Metadata Generator",
    desc: "Đọc file bằng Vision AI để gợi ý từ khóa, mô tả sản phẩm, tự điền các trường thông tin — bạn khỏi gõ tay.",
    demo: {
      user: "Bạn điền metadata giúp mình bức ảnh này nhé.",
      righty:
        "Đã phân tích xong! Gợi ý: 'Ảnh chân dung ánh sáng ngược, tông ấm, chủ đề phụ nữ Việt Nam, phong cách documentary'. Từ khóa: chân dung, ánh sáng, tone ấm, người Việt, tài liệu.",
    },
  },
  {
    icon: ShieldCheck,
    title: "Phân tích vi phạm",
    desc: "Dán link hoặc upload ảnh nghi vi phạm — AI so sánh độ tương đồng với database và xuất báo cáo dễ hiểu.",
    demo: {
      user: "Kiểm tra giúp mình link Shopee này có copy tác phẩm không.",
      righty:
        "Mức độ tương đồng: 87%. Bên bán sử dụng lại thiết kế của bạn với chỉnh sửa nhẹ về màu sắc. Đây có dấu hiệu vi phạm quyền tác giả. Bạn có muốn mình soạn email cảnh báo không?",
    },
  },
  {
    icon: PenTool,
    title: "AI Legal Writer",
    desc: "Dựa trên Evidence Pack, AI soạn email nhắc nhở, cảnh báo bản quyền và đơn kháng nghị DMCA chuẩn form từng nền tảng.",
    demo: {
      user: "Soạn giúp mình đơn takedown gửi TikTok.",
      righty:
        "Đã tạo mẫu 'DMCA Takedown Notice' theo form chính thức của TikTok, trích dẫn Điều 28 Luật SHTT Việt Nam và đính kèm Evidence Pack RS-2026-000128. Bạn xem qua trước khi gửi nhé!",
    },
  },
] as const;

function RightyAISection() {
  const [openDemo, setOpenDemo] = useState<number | null>(null);
  return (
    <section
      id="righty"
      className="py-20 md:py-28 relative overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(1000px 500px at 80% 20%, rgba(139,30,30,0.55), transparent 60%), radial-gradient(800px 400px at 10% 80%, rgba(78,86,255,0.4), transparent 60%), linear-gradient(180deg, #0b0f1a 0%, #14091a 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-center gap-8">
          <div className="mx-auto lg:mx-0">
            <div className="relative h-32 w-32 rounded-3xl bg-gradient-to-br from-maroon to-royal grid place-items-center shadow-2xl shadow-maroon/40">
              <Bot size={64} className="text-white" />
              <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-green-500 border-4 border-[#0b0f1a]" />
            </div>
          </div>
          <div>
            <p className="text-coral font-bold text-sm tracking-widest uppercase">
              Trợ lý AI
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl leading-tight">
              RIGHTY — TRỢ LÝ PHÁP LÝ SỐ CHO CREATOR
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl">
              Righty đồng hành cùng bạn từ lúc đăng tải tác phẩm đến khi xử lý
              tranh chấp — mọi thứ diễn ra ngay trong giao diện, bằng tiếng Việt
              dễ hiểu.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {RIGHTY_CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="group relative rounded-2xl bg-white/[0.04] border border-white/10 hover:border-coral/50 p-6 md:p-8 backdrop-blur transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-coral to-maroon grid place-items-center shrink-0 shadow-lg">
                    <Icon size={26} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl text-white">{c.title}</h3>
                    <p className="mt-2 text-white/70 text-sm leading-relaxed">
                      {c.desc}
                    </p>
                    <button
                      onClick={() => setOpenDemo(i)}
                      className="mt-4 inline-flex items-center gap-1.5 text-coral hover:text-white text-sm font-bold"
                    >
                      Xem ví dụ
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {openDemo !== null && (
        <RightyDemoModal
          card={RIGHTY_CARDS[openDemo]}
          onClose={() => setOpenDemo(null)}
        />
      )}
    </section>
  );
}

function RightyDemoModal({
  card,
  onClose,
}: {
  card: (typeof RIGHTY_CARDS)[number];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white text-ink rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-maroon to-royal grid place-items-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm">Righty</p>
              <p className="text-[11px] text-muted-foreground">{card.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full hover:bg-muted grid place-items-center"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5 space-y-3 bg-cream/40 max-h-[70vh] overflow-y-auto">
          <div className="flex justify-end">
            <div className="bg-maroon text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] text-sm shadow">
              {card.demo.user}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-maroon to-royal grid place-items-center shrink-0">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] text-sm shadow-sm">
              {card.demo.righty}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   11. DIFFERENTIATORS SECTION
   ============================================================ */
const DIFFERENTIATORS = [
  {
    icon: FileText,
    problem: "Nhiều creator không hiểu luật SHTT",
    solution:
      "Giao diện đơn giản, có checklist 'tác phẩm của bạn được bảo hộ gì?'",
  },
  {
    icon: Globe,
    problem: "Công cụ quốc tế khó dùng với người Việt",
    solution:
      "Giao diện tiếng Việt, ví dụ thực tế Việt Nam, hướng dẫn theo Luật SHTT Việt Nam",
  },
  {
    icon: Scale,
    problem:
      "Nhiều nền tảng chỉ chứng nhận, không hướng dẫn xử lý tranh chấp",
    solution: "Có Evidence Pack và mẫu email/đơn yêu cầu gỡ bỏ nội dung",
  },
  {
    icon: Palette,
    problem: "Watermark thường xấu, làm hỏng tác phẩm",
    solution:
      "Cho phép chọn watermark nhẹ, QR đẹp, tem xác thực thẩm mỹ",
  },
  {
    icon: Tag,
    problem: "Không biết tác phẩm được bảo hộ theo quyền nào",
    solution:
      "RightStamp tự phân loại: quyền tác giả, nhãn hiệu, kiểu dáng, bí mật kinh doanh",
  },
  {
    icon: MessageCircle,
    problem: "Creator muốn bán/tặng/cấp phép tác phẩm",
    solution:
      "Có trang hồ sơ công khai và nút 'Yêu cầu cấp phép' tích hợp sẵn",
  },
];

function DifferentiatorsSection() {
  return (
    <section id="khac-biet" className="py-20 md:py-28 bg-white">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-maroon font-bold text-sm tracking-widest uppercase">
            Điểm khác biệt
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl text-ink">
            ĐIỂM KHÁC BIỆT CỦA RIGHTSTAMP
          </h2>
          <p className="mt-4 text-muted-foreground">
            Chúng tôi hiểu creator Việt cần gì — và giải quyết đúng những vấn
            đề đó.
          </p>
        </div>

        {/* Desktop table */}
        <div className="mt-12 hidden md:block rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="grid grid-cols-[1fr_1fr] bg-ink text-white font-display text-sm tracking-widest">
            <div className="p-5 uppercase">Vấn đề creator gặp phải</div>
            <div className="p-5 uppercase bg-maroon">
              RightStamp giải quyết như thế nào
            </div>
          </div>
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={i}
                className={`grid grid-cols-[1fr_1fr] ${
                  i % 2 === 0 ? "bg-white" : "bg-cream/60"
                }`}
              >
                <div className="p-6 flex items-start gap-3 border-r border-border">
                  <span className="mt-0.5 h-9 w-9 rounded-lg bg-ink/5 text-ink grid place-items-center shrink-0">
                    <Icon size={18} />
                  </span>
                  <p className="text-ink">{d.problem}</p>
                </div>
                <div className="p-6 flex items-start gap-3">
                  <span className="mt-0.5 h-9 w-9 rounded-lg bg-maroon/10 text-maroon grid place-items-center shrink-0">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <p className="text-ink font-medium">{d.solution}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile cards */}
        <div className="mt-10 md:hidden space-y-4">
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="h-9 w-9 rounded-lg bg-ink/5 text-ink grid place-items-center shrink-0">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold">
                      Vấn đề
                    </p>
                    <p className="text-ink mt-1">{d.problem}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-dashed border-border flex items-start gap-3">
                  <span className="h-9 w-9 rounded-lg bg-maroon/10 text-maroon grid place-items-center shrink-0">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-maroon font-bold">
                      RightStamp
                    </p>
                    <p className="text-ink font-medium mt-1">{d.solution}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
