import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 4 },
  { name: "Fev", value: 6 },
  { name: "Mar", value: 5 },
  { name: "Abr", value: 8 },
  { name: "Mai", value: 10 },
  { name: "Jun", value: 12 },
];

export default function DashboardChart() {
  return (
    <div className="bg-gray-900/80 border border-[#a78bfa]/20 rounded-xl p-6 h-72">
      <h3 className="text-lg font-semibold text-white mb-4">Crescimento</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#a78bfa" />
          <YAxis stroke="#a78bfa" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
