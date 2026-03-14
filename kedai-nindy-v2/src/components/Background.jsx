export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0f0f12] pointer-events-none">
      {/* Soft dark base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f12] via-[#121217] to-[#141419]" />

      {/* Pastel soft ambient glow (Top Left - Rose Gold/Soft Pink) */}
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/10 via-rose-900/5 to-transparent blur-[120px] rounded-full" />

      {/* Pastel soft ambient glow (Bottom Right - Soft Lavender) */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-indigo-900/5 to-transparent blur-[120px] rounded-full" />

      {/* Large blurred shape generating depth */}
      <div className="absolute top-[30%] left-[50%] w-[50%] h-[50%] bg-[#ffc7d1]/5 blur-[150px] rounded-full mix-blend-screen" />

      {/* Light subtle noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
