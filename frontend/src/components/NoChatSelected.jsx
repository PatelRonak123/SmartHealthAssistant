import React from 'react';
import { MessageSquare, Bot, Calendar, ArrowRight, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-hidden">
      {/* Subtle animated background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] bg-gradient-to-tl from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          {/* Premium Icon Display */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-indigo-600" strokeWidth={2} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Smart Health
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Your intelligent healthcare communication platform
            </p>
            <p className="text-base text-slate-500 max-w-xl mx-auto">
              Select a conversation to begin or explore our powerful features below
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Real-time Chat Card */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-blue-300/60 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                Real-time Chat
              </h3>
              
              <p className="text-slate-600 leading-relaxed mb-4">
                Connect instantly with patients and healthcare professionals through secure messaging
              </p>
              
              <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                Learn more 
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* AI Assistant Card */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-emerald-300/60 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  AI Assistant
                </h3>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">NEW</span>
              </div>
              
              <p className="text-slate-600 leading-relaxed mb-4">
                Get instant answers and support from our advanced healthcare AI chatbot
              </p>
              
              <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
                Learn more 
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-purple-300/60 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                Appointments
              </h3>
              
              <p className="text-slate-600 leading-relaxed mb-4">
                Schedule and manage hospital appointments with ease and flexibility
              </p>
              
              <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all">
                Learn more 
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-slate-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-1">24/7</div>
            <div className="text-sm text-slate-600 font-medium">Available Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-1">&lt;2min</div>
            <div className="text-sm text-slate-600 font-medium">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
            <div className="text-sm text-slate-600 font-medium">Secure & Private</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;