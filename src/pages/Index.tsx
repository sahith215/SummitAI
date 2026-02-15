import { useState } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import QuickLinks from "@/components/QuickLinks";
import TypingIndicator from "@/components/TypingIndicator";
import ShareModal from "@/components/ShareModal";
import { useChat } from "@/hooks/useChat";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { messages, isLoading, sendMessage, clearChat, scrollRef } = useChat();
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-background">
      <ChatHeader onClearChat={clearChat} onOpenShare={() => setShareOpen(true)} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4 px-6 py-12 text-center animate-fade-in">
            <div className="gradient-orange p-4 rounded-2xl shadow-md">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Welcome to LNIT Summit! 🎉</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Ask me anything about the schedule, speakers, venue, or registration for Lendi Engineering College's tech summit.
            </p>
            <QuickLinks onSelect={sendMessage} />
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} animate={!msg.isUser && i === messages.length - 1} />
        ))}

        {isLoading && <TypingIndicator />}
      </div>

      {messages.length > 0 && <QuickLinks onSelect={sendMessage} />}
      <ChatInput onSend={sendMessage} disabled={isLoading} />

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
};

export default Index;
