export type AuthMode = "login" | "register";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type StoredUser = AuthUser & {
  password: string;
};

const USERS_KEY = "rightstamp_users_v1";
const SESSION_KEY = "rightstamp_session_v1";
const WORKS_KEY = "rightstamp_works_v1";
const CURRENT_WORK_KEY = "rightstamp_current_work_v1";

export type RightStampWorkContext = {
  updatedAt: string;
  artwork: {
    fileName?: string;
    fileType?: string;
    fileSize?: number;
    title?: string;
    author?: string;
    owner?: string;
    completedDate?: string;
    description?: string;
    rightsStatement?: string;
  };
  fingerprint?: {
    id: string;
    hash: string;
    timestamp: string;
    verifyUrl: string;
  } | null;
};

export function readRightStampSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const session =
    readStorage<{ email: string }>(window.localStorage, SESSION_KEY) ??
    readStorage<{ email: string }>(window.sessionStorage, SESSION_KEY);
  if (!session?.email) return null;
  const users = readUsers();
  const found = users.find((u) => u.email === session.email);
  return found ? toAuthUser(found) : null;
}

export function clearRightStampSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}

export function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  return readStorage<StoredUser[]>(window.localStorage, USERS_KEY) ?? [];
}

export function writeUsers(users: StoredUser[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function persistSession(user: StoredUser, remember: boolean) {
  const storage = remember ? window.localStorage : window.sessionStorage;
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
  storage.setItem(SESSION_KEY, JSON.stringify({ email: user.email }));
}

export function toAuthUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export function saveWorkSnapshot(
  user: AuthUser | null,
  artwork: {
    fileName: string;
    fileType: string;
    fileSize: number;
    title: string;
    author: string;
    owner: string;
    completedDate: string;
    description: string;
    rightsStatement: string;
  },
  fingerprint: {
    id: string;
    hash: string;
    timestamp: string;
    qrDataUrl: string;
    verifyUrl: string;
  },
) {
  if (typeof window === "undefined" || !user) return;
  const current = readStorage<Array<Record<string, unknown>>>(window.localStorage, WORKS_KEY) ?? [];
  const next = [
    {
      id: fingerprint.id,
      userEmail: user.email,
      savedAt: new Date().toISOString(),
      artwork,
      fingerprint,
    },
    ...current.filter((item) => item.id !== fingerprint.id),
  ].slice(0, 20);
  window.localStorage.setItem(WORKS_KEY, JSON.stringify(next));
}

export function saveRightStampCurrentWork(context: RightStampWorkContext) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CURRENT_WORK_KEY, JSON.stringify(context));
}

export function readRightStampCurrentWork(): RightStampWorkContext | null {
  if (typeof window === "undefined") return null;
  const current = readStorage<RightStampWorkContext>(window.localStorage, CURRENT_WORK_KEY);
  if (current) return current;

  const savedWorks = readStorage<Array<Record<string, unknown>>>(window.localStorage, WORKS_KEY);
  const latest = savedWorks?.[0] as
    | {
        artwork?: RightStampWorkContext["artwork"];
        fingerprint?: RightStampWorkContext["fingerprint"];
        savedAt?: string;
      }
    | undefined;

  if (!latest?.artwork) return null;
  return {
    updatedAt: latest.savedAt ?? new Date().toISOString(),
    artwork: latest.artwork,
    fingerprint: latest.fingerprint ?? null,
  };
}

function readStorage<T>(storage: Storage, key: string): T | null {
  try {
    const value = storage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}
