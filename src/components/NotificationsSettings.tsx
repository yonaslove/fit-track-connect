import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

type NotificationPrefs = {
  enabled: boolean;
  hour: number;
  minute: number;
  sound: "beep" | "chime";
};

const defaultPrefs: NotificationPrefs = {
  enabled: false,
  hour: 9,
  minute: 0,
  sound: "beep",
};

function playSound(kind: NotificationPrefs["sound"]) {
  const src = kind === "chime" ? "/sounds/chime.mp3" : "/sounds/beep.mp3";
  const audio = new Audio(src);
  audio.play().catch(() => {});
}

export const NotificationsSettings: React.FC = () => {
  const { user } = useAuth();
  const key = `ftc_notify_${user?.email ?? "default"}`;
  const [prefs, setPrefs] = React.useState<NotificationPrefs>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") || defaultPrefs;
    } catch {
      return defaultPrefs;
    }
  });

  const timeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(prefs));
    if (prefs.enabled) scheduleNext();
    else clearScheduled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefs]);

  React.useEffect(() => {
    return () => clearScheduled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearScheduled() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function scheduleNext() {
    clearScheduled();
    const now = new Date();
    const next = new Date();
    next.setHours(prefs.hour, prefs.minute, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    const ms = next.getTime() - now.getTime();
    timeoutRef.current = window.setTimeout(() => {
      // Trigger notification
      try {
        if (Notification && Notification.permission === "granted") {
          new Notification("FitTrack Reminder", { body: "Time for your scheduled workout reminder!" });
        }
      } catch {}
      playSound(prefs.sound);
      toast({ title: "Notification", description: `Reminder played at ${prefs.hour}:${String(prefs.minute).padStart(2, "0")}` });
      // schedule next in 24h
      timeoutRef.current = window.setTimeout(scheduleNext, 24 * 60 * 60 * 1000);
    }, ms);
  }

  const requestPermission = async () => {
    if ((window as any).Notification && Notification.permission !== "granted") {
      try {
        await Notification.requestPermission();
      } catch {}
    }
  };

  return (
    <div className="bg-card rounded-2xl p-4 border border-border/50">
      <h3 className="text-lg font-medium mb-3">Notifications</h3>
      <div className="flex items-center gap-2 mb-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={prefs.enabled} onChange={(e) => setPrefs({ ...prefs, enabled: e.target.checked })} />
          <span className="text-sm">Enable daily reminder</span>
        </label>
        <Button size="sm" onClick={requestPermission} variant="ghost">Allow Browser Notifications</Button>
      </div>

      <div className="flex gap-2 items-center mb-3">
        <label className="text-sm">Time</label>
        <input type="number" min={0} max={23} value={prefs.hour} onChange={(e) => setPrefs({ ...prefs, hour: Number(e.target.value) })} className="w-16" />
        <span>:</span>
        <input type="number" min={0} max={59} value={prefs.minute} onChange={(e) => setPrefs({ ...prefs, minute: Number(e.target.value) })} className="w-16" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <label className="text-sm">Sound</label>
        <select value={prefs.sound} onChange={(e) => setPrefs({ ...prefs, sound: e.target.value as any })} className="bg-card">
          <option value="beep">Beep</option>
          <option value="chime">Chime</option>
        </select>
        <Button size="sm" onClick={() => playSound(prefs.sound)}>Play</Button>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => { setPrefs({ ...prefs }); toast({ title: "Saved", description: "Notification settings saved." }); }}>Save</Button>
        <Button variant="outline" onClick={() => { setPrefs(defaultPrefs); toast({ title: "Reset", description: "Notification settings reset." }); }}>Reset</Button>
      </div>
      <p className="text-xs text-muted-foreground mt-3">Help & Support: <a className="underline" href="mailto:yonasyirgu718@gmail.com">yonasyirgu718@gmail.com</a></p>
    </div>
  );
};

export default NotificationsSettings;
