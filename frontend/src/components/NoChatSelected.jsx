import { MessageSquare } from "lucide-react";
import chatIcon from "../assets/images/chat.png";
import botIcon from "../assets/images/bot.png";
import calendarIcon from "../assets/images/calendar.png";

const NoChatSelected = () => {
  return (
    <>
      <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div className="max-w-lg text-center space-y-8 relative z-10">
          {/* Enhanced Icon display */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                <MessageSquare className="w-12 h-12 text-white drop-shadow-lg relative z-10" />
              </div>
            </div>
          </div>

          {/* Enhanced Welcome text */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent leading-tight">
              Welcome to Smart Health Assistant!
            </h2>

            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              Select a conversation from the sidebar to start chatting with
              users or connect with our AI assistant
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <img
                  src={chatIcon}
                  alt="Chat"
                  className="w-7 h-7 object-contain drop-shadow-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <MessageSquare
                  className="w-6 h-6 text-white"
                  style={{ display: "none" }}
                />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Real-time Chat
              </h3>
              <p className="text-sm text-slate-600">
                Instant messaging with users
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <img
                  src={botIcon}
                  alt="Bot"
                  className="w-7 h-7 object-contain drop-shadow-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ display: "none" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H9a1 1 0 110 2H9.229z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                AI Assistant
              </h3>
              <p className="text-sm text-slate-600">Smart healthcare chatbot</p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <img
                  src={calendarIcon}
                  alt="Calendar"
                  className="w-7 h-7 object-contain drop-shadow-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ display: "none" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Book Appointments
              </h3>
              <p className="text-sm text-slate-600">Hospital slot booking</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoChatSelected;
