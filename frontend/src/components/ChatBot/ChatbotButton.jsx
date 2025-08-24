import React, { useState } from 'react';
import './ChatbotButton.css';
import ChatbotDialog from './ChatbotDialog';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbot-container">
      {isOpen && <ChatbotDialog onClose={() => setIsOpen(false)} />}
      <button 
        className="chatbot-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fas fa-robot"></i>
      </button>
    </div>
  );
};

export default ChatbotButton;