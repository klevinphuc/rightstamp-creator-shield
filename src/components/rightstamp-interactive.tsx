import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  ChevronDown,
  Check,
  Download,
  Eye,
  File as FileIcon,
  FileArchive,
  FileAudio,
  FileCheck2,
  FileImage,
  FileText,
  FileVideo,
  Fingerprint,
  FolderArchive,
  Image as ImageIcon,
  Loader2,
  Lock,
  LogOut,
  Mail,
  QrCode,
  ShieldCheck,
  Smartphone,
  Stamp,
  UploadCloud,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  persistSession,
  readUsers,
  saveRightStampCurrentWork,
  saveWorkSnapshot,
  toAuthUser,
  writeUsers,
  type AuthMode,
  type AuthUser,
  type StoredUser,
} from "@/lib/rightstamp-auth";

type ArtworkState = {
  fileName: string;
  fileType: string;
  fileSize: number;
  previewUrl: string;
  previewDataUrl: string;
  isImage: boolean;
  title: string;
  author: string;
  owner: string;
  completedDate: string;
  description: string;
  rightsStatement: string;
};

type FingerprintState = {
  id: string;
  hash: string;
  timestamp: string;
  qrDataUrl: string;
  verifyUrl: string;
};

type ModuleId = "upload" | "fingerprint" | "watermark" | "certificate" | "verify" | "evidence";

type WatermarkPosition = "top-left" | "top-right" | "center" | "bottom-left" | "bottom-right";
type WatermarkMode = "text" | "seal" | "both";

type WorkspaceDraft = {
  active: ModuleId;
  artwork: ArtworkState;
  fingerprint: FingerprintState | null;
  watermark: {
    opacity: number;
    position: WatermarkPosition;
    mode: WatermarkMode;
    text: string;
  };
};

const WORKSPACE_DRAFT_KEY = "rightstamp_workspace_draft_v1";

const initialArtwork: ArtworkState = {
  fileName: "",
  fileType: "",
  fileSize: 0,
  previewUrl: "",
  previewDataUrl: "",
  isImage: false,
  title: "",
  author: "",
  owner: "",
  completedDate: "",
  description: "",
  rightsStatement:
    "Tôi xác nhận là tác giả/chủ sở hữu hợp pháp và yêu cầu RightStamp ghi nhận chứng cứ quyền tác giả cho tác phẩm này.",
};

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-maroon focus:ring-2 focus:ring-maroon/15";
const labelClass = "text-xs font-bold uppercase tracking-widest text-muted-foreground";

export function AuthModal({
  mode,
  onModeChange,
  onClose,
  onSuccess,
}: {
  mode: AuthMode | null;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
}) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setErrors({});
    setNotice("");
  }, [mode]);

  if (!mode) return null;

  const isLogin = mode === "login";

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!isValidEmail(loginForm.email)) nextErrors.email = "Email chưa đúng định dạng.";
    if (!loginForm.password) nextErrors.password = "Vui lòng nhập mật khẩu.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const user = readUsers().find(
      (item) =>
        item.email.toLowerCase() === loginForm.email.trim().toLowerCase() &&
        item.password === loginForm.password,
    );
    if (!user) {
      setErrors({
        form: "Không tìm thấy tài khoản hoặc mật khẩu chưa đúng. Hãy đăng ký demo trước.",
      });
      return;
    }

    persistSession(user, loginForm.remember);
    onSuccess(toAuthUser(user));
    onClose();
  }

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!registerForm.name.trim()) nextErrors.name = "Vui lòng nhập họ tên.";
    if (!isValidEmail(registerForm.email)) nextErrors.email = "Email chưa đúng định dạng.";
    if (registerForm.password.length < 6) {
      nextErrors.password = "Mật khẩu cần tối thiểu 6 ký tự.";
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      nextErrors.confirmPassword = "Mật khẩu xác nhận chưa khớp.";
    }
    if (!registerForm.agree) nextErrors.agree = "Bạn cần đồng ý điều khoản.";

    const users = readUsers();
    const normalizedEmail = registerForm.email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      nextErrors.email = "Email này đã được đăng ký.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const user: StoredUser = {
      id: `user-${Date.now()}`,
      name: registerForm.name.trim(),
      email: normalizedEmail,
      password: registerForm.password,
      createdAt: new Date().toISOString(),
    };
    writeUsers([...users, user]);
    persistSession(user, true);
    onSuccess(toAuthUser(user));
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[120] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white text-ink shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-maroon">
              RightStamp Account
            </p>
            <h2 className="mt-1 font-display text-2xl leading-tight tracking-normal">
              {isLogin ? "Đăng nhập" : "Đăng ký miễn phí"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 border-b border-border bg-[#FAFAFA] p-1">
          <button
            type="button"
            onClick={() => onModeChange("login")}
            className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
              isLogin ? "bg-white text-maroon shadow-sm" : "text-muted-foreground"
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => onModeChange("register")}
            className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
              !isLogin ? "bg-white text-maroon shadow-sm" : "text-muted-foreground"
            }`}
          >
            Đăng ký
          </button>
        </div>

        <div className="p-5">
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <FormField label="Email" error={errors.email}>
                <IconInput icon={Mail}>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(event) =>
                      setLoginForm((form) => ({ ...form, email: event.target.value }))
                    }
                    className={`${inputClass} pl-10`}
                    placeholder="ban@rightstamp.vn"
                  />
                </IconInput>
              </FormField>
              <FormField label="Mật khẩu" error={errors.password}>
                <IconInput icon={Lock}>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(event) =>
                      setLoginForm((form) => ({ ...form, password: event.target.value }))
                    }
                    className={`${inputClass} pl-10`}
                    placeholder="••••••••"
                  />
                </IconInput>
              </FormField>
              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-ink">
                  <input
                    type="checkbox"
                    checked={loginForm.remember}
                    onChange={(event) =>
                      setLoginForm((form) => ({ ...form, remember: event.target.checked }))
                    }
                    className="h-4 w-4 accent-maroon"
                  />
                  Ghi nhớ đăng nhập
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setNotice(
                      "Demo hiện chưa gửi email khôi phục, nhưng luồng đăng nhập vẫn chạy bằng tài khoản đã đăng ký.",
                    )
                  }
                  className="font-semibold text-maroon hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>
              {notice && <p className="rounded-lg bg-[#FAFAFA] p-3 text-xs text-ink">{notice}</p>}
              {errors.form && (
                <p className="rounded-lg bg-red-50 p-3 text-xs text-red-700">{errors.form}</p>
              )}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-maroon px-4 py-3 text-sm font-bold text-white shadow-lg shadow-maroon/20 transition-colors hover:bg-maroon-deep"
              >
                Đăng nhập
                <ArrowRight size={16} />
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Chưa có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => onModeChange("register")}
                  className="font-bold text-maroon hover:underline"
                >
                  Đăng ký ngay
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <FormField label="Họ tên" error={errors.name}>
                <IconInput icon={User}>
                  <input
                    type="text"
                    value={registerForm.name}
                    onChange={(event) =>
                      setRegisterForm((form) => ({ ...form, name: event.target.value }))
                    }
                    className={`${inputClass} pl-10`}
                    placeholder="Nguyễn Minh Anh"
                  />
                </IconInput>
              </FormField>
              <FormField label="Email" error={errors.email}>
                <IconInput icon={Mail}>
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(event) =>
                      setRegisterForm((form) => ({ ...form, email: event.target.value }))
                    }
                    className={`${inputClass} pl-10`}
                    placeholder="ban@rightstamp.vn"
                  />
                </IconInput>
              </FormField>
              <FormField label="Mật khẩu" error={errors.password}>
                <IconInput icon={Lock}>
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={(event) =>
                      setRegisterForm((form) => ({ ...form, password: event.target.value }))
                    }
                    className={`${inputClass} pl-10`}
                    placeholder="Tối thiểu 6 ký tự"
                  />
                </IconInput>
              </FormField>
              <FormField label="Xác nhận mật khẩu" error={errors.confirmPassword}>
                <IconInput icon={Lock}>
                  <input
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={(event) =>
                      setRegisterForm((form) => ({
                        ...form,
                        confirmPassword: event.target.value,
                      }))
                    }
                    className={`${inputClass} pl-10`}
                    placeholder="Nhập lại mật khẩu"
                  />
                </IconInput>
              </FormField>
              <label className="flex items-start gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={registerForm.agree}
                  onChange={(event) =>
                    setRegisterForm((form) => ({ ...form, agree: event.target.checked }))
                  }
                  className="mt-1 h-4 w-4 accent-maroon"
                />
                <span>Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của RightStamp.</span>
              </label>
              {errors.agree && <p className="text-xs font-medium text-red-600">{errors.agree}</p>}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-maroon px-4 py-3 text-sm font-bold text-white shadow-lg shadow-maroon/20 transition-colors hover:bg-maroon-deep"
              >
                Tạo tài khoản
                <ArrowRight size={16} />
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => onModeChange("login")}
                  className="font-bold text-maroon hover:underline"
                >
                  Đăng nhập
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function UserAccountMenu({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-3 text-sm font-bold text-ink shadow-sm transition-colors hover:border-maroon/50"
        aria-expanded={open}
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-maroon text-xs text-white">
          {initials || "RS"}
        </span>
        <span className="max-w-[130px] truncate">{user.name}</span>
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-[80] w-56 overflow-hidden rounded-xl border border-border bg-white shadow-xl">
          <div className="border-b border-border p-3">
            <p className="truncate text-sm font-bold text-ink">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
          <a
            href="#gioi-thieu"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-ink hover:bg-[#FAFAFA]"
          >
            <User size={16} />
            Hồ sơ của tôi
          </a>
          <a
            href="#tinh-nang-noi-bat"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-ink hover:bg-[#FAFAFA]"
          >
            <FolderArchive size={16} />
            Tác phẩm của tôi
          </a>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-2 border-t border-border px-3 py-2.5 text-left text-sm font-semibold text-maroon hover:bg-[#FAFAFA]"
          >
            <LogOut size={16} />
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}

export function InteractiveFeaturesSection({
  user,
  requestAuth,
}: {
  user: AuthUser | null;
  requestAuth: (mode: AuthMode) => void;
}) {
  const [active, setActive] = useState<ModuleId>("upload");
  const [artwork, setArtwork] = useState<ArtworkState>(initialArtwork);
  const [fingerprint, setFingerprint] = useState<FingerprintState | null>(null);
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.35);
  const [watermarkPosition, setWatermarkPosition] = useState<WatermarkPosition>("bottom-right");
  const [watermarkMode, setWatermarkMode] = useState<WatermarkMode>("seal");
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkedUrl, setWatermarkedUrl] = useState("");
  const certificateRef = useRef<HTMLDivElement>(null);
  const previewUrlRef = useRef("");

  const modules = useMemo(
    () =>
      [
        { id: "upload", icon: UploadCloud, label: "Upload tác phẩm" },
        { id: "fingerprint", icon: Fingerprint, label: "Dấu vân tay số" },
        { id: "watermark", icon: Stamp, label: "Watermark" },
        { id: "certificate", icon: Award, label: "Giấy chứng nhận" },
        { id: "verify", icon: Smartphone, label: "Trang xác minh QR" },
        { id: "evidence", icon: FolderArchive, label: "Evidence Pack" },
      ] satisfies Array<{ id: ModuleId; icon: LucideIcon; label: string }>,
    [],
  );

  useEffect(() => {
    const draft = readWorkspaceDraft();
    if (draft?.artwork) {
      const previewUrl = draft.artwork.previewDataUrl || "";
      setActive(draft.active || "upload");
      setArtwork({
        ...initialArtwork,
        ...draft.artwork,
        previewUrl,
        isImage: draft.artwork.isImage || (draft.artwork.fileType || "").startsWith("image/"),
      });
      setFingerprint(draft.fingerprint ?? null);
      setWatermarkOpacity(draft.watermark?.opacity ?? 0.35);
      setWatermarkPosition(draft.watermark?.position ?? "bottom-right");
      setWatermarkMode(draft.watermark?.mode ?? "seal");
      setWatermarkText(draft.watermark?.text ?? "");
    }
    setDraftReady(true);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  useEffect(() => {
    if (!user || artwork.author) return;
    setArtwork((current) => ({
      ...current,
      author: user.name,
      owner: current.owner || user.name,
    }));
  }, [artwork.author, user]);

  useEffect(() => {
    if (!artwork.previewUrl || !artwork.isImage) {
      setWatermarkedUrl("");
      return;
    }

    let cancelled = false;
    const image = new Image();
    const seal = new Image();

    function renderWatermark() {
      if (cancelled || !image.complete) return;
      const shouldDrawSeal = watermarkMode === "seal" || watermarkMode === "both";
      if (shouldDrawSeal && !seal.complete) return;

      const canvas = document.createElement("canvas");
      const width = image.naturalWidth || image.width;
      const height = image.naturalHeight || image.height;
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (!context) return;

      context.drawImage(image, 0, 0, width, height);
      const text = watermarkText.trim() || `© ${artwork.author || user?.name || "RightStamp"}`;
      const fontSize = Math.max(24, Math.round(width * 0.045));
      const padding = Math.max(32, Math.round(width * 0.05));
      const { x, y } = getWatermarkPoint(watermarkPosition, width, height, padding);
      const shouldDrawText = watermarkMode === "text" || watermarkMode === "both";

      if (shouldDrawText) {
        context.save();
        context.globalAlpha = watermarkOpacity;
        context.translate(
          watermarkMode === "both" ? width / 2 : x,
          watermarkMode === "both" ? height / 2 : y,
        );
        context.rotate(-Math.PI / 8);
        context.font = `700 ${fontSize}px Be Vietnam Pro, Arial, sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.shadowColor = "rgba(0,0,0,0.45)";
        context.shadowBlur = 12;
        context.fillStyle = "#ffffff";
        context.fillText(text, 0, 0);
        context.restore();
      }

      if (shouldDrawSeal) {
        const sealWidth = Math.round(width * 0.18);
        const sealHeight = Math.round(
          sealWidth * ((seal.naturalHeight || seal.height) / (seal.naturalWidth || seal.width)),
        );
        context.save();
        context.globalAlpha = Math.min(0.5, Math.max(0.25, watermarkOpacity));
        context.translate(x, y);
        context.rotate(-Math.PI / 18);
        context.shadowColor = "rgba(139, 30, 30, 0.22)";
        context.shadowBlur = Math.max(8, Math.round(width * 0.012));
        context.drawImage(seal, -sealWidth / 2, -sealHeight / 2, sealWidth, sealHeight);
        context.restore();
      }

      setWatermarkedUrl(canvas.toDataURL("image/png"));
    }

    image.onload = renderWatermark;
    seal.onload = renderWatermark;
    seal.src = "/images/rightstamp-seal.png";
    image.src = artwork.previewUrl;

    return () => {
      cancelled = true;
    };
  }, [
    artwork.author,
    artwork.isImage,
    artwork.previewUrl,
    user?.name,
    watermarkMode,
    watermarkOpacity,
    watermarkPosition,
    watermarkText,
  ]);

  useEffect(() => {
    if (!draftReady) return;
    saveWorkspaceDraft({
      active,
      artwork: {
        ...artwork,
        previewUrl: artwork.previewDataUrl,
      },
      fingerprint,
      watermark: {
        opacity: watermarkOpacity,
        position: watermarkPosition,
        mode: watermarkMode,
        text: watermarkText,
      },
    });
  }, [
    active,
    artwork,
    draftReady,
    fingerprint,
    watermarkMode,
    watermarkOpacity,
    watermarkPosition,
    watermarkText,
  ]);

  useEffect(() => {
    if (!artwork.fileName && !artwork.title && !fingerprint) return;
    saveRightStampCurrentWork({
      updatedAt: new Date().toISOString(),
      artwork: {
        fileName: artwork.fileName,
        fileType: artwork.fileType,
        fileSize: artwork.fileSize,
        previewDataUrl: artwork.previewDataUrl,
        title: artwork.title,
        author: artwork.author,
        owner: artwork.owner,
        completedDate: artwork.completedDate,
        description: artwork.description,
        rightsStatement: artwork.rightsStatement,
      },
      fingerprint: fingerprint
        ? {
            id: fingerprint.id,
            hash: fingerprint.hash,
            timestamp: fingerprint.timestamp,
            qrDataUrl: fingerprint.qrDataUrl,
            verifyUrl: fingerprint.verifyUrl,
          }
        : null,
    });
    if (fingerprint && user) {
      saveWorkSnapshot(user, artwork, fingerprint);
    }
  }, [artwork, fingerprint, user]);

  const canContinueUpload = Boolean(
    artwork.fileName && artwork.title && artwork.author && artwork.owner,
  );
  const checklist = getEvidenceChecklist(artwork, fingerprint, watermarkedUrl);

  function ensureLoggedIn() {
    if (user) return true;
    requestAuth("login");
    return false;
  }

  function handleSelectModule(id: ModuleId) {
    if (!user && id !== "upload") {
      requestAuth("login");
      return;
    }
    setActive(id);
  }

  function handleFiles(files: FileList | null) {
    if (!ensureLoggedIn()) return;
    const file = files?.[0];
    if (!file) return;
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);

    const previewUrl = URL.createObjectURL(file);
    previewUrlRef.current = previewUrl;
    const titleFromFile = file.name.replace(/\.[^/.]+$/, "");
    const isImage = file.type.startsWith("image/");

    setArtwork((current) => ({
      ...current,
      fileName: file.name,
      fileType: file.type || "application/octet-stream",
      fileSize: file.size,
      previewUrl,
      previewDataUrl: "",
      isImage,
      title: current.title || titleFromFile,
      author: current.author || user?.name || "",
      owner: current.owner || user?.name || "",
    }));
    if (isImage) {
      void createImagePreviewDataUrl(file).then((value) => {
        setArtwork((current) =>
          current.fileName === file.name ? { ...current, previewDataUrl: value } : current,
        );
      });
    }
    setFingerprint(null);
    setWatermarkedUrl("");
    setStatusMessage("Đã nhận file. Bạn có thể hoàn thiện metadata rồi chuyển sang bước tạo mã.");
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  }

  function handleUploadContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ensureLoggedIn()) return;

    const nextErrors: Record<string, string> = {};
    if (!artwork.fileName) nextErrors.fileName = "Vui lòng chọn file tác phẩm.";
    if (!artwork.title.trim()) nextErrors.title = "Vui lòng nhập tên tác phẩm.";
    if (!artwork.author.trim()) nextErrors.author = "Vui lòng nhập tác giả.";
    if (!artwork.owner.trim()) nextErrors.owner = "Vui lòng nhập chủ sở hữu.";
    setUploadErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatusMessage("Metadata đã sẵn sàng. Chuyển sang tạo dấu vân tay số.");
    setActive("fingerprint");
  }

  async function handleGenerateFingerprint() {
    if (!ensureLoggedIn()) return;
    if (!canContinueUpload) {
      setStatusMessage("Hãy hoàn thiện upload và metadata trước khi tạo mã bản quyền.");
      setActive("upload");
      return;
    }

    setIsGenerating(true);
    setStatusMessage("RightStamp đang tạo mã định danh, SHA-256 và QR xác minh...");
    await wait(1300);

    const timestamp = new Date().toISOString();
    const id = `RS-${new Date().getFullYear()}-${String(
      Math.floor(100000 + Math.random() * 900000),
    )}`;
    const hash = await createSha256(
      [artwork.fileName, artwork.fileSize, artwork.title, artwork.author, timestamp].join("|"),
    );
    const origin = typeof window !== "undefined" ? window.location.origin : "https://rightstamp.vn";
    const verifyUrl = `${origin}/verify/${id}`;
    const QRCode = await import("qrcode");
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      margin: 1,
      width: 220,
      color: { dark: "#171111", light: "#ffffff" },
    });
    const nextFingerprint = { id, hash, timestamp, qrDataUrl, verifyUrl };

    setFingerprint(nextFingerprint);
    setIsGenerating(false);
    setStatusMessage("Đã tạo dấu vân tay số và QR xác minh.");
    saveWorkSnapshot(user, artwork, nextFingerprint);
  }

  async function handleExportCertificate() {
    if (!fingerprint || !certificateRef.current) {
      setStatusMessage("Hãy tạo mã bản quyền trước khi xuất certificate.");
      return;
    }
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(certificateRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
    });
    downloadUrl(canvas.toDataURL("image/png"), `${fingerprint.id}-certificate.png`);
  }

  function handleExportEvidence() {
    if (!fingerprint) {
      setStatusMessage("Evidence Pack cần có mã định danh, hash và timestamp trước.");
      setActive("fingerprint");
      return;
    }

    const payload = {
      exportedAt: new Date().toISOString(),
      exportedBy: user ? { id: user.id, name: user.name, email: user.email } : null,
      artwork: {
        fileName: artwork.fileName,
        fileType: artwork.fileType,
        fileSize: artwork.fileSize,
        title: artwork.title,
        author: artwork.author,
        owner: artwork.owner,
        completedDate: artwork.completedDate,
        description: artwork.description,
        rightsStatement: artwork.rightsStatement,
      },
      fingerprint,
      watermark: {
        generated: Boolean(watermarkedUrl),
        mode: watermarkMode,
        opacity: watermarkOpacity,
        position: watermarkPosition,
        text: watermarkText.trim() || `© ${artwork.author || "RightStamp"}`,
      },
      checklist,
    };
    downloadBlob(
      JSON.stringify(payload, null, 2),
      `${fingerprint.id}-evidence-pack.json`,
      "application/json",
    );
  }

  return (
    <section id="tinh-nang-noi-bat" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="rightstamp-red-divider mb-12" />
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-maroon">
            6 Module cốt lõi
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-normal text-ink md:text-5xl">
            TÍNH NĂNG CỦA RIGHTSTAMP
          </h2>
          <p className="mt-4 text-muted-foreground">
            Mỗi tab bên dưới là một công cụ demo có state thật, dùng chung dữ liệu tác phẩm vừa
            upload.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-6">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = active === module.id;
            return (
              <button
                key={module.id}
                type="button"
                onClick={() => handleSelectModule(module.id)}
                className={`group flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 text-center transition-all ${
                  isActive
                    ? "border-maroon bg-maroon text-white shadow-lg shadow-maroon/25"
                    : "border-border bg-white text-ink hover:border-maroon/50"
                }`}
              >
                <Icon size={26} strokeWidth={2} />
                <span className="text-xs font-bold leading-tight md:text-sm">{module.label}</span>
              </button>
            );
          })}
        </div>

        {!user && (
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-maroon/20 bg-white p-5 shadow-sm md:flex-row md:items-center">
            <div>
              <p className="font-display text-xl leading-tight tracking-normal text-ink">
                Đăng nhập để bắt đầu đăng ký tác phẩm
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Module upload sẽ mở modal đăng nhập/đăng ký trước khi nhận file.
              </p>
            </div>
            <button
              type="button"
              onClick={() => requestAuth("register")}
              className="rounded-lg bg-maroon px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-maroon-deep"
            >
              Đăng ký miễn phí
            </button>
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
            <div className="p-6 md:p-8 lg:p-10">
              {statusMessage && (
                <div className="mb-5 flex items-start gap-3 rounded-xl border border-maroon/15 bg-maroon/5 p-3 text-sm text-ink">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-maroon" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {active === "upload" && (
                <UploadModule
                  artwork={artwork}
                  errors={uploadErrors}
                  onDrop={handleDrop}
                  onFileChange={(event) => handleFiles(event.target.files)}
                  onArtworkChange={(patch) => setArtwork((current) => ({ ...current, ...patch }))}
                  onContinue={handleUploadContinue}
                  onRequireAuth={() => requestAuth("login")}
                  isLoggedIn={Boolean(user)}
                />
              )}
              {active === "fingerprint" && (
                <FingerprintModule
                  artwork={artwork}
                  fingerprint={fingerprint}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerateFingerprint}
                  onOpenVerify={() => setVerifyOpen(true)}
                />
              )}
              {active === "watermark" && (
                <WatermarkModule
                  artwork={artwork}
                  watermarkedUrl={watermarkedUrl}
                  mode={watermarkMode}
                  opacity={watermarkOpacity}
                  position={watermarkPosition}
                  text={watermarkText}
                  onModeChange={setWatermarkMode}
                  onOpacityChange={setWatermarkOpacity}
                  onPositionChange={setWatermarkPosition}
                  onTextChange={setWatermarkText}
                />
              )}
              {active === "certificate" && (
                <CertificateModule
                  artwork={artwork}
                  fingerprint={fingerprint}
                  certificateRef={certificateRef}
                  onExport={handleExportCertificate}
                  onGoFingerprint={() => setActive("fingerprint")}
                />
              )}
              {active === "verify" && (
                <VerifyModule
                  artwork={artwork}
                  fingerprint={fingerprint}
                  onOpenVerify={() => setVerifyOpen(true)}
                  onGoFingerprint={() => setActive("fingerprint")}
                />
              )}
              {active === "evidence" && (
                <EvidenceModule
                  checklist={checklist}
                  fingerprint={fingerprint}
                  onExport={handleExportEvidence}
                />
              )}
            </div>

            <div className="border-t border-border bg-gradient-to-br from-maroon/5 via-white to-coral/10 p-6 lg:border-l lg:border-t-0">
              <LiveSummary
                artwork={artwork}
                fingerprint={fingerprint}
                watermarkedUrl={watermarkedUrl}
                onOpenVerify={() => setVerifyOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {verifyOpen && (
        <VerificationModal
          artwork={artwork}
          fingerprint={fingerprint}
          onClose={() => setVerifyOpen(false)}
        />
      )}
    </section>
  );
}

export function TailoredSolutionsSection() {
  const [openPlan, setOpenPlan] = useState<string | null>(null);

  return (
    <section className="bg-ink py-20 text-white md:py-28">
      <div className="container-x">
        <h2 className="font-display text-center leading-[1.14] tracking-normal">
          <span className="block text-4xl text-coral md:text-6xl">MỘT GIẢI PHÁP</span>
          <span className="mt-3 block text-4xl text-white md:text-6xl lg:text-7xl">
            ĐƯỢC THIẾT KẾ RIÊNG CHO BẠN
          </span>
          <span className="mt-3 block text-4xl text-white md:text-6xl lg:text-7xl">
            DÙ NHU CẦU CỦA BẠN LÀ GÌ
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <PlanCard
            id="personal"
            bg="bg-coral"
            titleTop="BẠN MUỐN BẢO VỆ"
            titleBig="TÁC PHẨM CỦA MÌNH?"
            body="Dành cho nhà văn, nhạc sĩ, họa sĩ thị giác, nhiếp ảnh gia, designer, chuyên gia phim và hoạt hình, kiến trúc sư, developer phần mềm hoặc game, content creator,..."
            cta="Gói Cá Nhân"
            isOpen={openPlan === "personal"}
            onToggle={() => setOpenPlan((current) => (current === "personal" ? null : "personal"))}
            onClose={() => setOpenPlan(null)}
          />
          <PlanCard
            id="business"
            bg="bg-sun"
            titleTop="BẠN CẦN BẢO VỆ"
            titleBig="TÀI SẢN TRÍ TUỆ CỦA DOANH NGHIỆP?"
            body="Đăng ký thương hiệu và nội dung của doanh nghiệp: sản phẩm bản quyền, thiết kế, phần mềm, tài liệu kỹ thuật hoặc dự án marketing."
            cta="Gói Doanh Nghiệp"
            isOpen={openPlan === "business"}
            onToggle={() => setOpenPlan((current) => (current === "business" ? null : "business"))}
            onClose={() => setOpenPlan(null)}
          />
        </div>

        <div className="mt-6 rounded-2xl bg-royal p-8 md:p-14">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div className="relative">
              <div className="absolute left-0 top-0 h-24 w-2 bg-white/40" />
              <h3 className="pl-6 font-display text-3xl leading-[1.18] tracking-normal text-white md:text-5xl">
                BẠN QUAN TÂM ĐẾN VIỆC BẢO VỆ SHTT CHO KHÁCH HÀNG CỦA MÌNH?
              </h3>
            </div>
            <div>
              <p className="text-white/95 leading-relaxed">
                Tăng lợi nhuận cho hoạt động tư vấn bằng cách quản lý thương hiệu và bản quyền của
                khách hàng từ một bảng điều khiển duy nhất. Cung cấp cho họ cổng tư vấn mang thương
                hiệu riêng, được vận hành bởi RightStamp.
              </p>
              <p className="mt-4 text-white/95 leading-relaxed">
                Dành cho luật sư, trường đại học, đơn vị tư vấn và các tổ chức có khách hàng hoặc
                người dùng.
              </p>
              <button
                type="button"
                onClick={() =>
                  setOpenPlan((current) => (current === "enterprise" ? null : "enterprise"))
                }
                className="mt-8 rounded-full bg-black px-8 py-4 font-bold text-white transition-colors hover:bg-maroon-deep"
              >
                Gói Enterprise
              </button>
            </div>
          </div>
          <PlanDetails
            planId="enterprise"
            isOpen={openPlan === "enterprise"}
            onClose={() => setOpenPlan(null)}
          />
        </div>
      </div>
    </section>
  );
}

function UploadModule({
  artwork,
  errors,
  onDrop,
  onFileChange,
  onArtworkChange,
  onContinue,
  onRequireAuth,
  isLoggedIn,
}: {
  artwork: ArtworkState;
  errors: Record<string, string>;
  onDrop: (event: DragEvent<HTMLLabelElement>) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onArtworkChange: (patch: Partial<ArtworkState>) => void;
  onContinue: (event: FormEvent<HTMLFormElement>) => void;
  onRequireAuth: () => void;
  isLoggedIn: boolean;
}) {
  return (
    <form onSubmit={onContinue} className="space-y-6">
      <div>
        <ModuleEyebrow icon={UploadCloud} label="Module 1" />
        <h3 className="mt-2 font-display text-2xl leading-tight tracking-normal text-ink md:text-4xl">
          Upload tác phẩm và metadata
        </h3>
      </div>

      <label
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        onClick={(event) => {
          if (!isLoggedIn) {
            event.preventDefault();
            onRequireAuth();
          }
        }}
        className="block cursor-pointer rounded-2xl border-2 border-dashed border-maroon/35 bg-[#FAFAFA] p-6 text-center transition-colors hover:border-maroon hover:bg-white"
      >
        <input
          type="file"
          className="hidden"
          accept="image/*,application/pdf,video/*,audio/*,.doc,.docx,.psd,.ai,.zip"
          onChange={onFileChange}
        />
        {artwork.fileName ? (
          <div className="flex flex-col items-center gap-3">
            <FilePreview artwork={artwork} />
            <div>
              <p className="font-bold text-ink">{artwork.fileName}</p>
              <p className="text-xs text-muted-foreground">
                {artwork.fileType || "Không rõ định dạng"} · {formatFileSize(artwork.fileSize)}
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-sm">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-maroon/10 text-maroon">
              <UploadCloud size={28} />
            </div>
            <p className="mt-3 font-bold text-ink">Kéo thả file hoặc chọn từ máy</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Ảnh, PDF, video, âm thanh, file thiết kế hoặc file nén.
            </p>
          </div>
        )}
      </label>
      {errors.fileName && <p className="text-xs font-medium text-red-600">{errors.fileName}</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Tên tác phẩm" error={errors.title}>
          <input
            value={artwork.title}
            onChange={(event) => onArtworkChange({ title: event.target.value })}
            className={inputClass}
            placeholder="Bộ tranh Hà Nội mùa thu"
          />
        </FormField>
        <FormField label="Tác giả" error={errors.author}>
          <input
            value={artwork.author}
            onChange={(event) => onArtworkChange({ author: event.target.value })}
            className={inputClass}
            placeholder="Nguyễn Minh Anh"
          />
        </FormField>
        <FormField label="Chủ sở hữu" error={errors.owner}>
          <input
            value={artwork.owner}
            onChange={(event) => onArtworkChange({ owner: event.target.value })}
            className={inputClass}
            placeholder="Tên cá nhân hoặc công ty"
          />
        </FormField>
        <FormField label="Ngày hoàn thành">
          <input
            type="date"
            value={artwork.completedDate}
            onChange={(event) => onArtworkChange({ completedDate: event.target.value })}
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField label="Mô tả ý tưởng">
        <textarea
          value={artwork.description}
          onChange={(event) => onArtworkChange({ description: event.target.value })}
          className={`${inputClass} min-h-24 resize-y`}
          placeholder="Mô tả bối cảnh sáng tạo, concept, phiên bản, chất liệu..."
        />
      </FormField>
      <FormField label="Tuyên bố quyền">
        <textarea
          value={artwork.rightsStatement}
          onChange={(event) => onArtworkChange({ rightsStatement: event.target.value })}
          className={`${inputClass} min-h-24 resize-y`}
        />
      </FormField>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-maroon-deep"
      >
        Tiếp tục
        <ArrowRight size={16} />
      </button>
    </form>
  );
}

function FingerprintModule({
  artwork,
  fingerprint,
  isGenerating,
  onGenerate,
  onOpenVerify,
}: {
  artwork: ArtworkState;
  fingerprint: FingerprintState | null;
  isGenerating: boolean;
  onGenerate: () => void;
  onOpenVerify: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <ModuleEyebrow icon={Fingerprint} label="Module 2" />
        <h3 className="mt-2 font-display text-2xl leading-tight tracking-normal text-ink md:text-4xl">
          Tạo dấu vân tay số
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Mã định danh, hash SHA-256, timestamp và QR xác minh được tạo từ metadata của tác phẩm
          đang mở.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-[#FAFAFA] p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Tác phẩm đang xử lý
        </p>
        <p className="mt-1 font-display text-xl leading-tight tracking-normal text-ink">
          {artwork.title || "Chưa có tác phẩm"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {artwork.fileName || "Hãy upload file ở Module 1 trước."}
        </p>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating}
        className="inline-flex items-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-maroon-deep disabled:cursor-wait disabled:opacity-70"
      >
        {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Fingerprint size={16} />}
        {isGenerating ? "Đang xử lý..." : "Tạo mã bản quyền"}
      </button>

      {fingerprint && (
        <div className="grid grid-cols-1 gap-5 rounded-2xl border-2 border-maroon/25 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-maroon">
              Certificate mockup
            </p>
            <p className="mt-2 font-display text-2xl leading-tight tracking-normal text-ink">
              {fingerprint.id}
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <SummaryRow label="SHA-256" value={shortHash(fingerprint.hash)} mono />
              <SummaryRow label="Timestamp" value={formatDateTime(fingerprint.timestamp)} />
              <SummaryRow label="Tác phẩm" value={artwork.title || "Chưa đặt tên"} />
            </dl>
          </div>
          <button
            type="button"
            onClick={onOpenVerify}
            className="mx-auto grid h-40 w-40 place-items-center rounded-xl border border-border bg-white p-2 transition-transform hover:scale-[1.02]"
            aria-label="Mở trang xác minh QR"
          >
            <img
              src={fingerprint.qrDataUrl}
              alt="QR xác minh RightStamp"
              className="h-full w-full"
            />
          </button>
        </div>
      )}
    </div>
  );
}

function WatermarkModule({
  artwork,
  watermarkedUrl,
  mode,
  opacity,
  position,
  text,
  onModeChange,
  onOpacityChange,
  onPositionChange,
  onTextChange,
}: {
  artwork: ArtworkState;
  watermarkedUrl: string;
  mode: WatermarkMode;
  opacity: number;
  position: WatermarkPosition;
  text: string;
  onModeChange: (value: WatermarkMode) => void;
  onOpacityChange: (value: number) => void;
  onPositionChange: (value: WatermarkPosition) => void;
  onTextChange: (value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <ModuleEyebrow icon={Stamp} label="Module 3" />
        <h3 className="mt-2 font-display text-2xl leading-tight tracking-normal text-ink md:text-4xl">
          Watermark bằng Canvas
        </h3>
      </div>

      {!artwork.fileName ? (
        <EmptyState
          icon={UploadCloud}
          title="Chưa có file"
          text="Upload tác phẩm ở Module 1 trước khi tạo watermark."
        />
      ) : !artwork.isImage ? (
        <EmptyState
          icon={ImageIcon}
          title="Watermark ảnh cần file hình"
          text="File hiện tại không phải ảnh. Bạn vẫn có thể tạo hash, certificate và Evidence Pack cho file này."
        />
      ) : (
        <>
          <div>
            <p className={labelClass}>Kiểu watermark</p>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                ["text", "Watermark chữ"],
                ["seal", "Con dấu RightStamp"],
                ["both", "Dùng cả hai"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onModeChange(value as WatermarkMode)}
                  className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition-colors ${
                    mode === value
                      ? "border-maroon bg-maroon text-white"
                      : "border-border bg-white text-ink hover:border-maroon/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_180px]">
            <FormField label="Text watermark">
              <input
                value={text}
                onChange={(event) => onTextChange(event.target.value)}
                className={inputClass}
                placeholder={`© ${artwork.author || "Tên tác giả"}`}
                disabled={mode === "seal"}
              />
            </FormField>
            <FormField label={`Độ mờ ${Math.round(opacity * 100)}%`}>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={opacity}
                onChange={(event) => onOpacityChange(Number(event.target.value))}
                className="h-11 w-full accent-maroon"
              />
            </FormField>
          </div>
          <div>
            <p className={labelClass}>Vị trí</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {[
                ["top-left", "Trên trái"],
                ["top-right", "Trên phải"],
                ["center", "Giữa"],
                ["bottom-left", "Dưới trái"],
                ["bottom-right", "Dưới phải"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onPositionChange(value as WatermarkPosition)}
                  className={`rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${
                    position === value
                      ? "border-maroon bg-maroon text-white"
                      : "border-border bg-white text-ink hover:border-maroon/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ImageCompare title="Ảnh gốc" src={artwork.previewUrl} />
            <ImageCompare title="Sau watermark" src={watermarkedUrl} />
          </div>
          <button
            type="button"
            onClick={() =>
              downloadUrl(
                watermarkedUrl,
                `${safeName(artwork.title || "rightstamp")}-watermark.png`,
              )
            }
            disabled={!watermarkedUrl}
            className="inline-flex items-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-maroon-deep disabled:opacity-60"
          >
            <Download size={16} />
            Tải ảnh có watermark
          </button>
        </>
      )}
    </div>
  );
}

function CertificateModule({
  artwork,
  fingerprint,
  certificateRef,
  onExport,
  onGoFingerprint,
}: {
  artwork: ArtworkState;
  fingerprint: FingerprintState | null;
  certificateRef: RefObject<HTMLDivElement | null>;
  onExport: () => void;
  onGoFingerprint: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <ModuleEyebrow icon={Award} label="Module 4" />
        <h3 className="mt-2 font-display text-2xl leading-tight tracking-normal text-ink md:text-4xl">
          Giấy chứng nhận
        </h3>
      </div>

      {!fingerprint ? (
        <EmptyState
          icon={Fingerprint}
          title="Chưa có mã bản quyền"
          text="Tạo mã ở Module 2 để certificate tự điền đầy đủ thông tin."
          actionLabel="Sang Module 2"
          onAction={onGoFingerprint}
        />
      ) : (
        <>
          <CertificateCard refTarget={certificateRef} artwork={artwork} fingerprint={fingerprint} />
          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-maroon-deep"
          >
            <Download size={16} />
            Tải ảnh certificate
          </button>
        </>
      )}
    </div>
  );
}

function VerifyModule({
  artwork,
  fingerprint,
  onOpenVerify,
  onGoFingerprint,
}: {
  artwork: ArtworkState;
  fingerprint: FingerprintState | null;
  onOpenVerify: () => void;
  onGoFingerprint: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <ModuleEyebrow icon={Smartphone} label="Module 5" />
        <h3 className="mt-2 font-display text-2xl leading-tight tracking-normal text-ink md:text-4xl">
          Trang xác minh QR
        </h3>
      </div>
      {!fingerprint ? (
        <EmptyState
          icon={QrCode}
          title="Chưa có QR"
          text="QR xác minh được tạo sau khi sinh mã bản quyền ở Module 2."
          actionLabel="Tạo QR"
          onAction={onGoFingerprint}
        />
      ) : (
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[260px_1fr]">
          <PhoneVerification artwork={artwork} fingerprint={fingerprint} />
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Trang xác minh lấy trực tiếp tên tác phẩm, tác giả, mã định danh, hash và timestamp
              trong state hiện tại.
            </p>
            <button
              type="button"
              onClick={onOpenVerify}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-maroon-deep"
            >
              <Eye size={16} />
              Xem trang xác minh
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EvidenceModule({
  checklist,
  fingerprint,
  onExport,
}: {
  checklist: Array<{ label: string; ok: boolean }>;
  fingerprint: FingerprintState | null;
  onExport: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <ModuleEyebrow icon={FolderArchive} label="Module 6" />
        <h3 className="mt-2 font-display text-2xl leading-tight tracking-normal text-ink md:text-4xl">
          Evidence Pack
        </h3>
      </div>
      <div className="rounded-2xl border border-border bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-maroon/10 text-maroon">
            <FileArchive size={24} />
          </div>
          <div>
            <p className="font-display text-xl leading-tight tracking-normal text-ink">
              {fingerprint?.id || "Hồ sơ đang chuẩn bị"}
            </p>
            <p className="text-xs text-muted-foreground">
              {checklist.filter((item) => item.ok).length}/{checklist.length} mục đã sẵn sàng
            </p>
          </div>
        </div>
        <ul className="mt-5 space-y-2">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm text-ink">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full ${
                  item.ok ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                }`}
              >
                {item.ok ? <Check size={14} strokeWidth={3} /> : "•"}
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={onExport}
        className="inline-flex items-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-maroon-deep"
      >
        <Download size={16} />
        Xuất hồ sơ chứng cứ
      </button>
    </div>
  );
}

function LiveSummary({
  artwork,
  fingerprint,
  watermarkedUrl,
  onOpenVerify,
}: {
  artwork: ArtworkState;
  fingerprint: FingerprintState | null;
  watermarkedUrl: string;
  onOpenVerify: () => void;
}) {
  return (
    <div className="sticky top-24 space-y-5">
      <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-maroon">
          Dữ liệu xuyên suốt
        </p>
        <div className="mt-4 space-y-2 text-sm">
          <SummaryRow label="Tác phẩm" value={artwork.title || "Chưa có"} />
          <SummaryRow label="Tác giả" value={artwork.author || "Chưa có"} />
          <SummaryRow label="File" value={artwork.fileName || "Chưa upload"} />
          <SummaryRow
            label="Mã"
            value={fingerprint?.id || "Chưa tạo"}
            mono={Boolean(fingerprint)}
          />
          <SummaryRow label="Watermark" value={watermarkedUrl ? "Đã tạo" : "Chưa tạo"} />
        </div>
      </div>

      {fingerprint ? (
        <button
          type="button"
          onClick={onOpenVerify}
          className="w-full rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition-transform hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-4">
            <img
              src={fingerprint.qrDataUrl}
              alt="QR RightStamp"
              className="h-24 w-24 rounded-lg border border-border"
            />
            <div>
              <p className="font-display text-lg leading-tight tracking-normal text-ink">
                QR Verified
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Bấm để mở trang xác minh mô phỏng.
              </p>
            </div>
          </div>
        </button>
      ) : (
        <div className="rounded-2xl border border-dashed border-maroon/30 bg-white/70 p-5 text-sm text-muted-foreground">
          QR và certificate sẽ xuất hiện sau khi tạo mã ở Module 2.
        </div>
      )}
    </div>
  );
}

function VerificationModal({
  artwork,
  fingerprint,
  onClose,
}: {
  artwork: ArtworkState;
  fingerprint: FingerprintState | null;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[120] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div onMouseDown={(event) => event.stopPropagation()} className="relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-3 -top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-lg"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>
        {fingerprint ? (
          <PhoneVerification artwork={artwork} fingerprint={fingerprint} />
        ) : (
          <div className="rounded-2xl bg-white p-6 text-ink">Chưa có dữ liệu xác minh.</div>
        )}
      </div>
    </div>
  );
}

function PhoneVerification({
  artwork,
  fingerprint,
}: {
  artwork: ArtworkState;
  fingerprint: FingerprintState;
}) {
  return (
    <div className="w-[280px] overflow-hidden rounded-[2rem] border-[8px] border-ink bg-white shadow-2xl">
      <div className="bg-ink px-4 py-3 text-center text-xs font-semibold text-white">
        verify.rightstamp.vn
      </div>
      <div className="space-y-4 p-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
          <BadgeCheck size={14} />
          Verified
        </span>
        <div>
          <p className="font-display text-xl leading-tight tracking-normal text-ink">
            {artwork.title || "Tác phẩm chưa đặt tên"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {artwork.author || "Chưa có tác giả"}
          </p>
        </div>
        <img
          src={fingerprint.qrDataUrl}
          alt="QR xác minh"
          className="mx-auto h-32 w-32 rounded-lg border border-border"
        />
        <div className="space-y-2 text-xs">
          <SummaryRow label="Mã" value={fingerprint.id} mono />
          <SummaryRow label="Chủ sở hữu" value={artwork.owner || "Chưa có"} />
          <SummaryRow label="Ngày xác thực" value={formatDateTime(fingerprint.timestamp)} />
          <SummaryRow label="SHA-256" value={shortHash(fingerprint.hash)} mono />
        </div>
        <button className="w-full rounded-lg bg-maroon py-2.5 text-xs font-bold text-white">
          Yêu cầu cấp phép
        </button>
      </div>
    </div>
  );
}

function CertificateCard({
  refTarget,
  artwork,
  fingerprint,
}: {
  refTarget: RefObject<HTMLDivElement | null>;
  artwork: ArtworkState;
  fingerprint: FingerprintState;
}) {
  return (
    <div ref={refTarget} className="bg-white p-3">
      <div className="rounded-xl border-4 border-double border-maroon bg-white p-6 text-center text-ink shadow-sm">
        <p className="font-display text-sm tracking-[0.24em] text-maroon">RIGHTSTAMP CERTIFICATE</p>
        <div className="mx-auto mt-4 h-px max-w-xs bg-maroon/30" />
        <p className="mt-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Chứng nhận tác phẩm
        </p>
        <h4 className="mt-2 font-display text-3xl leading-tight tracking-normal text-ink">
          {artwork.title || "Tác phẩm chưa đặt tên"}
        </h4>
        <p className="mt-2 text-sm text-ink">Tác giả: {artwork.author || "Chưa có"}</p>
        <div className="mt-6 grid grid-cols-1 gap-2 text-left text-xs md:grid-cols-2">
          <SummaryRow label="Mã định danh" value={fingerprint.id} mono />
          <SummaryRow label="Chủ sở hữu" value={artwork.owner || "Chưa có"} />
          <SummaryRow label="Ngày hoàn thành" value={formatDateOnly(artwork.completedDate)} />
          <SummaryRow label="Ngày xác thực" value={formatDateTime(fingerprint.timestamp)} />
        </div>
        <div className="mt-6 grid grid-cols-1 items-end gap-4 text-left md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Hash SHA-256
            </p>
            <p className="mt-1 break-all font-mono text-[11px] leading-relaxed text-ink">
              {fingerprint.hash}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {artwork.rightsStatement || "Tuyên bố quyền chưa được nhập."}
            </p>
          </div>
          <img
            src={fingerprint.qrDataUrl}
            alt="QR certificate"
            className="h-24 w-24 rounded border border-border"
          />
        </div>
      </div>
    </div>
  );
}

function PlanCard({
  id,
  bg,
  titleTop,
  titleBig,
  body,
  cta,
  isOpen,
  onToggle,
  onClose,
}: {
  id: string;
  bg: string;
  titleTop: string;
  titleBig: string;
  body: string;
  cta: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className={`${bg} rounded-2xl p-8 md:p-10`}>
      <div className="relative">
        <div className="absolute left-0 top-0 h-24 w-2 bg-white/40" />
        <h3 className="pl-6 font-display leading-[1.18] tracking-normal">
          <span className="block text-2xl text-white md:text-3xl">{titleTop}</span>
          <span className="mt-2 block text-3xl text-ink md:text-5xl">{titleBig}</span>
        </h3>
      </div>
      <p className="mt-6 text-ink/85 leading-relaxed">{body}</p>
      <button
        type="button"
        onClick={onToggle}
        className="mt-8 rounded-full bg-black px-8 py-4 font-bold text-white transition-colors hover:bg-maroon-deep"
      >
        {cta}
      </button>
      <PlanDetails planId={id} isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

function PlanDetails({
  planId,
  isOpen,
  onClose,
}: {
  planId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const plan = PLAN_DETAILS[planId];
  if (!plan) return null;

  return (
    <div
      className={`grid transition-all duration-300 ease-out ${
        isOpen ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="rounded-xl border border-black/10 bg-white p-5 text-ink shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-maroon">{plan.name}</p>
              <p className="mt-1 font-display text-2xl leading-tight tracking-normal text-ink">
                {plan.price}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
              aria-label="Đóng chi tiết gói"
            >
              <X size={18} />
            </button>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-green-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-5 rounded-lg bg-maroon px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-maroon-deep"
          >
            {plan.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

function IconInput({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <span className="relative block">
      <Icon
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      {children}
    </span>
  );
}

function ModuleEyebrow({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-maroon">
      <Icon size={16} />
      {label}
    </div>
  );
}

function FilePreview({ artwork }: { artwork: ArtworkState }) {
  if (artwork.isImage && artwork.previewUrl) {
    return (
      <img
        src={artwork.previewUrl}
        alt={artwork.fileName}
        className="h-32 w-32 rounded-xl object-cover shadow"
      />
    );
  }
  const Icon = fileIconForType(artwork.fileType);
  return (
    <div className="grid h-32 w-32 place-items-center rounded-xl border border-border bg-white text-maroon shadow-sm">
      <Icon size={44} />
    </div>
  );
}

function ImageCompare({ title, src }: { title: string; src: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="border-b border-border px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </div>
      <div className="aspect-square bg-[#FAFAFA]">
        {src ? (
          <img src={src} alt={title} className="h-full w-full object-contain" />
        ) : (
          <div className="grid h-full place-items-center text-sm text-muted-foreground">
            Đang tạo ảnh...
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  text,
  actionLabel,
  onAction,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-maroon/30 bg-[#FAFAFA] p-8 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-maroon">
        <Icon size={28} />
      </div>
      <p className="mt-4 font-display text-xl leading-tight tracking-normal text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{text}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-lg bg-maroon px-5 py-3 text-sm font-bold text-white"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function SummaryRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-3 border-b border-dashed border-border pb-1">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className={`min-w-0 text-right ${mono ? "font-mono" : "font-medium"} break-words`}>
        {value}
      </span>
    </div>
  );
}

function getWatermarkPoint(
  position: WatermarkPosition,
  width: number,
  height: number,
  padding: number,
) {
  const points: Record<WatermarkPosition, { x: number; y: number }> = {
    "top-left": { x: padding + width * 0.16, y: padding + height * 0.08 },
    "top-right": { x: width - padding - width * 0.16, y: padding + height * 0.08 },
    center: { x: width / 2, y: height / 2 },
    "bottom-left": { x: padding + width * 0.18, y: height - padding - height * 0.08 },
    "bottom-right": { x: width - padding - width * 0.18, y: height - padding - height * 0.08 },
  };
  return points[position];
}

function getEvidenceChecklist(
  artwork: ArtworkState,
  fingerprint: FingerprintState | null,
  watermarkedUrl: string,
) {
  return [
    { label: "File gốc tác phẩm", ok: Boolean(artwork.fileName) },
    {
      label: "Metadata: tên tác phẩm, tác giả, chủ sở hữu",
      ok: Boolean(artwork.title && artwork.author && artwork.owner),
    },
    { label: "Hash SHA-256", ok: Boolean(fingerprint?.hash) },
    { label: "Timestamp xác thực", ok: Boolean(fingerprint?.timestamp) },
    { label: "QR xác minh công khai", ok: Boolean(fingerprint?.qrDataUrl) },
    { label: "Giấy chứng nhận RightStamp", ok: Boolean(fingerprint && artwork.title) },
    { label: "Ảnh watermark đã xử lý", ok: Boolean(watermarkedUrl) },
    { label: "Tuyên bố quyền tác giả", ok: Boolean(artwork.rightsStatement) },
  ];
}

function readWorkspaceDraft(): WorkspaceDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(WORKSPACE_DRAFT_KEY);
    return raw ? (JSON.parse(raw) as WorkspaceDraft) : null;
  } catch {
    return null;
  }
}

function saveWorkspaceDraft(draft: WorkspaceDraft) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(WORKSPACE_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // localStorage can be full if users upload very large images. The flow still works in memory.
  }
}

function fileIconForType(type: string): LucideIcon {
  if (type.startsWith("image/")) return FileImage;
  if (type.startsWith("video/")) return FileVideo;
  if (type.startsWith("audio/")) return FileAudio;
  if (type.includes("pdf") || type.includes("document")) return FileText;
  return FileIcon;
}

function createImagePreviewDataUrl(file: File, maxEdge = 900) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const raw = typeof reader.result === "string" ? reader.result : "";
      if (!raw) {
        resolve("");
        return;
      }

      const image = new Image();
      image.onload = () => {
        const ratio = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
        const width = Math.max(1, Math.round(image.naturalWidth * ratio));
        const height = Math.max(1, Math.round(image.naturalHeight * ratio));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) {
          resolve(raw);
          return;
        }
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.86));
      };
      image.onerror = () => resolve(raw);
      image.src = raw;
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

async function createSha256(value: string) {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    return fallbackHash(value);
  }
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function fallbackHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return `${Math.abs(hash).toString(16).padStart(16, "0")}`.repeat(4).slice(0, 64);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function formatFileSize(size: number) {
  if (!size) return "0 KB";
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDateTime(value: string) {
  if (!value) return "Chưa có";
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDateOnly(value: string) {
  if (!value) return "Chưa nhập";
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(value));
}

function shortHash(value: string) {
  if (value.length <= 18) return value;
  return `${value.slice(0, 12)}…${value.slice(-8)}`;
}

function safeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function downloadUrl(dataUrl: string, fileName: string) {
  if (!dataUrl) return;
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function downloadBlob(content: string, fileName: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  downloadUrl(url, fileName);
  window.setTimeout(() => URL.revokeObjectURL(url), 300);
}

const PLAN_DETAILS: Record<
  string,
  { name: string; price: string; cta: string; features: string[] }
> = {
  personal: {
    name: "Gói Cá Nhân",
    price: "99.000 VNĐ/tháng",
    cta: "Chọn gói này",
    features: [
      "10 tác phẩm được tạo dấu vân tay số mỗi tháng",
      "Certificate và QR xác minh cho từng tác phẩm",
      "Watermark ảnh và xuất Evidence Pack dạng JSON",
      "Lưu hồ sơ quyền tác giả cơ bản cho creator độc lập",
    ],
  },
  business: {
    name: "Gói Doanh Nghiệp",
    price: "690.000 VNĐ/tháng",
    cta: "Chọn gói này",
    features: [
      "100 tác phẩm hoặc tài sản thương hiệu mỗi tháng",
      "Quản lý nhiều chủ sở hữu, phòng ban và phiên bản file",
      "Certificate đồng bộ nhận diện doanh nghiệp",
      "Báo cáo evidence định kỳ cho đội pháp lý và marketing",
    ],
  },
  enterprise: {
    name: "Gói Enterprise",
    price: "Liên hệ theo quy mô",
    cta: "Liên hệ tư vấn",
    features: [
      "Cổng xác minh riêng theo thương hiệu tổ chức",
      "Dashboard quản lý khách hàng, luật sư hoặc đơn vị tư vấn",
      "API tích hợp quy trình đăng ký, QR và Evidence Pack",
      "SLA hỗ trợ riêng và cấu hình quyền truy cập nâng cao",
    ],
  },
};
