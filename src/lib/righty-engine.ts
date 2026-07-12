import type { RightStampWorkContext } from "@/lib/rightstamp-auth";
import { RIGHTY_FAQ, buildRightyApiMessages, type RightyChatMessage } from "@/lib/righty-knowledge";

export { buildRightyApiMessages };
export type { RightyChatMessage };

export const RIGHTY_SAMPLE_TESTS = [
  "ảnh tôi vẽ được bảo hộ gì",
  "tôi bị người khác đăng lại ảnh không xin phép",
  "RightStamp có thay thế đăng ký bản quyền nhà nước không",
] as const;

type ReplyInput = {
  input: string;
  history: RightyChatMessage[];
  workContext: RightStampWorkContext | null;
};

const SCOPE_KEYWORDS = [
  "rightstamp",
  "ban quyen",
  "quyen tac gia",
  "so huu tri tue",
  "shtt",
  "tac pham",
  "anh",
  "tranh",
  "nhac",
  "video",
  "thiet ke",
  "logo",
  "thuong hieu",
  "nhan hieu",
  "slogan",
  "kieu dang",
  "bi mat kinh doanh",
  "hash",
  "timestamp",
  "watermark",
  "evidence",
  "certificate",
  "qr",
  "vi pham",
  "sao chep",
  "dang lai",
  "go bo",
  "dmca",
  "tiktok",
  "facebook",
  "youtube",
  "shopee",
  "email",
];

export function generateRightyLocalReply({ input, history, workContext }: ReplyInput) {
  const text = input.trim();
  const normalized = normalize(text);
  const knownContext = collectKnownContext(history);
  const workReference = getWorkReference(workContext);

  if (!text) {
    return "Bạn gửi thêm mô tả tác phẩm hoặc tình huống cần xử lý nhé. Righty sẽ hỏi ngắn gọn để phân loại quyền và gợi ý bước tiếp theo.";
  }

  if (isGreeting(normalized)) {
    return `${workReference}Chào bạn, mình là Righty. Mình có thể giúp phân loại quyền SHTT, gợi ý metadata, hướng dẫn xử lý vi phạm và soạn nháp email/takedown dựa trên Evidence Pack.`;
  }

  if (!isInScope(normalized)) {
    return "Mình là Righty, trợ lý quy trình pháp lý số của RightStamp nên mình chỉ hỗ trợ các câu hỏi về tác phẩm, quyền tác giả, SHTT, chứng cứ số, watermark, Evidence Pack và xử lý vi phạm. Bạn mô tả tác phẩm hoặc vụ việc liên quan RightStamp nhé.";
  }

  if (isRegistrationReplacementFaq(normalized)) {
    return `${workReference}${RIGHTY_FAQ[0].answer}\n\nĐây là thông tin tham khảo; nếu bạn chuẩn bị hồ sơ chính thức hoặc đang có tranh chấp, nên liên hệ luật sư/Cục Bản quyền tác giả để được tư vấn chính xác.`;
  }

  if (isOwnershipFaq(normalized)) {
    return `${workReference}${RIGHTY_FAQ[1].answer}`;
  }

  if (isHashTimestampFaq(normalized)) {
    return `${workReference}${RIGHTY_FAQ[2].answer}`;
  }

  if (isEvidencePackFaq(normalized)) {
    return `${workReference}${RIGHTY_FAQ[3].answer}`;
  }

  if (isWatermarkFaq(normalized)) {
    return `${workReference}${RIGHTY_FAQ[4].answer}`;
  }

  if (isLegalWriterRequest(normalized)) {
    return `${workReference}${buildLegalDraft(normalized, workContext)}`;
  }

  if (isInfringementRequest(normalized)) {
    return `${workReference}Mình ghi nhận đây là tình huống nghi vi phạm. Bạn nên đi theo 4 bước:\n\n1. Lưu bằng chứng: chụp màn hình bài đăng/link/tài khoản/thời gian, tải bản nghi vi phạm nếu nền tảng cho phép.\n2. So sánh với tác phẩm gốc: đối chiếu bố cục, chi tiết nhận diện, watermark có bị cắt/xóa không, có chỉnh màu/crop/cắt ghép không, có dùng thương mại trái phép không.\n3. Xuất Evidence Pack trên RightStamp: file gốc, hash, timestamp, certificate, ảnh chụp bên vi phạm, bảng so sánh và tuyên bố quyền.\n4. Chọn mức phản hồi: nhắc nhở nhẹ nếu có thể là vô ý; email cảnh báo nếu họ tiếp tục sử dụng; đơn yêu cầu gỡ bỏ nếu đăng trên Facebook/TikTok/Shopee/YouTube hoặc có dấu hiệu thương mại rõ.\n\nĐây là thông tin tham khảo, bạn nên liên hệ luật sư/Cục Bản quyền tác giả nếu vụ việc có giá trị lớn, bị phản tố hoặc cần gửi văn bản chính thức.`;
  }

  if (isMetadataRequest(normalized)) {
    return `${workReference}${buildMetadataSuggestion(text, workContext, knownContext)}`;
  }

  if (isClassifierRequest(normalized)) {
    return `${workReference}${buildClassifierReply(normalized, knownContext)}`;
  }

  return `${workReference}Mình có thể hỗ trợ theo 4 hướng: phân loại quyền SHTT, gợi ý metadata, phân tích dấu hiệu vi phạm, hoặc soạn nháp email/takedown. Với thông tin hiện tại, bạn cho mình biết thêm: loại tác phẩm là gì, mục đích sử dụng, có yếu tố thương hiệu/logo/slogan không, và bạn đang muốn đăng ký chứng cứ hay xử lý vi phạm?`;
}

function buildClassifierReply(normalized: string, knownContext: string) {
  const hasBrandSignal = includesAny(normalized, ["logo", "thuong hieu", "slogan", "nhan hieu"]);
  const hasProductShapeSignal = includesAny(normalized, [
    "hinh dang san pham",
    "bao bi",
    "kieu dang",
  ]);
  const hasSecretSignal = includesAny(normalized, [
    "thuat toan",
    "cong thuc",
    "quy trinh",
    "bi mat",
  ]);
  const isImageOrArtwork = includesAny(normalized, ["anh", "tranh", "ve", "minh hoa", "poster"]);

  const suggestions: string[] = [];
  if (
    isImageOrArtwork ||
    includesAny(normalized, ["nhac", "video", "van ban", "phan mem", "thiet ke"])
  ) {
    suggestions.push(
      "Quyền tác giả: phù hợp với ảnh/tranh/minh họa/thiết kế/video/nhạc/văn bản/phần mềm khi đã được thể hiện dưới dạng cụ thể.",
    );
  }
  if (hasBrandSignal) {
    suggestions.push(
      "Nhãn hiệu: cân nhắc nếu tác phẩm là logo, tên thương hiệu hoặc slogan dùng để phân biệt hàng hóa/dịch vụ.",
    );
  }
  if (hasProductShapeSignal) {
    suggestions.push(
      "Kiểu dáng công nghiệp: cân nhắc nếu phần bạn cần bảo vệ là hình dáng bên ngoài của sản phẩm có tính mới và sáng tạo.",
    );
  }
  if (hasSecretSignal) {
    suggestions.push(
      "Bí mật kinh doanh: cân nhắc nếu đó là quy trình/thuật toán/công thức không phổ biến, có giá trị thương mại và được bảo mật.",
    );
  }

  const base = suggestions.length
    ? suggestions.join("\n")
    : "Khả năng có thể liên quan quyền tác giả, nhãn hiệu, kiểu dáng công nghiệp hoặc bí mật kinh doanh tùy bản chất tác phẩm.";

  return `${knownContext ? `Mình ghi nhận thêm từ hội thoại: ${knownContext}\n\n` : ""}${base}\n\nMình chưa nên kết luận tuyệt đối khi thiếu dữ kiện. Bạn trả lời giúp 3 ý: file là ảnh/tranh/thiết kế/logo hay gì; mục đích dùng để trưng bày, bán sản phẩm hay nhận diện thương hiệu; có yếu tố logo/slogan/hình dáng sản phẩm/quy trình bí mật không?`;
}

function buildMetadataSuggestion(
  input: string,
  workContext: RightStampWorkContext | null,
  knownContext: string,
) {
  const title = workContext?.artwork.title || guessTitle(input) || "Tác phẩm chưa đặt tên";
  const author = workContext?.artwork.author || "Tên tác giả/chủ sở hữu";
  const baseKeywords = inferKeywords(input, workContext).join(", ");

  return `${knownContext ? `Dựa trên thông tin bạn đã cung cấp (${knownContext}), ` : ""}mình gợi ý metadata cho Module 1 như sau:\n\nTên tác phẩm: ${title}\nTác giả: ${author}\nMô tả ngắn: Tác phẩm ${title} được ghi nhận nhằm lưu dấu thời điểm sáng tạo, file gốc và tuyên bố quyền của tác giả/chủ sở hữu.\nTừ khóa: ${baseKeywords}\nTuyên bố quyền: Tôi xác nhận là tác giả/chủ sở hữu hợp pháp của tác phẩm và yêu cầu RightStamp ghi nhận chứng cứ quyền tác giả cho phiên bản file này.`;
}

function buildLegalDraft(normalized: string, workContext: RightStampWorkContext | null) {
  const title = workContext?.artwork.title || "[Tên tác phẩm]";
  const code = workContext?.fingerprint?.id || "[Mã RightStamp nếu có]";
  const hash = workContext?.fingerprint?.hash
    ? shortHash(workContext.fingerprint.hash)
    : "[Hash nếu có]";

  if (includesAny(normalized, ["nhac nho", "nhe nhang", "lich su"])) {
    return `Mẫu email nhắc nhở nhẹ nhàng:\n\nXin chào,\n\nMình là chủ sở hữu/tác giả của tác phẩm "${title}". Mình nhận thấy nội dung này đang được sử dụng/đăng lại trên kênh của bạn. Có thể đây là nhầm lẫn hoặc bạn chưa kịp xin phép, nên mình mong bạn vui lòng gỡ nội dung hoặc liên hệ để trao đổi cấp phép sử dụng.\n\nThông tin chứng cứ ban đầu: ${code}, hash ${hash}.\n\nCảm ơn bạn đã hợp tác.`;
  }

  if (
    includesAny(normalized, [
      "dmca",
      "go bo",
      "takedown",
      "facebook",
      "tiktok",
      "shopee",
      "youtube",
    ])
  ) {
    return `Mẫu đơn yêu cầu gỡ bỏ nội dung:\n\nNền tảng nhận yêu cầu: [Facebook/TikTok/Shopee/YouTube]\nNgười gửi: [Tên chủ sở hữu]\nTác phẩm gốc: "${title}"\nThông tin chứng cứ: ${code}, hash ${hash}\nLink nội dung vi phạm: [Dán link]\n\nTôi xác nhận, với thiện chí và hiểu biết của mình, nội dung nêu trên sử dụng tác phẩm thuộc quyền của tôi mà chưa được cho phép. Tôi yêu cầu nền tảng xem xét gỡ bỏ hoặc hạn chế truy cập nội dung vi phạm.\n\nĐây là bản nháp tham khảo. Bạn nên kiểm tra quy định từng nền tảng và tham khảo luật sư trước khi gửi chính thức.`;
  }

  return `Mẫu email cảnh báo bản quyền:\n\nKính gửi [Tên bên vi phạm],\n\nTôi là tác giả/chủ sở hữu của tác phẩm "${title}". Qua kiểm tra, tôi nhận thấy tác phẩm này đang được sử dụng mà chưa có sự đồng ý của tôi. Tác phẩm đã được RightStamp ghi nhận chứng cứ ban đầu với mã ${code}, hash ${hash}.\n\nTheo nguyên tắc của Luật Sở hữu trí tuệ Việt Nam, quyền tác giả phát sinh khi tác phẩm được sáng tạo và thể hiện dưới hình thức vật chất nhất định. Việc sử dụng, sao chép, đăng tải hoặc khai thác thương mại khi chưa được phép có thể xâm phạm quyền tác giả/chủ sở hữu.\n\nVui lòng gỡ bỏ nội dung hoặc liên hệ với tôi trong vòng [số ngày] ngày để xử lý cấp phép.\n\nĐây là thông tin tham khảo, bạn nên xác minh lại với luật sư trước khi gửi văn bản chính thức.`;
}

function isClassifierRequest(normalized: string) {
  return includesAny(normalized, [
    "bao ho gi",
    "duoc bao ho",
    "phan loai",
    "quyen nao",
    "quyen sht",
    "anh toi ve",
    "toi ve",
    "tac pham nay",
  ]);
}

function isMetadataRequest(normalized: string) {
  return includesAny(normalized, ["metadata", "tu khoa", "mo ta", "dien form", "goi y tieu de"]);
}

function isInfringementRequest(normalized: string) {
  return includesAny(normalized, [
    "vi pham",
    "sao chep",
    "dang lai",
    "khong xin phep",
    "an cap",
    "copy",
    "lay anh",
    "dung trai phep",
  ]);
}

function isLegalWriterRequest(normalized: string) {
  return includesAny(normalized, [
    "soan",
    "email",
    "canh bao",
    "nhac nho",
    "dmca",
    "takedown",
    "don yeu cau",
    "go bo",
  ]);
}

function isGreeting(normalized: string) {
  return ["hi", "hello", "xin chao", "chao", "righty oi"].includes(normalized);
}

function isInScope(normalized: string) {
  return includesAny(normalized, SCOPE_KEYWORDS);
}

function includesAny(value: string, keywords: string[]) {
  return keywords.some((keyword) => value.includes(keyword));
}

function isRegistrationReplacementFaq(normalized: string) {
  return (
    includesAny(normalized, ["thay the", "thay cho", "co thay dang ky"]) &&
    includesAny(normalized, [
      "dang ky ban quyen",
      "dang ky quyen tac gia",
      "giay chung nhan",
      "nha nuoc",
      "cuc ban quyen",
    ])
  );
}

function isOwnershipFaq(normalized: string) {
  return (
    includesAny(normalized, ["mat quyen", "mat quyen so huu", "chuyen nhuong", "quyen so huu"]) &&
    includesAny(normalized, ["rightstamp", "upload", "tai len", "tai tac pham"])
  );
}

function isHashTimestampFaq(normalized: string) {
  return (
    includesAny(normalized, ["hash", "ma hash"]) &&
    includesAny(normalized, ["timestamp", "dau thoi gian", "thoi diem"])
  );
}

function isEvidencePackFaq(normalized: string) {
  return includesAny(normalized, ["evidence pack", "ho so chung cu", "goi chung cu"]);
}

function isWatermarkFaq(normalized: string) {
  return (
    normalized.includes("watermark") &&
    includesAny(normalized, ["an", "nhin thay", "visible", "khac"])
  );
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .replace(/\s+/g, " ")
    .trim();
}

function getWorkReference(workContext: RightStampWorkContext | null) {
  const title = workContext?.artwork.title;
  const code = workContext?.fingerprint?.id;
  const hash = workContext?.fingerprint?.hash;

  if (title && code && hash) {
    return `Mình đang thấy tác phẩm "${title}" của bạn đã có mã ${code} và hash SHA-256 ${shortHash(hash)}. Đây có thể dùng làm chứng cứ kỹ thuật ban đầu.\n\n`;
  }

  if (title) {
    return `Mình đang thấy tác phẩm "${title}" trong workspace RightStamp của bạn. Nếu bạn tạo mã ở Module 2, mình sẽ tham chiếu thêm hash và timestamp.\n\n`;
  }

  return "";
}

function shortHash(value: string) {
  return value.length > 18 ? `${value.slice(0, 12)}…${value.slice(-8)}` : value;
}

function collectKnownContext(history: RightyChatMessage[]) {
  const userText = history
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join(" ");
  const normalized = normalize(userText);
  const facts: string[] = [];

  if (includesAny(normalized, ["logo", "thuong hieu", "slogan"]))
    facts.push("có yếu tố thương hiệu/logo/slogan");
  if (includesAny(normalized, ["anh", "tranh", "ve", "minh hoa"]))
    facts.push("tác phẩm dạng ảnh/tranh/minh họa");
  if (includesAny(normalized, ["ban hang", "thuong mai", "san pham"]))
    facts.push("có mục đích thương mại");
  if (includesAny(normalized, ["bi mat", "thuat toan", "quy trinh"]))
    facts.push("có thông tin/quy trình cần bảo mật");

  return facts.join(", ");
}

function inferKeywords(input: string, workContext: RightStampWorkContext | null) {
  const source = normalize(
    `${input} ${workContext?.artwork.description ?? ""} ${workContext?.artwork.fileType ?? ""}`,
  );
  const keywords = new Set(["quyền tác giả", "RightStamp", "chứng cứ số"]);
  if (includesAny(source, ["anh", "image", "jpg", "png", "tranh", "ve"])) {
    keywords.add("hình ảnh");
    keywords.add("minh họa");
  }
  if (includesAny(source, ["logo", "thuong hieu"])) keywords.add("nhận diện thương hiệu");
  if (includesAny(source, ["nhac", "audio", "mp3"])) keywords.add("âm nhạc");
  if (includesAny(source, ["video", "mp4"])) keywords.add("video");
  if (includesAny(source, ["phan mem", "code"])) keywords.add("phần mềm");
  return Array.from(keywords).slice(0, 8);
}

function guessTitle(input: string) {
  const quoted = input.match(/["“”']([^"“”']+)["“”']/);
  return quoted?.[1];
}
