import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AuthModal,
  InteractiveFeaturesSection,
  TailoredSolutionsSection,
  UserAccountMenu,
} from "@/components/rightstamp-interactive";
import { RightyAssistantWidget } from "@/components/righty-ai-section";
import { TrustedWorksSection } from "@/components/trusted-works-section";
import {
  clearRightStampSession,
  readRightStampSession,
  type AuthMode,
  type AuthUser,
} from "@/lib/rightstamp-auth";
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
  Barcode,
  Award,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  ArrowRight,
  Sparkles,
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
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setAuthUser(readRightStampSession());
  }, []);

  function openAuth(mode: AuthMode) {
    setAuthMode(mode);
    setOpenMenu(false);
  }

  function handleLogout() {
    clearRightStampSession();
    setAuthUser(null);
  }

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
            <span className="font-display text-xl text-maroon tracking-tight">RightStamp</span>
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
            {authUser ? (
              <UserAccountMenu user={authUser} onLogout={handleLogout} />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuth("login")}
                  className="text-sm font-semibold text-ink hover:text-maroon px-3 py-2"
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={() => openAuth("register")}
                  className="text-sm font-bold text-white bg-maroon hover:bg-maroon-deep px-4 py-2.5 rounded-md transition-colors shadow-sm"
                >
                  Đăng ký miễn phí
                </button>
              </>
            )}
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
                {authUser ? (
                  <>
                    <a
                      href="#tinh-nang-noi-bat"
                      onClick={() => setOpenMenu(false)}
                      className="flex-1 text-center text-sm font-semibold border border-border rounded-md py-2"
                    >
                      Tác phẩm của tôi
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenu(false);
                        handleLogout();
                      }}
                      className="flex-1 text-center text-sm font-bold text-white bg-maroon rounded-md py-2"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => openAuth("login")}
                      className="flex-1 text-center text-sm font-semibold border border-border rounded-md py-2"
                    >
                      Đăng nhập
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuth("register")}
                      className="flex-1 text-center text-sm font-bold text-white bg-maroon rounded-md py-2"
                    >
                      Đăng ký miễn phí
                    </button>
                  </>
                )}
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
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.62) 42%, rgba(0,0,0,0.42) 100%), url('/images/hero-bg.jpg')",
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
              cho từng nét <span className="text-coral">sáng tạo</span> của bạn
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
              RightStamp đồng hành cùng creator Việt — designer, photographer, nhà văn, content
              creator — lưu lại chứng cứ quyền tác giả minh bạch, có giá trị pháp lý, để mỗi giọt
              chất xám đều được ghi nhận đúng người, đúng lúc.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  if (authUser) {
                    document.getElementById("tinh-nang-noi-bat")?.scrollIntoView({
                      behavior: "smooth",
                    });
                    return;
                  }
                  openAuth("register");
                }}
                className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white font-bold px-6 py-3.5 rounded-md transition-colors shadow-lg"
              >
                {authUser ? "Vào workspace" : "Bắt đầu miễn phí"}
                <ArrowRight size={18} />
              </button>
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
              Sáu lý do khiến RightStamp trở thành người bạn đồng hành đáng tin cậy trong hành trình
              bảo vệ chất xám của bạn.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            ).map((f) => (
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
      <InteractiveFeaturesSection user={authUser} requestAuth={(mode) => openAuth(mode)} />

      {/* ================= 11. VÌ SAO KHÁC BIỆT ================= */}
      <DifferentiatorsSection />

      {/* ================= PAY PER USE ================= */}
      <section id="bang-gia" className="py-20 md:py-28 bg-ink text-white">
        <div className="container-x">
          <div className="text-center">
            <p className="text-coral font-bold text-sm tracking-widest uppercase">
              Bảng giá linh hoạt
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-6xl">TRẢ THEO NHU CẦU SỬ DỤNG</h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Không ràng buộc, không phí ẩn — bạn chỉ trả cho những gì thực sự dùng.
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
                <h3 className="font-display text-2xl md:text-3xl text-coral">{p.title}</h3>
                <p className="mt-6 text-white/80 leading-relaxed">{p.desc}</p>
                <p className="mt-5 text-white/60 italic text-sm">{p.extra}</p>
                <p className="mt-6 text-white text-lg font-bold">{p.price}</p>
                <a
                  href="#"
                  className="mt-6 w-full max-w-xs bg-black hover:bg-maroon transition-colors border border-white/20 text-white font-bold py-3.5 rounded-full"
                >
                  {p.cta}
                </a>
                <a
                  href="#"
                  className="mt-4 text-white/70 text-sm underline underline-offset-4 hover:text-white"
                >
                  Xem chi tiết
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SOLUTION TAILORED ================= */}
      <TailoredSolutionsSection />

      {/* ================= TRUSTED BY ================= */}
      <TrustedWorksSection />

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
              Dấu vân tay bản quyền cho tác phẩm số. Đồng hành cùng creator Việt trên hành trình bảo
              vệ chất xám bằng công nghệ minh bạch và giá trị pháp lý.
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

      <RightyAssistantWidget />

      <AuthModal
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthMode(null)}
        onSuccess={setAuthUser}
      />
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
        <div
          className={`absolute inset-2 rounded-full ${c.inner} grid place-items-center shadow-md`}
        >
          <Icon size={30} className="text-white" />
        </div>
      </div>
      <h3 className={`mt-6 font-display text-lg ${c.text} leading-snug`}>{title}</h3>
      <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-display text-white text-sm tracking-widest uppercase">{title}</h4>
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

/* ============================================================
   11. DIFFERENTIATORS SECTION
   ============================================================ */
const DIFFERENTIATORS = [
  {
    icon: FileText,
    problem: "Nhiều creator không hiểu luật SHTT",
    solution: "Giao diện đơn giản, có checklist 'tác phẩm của bạn được bảo hộ gì?'",
  },
  {
    icon: Globe,
    problem: "Công cụ quốc tế khó dùng với người Việt",
    solution: "Giao diện tiếng Việt, ví dụ thực tế Việt Nam, hướng dẫn theo Luật SHTT Việt Nam",
  },
  {
    icon: Scale,
    problem: "Nhiều nền tảng chỉ chứng nhận, không hướng dẫn xử lý tranh chấp",
    solution: "Có Evidence Pack và mẫu email/đơn yêu cầu gỡ bỏ nội dung",
  },
  {
    icon: Palette,
    problem: "Watermark thường xấu, làm hỏng tác phẩm",
    solution: "Cho phép chọn watermark nhẹ, QR đẹp, tem xác thực thẩm mỹ",
  },
  {
    icon: Tag,
    problem: "Không biết tác phẩm được bảo hộ theo quyền nào",
    solution: "RightStamp tự phân loại: quyền tác giả, nhãn hiệu, kiểu dáng, bí mật kinh doanh",
  },
  {
    icon: MessageCircle,
    problem: "Creator muốn bán/tặng/cấp phép tác phẩm",
    solution: "Có trang hồ sơ công khai và nút 'Yêu cầu cấp phép' tích hợp sẵn",
  },
];

function DifferentiatorsSection() {
  return (
    <section id="khac-biet" className="py-20 md:py-28 bg-white">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-maroon font-bold text-sm tracking-widest uppercase">Điểm khác biệt</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl text-ink">
            ĐIỂM KHÁC BIỆT CỦA RIGHTSTAMP
          </h2>
          <p className="mt-4 text-muted-foreground">
            Chúng tôi hiểu creator Việt cần gì — và giải quyết đúng những vấn đề đó.
          </p>
        </div>

        {/* Desktop table */}
        <div className="mt-12 hidden md:block rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="grid grid-cols-[1fr_1fr] bg-ink text-white font-display text-sm tracking-widest">
            <div className="p-5 uppercase">Vấn đề creator gặp phải</div>
            <div className="p-5 uppercase bg-maroon">RightStamp giải quyết như thế nào</div>
          </div>
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={i}
                className={`grid grid-cols-[1fr_1fr] ${i % 2 === 0 ? "bg-white" : "bg-cream/60"}`}
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
              <div key={i} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
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
