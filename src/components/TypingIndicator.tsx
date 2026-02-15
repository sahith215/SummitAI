const TypingIndicator = () => (
  <div className="flex items-start gap-2 px-4 py-2 animate-fade-in">
    <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
        <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
        <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
      </div>
    </div>
  </div>
);

export default TypingIndicator;
