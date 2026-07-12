import { useEffect, useRef, useState, type TouchEvent } from "react";

const REGISTERED_WORKS = [
  {
    title: "Người Tình Không Đến",
    creator: "Ngọc Diệu",
    category: "Album single",
    visual: "music",
    background:
      "radial-gradient(circle at 74% 22%, rgba(128,160,255,0.55), transparent 24%), linear-gradient(145deg, #08102d 0%, #1f2f91 48%, #070816 100%)",
  },
  {
    title: "Shine Shine Little Sun",
    creator: "Little Sun Studio",
    category: "Minh họa thiếu nhi",
    visual: "kids",
    background: "linear-gradient(180deg, #36c1df 0%, #71dcff 35%, #71c35a 100%)",
  },
  {
    title: "Chín Bậc Tình Yêu",
    creator: "Thanh Loan",
    category: "Bìa sách / thư pháp",
    visual: "calligraphy",
    background:
      "radial-gradient(circle at 20% 20%, rgba(255,218,106,0.55), transparent 28%), linear-gradient(145deg, #fff7de 0%, #fffaf3 55%, #ffd6dd 100%)",
  },
  {
    title: "Tinh Hoa Mỹ Thuật Việt",
    creator: "Mỹ Thuật Việt",
    category: "Logo thương hiệu",
    visual: "logo",
    background: "linear-gradient(135deg, #fff6c9 0%, #f7b7bf 42%, #9fd6e3 72%, #ffffff 100%)",
  },
  {
    title: "Neon District 04",
    creator: "Arcade Lab",
    category: "Game concept art",
    visual: "neon",
    background: "linear-gradient(145deg, #13001f 0%, #4116a6 45%, #ff3d7f 100%)",
  },
  {
    title: "Sài Gòn Mưa Đêm",
    creator: "Linh Phạm",
    category: "Nhiếp ảnh",
    visual: "photo",
    background: "linear-gradient(160deg, #111827 0%, #334155 48%, #94a3b8 100%)",
  },
  {
    title: "Nhà Ven Sông",
    creator: "Studio K",
    category: "Kiến trúc",
    visual: "blueprint",
    background: "linear-gradient(145deg, #063d47 0%, #0f766e 54%, #c4f1e7 100%)",
  },
  {
    title: "Lá Thư Tháng Bảy",
    creator: "Mai An",
    category: "Tập thơ / ebook",
    visual: "poetry",
    background: "linear-gradient(150deg, #1f2933 0%, #5a7d59 50%, #ead7aa 100%)",
  },
] as const;

const TRUSTED_SPARKLES = [
  { top: "9%", left: "18%", size: 12, delay: "0s" },
  { top: "18%", left: "74%", size: 16, delay: "0.6s" },
  { top: "31%", left: "88%", size: 10, delay: "1.1s" },
  { top: "48%", left: "9%", size: 14, delay: "1.5s" },
  { top: "62%", left: "78%", size: 11, delay: "0.3s" },
  { top: "76%", left: "24%", size: 15, delay: "1.9s" },
  { top: "84%", left: "91%", size: 18, delay: "0.9s" },
] as const;

export function TrustedWorksSection() {
  const [active, setActive] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    if (hoverPaused || interactionPaused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % REGISTERED_WORKS.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [hoverPaused, interactionPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  function pauseAfterInteraction() {
    setInteractionPaused(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setInteractionPaused(false), 8000);
  }

  function goTo(index: number) {
    pauseAfterInteraction();
    setActive((index + REGISTERED_WORKS.length) % REGISTERED_WORKS.length);
  }

  function goBy(delta: number) {
    pauseAfterInteraction();
    setActive((current) => (current + delta + REGISTERED_WORKS.length) % REGISTERED_WORKS.length);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartXRef.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const delta = endX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(delta) < 36) return;
    goBy(delta > 0 ? -1 : 1);
  }

  return (
    <section className="relative overflow-hidden bg-[#310406] py-20 text-white md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,104,44,0.28),transparent_30%),linear-gradient(115deg,#8d0019_0%,#4b060a_48%,#130406_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(135deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="rightstamp-light-streak pointer-events-none absolute -bottom-28 left-[28%] h-52 w-[90%] -rotate-[14deg]" />

      {TRUSTED_SPARKLES.map((sparkle) => (
        <span
          key={`${sparkle.left}-${sparkle.top}`}
          className="rightstamp-sparkle pointer-events-none absolute"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: sparkle.delay,
          }}
        />
      ))}

      <div className="container-x relative z-10">
        <h2 className="mx-auto max-w-4xl text-center font-display text-3xl leading-[1.16] tracking-normal text-white md:text-5xl">
          HƠN 800 TỔ CHỨC & 25.000 CREATOR <br className="hidden md:block" />
          ĐÃ TIN TƯỞNG SỬ DỤNG RIGHTSTAMP
        </h2>

        <div
          className="relative mx-auto mt-14 h-[430px] max-w-6xl touch-pan-y md:h-[560px]"
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={() => goBy(-1)}
            className="absolute left-1 top-1/2 z-40 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/10 text-3xl leading-none text-white backdrop-blur transition-colors hover:bg-white/20 md:left-4"
            aria-label="Tác phẩm trước"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goBy(1)}
            className="absolute right-1 top-1/2 z-40 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/10 text-3xl leading-none text-white backdrop-blur transition-colors hover:bg-white/20 md:right-4"
            aria-label="Tác phẩm tiếp theo"
          >
            ›
          </button>

          <div className="absolute inset-x-0 top-0 h-[390px] overflow-hidden [perspective:1400px] md:h-[510px]">
            {REGISTERED_WORKS.map((work, index) => {
              const offset = getCoverflowOffset(index, active, REGISTERED_WORKS.length);
              const abs = Math.abs(offset);
              const visible = abs <= 3;
              const rotate = offset === 0 ? 0 : offset < 0 ? 46 : -46;
              const scale = offset === 0 ? 1 : Math.max(0.56, 1 - abs * 0.14);
              const translate = offset * 255;
              return (
                <button
                  key={work.title}
                  type="button"
                  onClick={() => (offset === 0 ? undefined : goTo(index))}
                  className="absolute left-1/2 top-0 block aspect-[4/5] w-[min(74vw,380px)] overflow-hidden rounded-[1.35rem] border border-white/45 bg-white/10 text-left shadow-[0_28px_80px_rgba(0,0,0,0.45)] transition-[transform,opacity,filter] duration-700 ease-out will-change-transform"
                  style={{
                    transform: `translateX(calc(-50% + ${translate}px)) translateZ(${
                      -abs * 110
                    }px) rotateY(${rotate}deg) scale(${scale})`,
                    opacity: visible ? Math.max(0.12, 1 - abs * 0.25) : 0,
                    zIndex: 40 - abs,
                    filter: abs >= 3 ? "blur(1.5px)" : "none",
                  }}
                  aria-label={`Xem tác phẩm ${work.title}`}
                >
                  <ArtworkCover work={work} active={offset === 0} />
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-2 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 md:bottom-4">
            {REGISTERED_WORKS.map((work, index) => (
              <button
                key={work.title}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  active === index
                    ? "w-9 bg-white shadow-[0_0_18px_rgba(255,255,255,0.75)]"
                    : "w-2.5 bg-white/40"
                }`}
                aria-label={`Chuyển đến ${work.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      <RightStampTipsMarquee />
    </section>
  );
}

function ArtworkCover({
  work,
  active,
}: {
  work: (typeof REGISTERED_WORKS)[number];
  active: boolean;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.25rem]">
      <div className="absolute inset-0" style={{ background: work.background }} />
      <ArtworkVisual visual={work.visual} title={work.title} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-5 pb-5 pt-24">
        <p className="text-xs font-bold uppercase tracking-widest text-white/65">{work.category}</p>
        <h3 className="mt-1 font-display text-2xl leading-tight tracking-normal text-white drop-shadow md:text-3xl">
          {work.title}
        </h3>
        <p className="mt-1 text-sm font-semibold text-white/75">{work.creator}</p>
      </div>
      <div
        className={`absolute right-4 top-4 rounded-full border border-white/35 bg-black/25 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur transition-opacity ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        Verified
      </div>
    </div>
  );
}

function ArtworkVisual({ visual, title }: { visual: string; title: string }) {
  if (visual === "music") {
    return (
      <>
        <div className="absolute left-8 top-8 h-44 w-32 rounded-full bg-white/10 blur-sm" />
        <div className="absolute right-8 top-10 h-32 w-32 rounded-full border border-white/20" />
        <div className="absolute left-8 top-20 font-display text-5xl leading-[0.85] text-white/95 drop-shadow-lg">
          Người
          <br />
          Tình
        </div>
        <div className="absolute bottom-32 left-9 text-2xl font-black uppercase tracking-widest text-white">
          Không Đến
        </div>
      </>
    );
  }

  if (visual === "kids") {
    return (
      <>
        <div className="absolute -right-8 top-5 h-32 w-32 rounded-full bg-yellow-300 shadow-[0_0_45px_rgba(255,221,71,0.8)]" />
        <div className="absolute left-8 top-12 h-12 w-32 rounded-full bg-white/90" />
        <div className="absolute left-20 top-8 h-14 w-40 rounded-full bg-white/80" />
        <div className="absolute inset-x-8 top-32 rounded-xl bg-[#13245a] px-4 py-4">
          <p className="font-display text-5xl leading-none tracking-normal text-cyan-300">SHINE</p>
          <p className="font-display text-5xl leading-none tracking-normal text-yellow-300">
            LITTLE SUN
          </p>
        </div>
        <div className="absolute bottom-32 left-8 flex gap-3">
          {["#ff6f61", "#7dd3fc", "#facc15", "#fb923c"].map((color) => (
            <span
              key={color}
              className="h-10 w-10 rounded-full border-2 border-white/70"
              style={{ background: color }}
            />
          ))}
        </div>
      </>
    );
  }

  if (visual === "calligraphy") {
    return (
      <>
        <div className="absolute inset-8 rounded-[2rem] border-2 border-[#f3ce87]/70" />
        <div className="absolute left-11 top-20 font-display text-5xl leading-[0.95] tracking-normal text-[#9a1456]">
          Chín Bậc
        </div>
        <div className="absolute left-12 top-40 rotate-[-4deg] font-display text-6xl leading-none tracking-normal text-[#bd1b59]">
          Tình Yêu
        </div>
        <div className="absolute bottom-32 left-12 h-16 w-16 rounded-full border border-pink-300/70 bg-pink-200/45" />
        <div className="absolute right-12 top-14 h-28 w-8 rotate-[35deg] rounded-full bg-white/70 blur-sm" />
      </>
    );
  }

  if (visual === "logo") {
    return (
      <>
        <div className="absolute inset-x-0 top-0 h-24 bg-[#bd1534]" />
        <div className="absolute left-1/2 top-28 h-28 w-28 -translate-x-1/2">
          {["bg-red-500", "bg-yellow-400", "bg-blue-500", "bg-green-500"].map((color, index) => (
            <span
              key={color}
              className={`absolute h-16 w-16 rounded-[70%_30%_70%_30%] ${color}`}
              style={{ transform: `rotate(${index * 90}deg) translate(18px)` }}
            />
          ))}
        </div>
        <div className="absolute inset-x-9 top-64 text-center font-display text-2xl leading-tight tracking-normal text-[#334155]">
          TINH HOA
          <br />
          MỸ THUẬT VIỆT
        </div>
      </>
    );
  }

  if (visual === "neon") {
    return (
      <>
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute left-8 top-20 h-48 w-20 skew-x-[-8deg] bg-cyan-400/70" />
        <div className="absolute left-36 top-10 h-60 w-24 skew-x-[-8deg] bg-fuchsia-500/70" />
        <div className="absolute right-10 top-28 h-44 w-24 skew-x-[-8deg] bg-yellow-300/70" />
        <div className="absolute bottom-32 left-8 font-display text-5xl leading-none tracking-normal text-white">
          NEON
          <br />
          04
        </div>
      </>
    );
  }

  if (visual === "photo") {
    return (
      <>
        <div className="absolute inset-8 rounded-[1.5rem] border border-white/50 bg-black/20" />
        <div className="absolute left-14 top-16 h-56 w-40 rounded-t-full bg-gradient-to-b from-white/70 to-white/10" />
        <div className="absolute right-10 top-20 h-48 w-28 rounded-full border border-white/30" />
        <div className="absolute bottom-36 left-10 max-w-[230px] font-display text-4xl leading-none tracking-normal text-white">
          SÀI GÒN
          <br />
          MƯA ĐÊM
        </div>
      </>
    );
  }

  if (visual === "blueprint") {
    return (
      <>
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute left-12 top-24 h-36 w-64 border-4 border-white/75" />
        <div className="absolute left-24 top-44 h-24 w-36 border-4 border-white/60" />
        <div className="absolute bottom-36 left-10 font-display text-4xl leading-none tracking-normal text-white">
          NHÀ
          <br />
          VEN SÔNG
        </div>
      </>
    );
  }

  return (
    <>
      <div className="absolute left-10 top-10 h-72 w-52 rounded-t-full bg-white/20" />
      <div className="absolute left-14 top-20 h-56 w-44 rounded-lg border border-white/45 bg-[#f4e5bd]/80" />
      <div className="absolute left-20 top-32 max-w-[180px] font-display text-4xl leading-none tracking-normal text-[#36513a]">
        {title}
      </div>
      <div className="absolute right-10 top-14 h-28 w-12 rotate-[-18deg] rounded-full bg-green-200/50" />
    </>
  );
}

function RightStampTipsMarquee() {
  const items = Array.from({ length: 8 });
  return (
    <div className="rightstamp-marquee relative z-10 mt-12 overflow-hidden border-y border-white/10 bg-black py-3 text-white">
      <div className="rightstamp-marquee-track flex w-max items-center">
        {[0, 1].map((set) => (
          <div key={set} className="flex shrink-0 items-center gap-5 px-3">
            {items.map((_, index) => (
              <div key={`${set}-${index}`} className="flex items-center gap-5">
                <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/80 bg-maroon text-2xl font-black leading-none text-white">
                  S
                </span>
                <span className="font-display text-2xl tracking-normal text-white md:text-3xl">
                  RIGHTSTAMP
                </span>
                <span className="rounded-sm border border-white/30 bg-white px-4 py-1.5 font-display text-2xl tracking-normal text-ink md:text-3xl">
                  T<span className="text-coral">IP</span>S
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function getCoverflowOffset(index: number, active: number, total: number) {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}
