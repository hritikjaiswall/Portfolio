import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button onClick={onClick} className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm">
    {isShowingMore ? "See Less" : "See More"}
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}><Typography component="div">{children}</Typography></Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return { id: `tab-${index}`, "aria-controls": `tabpanel-${index}` };
}

const techStacks = [
  { icon: "/html.png", language: "HTML" },
  { icon: "/css.png", language: "CSS" },
  { icon: "/javascript.png", language: "JavaScript" },
  { icon: "/React.webp", language: "React" },
  { icon: "/express.png", language: "Express.js" },
  { icon: "/nodejs.png", language: "Node.js" },
  { icon: "/tailwindcss.png", language: "Tailwind" },
  { icon: "/testing.png", language: "Testing" },
  { icon: "/mongoDB.png", language: "MongoDB" },
  { icon: "/atlas.webp", language: "Atlas" },
  { icon: "/firebase.svg", language: "Firebase" },
  { icon: "/vercel.png", language: "Vercel" },
  { icon: "/render.jpg", language: "Render" },
];

export default function PortfolioSection() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const initialItems = window.innerWidth < 768 ? 4 : 6;

  useEffect(() => { AOS.init({ once: false }); }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectSnapshot = await getDocs(collection(db, "projects"));
      const certificateSnapshot = await getDocs(collection(db, "certificates"));
      const projectData = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const certificateData = certificateSnapshot.docs.map(doc => doc.data());
      setProjects(projectData);
      setCertificates(certificateData);
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div id="Portofolio" className="px-[5%] md:px-[10%] bg-[#030014] w-full mt-[3rem]">
      <div className="text-center pb-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mt-2">
          Explore my journey through projects, certifications, and technical expertise.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px" }}>
          <Tabs
            value={value}
            onChange={(e, newVal) => setValue(newVal)}
            variant="fullWidth"
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: "#fff" } }}
            sx={{
              "& .MuiTab-root": { color: "#fff", fontWeight: "bold" },
              "& .Mui-selected": { color: "#fff" },
            }}
          >
            <Tab icon={<Code />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={setValue}>
          
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showAllProjects ? projects : projects.slice(0, initialItems)).map((proj) => (
                <div key={proj.id} data-aos="fade-up" className="hover:scale-105 transition-transform">
                  <CardProject {...proj} />
                </div>
              ))}
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 flex justify-center">
                <ToggleButton onClick={() => setShowAllProjects(p => !p)} isShowingMore={showAllProjects} />
              </div>
            )}
            <p className="text-center text-gray-400 mt-4">
              Total Projects: <span className="text-white font-semibold">{projects.length}</span>
            </p>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showAllCertificates ? certificates : certificates.slice(0, initialItems)).map((cert, i) => (
                <div key={i} data-aos="fade-up" className="hover:scale-105 transition-transform">
                  <Certificate ImgSertif={cert.Img} />
                </div>
              ))}
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 flex justify-center">
                <ToggleButton onClick={() => setShowAllCertificates(p => !p)} isShowingMore={showAllCertificates} />
              </div>
            )}
            <p className="text-center text-gray-400 mt-4">
              Total Certificates: <span className="text-white font-semibold">{certificates.length}</span>
            </p>
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {techStacks.map((stack, i) => (
                <div key={i} data-aos="fade-up" className="hover:scale-105 transition-transform">
                  <TechStackIcon icon={stack.icon} Language={stack.language} />
                </div>
              ))}
            </div>
          </TabPanel>
          
        </SwipeableViews>
      </Box>
    </div>
  );
}
