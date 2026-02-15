import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import QuickLinks from "@/components/QuickLinks";
import TypingIndicator from "@/components/TypingIndicator";
import { useChat } from "@/hooks/useChat";
import { Sparkles } from "lucide-react";

const Embed = () => {
  const { messages, isLoading, sendMessage, clearChat, scrollRef } = useChat();

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/80">
        <div className="flex items-center gap-2">
          <div className="gradient-orange p-1.5 rounded-lg">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-foreground">LNIT Summit</span>
        </div>
        <button onClick={clearChat} className="text-[10px] px-2 py-1 rounded-full border border-border text-muted-foreground hover:bg-muted transition-colors">
          Clear
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 px-4 py-8 text-center animate-fade-in">
            <p className="text-sm font-semibold text-foreground">Ask about LNIT Summit! 🎉</p>
            <QuickLinks onSelect={sendMessage} />
          </div>
        )}
        {messages.map((msg, i) => (
          <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} animate={!msg.isUser && i === messages.length - 1} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};

export default Embed;
