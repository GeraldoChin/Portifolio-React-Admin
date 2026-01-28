const stats = [
  { value: "14", label: "Years of Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "1.5K", label: "Happy Clients" },
  { value: "14", label: "Awards Won" },
];

export default function Stats() {
  return (
    <section className="-mt-12 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 text-center md:text-left">

          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3 className="text-5xl md:text-6xl font-bold text-[#a78bfa] mb-1">
                {stat.value}
              </h3>
              <p className="text-purple-300 text-sm">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
