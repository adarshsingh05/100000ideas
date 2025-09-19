"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, MessageCircle } from "lucide-react";
import AIChatModal from "./AIChatModal";

export default function AIFloatingButton({ idea }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleOpenModal}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#2D3748] to-[#4A5568] hover:from-[#4A5568] hover:to-[#2D3748] text-[#FDCC29] shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-[#FDCC29]/30 hover:border-[#FDCC29]/60"
            size="lg"
          >
            <Bot className="w-8 h-8" />
          </Button>
        </motion.div>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#2D3748] to-[#4A5568] text-[#FDCC29] px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap shadow-2xl border border-[#FDCC29]/20"
        >
          Ask AI about this idea
          <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-[#4A5568] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
        </motion.div>
      </motion.div>

      {/* AI Chat Modal */}
      <AIChatModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        idea={idea}
      />
    </>
  );
}
