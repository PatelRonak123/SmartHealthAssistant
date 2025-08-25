import { Camera, Loader2, Mail, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../store/slices/authSlice";

const Profile = () => {
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName,
    email: authUser?.email,
    avatar: authUser?.avatar?.url,
  });

  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      setFormData((prev) => ({ ...prev, avatar: file }));
      setSelectedImage(base64Image);
    };
  };

  const handleUpdateProfile = () => {
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);

    if (formData.avatar instanceof File) {
      data.append("avatar", formData.avatar);
    }

    dispatch(updateProfile(data));
  };

  return (
    <>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 space-y-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                Profile Settings
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Manage your account information
              </p>
            </div>

            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <img
                  src={
                    selectedImage || formData.avatar || "/avatar-holder.avif"
                  }
                  alt="/avatar-holder.avif"
                  className="relative w-40 h-40 rounded-full object-cover object-top border-4 border-white shadow-2xl group-hover:scale-105 transition-all duration-300"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-2 right-2 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-3 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera className="w-6 h-6 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              <p className="text-base text-slate-500 font-medium">
                {isUpdatingProfile
                  ? "Uploading your new photo..."
                  : "Click the camera icon to update your profile picture"}
              </p>
            </div>

            {/* User Information */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-base font-bold text-slate-700 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-md hover:shadow-lg"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-3">
                <label className="text-base font-bold text-slate-700 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-md hover:shadow-lg"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Update Profile Button */}
            <button
              onClick={handleUpdateProfile}
              disabled={isUpdatingProfile}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex justify-center items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" /> Updating
                  Profile...
                </>
              ) : (
                "Update Profile"
              )}
            </button>

            {/* Account Information */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200/50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <User className="w-4 h-4 text-white" />
                </div>
                Account Information
              </h2>
              <div className="space-y-4 text-base text-slate-700">
                <div className="flex items-center justify-between py-4 px-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="font-semibold">Member Since</span>
                  <span className="font-medium text-slate-600">
                    {authUser?.createdAt?.split("!")[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between py-4 px-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="font-semibold">Account Status</span>
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
