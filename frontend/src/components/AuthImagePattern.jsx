import React from 'react';

import chatIcon from '../assets/images/chat.png';
import botIcon from '../assets/images/bot.png';
import calendarIcon from '../assets/images/calendar.png';
import emailIcon from '../assets/images/email.png';
import phoneIcon from '../assets/images/phone.png';
import clockIcon from '../assets/images/clock.png';
import stethoscopeIcon from '../assets/images/stethoscope.png';
import checkIcon from '../assets/images/check.png';
import shieldIcon from '../assets/images/shield.png';

const AuthImagePattern = ({ title, subtitle }) => {
  const patternImages = [
    {
      src: chatIcon,
      fallbackIcon: "💬",
      bgColor: "bg-white/80",
      description: "Real-time Chat Between Users",
      hoverColor: "hover:bg-blue-50/90",
      borderColor: "border-blue-200/50",
      feature: "Chat",
      accentColor: "from-blue-500 to-blue-600"
    },
    {
      src: botIcon,
      fallbackIcon: "🤖",
      bgColor: "bg-white/80",
      description: "AI Chatbot Assistant",
      hoverColor: "hover:bg-emerald-50/90",
      borderColor: "border-emerald-200/50",
      feature: "Bot",
      accentColor: "from-emerald-500 to-emerald-600"
    },
    {
      src: calendarIcon,
      fallbackIcon: "📅",
      bgColor: "bg-white/80",
      description: "Hospital Slot Booking",
      hoverColor: "hover:bg-rose-50/90",
      borderColor: "border-rose-200/50",
      feature: "Booking",
      accentColor: "from-rose-500 to-rose-600"
    },
    {
      src: emailIcon,
      fallbackIcon: "📧",
      bgColor: "bg-white/80",
      description: "Email Booking Confirmations",
      hoverColor: "hover:bg-orange-50/90",
      borderColor: "border-orange-200/50",
      feature: "Email",
      accentColor: "from-orange-500 to-orange-600"
    },
    {
      src: phoneIcon,
      fallbackIcon: "📞",
      bgColor: "bg-white/80",
      description: "Hospital Team Follow-up",
      hoverColor: "hover:bg-pink-50/90",
      borderColor: "border-pink-200/50",
      feature: "Contact",
      accentColor: "from-pink-500 to-pink-600"
    },
    {
      src: clockIcon,
      fallbackIcon: "⏰",
      bgColor: "bg-white/80",
      description: "24/7 Availability",
      hoverColor: "hover:bg-red-50/90",
      borderColor: "border-red-200/50",
      feature: "24/7",
      accentColor: "from-red-500 to-red-600"
    },
    {
      src: stethoscopeIcon,
      fallbackIcon: "🩺",
      bgColor: "bg-white/80",
      description: "Department Consultations",
      hoverColor: "hover:bg-teal-50/90",
      borderColor: "border-teal-200/50",
      feature: "Medical",
      accentColor: "from-teal-500 to-teal-600"
    },
    {
      src: checkIcon,
      fallbackIcon: "✅",
      bgColor: "bg-white/80",
      description: "Instant Confirmations",
      hoverColor: "hover:bg-violet-50/90",
      borderColor: "border-violet-200/50",
      feature: "Confirm",
      accentColor: "from-violet-500 to-violet-600"
    },
    {
      src: shieldIcon,
      fallbackIcon: "🛡️",
      bgColor: "bg-white/80",
      description: "Secure & Private",
      hoverColor: "hover:bg-sky-50/90",
      borderColor: "border-sky-200/50",
      feature: "Security",
      accentColor: "from-sky-500 to-sky-600"
    }
  ];

  return (
    <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 p-8 min-h-screen relative overflow-hidden">
      
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-l from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-32 left-16 w-3 h-3 bg-emerald-400/40 rounded-full animate-bounce delay-700"></div>
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-400/50 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute top-40 left-10 w-2 h-2 bg-pink-400/40 rounded-full animate-bounce delay-200"></div>
      <div className="absolute bottom-20 right-32 w-3 h-3 bg-teal-400/35 rounded-full animate-bounce delay-800"></div>
      <div className="absolute top-3/4 left-20 w-2 h-2 bg-orange-400/45 rounded-full animate-bounce delay-400"></div>
      <div className="absolute top-16 right-1/3 w-2 h-2 bg-indigo-400/40 rounded-full animate-bounce delay-600"></div>
      <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-rose-400/50 rounded-full animate-bounce delay-900"></div>
      <div className="absolute top-2/3 right-16 w-2 h-2 bg-cyan-400/35 rounded-full animate-bounce delay-1200"></div>
      <div className="absolute top-32 left-1/4 w-1.5 h-1.5 bg-violet-400/45 rounded-full animate-bounce delay-500"></div>
      <div className="absolute bottom-16 right-20 w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce delay-1100"></div>

      {/* Additional scattered dots */}
      <div className="absolute top-12 left-32 w-1 h-1 bg-sky-400/40 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-24 right-12 w-1.5 h-1.5 bg-lime-400/35 rounded-full animate-bounce delay-700"></div>
      <div className="absolute top-1/4 right-40 w-1 h-1 bg-amber-400/50 rounded-full animate-bounce delay-1100"></div>
      <div className="absolute bottom-1/3 left-8 w-2 h-2 bg-fuchsia-400/40 rounded-full animate-bounce delay-450"></div>
      <div className="absolute top-48 right-8 w-1 h-1 bg-emerald-400/45 rounded-full animate-bounce delay-650"></div>
      <div className="absolute bottom-48 left-40 w-1.5 h-1.5 bg-blue-400/35 rounded-full animate-bounce delay-850"></div>
      <div className="absolute top-5 right-1/2 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce delay-1050"></div>
      <div className="absolute bottom-8 left-1/2 w-2 h-2 bg-pink-400/30 rounded-full animate-bounce delay-350"></div>
      <div className="absolute top-1/3 left-5 w-1 h-1 bg-teal-400/45 rounded-full animate-bounce delay-750"></div>
      <div className="absolute bottom-1/4 right-24 w-1.5 h-1.5 bg-orange-400/40 rounded-full animate-bounce delay-950"></div>


      <div className="max-w-lg w-full relative z-10">


        {/* App Identity Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 rounded-3xl mb-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img
              src={chatIcon}
              alt="Chat Application"
              className="w-9 h-9 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="text-2xl text-white" style={{ display: 'none' }}>💬</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3 leading-tight">
            Smart Health Assistant
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Seamlessly connect with users through real-time messaging while effortlessly booking hospital appointments via our intelligent AI chatbot.
          </p>
        </div>

        {/* Enhanced Pattern Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {patternImages.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} ${item.hoverColor} rounded-2xl p-5 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer border-2 ${item.borderColor} hover:border-opacity-80 backdrop-blur-xl relative overflow-hidden hover:-translate-y-2 hover:scale-105`}
              title={item.description}
            >
              {/* Enhanced shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Accent border on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

              {/* PNG Image */}
              <img
                src={item.src}
                alt={item.description}
                className="w-10 h-10 object-contain group-hover:scale-125 transition-all duration-500 relative z-10 drop-shadow-md mb-2 filter group-hover:drop-shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />

              {/* Fallback emoji (hidden by default) */}
              <span
                className="text-3xl group-hover:scale-125 transition-all duration-500 relative z-10 drop-shadow-md mb-2"
                style={{ display: 'none' }}
              >
                {item.fallbackIcon}
              </span>

              {/* Feature Label */}
              <span className="text-sm font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center transform translate-y-2 group-hover:translate-y-0">
                {item.feature}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Title and Subtitle */}
        {(title || subtitle) && (
          <div className="text-center mb-6">
            {title && (
              <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-gray-700">{subtitle}</p>
            )}
          </div>
        )}


      </div>
    </div>
  );
};

export default AuthImagePattern;
