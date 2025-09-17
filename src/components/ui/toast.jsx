"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

const Toast = ({ message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message.text, duration, onClose]);

  if (!message.text) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] max-w-sm w-full mx-4"
      >
        <div
          className={`rounded-lg shadow-lg border p-4 flex items-center space-x-3 ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              message.type === "success" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-3 h-3 text-green-600" />
            ) : (
              <XCircle className="w-3 h-3 text-red-600" />
            )}
          </div>
          <p className="flex-1 text-sm font-medium">{message.text}</p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
