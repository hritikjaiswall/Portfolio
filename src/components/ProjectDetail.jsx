import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => (
  <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
    <div className="relative mt-2">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
      <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
    </div>
    <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">{feature}</span>
  </li>
);

const ProjectStats = ({ project }) => (
  <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />

    <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
      <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
        <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-lg md:text-xl font-semibold text-blue-200">{project?.TechStack?.length || 0}</div>
        <div className="text-[10px] md:text-xs text-gray-400">Total Technologies</div>
      </div>
    </div>

    <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
      <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
        <Layers className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-lg md:text-xl font-semibold text-purple-200">{project?.Features?.length || 0}</div>
        <div className="text-[10px] md:text-xs text-gray-400">Key Features</div>
      </div>
    </div>
  </div>
);

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const selected = storedProjects.find((p) => String(p.id) === id);

    if (selected) {
      setProject({
        ...selected,
        Features: selected.Features || [],
        TechStack: selected.TechStack || [],
        Github: selected.Github || "https://github.com/EkiZR",
      });
    }
  }, [id]);

  if (!project) return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center">
      <div className="text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <h2 className="text-xl md:text-3xl font-bold text-white">Loading Project...</h2>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animate-blob">
        <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto py-8 md:py-16">
        <button onClick={() => navigate(-1)} className="group flex items-center space-x-2 mb-6 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
          {project.Title}
        </h1>

        <p className="text-gray-300 max-w-2xl mb-6">{project.Description}</p>

        <ProjectStats project={project} />

        <div className="flex gap-4 my-6 flex-wrap">
          <a
            href={project.Link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!project.Link) {
                Swal.fire({
                  icon: "info",
                  title: "Live Demo Unavailable",
                  text: "This project does not have a live demo link.",
                  confirmButtonText: "OK",
                  background: "#030014",
                  color: "#fff",
                });
                e.preventDefault();
              }
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl"
          >
            <ExternalLink className="inline w-4 h-4 mr-2" /> Live Demo
          </a>

          <a
            href={project.Github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (project.Github === "Private") {
                Swal.fire({
                  icon: "info",
                  title: "Private Repository",
                  text: "This repository is private.",
                  background: "#030014",
                  color: "#fff",
                  confirmButtonText: "OK",
                });
                e.preventDefault();
              }
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl"
          >
            <Github className="inline w-4 h-4 mr-2" /> Github
          </a>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-400" /> Technologies Used
          </h3>

          {project.TechStack.length ? (
            <div className="flex flex-wrap gap-3">
              {project.TechStack.map((tech, idx) => <TechBadge key={idx} tech={tech} />)}
            </div>
          ) : (
            <p className="text-gray-500">No technologies listed.</p>
          )}
        </div>

        <div className="mt-10 bg-white/[0.02] p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" /> Key Features
          </h3>

          {project.Features.length ? (
            <ul className="space-y-2">
              {project.Features.map((f, idx) => <FeatureItem key={idx} feature={f} />)}
            </ul>
          ) : (
            <p className="text-gray-500">No features listed.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;