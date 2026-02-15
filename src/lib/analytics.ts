const ANALYTICS_KEY = "lnit-summit-analytics";

interface Analytics {
  totalSessions: number;
  totalMessages: number;
  firstVisit: string;
  lastVisit: string;
}

function getAnalytics(): Analytics {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    totalSessions: 0,
    totalMessages: 0,
    firstVisit: new Date().toISOString(),
    lastVisit: new Date().toISOString(),
  };
}

function saveAnalytics(a: Analytics) {
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(a));
}

export function trackSession() {
  const a = getAnalytics();
  a.totalSessions += 1;
  a.lastVisit = new Date().toISOString();
  saveAnalytics(a);
}

export function trackMessage() {
  const a = getAnalytics();
  a.totalMessages += 1;
  saveAnalytics(a);
}

export function getStats(): Analytics {
  return getAnalytics();
}
