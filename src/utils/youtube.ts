export function parseYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    const v = u.searchParams.get("v");
    if (v) return v;
    const m1 = u.pathname.match(/\/embed\/([^/?#]+)/);
    if (m1?.[1]) return m1[1];
    const m2 = u.pathname.match(/\/shorts\/([^/?#]+)/);
    if (m2?.[1]) return m2[1];
  } catch {}
  return null;
}
