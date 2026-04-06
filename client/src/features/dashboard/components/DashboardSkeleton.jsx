export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-white/10 rounded-xl" />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-60 bg-white/10 rounded-xl" />
        <div className="space-y-4">
          <div className="h-28 bg-white/10 rounded-xl" />
          <div className="h-28 bg-white/10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}