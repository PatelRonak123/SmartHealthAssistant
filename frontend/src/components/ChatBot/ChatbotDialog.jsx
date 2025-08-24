import React, { useState, useEffect, useRef } from 'react';
import './ChatbotDialog.css';

const ChatbotDialog = ({ onClose }) => {
  const [messages, setMessages] = useState([{
    text: "Hello! I'm your healthcare assistant. How can I help you today?\n1. Book an appointment\n2. Check available time slots\n3. Cancel appointment",
    sender: 'bot'
  }]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState('initial');
  const [isTyping, setIsTyping] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    date: '',
    time: ''
  });

  // Auto-scroll refs
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const departments = [
    'Cardiology',
    'Orthopedics',
    'Pediatrics',
    'General Medicine',
    'Dentistry'
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

  const handleBotResponse = (userInput) => {
    switch (currentStep) {
      case 'initial':
        if (userInput.toLowerCase().includes('1') || userInput.toLowerCase().includes('book')) {
          setCurrentStep('name');
          return {
            text: "Please enter your full name:",
            sender: 'bot'
          };
        }
        if (userInput.toLowerCase().includes('2') || userInput.toLowerCase().includes('check')) {
          return {
            text: `Available time slots for today:\n${timeSlots.map((time, index) => `${index + 1}. ${time}`).join('\n')}\n\nWould you like to book an appointment? Type '1' to book.`,
            sender: 'bot'
          };
        }
        if (userInput.toLowerCase().includes('3') || userInput.toLowerCase().includes('cancel')) {
          return {
            text: "To cancel an appointment, please provide your booking reference number or contact our reception at +1-234-567-8900.",
            sender: 'bot'
          };
        }
        return {
          text: "I'm not sure I understand. Please select from the available options:\n1. Book an appointment\n2. Check available time slots\n3. Cancel appointment",
          sender: 'bot'
        };

      case 'name':
        if (userInput.trim().length > 2) {
          setAppointmentDetails(prev => ({ ...prev, name: userInput }));
          setCurrentStep('email');
          return {
            text: `Thank you, ${userInput}! Please enter your email address:`,
            sender: 'bot'
          };
        }
        return {
          text: "Please enter a valid name (at least 3 characters).",
          sender: 'bot'
        };

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(userInput)) {
          setAppointmentDetails(prev => ({ ...prev, email: userInput }));
          setCurrentStep('phone');
          return {
            text: "Great! Now please enter your phone number (with country code if international):",
            sender: 'bot'
          };
        }
        return {
          text: "Please enter a valid email address (e.g., john@example.com).",
          sender: 'bot'
        };

      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = userInput.replace(/[\s\-\(\)]/g, '');
        
        if (phoneRegex.test(cleanPhone) && cleanPhone.length >= 10) {
          setAppointmentDetails(prev => ({ ...prev, phone: userInput }));
          setCurrentStep('department');
          return {
            text: `Perfect! Please select a department:\n${departments.map((dept, index) => `${index + 1}. ${dept}`).join('\n')}`,
            sender: 'bot'
          };
        }
        return {
          text: "Please enter a valid phone number (at least 10 digits). Examples:\n• +1234567890\n• 123-456-7890\n• (123) 456-7890",
          sender: 'bot'
        };

      case 'department':
        const deptIndex = parseInt(userInput) - 1;
        if (deptIndex >= 0 && deptIndex < departments.length) {
          setAppointmentDetails(prev => ({ ...prev, department: departments[deptIndex] }));
          setCurrentStep('date');
          return {
            text: `You selected ${departments[deptIndex]}. Please enter your preferred date (DD/MM/YYYY):`,
            sender: 'bot'
          };
        }
        return {
          text: "Please select a valid department number (1-5).",
          sender: 'bot'
        };

      case 'date':
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
        if (dateRegex.test(userInput)) {
          const inputDate = new Date(userInput.split('/').reverse().join('-'));
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (inputDate >= today) {
            setAppointmentDetails(prev => ({ ...prev, date: userInput }));
            setCurrentStep('time');
            return {
              text: `Perfect! Please select a time slot:\n${timeSlots.map((time, index) => `${index + 1}. ${time}`).join('\n')}`,
              sender: 'bot'
            };
          } else {
            return {
              text: "Please select a future date. Past dates are not available for booking.",
              sender: 'bot'
            };
          }
        }
        return {
          text: "Please enter a valid date in DD/MM/YYYY format (e.g., 25/12/2024).",
          sender: 'bot'
        };

      case 'time':
        const timeIndex = parseInt(userInput) - 1;
        if (timeIndex >= 0 && timeIndex < timeSlots.length) {
          setAppointmentDetails(prev => ({ ...prev, time: timeSlots[timeIndex] }));
          setCurrentStep('confirmation');
          return {
            text: `📋 Appointment Summary:\n\n👤 Name: ${appointmentDetails.name}\n📧 Email: ${appointmentDetails.email}\n📱 Phone: ${appointmentDetails.phone}\n🩺 Department: ${appointmentDetails.department}\n📅 Date: ${appointmentDetails.date}\n⏰ Time: ${timeSlots[timeIndex]}\n\nType 'confirm' to book or 'cancel' to start over.`,
            sender: 'bot'
          };
        }
        return {
          text: "Please select a valid time slot number (1-6).",
          sender: 'bot'
        };

      case 'confirmation':
        if (userInput.toLowerCase() === 'confirm') {
          setCurrentStep('initial');
          const confirmedDetails = { ...appointmentDetails };
          setAppointmentDetails({
            name: '',
            email: '',
            phone: '',
            department: '',
            date: '',
            time: ''
          });
          return {
            text: `✅ Appointment Confirmed!\n\n🎉 Your appointment has been successfully booked!\n\n📋 Booking Details:\n👤 Name: ${confirmedDetails.name}\n📧 Email: ${confirmedDetails.email}\n📱 Phone: ${confirmedDetails.phone}\n🩺 Department: ${confirmedDetails.department}\n📅 Date: ${confirmedDetails.date}\n⏰ Time: ${confirmedDetails.time}\n\n📧 A confirmation email will be sent shortly.\n📞 Our hospital team may contact you later if any additional information is required regarding your ${confirmedDetails.department} consultation.\n\nIs there anything else I can help you with?`,
            sender: 'bot'
          };
        } else if (userInput.toLowerCase() === 'cancel') {
          setCurrentStep('initial');
          setAppointmentDetails({
            name: '',
            email: '',
            phone: '',
            department: '',
            date: '',
            time: ''
          });
          return {
            text: "❌ Booking cancelled. How else can I help you today?\n1. Book an appointment\n2. Check available time slots\n3. Cancel appointment",
            sender: 'bot'
          };
        }
        return {
          text: "Please type 'confirm' to book the appointment or 'cancel' to start over.",
          sender: 'bot'
        };

      default:
        return {
          text: "I'm not sure I understand. How can I help you?\n1. Book an appointment\n2. Check available time slots\n3. Cancel appointment",
          sender: 'bot'
        };
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      const userMessage = { text: input, sender: 'user' };
      const currentInput = input;
      
      // Add user message immediately
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate bot thinking time
      setTimeout(() => {
        const botResponse = handleBotResponse(currentInput);
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1200);
    }
  };

  return (
    <div className="chatbot-dialog">
      <div className="chatbot-header">
        <h3>Healthcare Assistant</h3>
        <button onClick={onClose} className="close-button">&times;</button>
      </div>
      <div className="chatbot-messages" ref={messagesContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-content">
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotDialog;