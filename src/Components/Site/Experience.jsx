const experienceData = [
  { date: "2007 - 2017", title: "LEAD DEVELOPER", subtitle: "Blockgenie Tech" },
  { date: "2017 - 2023", title: "FULL STACK WEB DEVELOPER", subtitle: "Parsons, The New School" },
  { date: "2008 - 2016", title: "UI DESIGNER", subtitle: "House of Life" },
  { date: "2016 - 2020", title: "JUNIOR GRAPHICS DESIGNER", subtitle: "Theme Junction, Jame" },
];

const educationData = [
  { date: "2004 - 2007", title: "PROGRAMMING COURSE", subtitle: "Harvard University" },
  { date: "2007 - 2017", title: "GRAPHIC DESIGN COURSE", subtitle: "University of Denmark" },
  { date: "2017 - 2023", title: "WEB DESIGN COURSE", subtitle: "University of California" },
  { date: "2023 - 2024", title: "DESIGN & TECHNOLOGY", subtitle: "Parsons, The New School" },
];

export default function Resume() {
  return (
    <section id="resume" className="py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-24">

          {/* Experience */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
              💼 My Experience
            </h2>

            <div className="space-y-4">
              {experienceData.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 bg-gray-900/50 backdrop-blur-sm border border-white/5 rounded-lg p-4 md:p-5 
                             hover:scale-[1.02] hover:border-[#a78bfa]/30 transition-all duration-300"
                >
                  <span className="absolute -left-1.5 top-6 w-3 h-3 rounded-full bg-[#a78bfa]"></span>

                  <div className="border-l border-white/10 pl-5">
                    <div className="text-[#8b5cf6] text-xs mb-1">{item.date}</div>

                    <h3 className="text-base md:text-lg font-bold mb-1 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] bg-clip-text text-transparent">
                      {item.title}
                    </h3>

                    <h4 className="text-sm md:text-base font-medium text-[#a78bfa]/80">
                      {item.subtitle}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
              🎓 My Education
            </h2>

            <div className="space-y-4">
              {educationData.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 bg-gray-900/50 backdrop-blur-sm border border-white/5 rounded-lg p-4 md:p-5 
                             hover:scale-[1.02] hover:border-[#a78bfa]/30 transition-all duration-300"
                >
                  <span className="absolute -left-1.5 top-6 w-3 h-3 rounded-full bg-[#a78bfa]"></span>

                  <div className="border-l border-white/10 pl-5">
                    <div className="text-[#8b5cf6] text-xs mb-1">{item.date}</div>

                    <h3 className="text-base md:text-lg font-bold mb-1 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] bg-clip-text text-transparent">
                      {item.title}
                    </h3>

                    <h4 className="text-sm md:text-base font-medium text-[#a78bfa]/80">
                      {item.subtitle}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
