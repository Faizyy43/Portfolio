export default function SectionCard({ title, children, className = "" }) {
  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-lg hover:shadow-xl transition flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white/90">{title}</h2>
      </div>

      {/* 🔥 THIS IS THE REAL FIX */}
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}
