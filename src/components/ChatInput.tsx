import { useState, useRef } from "react";
import { Rocket } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [value, setValue] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(handleSubmit, 50);
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-border bg-card/90 backdrop-blur-sm px-4 py-3">
      <div className="flex items-center gap-2 max-w-2xl mx-auto">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about LNIT Summit..."
          disabled={disabled}
          className="flex-1 px-4 py-2.5 rounded-full bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="gradient-rainbow-animate p-2.5 rounded-full text-primary-foreground shadow-md hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 disabled:hover:scale-100"
          aria-label="Send message"
        >
          <Rocket className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
