import { useState, useEffect, useCallback, useRef } from "react";
import { trackMessage } from "@/lib/analytics";

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

const STORAGE_KEY = "lnit-summit-chat";
const WEBHOOK_KEY = "lnit-webhook-url";
const DEFAULT_WEBHOOK = "http://localhost:5678/webhook-test/lnitchatbot";
const SESSION_ID = crypto.randomUUID();

function loadMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getWebhookUrl(): string {
  return localStorage.getItem(WEBHOOK_KEY) || DEFAULT_WEBHOOK;
}

export function setWebhookUrl(url: string) {
  localStorage.setItem(WEBHOOK_KEY, url);
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      text,
      isUser: true,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    trackMessage();

    try {
      const context = messages.slice(-5).map((m) => ({
        role: m.isUser ? "user" : "assistant",
        content: m.text,
      }));

      const webhookUrl = getWebhookUrl();
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: text,
          sessionId: SESSION_ID,
          timestamp: new Date().toISOString(),
          context,
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        text: data.botResponse || data.output || "Thanks for your question! I'll get back to you shortly.",
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      trackMessage();
    } catch {
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        text: "Summit info loading — try again! 🚀",
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { messages, isLoading, sendMessage, clearChat, scrollRef };
}
