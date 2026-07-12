import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Facebook, Youtube, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { AuthModal, UserAccountMenu } from "@/components/rightstamp-interactive";
import { RightyAssistantWidget } from "@/components/righty-ai-section";
import {
  clearRightStampSession,
  readRightStampSession,
  type AuthMode,
  type AuthUser,
} from "@/lib/rightstamp-auth";

type SiteLayoutContext = {
  authUser: AuthUser | null;
  openAuth: (mode: AuthMode) => void;
};

type SiteLayoutProps = {
  children: ReactNode | ((context: SiteLayoutContext) => ReactNode);
};

const NAV = [
  { label: "Giới thiệu", to: "/" },
  { label: "Tính năng", to: "/tinh-nang" },
  { label: "Cách thức hoạt động", href: "/#cach-thuc" },
  { label: "Bảng giá", to: "/bang-gia" },
  { label: "Blog", to: "/blog" },
  { label: "Liên hệ", href: "#lien-he" },
] as const;

export function SiteLayout({ children }: SiteLayoutProps) {
  const location = useLocation();
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

  const context = { authUser, openAuth };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-maroon font-display text-lg text-white">
              R
            </div>
            <span className="font-display text-xl tracking-tight text-maroon">RightStamp</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                activePath={location.pathname}
                onClick={() => setOpenMenu(false)}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {authUser ? (
              <UserAccountMenu user={authUser} onLogout={handleLogout} />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuth("login")}
                  className="px-3 py-2 text-sm font-semibold text-ink transition-colors hover:text-maroon"
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={() => openAuth("register")}
                  className="rounded-md bg-maroon px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-maroon-deep"
                >
                  Đăng ký miễn phí
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            className="p-2 text-ink lg:hidden"
            onClick={() => setOpenMenu((value) => !value)}
            aria-label="Menu"
          >
            {openMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {openMenu && (
          <div className="border-t border-border bg-white lg:hidden">
            <div className="container-x flex flex-col gap-3 py-4">
              {NAV.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  activePath={location.pathname}
                  onClick={() => setOpenMenu(false)}
                  mobile
                />
              ))}
              <div className="flex gap-2 pt-2">
                {authUser ? (
                  <>
                    <Link
                      to="/tinh-nang"
                      onClick={() => setOpenMenu(false)}
                      className="flex-1 rounded-md border border-border py-2 text-center text-sm font-semibold"
                    >
                      Tác phẩm của tôi
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenu(false);
                        handleLogout();
                      }}
                      className="flex-1 rounded-md bg-maroon py-2 text-center text-sm font-bold text-white"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => openAuth("login")}
                      className="flex-1 rounded-md border border-border py-2 text-center text-sm font-semibold"
                    >
                      Đăng nhập
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuth("register")}
                      className="flex-1 rounded-md bg-maroon py-2 text-center text-sm font-bold text-white"
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

      {typeof children === "function" ? children(context) : children}

      <Footer />
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

function NavItem({
  item,
  activePath,
  onClick,
  mobile,
}: {
  item: (typeof NAV)[number];
  activePath: string;
  onClick: () => void;
  mobile?: boolean;
}) {
  const isRoute = "to" in item;
  const isActive = isRoute && activePath === item.to;
  const className = [
    mobile ? "py-2 text-sm" : "text-sm",
    "font-semibold transition-colors",
    isActive
      ? "text-maroon underline decoration-2 underline-offset-8"
      : "text-ink hover:text-maroon",
  ].join(" ");

  if (isRoute) {
    return (
      <Link to={item.to} onClick={onClick} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} onClick={onClick} className={className}>
      {item.label}
    </a>
  );
}

function Footer() {
  return (
    <footer id="lien-he" className="bg-ink pt-20 pb-8 text-white/80">
      <div className="container-x grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-maroon font-display text-white">
              R
            </div>
            <span className="font-display text-xl text-white">RightStamp</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Dấu vân tay bản quyền cho tác phẩm số. Đồng hành cùng creator Việt trên hành trình bảo
            vệ chất xám bằng công nghệ minh bạch và giá trị pháp lý.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Youtube, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-maroon hover:bg-maroon"
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

      <div className="container-x mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
        <p>© 2026 RightStamp. Bảo lưu mọi quyền.</p>
        <p>hello@rightstamp.vn · Tp.HCM, Việt Nam · Dự án của sinh viên Trường Đại học Ngoại Thương phân hiệu Tp.HCM</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-display text-sm uppercase tracking-widest text-white">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="transition-colors hover:text-white">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
