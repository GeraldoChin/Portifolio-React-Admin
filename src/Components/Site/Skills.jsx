const skills = [
  { name: "Figma", icon: "fab fa-figma", percentage: 92 },
  { name: "Sketch", icon: "fab fa-sketch", percentage: 80 },
  { name: "XD", icon: "fab fa-adobe", percentage: 85 },
  { name: "WordPress", icon: "fab fa-wordpress", percentage: 90 },
  { name: "React", icon: "fab fa-react", percentage: 95 },
  { name: "JavaScript", icon: "fab fa-js", percentage: 80 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 ">
      <div className="max-w-6xl mx-auto px-6">

        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            My Skills
          </h2>
          <p className="text-purple-300 max-w-2xl mx-auto">
            We put your ideas and your wishes in the form of a unique web project that inspires you and your customers.
          </p>
        </div>

        {/* Grid de Skills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10 mt-10">
          {skills.map((skill, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-lg flex items-center justify-center mx-auto mb-4 text-4xl text-[#8b5cf6]">
                <i className={skill.icon}></i>
              </div>
              <div className="text-2xl font-bold mb-1 text-white">{skill.percentage}%</div>
              <div className="text-[#a78bfa] text-sm">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
