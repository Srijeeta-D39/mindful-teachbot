
import { useEffect, useState } from "react";

export type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
  isLatest: boolean;
}

const ChatMessage = ({ message, isLatest }: ChatMessageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Small delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4 transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div 
        className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl ${
          message.role === "user" 
            ? "bg-primary text-primary-foreground ml-4 rounded-tr-sm" 
            : "bg-secondary text-secondary-foreground mr-4 rounded-tl-sm"
        } message-appear`}
      >
        <div className="text-sm md:text-base whitespace-pre-wrap">{message.content}</div>
        <div className="text-xs opacity-70 mt-1 text-right">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
