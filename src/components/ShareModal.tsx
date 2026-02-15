import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, X } from "lucide-react";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareModal = ({ open, onClose }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const baseUrl = window.location.origin;
  const embedUrl = `${baseUrl}/embed`;
  const iframeCode = `<iframe src="${embedUrl}" width="400" height="600" style="border:none;border-radius:16px;" title="LNIT Summit Chatbot"></iframe>`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl border border-border shadow-xl max-w-sm w-full p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">Share LNIT Summit Bot</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex justify-center mb-4">
          <div className="p-3 bg-background rounded-xl border border-border">
            <QRCodeSVG value={baseUrl} size={160} fgColor="hsl(210,100%,12%)" bgColor="transparent" />
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground mb-4">Scan to open the chatbot on mobile</p>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Direct Link</label>
            <div className="flex items-center gap-2 mt-1">
              <input readOnly value={baseUrl} className="flex-1 text-xs px-3 py-2 rounded-lg bg-background border border-border text-foreground" />
              <button onClick={() => handleCopy(baseUrl)} className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Embed Code</label>
            <div className="flex items-center gap-2 mt-1">
              <input readOnly value={iframeCode} className="flex-1 text-xs px-3 py-2 rounded-lg bg-background border border-border text-foreground truncate" />
              <button onClick={() => handleCopy(iframeCode)} className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
