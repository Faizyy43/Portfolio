export default function SectionCard({ title, children }) {
  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-lg hover:shadow-xl transition">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white/90">{title}</h2>
      </div>

      {children}
    </div>
  );
}
