import { MessageSquare } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Left side - Clerk SignUp Component */}
        <div className="flex flex-col justify-center items-center px-8 py-12">
          <div className="w-full max-w-md">
           
            {/* Clerk SignUp Component Container */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6">
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none border-0",
                    headerTitle: "text-2xl font-bold text-slate-800",
                    headerSubtitle: "text-slate-600",
                    socialButtonsBlockButton: "bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-medium",
                    formButtonPrimary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300",
                    formFieldInput: "bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 text-slate-800 font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-100",
                    identityPreviewText: "text-slate-700",
                    identityPreviewEditButton: "text-blue-600 hover:text-blue-700"
                  }
                }}
              />
            </div>
            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 font-medium">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all duration-200"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Right side - Pattern */}
        <AuthImagePattern
          title={"Join Smart Health Assistant Community!"}
          subtitle={
            "Create your account to start chatting, book hospital appointments, and access our AI-powered healthcare assistant."
          }
        />
      </div>
    </>
  );
};

export default Register;
