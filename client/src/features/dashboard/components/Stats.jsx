import { Folder, Users, Star, DollarSign, TrendingUp } from "lucide-react";

export default function Stats({ projects = [], contacts = [] }) {
  const totalProjects = projects.length;

  const totalClients = contacts.length;

  const totalRevenue = projects.reduce(
    (acc, p) => acc + (Number(p.budget) || 0),
    0,
  );

  const totalReviews = projects.reduce(
    (acc, p) => acc + (p.reviews?.length || 0),
    0,
  );

  const growth = 0; // you can improve later

  const stats = [
    {
      title: "Projects",
      value: totalProjects,
      icon: Folder,
      color: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-400",
    },
    {
      title: "Clients",
      value: totalClients,
      icon: Users,
      color: "from-purple-500/20 to-purple-500/5",
      iconColor: "text-purple-400",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-green-500/20 to-green-500/5",
      iconColor: "text-green-400",
    },
    {
      title: "Reviews",
      value: totalReviews,
      icon: Star,
      color: "from-yellow-500/20 to-yellow-500/5",
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((item, i) => {
        const Icon = item.icon;

        return (
          <div
            key={i}
            className={`relative overflow-hidden bg-gradient-to-br ${item.color}
            border border-white/10 rounded-2xl p-4 group`}
          >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition bg-white/5 blur-xl" />

            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs text-gray-400 mb-1">{item.title}</p>

                <h3 className="text-xl md:text-2xl font-semibold">
                  {item.value}
                </h3>

                <div className="flex items-center gap-1 mt-1 text-xs text-green-400">
                  <TrendingUp size={12} />
                  {growth}%
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white/5">
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
