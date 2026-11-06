import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const settingsRef = useRef(null);

  const tabs = ["Profile", "Appearance", "Notifications", "Security"];

  // --- STATE MANAGEMENT ---
  // 1. Profile State
  const [profile, setProfile] = useState({
    firstName: "Shoubail",
    lastName: "Jan",
    email: "hello@sixtyseventh.com",
  });

  // 2. Appearance State
  const [appearance, setAppearance] = useState({
    theme: "blue",
    reducedMotion: false,
    solidBg: true,
  });

  // 3. Notifications State
  const [notifications, setNotifications] = useState({
    updates: true,
    comments: false,
    marketing: false,
  });

  // 4. Security State
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // --- TOAST NOTIFICATION HELPER ---
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    // Animate toast in
    gsap.fromTo(
      ".toast-popup",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)" },
    );
    // Hide after 3 seconds
    setTimeout(() => {
      gsap.to(".toast-popup", {
        y: 50,
        opacity: 0,
        duration: 0.3,
        onComplete: () =>
          setToast({ show: false, message: "", type: "success" }),
      });
    }, 3000);
  };

  // --- SAVE HANDLERS ---
  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      showToast("Profile updated successfully!", "success");
    }, 1000);
  };

  const handleUpdatePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      return showToast("Please fill in all password fields.", "error");
    }
    if (passwords.new !== passwords.confirm) {
      return showToast("New passwords do not match.", "error");
    }
    if (passwords.new.length < 8) {
      return showToast("Password must be at least 8 characters.", "error");
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setPasswords({ current: "", new: "", confirm: "" }); // Clear fields
      showToast("Password changed successfully!", "success");
    }, 1200);
  };

  // --- TAB ANIMATIONS ---
  useGSAP(
    () => {
      gsap.fromTo(
        ".settings-content",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 },
      );
    },
    { dependencies: [activeTab], scope: settingsRef },
  );

  // Custom Toggle Component
  const Toggle = ({ isOn, onChange }) => (
    <div
      onClick={onChange}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isOn ? "bg-blue-500" : "bg-gray-700"
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );

  return (
    <section
      ref={settingsRef}
      className="relative min-h-screen w-full bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* --- TOAST NOTIFICATION --- */}
      {toast.show && (
        <div
          className={`toast-popup fixed bottom-10 right-10 z-[999] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border backdrop-blur-xl ${
            toast.type === "success"
              ? "bg-green-500/20 border-green-500/50 text-green-200"
              : "bg-red-500/20 border-red-500/50 text-red-200"
          }`}
        >
          <span className="text-xl">
            {toast.type === "success" ? "✓" : "⚠"}
          </span>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-blue-900/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-[80rem] mx-auto relative z-10">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            Settings
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your account preferences and customization.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Navigation Tabs */}
          <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-6 py-4 rounded-2xl font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* --- PROFILE TAB --- */}
            {activeTab === "Profile" && (
              <div className="settings-content flex flex-col gap-8">
                <div className="flex items-center gap-6 mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </div>
                  <div>
                    <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                      Change Avatar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400 font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })
                      }
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400 font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })
                      }
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm text-gray-400 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSaving ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </div>
            )}

            {/* --- APPEARANCE TAB --- */}
            {activeTab === "Appearance" && (
              <div className="settings-content flex flex-col gap-10">
                <div>
                  <h3 className="text-xl font-bold mb-6">Theme Color</h3>
                  <div className="flex gap-4">
                    {["blue", "red", "green", "purple", "orange"].map(
                      (color) => (
                        <div
                          key={color}
                          onClick={() =>
                            setAppearance({ ...appearance, theme: color })
                          }
                          className={`w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 bg-${color}-500 ${
                            appearance.theme === color
                              ? "ring-2 ring-white ring-offset-4 ring-offset-[#0a0a0a]"
                              : ""
                          }`}
                        ></div>
                      ),
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <h4 className="font-medium text-lg">Reduced Motion</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Disable heavy animations across the site.
                    </p>
                  </div>
                  <Toggle
                    isOn={appearance.reducedMotion}
                    onChange={() =>
                      setAppearance({
                        ...appearance,
                        reducedMotion: !appearance.reducedMotion,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <h4 className="font-medium text-lg">Solid Background</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Remove the gradient mesh background.
                    </p>
                  </div>
                  <Toggle
                    isOn={appearance.solidBg}
                    onChange={() =>
                      setAppearance({
                        ...appearance,
                        solidBg: !appearance.solidBg,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {/* --- NOTIFICATIONS TAB --- */}
            {activeTab === "Notifications" && (
              <div className="settings-content flex flex-col gap-6">
                {[
                  {
                    key: "updates",
                    title: "Project Updates",
                    desc: "Get notified when a new project goes live.",
                  },
                  {
                    key: "comments",
                    title: "Comments",
                    desc: "Receive an email when someone replies to your comment.",
                  },
                  {
                    key: "marketing",
                    title: "Marketing Emails",
                    desc: "Occasional news about Sixty-Seventh Agency.",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between border-b border-white/10 pb-6"
                  >
                    <div>
                      <h4 className="font-medium text-lg">{item.title}</h4>
                      <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                    </div>
                    <Toggle
                      isOn={notifications[item.key]}
                      onChange={() =>
                        setNotifications({
                          ...notifications,
                          [item.key]: !notifications[item.key],
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            {/* --- SECURITY TAB --- */}
            {activeTab === "Security" && (
              <div className="settings-content flex flex-col gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">Change Password</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Ensure your account is using a long, random password.
                  </p>

                  <div className="flex flex-col gap-4 max-w-md">
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={passwords.new}
                      onChange={(e) =>
                        setPasswords({ ...passwords, new: e.target.value })
                      }
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={handleUpdatePassword}
                    disabled={isSaving}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSaving ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </section>
  );
};

export default Settings;
