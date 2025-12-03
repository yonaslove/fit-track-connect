import React from "react";
import NotificationsSettings from "@/components/NotificationsSettings";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background pb-24 p-6 pt-12">
      <h1 className="text-2xl font-bold text-foreground mb-4">Settings</h1>
      <div className="max-w-xl">
        <NotificationsSettings />
      </div>
    </div>
  );
};

export default Settings;
