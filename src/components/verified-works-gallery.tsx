import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Eye,
  Globe2,
  Hash,
  Mail,
  Phone,
  SlidersHorizontal,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { readRightStampStoredWorks, type RightStampStoredWork } from "@/lib/rightstamp-auth";

type WorkType = "all" | "image" | "design" | "video" | "audio" | "document";

type GalleryWork = {
  id: string;
  title: string;
  author: string;
  owner: string;
  date: string;
  country: string;
  type: Exclude<WorkType, "all">;
  typeLabel: string;
  description: string;
  views: number;
  coverUrl?: string;
  coverStyle?: string;
  rightStampId: string;
  hash?: string;
  timestamp?: string;
  contactEmail?: string;
  phoneMask: string;
  verified: boolean;
  source: "demo" | "user";
};

const DEMO_WORKS: GalleryWork[] = [
  {
    id: "demo-logo-viet",
    title: "LOGO Tinh Hoa Mỹ Thuật Việt",
    author: "Lê Hoàng Thiên Minh",
    owner: "Tinh Hoa Mỹ Thuật Việt",
    date: "2025-03-10",
    country: "Việt Nam",
    type: "design",
    typeLabel: "Tác phẩm mỹ thuật ứng dụng",
    description:
      "Bộ nhận diện logo phát triển cho chương trình Tinh Hoa Mỹ Thuật Việt, kết hợp biểu tượng cánh hoa và bảng màu sáng tạo.",
    views: 762,
    coverStyle: "linear-gradient(135deg, #fff7cf 0%, #f7b4bd 42%, #9fd6e3 72%, #ffffff 100%)",
    rightStampId: "RS-2026-000147",
    hash: "8d7f3b2f2c4d9a1a93f2383e1a8b67c2d10b7f1ac340498a9e87b1d93b62f118",
    timestamp: "2026-07-01T09:24:00.000Z",
    contactEmail: "hello@mythuatviet.vn",
    phoneMask: "...6668",
    verified: true,
    source: "demo",
  },
  {
    id: "demo-poster-summer",
    title: "Poster Mùa Hè 2026",
    author: "Mai An Studio",
    owner: "Mai An Studio",
    date: "2026-05-18",
    country: "Việt Nam",
    type: "image",
    typeLabel: "Poster minh họa",
    description:
      "Poster quảng bá mùa hè với chất liệu minh họa số, tông màu nhiệt đới và bố cục hướng đến chiến dịch social.",
    views: 428,
    coverStyle: "linear-gradient(145deg, #28b8d6 0%, #ffe66d 42%, #ff6b6b 100%)",
    rightStampId: "RS-2026-000219",
    hash: "7287d418116ad61df0e3e49a84238ff43b96b719cfd884319d3a2193922be329",
    timestamp: "2026-06-02T14:10:00.000Z",
    contactEmail: "licensing@maian.vn",
    phoneMask: "...2045",
    verified: true,
    source: "demo",
  },
  {
    id: "demo-album",
    title: "Người Tình Không Đến",
    author: "Ngọc Diệu",
    owner: "ND Entertainment",
    date: "2026-01-22",
    country: "Việt Nam",
    type: "audio",
    typeLabel: "Album single",
    description:
      "Ảnh bìa và metadata cho single nhạc số, phục vụ phát hành trên các nền tảng streaming và truyền thông.",
    views: 1194,
    coverStyle: "linear-gradient(145deg, #08102d 0%, #2432a0 48%, #090812 100%)",
    rightStampId: "RS-2026-000328",
    hash: "fc5c8450c8a4f013f9c9f67be2e7849918f99f65fbd05b3b9c62a08ec942b9a0",
    timestamp: "2026-02-10T08:30:00.000Z",
    contactEmail: "contact@ndent.vn",
    phoneMask: "...7789",
    verified: true,
    source: "demo",
  },
  {
    id: "demo-script",
    title: "Kịch bản Nhà Ven Sông",
    author: "Studio K",
    owner: "Studio K",
    date: "2026-04-04",
    country: "Việt Nam",
    type: "document",
    typeLabel: "Tác phẩm viết",
    description:
      "Tài liệu kịch bản và hồ sơ ý tưởng cho series ngắn về kiến trúc ven sông, lưu vết bản thảo gốc.",
    views: 306,
    coverStyle: "linear-gradient(145deg, #0f766e 0%, #c4f1e7 52%, #ffffff 100%)",
    rightStampId: "RS-2026-000451",
    hash: "a8222d77c37f079fd8d8e2b1b2ced4f08c790fb3f720b58031fd8fd7f20bb320",
    timestamp: "2026-04-05T11:50:00.000Z",
    contactEmail: "studio@k.vn",
    phoneMask: "...1120",
    verified: true,
    source: "demo",
  },
];

const FILTERS: Array<{ value: WorkType; label: string }> = [
  { value: "all", label: "Tất cả" },
  { value: "image", label: "Ảnh" },
  { value: "design", label: "Thiết kế" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Âm nhạc" },
  { value: "document", label: "Văn bản" },
];

export function VerifiedWorksGallery() {
  const [storedWorks, setStoredWorks] = useState<GalleryWork[]>([]);
  const [filter, setFilter] = useState<WorkType>("all");
  const [selectedWork, setSelectedWork] = useState<GalleryWork | null>(null);

  useEffect(() => {
    function refreshWorks() {
      setStoredWorks(readRightStampStoredWorks().map(mapStoredWork));
    }

    refreshWorks();
    window.addEventListener("rightstamp:works-updated", refreshWorks);
    window.addEventListener("storage", refreshWorks);
    return () => {
      window.removeEventListener("rightstamp:works-updated", refreshWorks);
      window.removeEventListener("storage", refreshWorks);
    };
  }, []);

  const works = useMemo(() => {
    const allWorks = [...storedWorks, ...DEMO_WORKS].sort((a, b) => {
      const timeA = new Date(a.timestamp || a.date).getTime();
      const timeB = new Date(b.timestamp || b.date).getTime();
      return timeB - timeA;
    });
    return filter === "all" ? allWorks : allWorks.filter((work) => work.type === filter);
  }, [filter, storedWorks]);

  return (
    <section id="blog" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="rightstamp-red-divider mb-12" />
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-maroon">
              Blog / Gallery
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-normal text-ink md:text-5xl">
              TÁC PHẨM ĐÃ XÁC THỰC TRÊN RIGHTSTAMP
            </h2>
            <p className="mt-4 text-muted-foreground">
              Gallery kết hợp tác phẩm mẫu và tác phẩm người dùng đã tạo mã bản quyền ở Module 2.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm text-muted-foreground shadow-sm">
            <SlidersHorizontal size={16} className="text-maroon" />
            Mới nhất trước
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                filter === item.value
                  ? "border-maroon bg-maroon text-white"
                  : "border-border bg-white text-ink hover:border-maroon/50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <button
              key={work.id}
              type="button"
              onClick={() => setSelectedWork(work)}
              className="group overflow-hidden rounded-2xl border border-border bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-maroon/35 hover:shadow-xl"
            >
              <WorkCover work={work} className="aspect-[4/3]" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-maroon/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-maroon">
                    {work.typeLabel}
                  </span>
                  {work.verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700">
                      <BadgeCheck size={14} />
                      Verified
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-xl leading-tight tracking-normal text-ink">
                  {work.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{work.author}</p>
                <p className="mt-3 text-xs font-semibold text-ink/65">
                  Công bố: {formatDate(work.date)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedWork && (
        <WorkDetailModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </section>
  );
}

function WorkDetailModal({ work, onClose }: { work: GalleryWork; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[120] overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="mx-auto my-8 w-full max-w-6xl overflow-hidden rounded-2xl bg-white text-ink shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-bold text-maroon">
            <BadgeCheck size={18} />
            RightStamp Verified
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

        <div className="grid grid-cols-1 gap-8 p-5 md:p-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
          <WorkCover work={work} className="min-h-[320px] rounded-xl shadow-lg md:min-h-[420px]" />

          <div>
            <h3 className="font-display text-3xl leading-tight tracking-normal text-ink md:text-5xl">
              {work.title}
            </h3>

            <div className="mt-6 rounded-xl border border-border border-l-4 border-l-maroon bg-[#FAFAFA] p-5">
              <InfoLine icon={Eye} label="Lượt xem" value={`${work.views} lượt xem`} />
              <InfoLine icon={BadgeCheck} label="Loại hình tác phẩm" value={work.typeLabel} />
              <InfoLine
                icon={CalendarDays}
                label="Thời điểm sáng tác"
                value={formatDate(work.date)}
              />
              <InfoLine icon={Globe2} label="Quốc gia" value={work.country} />
              <InfoLine
                icon={Hash}
                label="Mã định danh RightStamp"
                value={work.rightStampId}
                mono
              />
              <p className="mt-4 text-sm leading-relaxed text-ink">
                <span className="font-bold">Mô tả: </span>
                {work.description}
              </p>
              {work.hash && (
                <p className="mt-3 break-all font-mono text-xs text-muted-foreground">
                  SHA-256: {work.hash}
                </p>
              )}
              <button
                type="button"
                className="mt-5 bg-maroon px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-maroon-deep"
              >
                {work.source === "user" ? "Yêu cầu cấp phép" : "Liên hệ để mua"}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-5 mb-6 overflow-hidden rounded-xl border border-border md:mx-8">
          <div className="bg-maroon px-5 py-3 text-sm font-bold uppercase tracking-widest text-white">
            Thông tin tác giả và chủ sở hữu
          </div>
          <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
            <OwnerBox
              title="Tác giả"
              name={work.author}
              email={work.contactEmail}
              phone={work.phoneMask}
            />
            <OwnerBox
              title="Chủ sở hữu"
              name={work.owner}
              email={work.contactEmail}
              phone={work.phoneMask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkCover({ work, className = "" }: { work: GalleryWork; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#FAFAFA] ${className}`}>
      {work.coverUrl ? (
        <img src={work.coverUrl} alt={work.title} className="h-full w-full object-cover" />
      ) : (
        <div
          className="grid h-full min-h-full place-items-center p-8"
          style={{ background: work.coverStyle }}
        >
          <div className="max-w-sm text-center">
            <p className="font-display text-3xl leading-tight tracking-normal text-white drop-shadow md:text-5xl">
              {work.title}
            </p>
            <p className="mt-3 text-sm font-bold uppercase tracking-widest text-white/75">
              {work.author}
            </p>
          </div>
        </div>
      )}
      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-maroon shadow">
        {work.rightStampId}
      </div>
    </div>
  );
}

function InfoLine({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="mt-2 flex items-start gap-2 text-sm">
      <Icon size={16} className="mt-0.5 shrink-0 text-maroon" />
      <p>
        <span className="font-bold">{label}: </span>
        <span className={mono ? "font-mono" : ""}>{value}</span>
      </p>
    </div>
  );
}

function OwnerBox({
  title,
  name,
  email,
  phone,
}: {
  title: string;
  name: string;
  email?: string;
  phone: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-white p-4">
      <p className="font-display text-lg leading-tight tracking-normal text-maroon">{title}</p>
      <div className="mt-3 space-y-2 text-sm text-ink">
        <p className="flex items-center gap-2 font-bold">
          <UserRound size={16} />
          {name}
        </p>
        <p className="flex items-center gap-2">
          <Globe2 size={16} />
          Quốc tịch: Việt Nam
        </p>
        <p className="flex items-center gap-2">
          <Phone size={16} />
          Số điện thoại {phone}
        </p>
        {email && (
          <p className="flex items-center gap-2 break-all text-muted-foreground">
            <Mail size={16} />
            {email}
          </p>
        )}
      </div>
    </div>
  );
}

function mapStoredWork(work: RightStampStoredWork): GalleryWork {
  const type = inferWorkType(work.artwork.fileType || "");
  const date = work.artwork.completedDate || work.savedAt;
  return {
    id: work.id,
    title: work.artwork.title || work.artwork.fileName || "Tác phẩm chưa đặt tên",
    author: work.artwork.author || "Creator RightStamp",
    owner: work.artwork.owner || work.artwork.author || "Creator RightStamp",
    date,
    country: "Việt Nam",
    type,
    typeLabel: getTypeLabel(type, work.artwork.fileType),
    description:
      work.artwork.description ||
      "Tác phẩm được người dùng upload và tạo dấu vân tay số trên RightStamp.",
    views: stableViews(work.id),
    coverUrl: work.artwork.previewDataUrl,
    coverStyle: "linear-gradient(145deg, #8B1E1E 0%, #ff7f5f 48%, #111827 100%)",
    rightStampId: work.fingerprint.id,
    hash: work.fingerprint.hash,
    timestamp: work.fingerprint.timestamp,
    contactEmail: work.userEmail,
    phoneMask: "...6668",
    verified: Boolean(work.fingerprint.hash && work.fingerprint.timestamp),
    source: "user",
  };
}

function inferWorkType(fileType: string): Exclude<WorkType, "all"> {
  if (fileType.startsWith("image/")) return "image";
  if (fileType.startsWith("video/")) return "video";
  if (fileType.startsWith("audio/")) return "audio";
  if (fileType.includes("pdf") || fileType.includes("text") || fileType.includes("document")) {
    return "document";
  }
  return "design";
}

function getTypeLabel(type: Exclude<WorkType, "all">, fileType?: string) {
  if (type === "image") return "Tác phẩm hình ảnh";
  if (type === "video") return "Video";
  if (type === "audio") return "Âm nhạc";
  if (type === "document") return fileType?.includes("pdf") ? "Tài liệu PDF" : "Tác phẩm viết";
  return "Thiết kế";
}

function stableViews(id: string) {
  return (id.split("").reduce((total, char) => total + char.charCodeAt(0), 0) % 700) + 128;
}

function formatDate(value: string) {
  if (!value) return "Chưa cập nhật";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
