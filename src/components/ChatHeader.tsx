import { useState } from "react";
import { Settings, BarChart3, Share2, X } from "lucide-react";
import { getWebhookUrl, setWebhookUrl } from "@/hooks/useChat";
import { getStats } from "@/lib/analytics";
import lnitLogo from "@/assets/lnit-logo.png";

interface ChatHeaderProps {
  onClearChat: () => void;
  onOpenShare: () => void;
}

const ChatHeader = ({ onClearChat, onOpenShare }: ChatHeaderProps) => {
  const [showConfig, setShowConfig] = useState(false);
  const [webhookUrl, setUrl] = useState(getWebhookUrl());
  const [showStats, setShowStats] = useState(false);
  const stats = getStats();

  const handleSaveWebhook = () => {
    setWebhookUrl(webhookUrl);
    setShowConfig(false);
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <img src={lnitLogo} alt="LNIT Logo" className="h-10 w-10 rounded-lg object-cover shadow-sm" loading="lazy" />
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">LNIT Summit</h1>
            <p className="text-xs text-muted-foreground">Lendi Engineering College • Feb 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowStats(!showStats)} className="p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors" title="Analytics">
            <BarChart3 className="w-4 h-4" />
          </button>
          <button onClick={onOpenShare} className="p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors" title="Share">
            <Share2 className="w-4 h-4" />
          </button>
          <button onClick={() => setShowConfig(!showConfig)} className="p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors" title="Settings">
            <Settings className="w-4 h-4" />
          </button>
          <button onClick={onClearChat} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-muted transition-colors">
            Clear
          </button>
        </div>
      </header>

      {showStats && (
        <div className="mx-4 mt-2 p-3 rounded-xl border border-border bg-card animate-slide-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground">📊 Chat Analytics</span>
            <button onClick={() => setShowStats(false)} className="text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-lg font-bold text-primary">{stats.totalSessions}</p>
              <p className="text-[10px] text-muted-foreground">Sessions</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary">{stats.totalMessages}</p>
              <p className="text-[10px] text-muted-foreground">Messages</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary">{stats.firstVisit ? new Date(stats.firstVisit).toLocaleDateString() : "—"}</p>
              <p className="text-[10px] text-muted-foreground">First Visit</p>
            </div>
          </div>
        </div>
      )}

      {showConfig && (
        <div className="mx-4 mt-2 p-3 rounded-xl border border-border bg-card animate-slide-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground">⚙️ Webhook Config</span>
            <button onClick={() => setShowConfig(false)} className="text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="flex gap-2">
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 text-xs px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="n8n webhook URL"
            />
            <button onClick={handleSaveWebhook} className="text-xs px-3 py-2 rounded-lg gradient-orange text-primary-foreground font-medium">
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
