import { User as UserIcon, Settings, Trophy, Target, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: UserIcon, label: "Edit Profile", action: "edit" },
  { icon: Target, label: "Goals", action: "goals" },
  { icon: Trophy, label: "Achievements", action: "achievements" },
  { icon: Bell, label: "Notifications", action: "notifications" },
  { icon: Settings, label: "Settings", action: "settings" },
  { icon: HelpCircle, label: "Help & Support", action: "help" },
];

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    switch (action) {
      case "edit": {
        const newName = window.prompt("Enter your display name", user?.name || "");
        if (newName && newName.trim()) {
          updateUser({ name: newName.trim() });
          toast({ title: "Profile updated", description: "Your display name was updated." });
        }
        break;
      }
      case "goals":
        navigate("/progress");
        break;
      case "achievements":
        toast({ title: "Achievements", description: "Showing your achievements below." });
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        break;
      case "notifications":
        toast({ title: "Notifications", description: "Notification settings opened." });
        break;
      case "settings":
        navigate("/settings");
        break;
      case "help":
        window.open("mailto:yonasyirgu718@gmail.com");
        break;
    }
  };

  const stats = user?.stats ?? { workouts: 0, hours: 0, streak: 0 };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="p-6 pt-12">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </header>

      {/* Profile Card */}
      <section className="px-6 mb-8">
        <div className="bg-card rounded-3xl border border-border/50 p-6 animate-scale-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{user?.name ?? "Yonas Yirgu"}</h2>
              <p className="text-muted-foreground">{user?.premium ? "Premium Member" : "Free Member"}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gradient">{stats.workouts}</p>
              <p className="text-sm text-muted-foreground">Workouts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gradient">{stats.hours}</p>
              <p className="text-sm text-muted-foreground">Hours</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gradient">{stats.streak}</p>
              <p className="text-sm text-muted-foreground">Streak</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="px-6 mb-8">
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleAction(item.action)}
              className={cn(
                "w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors",
                index !== menuItems.length - 1 && "border-b border-border/50"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>

      {/* Logout */}
      <section className="px-6">
        <Button variant="outline" onClick={() => logout()} className="w-full text-destructive border-destructive/50 hover:bg-destructive/10">
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </section>
    </div>
  );
};

export default Profile;
