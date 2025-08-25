import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link
                to={"/"}
                className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <MessageSquare className="w-5 h-5 text-white drop-shadow-sm" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Smart Health Assistant
                </h1>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {authUser && (
                <>
                  <Link
                    to={"/profile"}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-blue-200/50 hover:shadow-md"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-red-600 hover:bg-red-50/80 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-red-200/50 hover:shadow-md"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
