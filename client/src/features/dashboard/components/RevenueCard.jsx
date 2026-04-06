import { DollarSign, TrendingUp } from "lucide-react";

export default function RevenueCard({ projects }) {
  const totalRevenue = projects.reduce(
    (acc, p) => acc + (Number(p.budget) || 0),
    0,
  );

  // 🔥 Simple monthly estimate (demo logic)
  const lastMonthRevenue = totalRevenue * 0.8;

  const growth =
    lastMonthRevenue === 0
      ? 0
      : (((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(
          1,
        );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
      {/* Glow */}
      <div className="absolute inset-0 bg-emerald-400/5 blur-2xl opacity-50" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400">Total Revenue</p>

          <div className="p-2 rounded-lg bg-emerald-500/10">
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-emerald-400">
          ₹{totalRevenue.toLocaleString()}
        </h2>

        {/* Growth */}
        <div
          className={`flex items-center gap-1 mt-2 text-sm ${
            growth >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          <TrendingUp size={14} />
          {growth}% from last month
        </div>
      </div>
    </div>
  );
}
