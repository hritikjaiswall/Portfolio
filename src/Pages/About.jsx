import React, { useEffect, memo, useMemo } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]" data-aos="zoom-in-up" data-aos-duration="600">
        About Me
      </h2>
    </div>
    <p className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2" data-aos="zoom-in-up" data-aos-duration="800">
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const AboutPage = () => {
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: "11 Months",
    };
  }, []);

  useEffect(() => {
    AOS.init({ once: false });
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => AOS.refresh(), 250);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const statsData = [
    { icon: Code, color: "from-[#6366f1] to-[#a855f7]", value: totalProjects, label: "Total Projects", description: "Innovative web solutions crafted", animation: "fade-right" },
    { icon: Award, color: "from-[#a855f7] to-[#6366f1]", value: totalCertificates, label: "Certificates", description: "Professional skills validated", animation: "fade-up" },
    { icon: Globe, color: "from-[#6366f1] to-[#a855f7]", value: YearExperience, label: "Years of Experience", description: "Continuous learning journey", animation: "fade-left" },
  ];

  return (
    <div className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0" id="About">
      <Header />
      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right" data-aos-duration="1000">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">Hello, I'm</span>
              <span className="block mt-2 text-gray-200" data-aos="fade-right" data-aos-duration="1300">Hritik Jaiswal</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0" data-aos="fade-right" data-aos-duration="1500">
              I’m a Software Engineer passionate about building web applications with React, Node.js, and Vue. I have experience in automation testing, manual testing, and accessibility development, combined with a strong background in DevOps and CI/CD pipelines. I’m also a theatre artist and musician, bringing creativity into every project I undertake.
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a href="/hritikjaiswal_111rjaiswal_gmail_com_resume__updated_latest.pdf" download="hritikjaiswal_111rjaiswal_gmail_com_resume__updated_latest.pdf" className="w-full lg:w-auto">
                <button data-aos="fade-up" data-aos-duration="800" className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl animate-bounce-slow">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download Resume
                </button>
              </a>
              <a href="#Portofolio" className="w-full lg:w-auto">
                <button data-aos="fade-up" data-aos-duration="1000" className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 hover:bg-[#a855f7]/10 animate-bounce-slow delay-200">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
            <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
              <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
                <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
              </div>
              <div className="relative">
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
                  <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
                  <img src="/Photo.jpg" alt="Profile" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2" loading="lazy" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
                    <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <div key={stat.label} className="relative group" data-aos={stat.animation} data-aos-duration="1300">
                <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
                  <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-4xl font-bold text-white">{stat.value}</span>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">{stat.label}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">{stat.description}</p>
                      <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </a>
      </div>
    </div>
  );
};

export default memo(AboutPage);
