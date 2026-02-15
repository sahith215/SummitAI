import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  animate?: boolean;
}

const ChatMessage = ({ message, isUser, animate = false }: ChatMessageProps) => {
  const [displayedText, setDisplayedText] = useState(animate ? "" : message);

  useEffect(() => {
    if (!animate) {
      setDisplayedText(message);
      return;
    }

    let i = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      i++;
      setDisplayedText(message.slice(0, i));
      if (i >= message.length) clearInterval(interval);
    }, 12);

    return () => clearInterval(interval);
  }, [message, animate]);

  // 🔥 USER MESSAGE (no markdown needed)
  if (isUser) {
    return (
      <div className="flex justify-end px-4 py-1.5 animate-slide-up">
        <div className="gradient-orange text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%] shadow-sm">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>
      </div>
    );
  }

  // 🔥 AI MESSAGE (markdown rendered)
  return (
    <div className="flex justify-start px-4 py-1.5 animate-slide-up">
      <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%] shadow-sm">
        <div className="text-sm leading-relaxed text-foreground prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>
            {displayedText}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
