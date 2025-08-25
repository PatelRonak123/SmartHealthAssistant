import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { login } from "../store/slices/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Left side - Form */}
        <div className="flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
          {/* Subtle background elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-100/30 rounded-full blur-3xl"></div>

          <div className="w-full max-w-md relative z-10">
            {/* Logo & Heading */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-xl mb-4 hover:scale-105 transition-transform duration-300">
                <MessageSquare className="text-white w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-600 text-base font-medium">
                Sign in to your account
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors z-10">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      className="w-full border-2 border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors z-10">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full border-2 border-slate-200 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                      placeholder="********"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors z-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex justify-center items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Loading...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 font-medium">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all duration-200"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Pattern */}
        <AuthImagePattern
          title={"Welcome Back to Smart Health Assistant!"}
          subtitle={
            "Sign in to access your conversations, book appointments, and connect with our AI assistant."
          }
        />
      </div>
    </>
  );
};

export default Login;
