// ChatbotDialog.jsx
import React, { useEffect, useRef } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";
import "./ChatbotDialog.css";

const ChatbotDialog = ({ onClose }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Inject n8n chat widget inside modal
    if (chatContainerRef.current) {
      chatContainerRef.current.innerHTML = ""; // Reset before re-init

      createChat({
        webhookUrl: `${import.meta.env.VITE_N8N_URL}`,
        target: chatContainerRef.current, // Mount inside modal
        mode: "fullscreen", // or "embedded"
        theme: {
          primaryColor: "#2196F3",
          secondaryColor: "#1976D2",
          backgroundColor: "#f5faff",
          textColor: "#333",
        },
      });
    }
  }, []);

  return (
    <div className="chatbot-dialog-overlay">
      <div className="chatbot-dialog">
        <div className="chatbot-header">
          <h3>Virtual Health Assistant 🩺</h3>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="chatbot-content" ref={chatContainerRef}></div>
      </div>
    </div>
  );
};

export default ChatbotDialog;
