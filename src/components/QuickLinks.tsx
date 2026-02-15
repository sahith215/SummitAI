import { CalendarDays, Users, MapPin, ClipboardList } from "lucide-react";

const quickLinks = [
  { label: "Schedule", icon: CalendarDays, message: "What's the summit schedule?" },
  { label: "Speakers", icon: Users, message: "Who are the speakers at LNIT Summit?" },
  { label: "Venue", icon: MapPin, message: "Where is the summit venue?" },
  { label: "Register", icon: ClipboardList, message: "How do I register for the summit?" },
];

const QuickLinks = ({ onSelect }: { onSelect: (msg: string) => void }) => (
  <div className="flex flex-wrap gap-2 px-4 py-3">
    {quickLinks.map((link) => (
      <button
        key={link.label}
        onClick={() => onSelect(link.message)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-border bg-card text-sm text-foreground hover:border-primary hover:text-primary transition-all hover:shadow-sm"
      >
        <link.icon className="w-3.5 h-3.5" />
        {link.label}
      </button>
    ))}
  </div>
);

export default QuickLinks;
