import React, { useState, useEffect, useRef } from 'react';
import { 
  MousePointer2, ArrowUpRight, Instagram, Linkedin, Twitter, 
  Award, Camera, Video, PenTool, Monitor, Github, Facebook, Layers, Image as ImageIcon,
  Home as HomeIcon, User, Mail, Loader2
} from 'lucide-react';

/**
 * ANUCHAMATH SATHSARA - PORTFOLIO V2.6 (DOMAIN SEO)
 * Updates: 
 * 1. Specific Domain Integration (anuchamath-sathsara.camdvr.org)
 * 2. Open Graph Tags for Social Sharing
 * 3. Canonical URL
 */

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const cursorRef = useRef(null); 
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isMobile, setIsMobile] = useState(false);
  
  // Loading State
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // --- GLOBAL STYLES & SEO & FAVICON ---
  useEffect(() => {
    // 1. SET PAGE TITLE
    document.title = "Anuchamath Sathsara | Creative Designer & Cinematographer";
    document.body.style.overflowX = 'hidden';
    
    // 2. SET META TAGS & CANONICAL URL
    const metaConfig = [
      { name: "description", content: "Portfolio of Anuchamath Sathsara (S.K.A Sathsara). Professional Graphic Designer, Cinematographer, and Video Editor based in Sri Lanka." },
      { name: "keywords", content: "Anuchamath Sathsara, SK Anuchamath, S.K.A Sathsara, Graphic Designer Sri Lanka, Cinematographer, Video Editor, UI/UX Designer" },
      // Open Graph / Facebook / WhatsApp
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://anuchamath-sathsara.camdvr.org/" },
      { property: "og:title", content: "Anuchamath Sathsara | Creative Portfolio" },
      { property: "og:description", content: "Multidisciplinary Designer & Visual Storyteller." },
      { property: "og:image", content: "https://anuchamath-sathsara.camdvr.org/og-image.jpg" }, // Ideally upload an image to public folder named og-image.jpg
    ];

    metaConfig.forEach(tag => {
      let element;
      if (tag.name) {
        element = document.querySelector(`meta[name="${tag.name}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.name = tag.name;
          document.head.appendChild(element);
        }
      } else if (tag.property) {
        element = document.querySelector(`meta[property="${tag.property}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('property', tag.property);
          document.head.appendChild(element);
        }
      }
      element.setAttribute('content', tag.content);
    });

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = "https://anuchamath-sathsara.camdvr.org/";

    // 3. DYNAMIC FAVICON GENERATOR
    const setFavicon = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#22d3ee'; // Cyan
      ctx.fill();
      ctx.font = 'bold 40px Arial';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('A', 32, 34);
      const link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL();
      document.getElementsByTagName('head')[0].appendChild(link);
    };
    setFavicon();

    // 4. INJECT STRUCTURED DATA (JSON-LD)
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Anuchamath Sathsara",
      "alternateName": ["SK Anuchamath", "S.K.A Sathsara"],
      "url": "https://anuchamath-sathsara.camdvr.org",
      "jobTitle": "Multidisciplinary Designer",
      "sameAs": [
        "https://github.com",
        "https://instagram.com",
        "https://linkedin.com",
        "https://facebook.com"
      ]
    };
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.body.style.overflowX = 'auto'; 
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      }
    };
    window.addEventListener("mousemove", mouseMove);

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1; 
      });
    }, 50);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'achievements': return <Achievements setCursorVariant={setCursorVariant} />;
      case 'contact': return <Contact setCursorVariant={setCursorVariant} />;
      default: return <Home setCursorVariant={setCursorVariant} />;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center text-white cursor-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] animate-pulse" />
        <div className="relative z-10 flex flex-col items-center">
            <div className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 animate-pulse text-center px-4">
                Anuchamath.
            </div>
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4 relative">
                <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-100 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                />
            </div>
            <div className="font-mono text-xs text-cyan-400 tracking-[0.2em]">
                SYSTEM INITIALIZING {loadingProgress}%
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-400 selection:text-black relative transition-colors duration-700 pb-24 md:pb-0 animate-fade-in cursor-none">
      
      {/* 1. ANIMATED BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-cyan-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-pink-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* 2. CUSTOM CURSOR */}
      <div 
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div className={`w-full h-full rounded-full border border-white/80 transition-transform duration-200 ease-out
          ${cursorVariant === 'hover' ? 'scale-[2.5] bg-white' : 'scale-100'} 
          ${cursorVariant === 'card' ? 'scale-[3] bg-cyan-400/20 border-cyan-400 backdrop-blur-sm' : ''}
        `} />
      </div>

      {/* 3. NAVBAR */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-40 bg-gradient-to-b from-[#050505] to-transparent md:bg-none">
        <div 
          className="text-xl md:text-2xl font-black tracking-tighter uppercase cursor-none relative group"
          onClick={() => setActiveTab('home')}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <span className="relative z-10">Anuchamath.</span>
          <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
        </div>
        
        <div className="hidden md:flex gap-1 bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 cursor-none">
          {['home', 'achievements', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-none
                ${activeTab === tab ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* 4. MOBILE NAV */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex justify-around items-center shadow-2xl shadow-black/50">
          {[
            { id: 'home', icon: <HomeIcon size={20} />, label: 'Home' },
            { id: 'achievements', icon: <Award size={20} />, label: 'Awards' },
            { id: 'contact', icon: <Mail size={20} />, label: 'Contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all duration-300 ${activeTab === item.id ? 'bg-white text-black' : 'text-gray-400'}`}
            >
              {item.icon}
              <span className="text-[10px] uppercase font-bold mt-1 tracking-wider">{item.label}</span>
            </button>
          ))}
      </div>

      <main className="pt-24 md:pt-32 px-4 md:px-12 flex flex-col relative z-10 max-w-7xl mx-auto cursor-none">
        {renderContent()}
      </main>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fillBar { from { width: 0%; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fill { animation: fillBar 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        body, a, button, input { cursor: none !important; }
        @media (max-width: 768px) { body, a, button, input { cursor: auto !important; } }
      `}</style>
    </div>
  );
};

const Home = ({ setCursorVariant }) => {
  const roles = [
    { title: "Graphic Designer", color: "text-pink-500", icon: <PenTool /> },
    { title: "Cinematographer", color: "text-purple-500", icon: <Video /> },
    { title: "Video Editor", color: "text-blue-500", icon: <Monitor /> },
    { title: "Photographer", color: "text-cyan-500", icon: <Camera /> },
    { title: "UI/UX Designer", color: "text-emerald-400", icon: <Layers /> },
    { title: "Web Designer", color: "text-yellow-400", icon: <MousePointer2 /> }
  ];

  const skills = [
    { name: "Adobe Creative Suite", level: 95, color: "bg-gradient-to-r from-pink-500 to-rose-500" },
    { name: "DaVinci Resolve / Premiere", level: 90, color: "bg-gradient-to-r from-purple-500 to-indigo-500" },
    { name: "Figma / UI Systems", level: 88, color: "bg-gradient-to-r from-emerald-400 to-teal-500" },
    { name: "React / Modern Web", level: 82, color: "bg-gradient-to-r from-cyan-400 to-blue-500" },
    { name: "Blender 3D / VFX", level: 75, color: "bg-gradient-to-r from-yellow-400 to-orange-500" },
  ];

  return (
    <div className="flex flex-col justify-center min-h-[70vh]">
      <header>
        <p className="font-mono text-cyan-400 mb-8 uppercase tracking-[0.2em] text-xs md:text-sm animate-fade-in text-center md:text-left">
          Thinking in Color & Motion
        </p>
      </header>
      
      {/* ROLES SECTION */}
      <div className="flex flex-col relative mb-16 md:mb-24">
        {roles.map((role, index) => (
          <div 
            key={index}
            className="group relative border-b border-white/5 py-4 md:py-8 flex items-center justify-between transition-all duration-300"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            {/* TEXT FIX: Increased visibility and simplified animation */}
            <div className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white/20 group-hover:text-white transition-all duration-500 ease-out z-10
              group-hover:translate-x-2 md:group-hover:translate-x-4`}
            >
              <span className={`block group-hover:${role.color} transition-colors duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`}>
                {role.title}
              </span>
            </div>

            <div className={`hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-10 group-hover:translate-x-0 ${role.color}`}>
               {React.cloneElement(role.icon, { size: 48, strokeWidth: 1.5 })}
            </div>
            
            <div className={`sm:hidden opacity-50 ${role.color}`}>
                {React.cloneElement(role.icon, { size: 24, strokeWidth: 1.5 })}
            </div>
            
            <div className={`absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-current transition-all duration-700 ease-in-out ${role.color} opacity-50`} />
          </div>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-white/10 pt-12 md:pt-16 animate-fade-in-up">
        <div className="text-center md:text-left">
           <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 md:mb-6 text-white tracking-tight">Technical<br/>Arsenal</h3>
           <p className="text-gray-400 text-sm leading-relaxed font-mono mx-auto md:mx-0 max-w-sm">
             A blend of artistic vision and technical mastery by <strong>S.K.A Sathsara</strong>. Constantly evolving workflow with industry-standard tools.
           </p>
        </div>
        <div className="space-y-6 md:space-y-8">
           {skills.map((skill, index) => (
             <div 
                key={index} 
                className="group cursor-none"
                onMouseEnter={() => setCursorVariant('card')}
                onMouseLeave={() => setCursorVariant('default')}
             >
                <div className="flex justify-between mb-2 md:mb-3 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  <span className="text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                  <span className="text-gray-500 font-mono group-hover:text-cyan-400 transition-colors">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                  <div 
                    className={`h-full ${skill.color} rounded-full animate-fill relative`}
                    style={{ width: `${skill.level}%`, animationDelay: `${index * 150}ms` }}
                  >
                     <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_white] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

// ... Achievements and Contact components remain the same ...
const Achievements = ({ setCursorVariant }) => {
  const achievements = [
    { year: "2024", title: "Best Cinematography", org: "National Film Awards", desc: "Awarded for exceptional lighting and composition.", tags: ["Film"], color: "from-purple-500 to-indigo-500" },
    { year: "2023", title: "UI Excellence", org: "Awwwards Nominee", desc: "Recognized for portfolio design.", tags: ["Web"], color: "from-cyan-500 to-blue-500" },
    { year: "2023", title: "Visual Storyteller", org: "Canon Asia", desc: "Top 10 finalist in photography.", tags: ["Photo"], color: "from-pink-500 to-rose-500" },
    { year: "2022", title: "Best Short Edit", org: "Lanka Film Fest", desc: "Fast-paced editing style.", tags: ["Editing"], color: "from-emerald-400 to-green-600" },
  ];
  return (
    <div className="animate-fade-in-up w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
        <h2 className="text-4xl md:text-5xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none">Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Fame</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {achievements.map((item, i) => (
          <div key={i} className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-500 hover:-translate-y-2" onMouseEnter={() => setCursorVariant('card')} onMouseLeave={() => setCursorVariant('default')}>
            <div className={`h-40 md:h-48 w-full bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500 flex items-center justify-center relative overflow-hidden`}><ImageIcon className="text-white opacity-20 w-12 h-12" /></div>
            <div className="p-6 md:p-8 relative">
              <div className="flex justify-between items-start mb-4"><div className="font-mono text-[10px] md:text-xs text-cyan-400 border border-cyan-400/30 px-2 py-1 rounded-full bg-cyan-900/20">{item.year}</div><ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors w-5 h-5" /></div>
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-1 leading-none">{item.title}</h3>
              <p className="text-xs md:text-sm text-gray-400 font-mono mb-4 md:mb-6">{item.org}</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 border-l-2 border-white/10 pl-4">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact = ({ setCursorVariant }) => {
  const socials = [
    { label: "Github", icon: <Github size={24}/>, link: "https://github.com", color: "hover:bg-gray-800" },
    { label: "Instagram", icon: <Instagram size={24}/>, link: "https://instagram.com", color: "hover:bg-pink-600" },
    { label: "Facebook", icon: <Facebook size={24}/>, link: "https://facebook.com", color: "hover:bg-blue-600" },
    { label: "LinkedIn", icon: <Linkedin size={24}/>, link: "https://linkedin.com", color: "hover:bg-blue-700" },
  ];
  return (
    <div className="h-full flex flex-col justify-center animate-fade-in-up py-6 md:py-12">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="inline-block text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 mb-6 border border-cyan-400/20 px-4 py-2 rounded-full">Get In Touch</h2>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">Start The<br />Project</h1>
      </div>
      <div className="max-w-3xl mx-auto w-full grid grid-cols-1 gap-4 px-2 md:px-0">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl text-center group hover:bg-white/10 transition-all cursor-none" onMouseEnter={() => setCursorVariant('card')} onMouseLeave={() => setCursorVariant('default')}>
          <div className="text-xs md:text-sm font-mono text-gray-500 mb-2 uppercase">Direct Email</div>
          <a href="mailto:hello@anuchamath.com" className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all break-all md:break-normal cursor-none">hello@anuchamath.com</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-2 md:mt-4">
            {socials.map((social, idx) => (
                <a key={idx} href={social.link} target="_blank" rel="noreferrer" className={`flex flex-col items-center justify-center p-4 md:p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300 group hover:-translate-y-1 ${social.color} cursor-none`} onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}>
                    <div className="mb-2 md:mb-3 text-gray-300 group-hover:text-white transition-colors scale-75 md:scale-100">{social.icon}</div>
                    <span className="uppercase tracking-wider text-[10px] md:text-xs font-bold text-gray-500 group-hover:text-white">{social.label}</span>
                </a>
            ))}
        </div>
      </div>
      <div className="mt-12 md:mt-20 text-center font-mono text-[10px] md:text-xs text-gray-600 uppercase pb-6 md:pb-0">Designed & Built by <strong>S.K.A Sathsara</strong></div>
    </div>
  );
};

export default App;
