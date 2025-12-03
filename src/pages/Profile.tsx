import { User, Settings, Trophy, Target, Bell, HelpCircle, LogOut, ChevronRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Workouts", value: "34" },
  { label: "Hours", value: "28" },
  { label: "Streak", value: "7" },
];

const menuItems = [
  { icon: User, label: "Edit Profile", href: "#" },
  { icon: Target, label: "Goals", href: "#" },
  { icon: Trophy, label: "Achievements", href: "#" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
  { icon: HelpCircle, label: "Help & Support", href: "#" },
];

const Profile = () => {
  const handleConnectGithub = () => {
    window.open("https://github.com", "_blank");
  };

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
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Alex Johnson</h2>
              <p className="text-muted-foreground">Premium Member</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Connection */}
      <section className="px-6 mb-8">
        <div className="bg-card rounded-2xl border border-border/50 p-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Github className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Connect GitHub</h3>
                <p className="text-sm text-muted-foreground">Sync your fitness data</p>
              </div>
            </div>
            <Button variant="glass" size="sm" onClick={handleConnectGithub}>
              Connect
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="px-6 mb-8">
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
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
        <Button variant="outline" className="w-full text-destructive border-destructive/50 hover:bg-destructive/10">
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </section>
    </div>
  );
};

export default Profile;
