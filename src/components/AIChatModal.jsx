"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { geminiService } from "@/lib/geminiService";
import { X, Send, Bot, User, Loader2, MessageCircle } from "lucide-react";

export default function AIChatModal({ isOpen, onClose, idea }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with welcome message when modal opens
  useEffect(() => {
    if (isOpen && idea && messages.length === 0) {
      const welcomeMessage = geminiService.getWelcomeMessage(idea.title);
      setMessages([
        {
          id: Date.now(),
          role: "assistant",
          content: welcomeMessage,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, idea, messages.length]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Get conversation history for context
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await geminiService.sendMessage(
        idea,
        userMessage.content,
        conversationHistory
      );

      if (response.success) {
        const aiMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: response.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "I'm sorry, something went wrong. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    setMessages([]);
    setInputMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2D3748] to-[#4A5568] text-white p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-[#FDCC29] rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-4 h-4 text-[#2D3748]" />
              </div>
              <div>
                <h3 className="font-semibold text-base">AI Assistant</h3>
                <p className="text-xs text-white/80 truncate max-w-[200px]">
                  Ask about "{idea?.title}"
                </p>
              </div>
            </div>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 h-[calc(100%-120px)]">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                 <div
                   className={`flex items-start space-x-2 max-w-[85%] ${
                     message.role === "user"
                       ? "flex-row-reverse space-x-reverse"
                       : ""
                   }`}
                 >
                   <div
                     className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                       message.role === "user" ? "bg-[#FDCC29]" : "bg-[#2D3748]"
                     }`}
                   >
                     {message.role === "user" ? (
                       <User className="w-3 h-3 text-[#2D3748]" />
                     ) : (
                       <Bot className="w-3 h-3 text-white" />
                     )}
                   </div>
                   <div
                     className={`rounded-xl px-3 py-2 ${
                       message.role === "user"
                         ? "bg-[#FDCC29] text-[#2D3748]"
                         : "bg-gray-100 text-[#2D3748]"
                     }`}
                   >
                     <p className="text-xs leading-relaxed whitespace-pre-wrap">
                       {message.content}
                     </p>
                     <p
                       className={`text-[10px] mt-1 ${
                         message.role === "user"
                           ? "text-[#2D3748]/60"
                           : "text-gray-500"
                       }`}
                     >
                       {message.timestamp.toLocaleTimeString([], {
                         hour: "2-digit",
                         minute: "2-digit",
                       })}
                     </p>
                   </div>
                 </div>
              </motion.div>
            ))}

             {isLoading && (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex justify-start"
               >
                 <div className="flex items-start space-x-2">
                   <div className="w-6 h-6 bg-[#2D3748] rounded-full flex items-center justify-center">
                     <Bot className="w-3 h-3 text-white" />
                   </div>
                   <div className="bg-gray-100 rounded-xl px-3 py-2">
                     <div className="flex items-center space-x-2">
                       <Loader2 className="w-3 h-3 animate-spin text-[#FDCC29]" />
                       <span className="text-xs text-gray-600">
                         AI is thinking...
                       </span>
                     </div>
                   </div>
                 </div>
               </motion.div>
             )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-center space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about this idea..."
                className="flex-1 text-sm focus:ring-[#FDCC29]/20 focus:border-[#FDCC29] h-8"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#2D3748] px-3 h-8"
                size="sm"
              >
                {isLoading ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Send className="w-3 h-3" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
