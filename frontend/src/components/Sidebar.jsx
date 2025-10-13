import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { getUsers, setSelectedUser } from "../store/slices/chatSlice";
import { Users, Search, Circle } from "lucide-react";

const Sidebar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { users, selectedUser, isUsersLoading } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = showOnlineOnly
    ? users?.filter((user) => onlineUsers.includes(user._id))
    : users;

  const searchedUsers = filteredUsers?.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-slate-200/80 flex flex-col transition-all duration-300 bg-gradient-to-b from-white to-slate-50/50 shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200/80 p-5 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Users className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="hidden lg:block">
            <h2 className="font-bold text-slate-900 text-lg">Contacts</h2>
            <p className="text-xs text-slate-500">
              {users?.length || 0} total contacts
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:block mb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Online Filter */}
        <div className="hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2.5 text-sm text-slate-700 group">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="w-4 h-4 border-2 border-slate-300 text-blue-600 rounded focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
              />
            </div>
            <span className="font-medium group-hover:text-slate-900 transition-colors">
              Show Online Only
            </span>
          </label>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 rounded-full">
            <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-700">
              {onlineUsers.length - 2}
            </span>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto flex-1 py-2 px-2">
        {searchedUsers?.length > 0 &&
          searchedUsers.map((user) => {
            const isSelected = selectedUser?._id === user._id;
            const isOnline = onlineUsers.includes(user._id);

            return (
              <button
                key={user._id}
                onClick={() => dispatch(setSelectedUser(user))}
                className={`w-full p-3 flex items-center gap-3 transition-all duration-200 rounded-xl mb-1 group ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30"
                    : "hover:bg-slate-100 active:scale-[0.98]"
                }`}
              >
                {/* Avatar */}
                <div className="relative mx-auto lg:mx-0 flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full ring-2 ${
                      isSelected
                        ? "ring-white/50"
                        : "ring-slate-200 group-hover:ring-slate-300"
                    } transition-all overflow-hidden`}
                  >
                    <img
                      src={user?.avatar?.url || "/avatar-holder.avif"}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isOnline && (
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ${
                        isSelected ? "ring-blue-600" : "ring-white"
                      } transition-all ${
                        isSelected
                          ? "bg-emerald-400"
                          : "bg-emerald-500 animate-pulse"
                      }`}
                    />
                  )}
                </div>

                {/* User info */}
                <div className="hidden lg:flex flex-col items-start min-w-0 flex-1">
                  <div
                    className={`font-semibold truncate w-full text-left ${
                      isSelected ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {user.fullName}
                  </div>
                  <div
                    className={`text-xs font-medium flex items-center gap-1.5 ${
                      isSelected ? "text-blue-100" : "text-slate-500"
                    }`}
                  >
                    <Circle
                      className={`w-1.5 h-1.5 ${
                        isOnline
                          ? isSelected
                            ? "fill-emerald-300 text-emerald-300"
                            : "fill-emerald-500 text-emerald-500"
                          : isSelected
                          ? "fill-slate-300 text-slate-300"
                          : "fill-slate-400 text-slate-400"
                      }`}
                    />
                    {isOnline ? "Online" : "Offline"}
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="hidden lg:block w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}

        {searchedUsers?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium mb-1">
              {searchQuery ? "No contacts found" : "No online users"}
            </p>
            <p className="text-sm text-slate-500 text-center">
              {searchQuery
                ? "Try adjusting your search"
                : "Check back later for online contacts"}
            </p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="hidden lg:flex items-center justify-center gap-6 py-3 px-5 border-t border-slate-200/80 bg-white/80 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">
            {searchedUsers?.length || 0}
          </div>
          <div className="text-xs text-slate-500">Contacts</div>
        </div>
        <div className="w-px h-8 bg-slate-200"></div>
        <div className="text-center">
          <div className="text-lg font-bold text-emerald-600">
            {onlineUsers.length - 2}
          </div>
          <div className="text-xs text-slate-500">Online</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;