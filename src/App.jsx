import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronDown, ExternalLink, Code, Database, Server, Briefcase, Moon, Sun, Sparkles, Zap, Palette, Menu, X, ArrowUp, Download } from 'lucide-react';

export default function App() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [colorTheme, setColorTheme] = useState('indigo');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [showResumeError, setShowResumeError] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  const konamiProgressRef = useRef(0);
  const audioContextRef = useRef(null);
  const contactInfo = {
    name: 'Harpreet Parhar',
    email: 'harpreetparhar.inbox@gmail.com', 
    github: 'https://github.com/harpreetparharinbox-cyber',
    linkedin: 'www.linkedin.com/in/harpreet-singh-7492b12a2', // 
    upwork: 'https://www.upwork.com/freelancers/~0140698859477a0cc1',
    resumeUrl: 'https://ik.imagekit.io/nvxfildxu/Harpreet_Parhar_Backend_Developer_Resume_ATS.pdf' // Add your resume PDF to public folder or use direct URL
  };

  const photos = [
    'https://tse4.mm.bing.net/th/id/OIP.eeYXqCfq7OMeMOriGlxn_QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', // Replace with your photo URL
    'https://ik.imagekit.io/nvxfildxu/Full%20Size%20Photo%20.jpg', // Replace with your photo URL
    'https://ik.imagekit.io/nvxfildxu/PXL_20251009_141400994.jpg'  // Replace with your photo URL
  ];

  const themes = {
    indigo: { from: 'from-indigo-600', to: 'to-purple-600', accent: 'indigo' },
    blue: { from: 'from-blue-600', to: 'to-cyan-600', accent: 'blue' },
    emerald: { from: 'from-emerald-600', to: 'to-teal-600', accent: 'emerald' },
    rose: { from: 'from-rose-600', to: 'to-pink-600', accent: 'rose' },
    amber: { from: 'from-amber-600', to: 'to-orange-600', accent: 'amber' }
  };

  const projects = [
    {
      name: 'Muzer',
      description: 'A music streaming platform built with TypeScript featuring real-time playback, user authentication, and playlist management. Implements modern web technologies for seamless audio streaming experience.',
      tech: ['TypeScript', 'Next.js', 'PostgreSQL', 'Redis'],
      github: 'https://github.com/harpreetparharinbox-cyber/muzer-main',
      live: null,
      status: 'GitHub Repository',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      name: 'Image E-commerce',
      description: 'Full-stack e-commerce platform with image-based product catalog. Features include user authentication, shopping cart, payment integration, and admin dashboard for inventory management.',
      tech: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/harpreetparharinbox-cyber/image-ecommerce-main',
      live: null,
      status: 'GitHub Repository',
      icon: <Code className="w-6 h-6" />
    },
    {
      name: 'AI-Powered Project (Coming Soon)',
      description: 'Upcoming project integrating artificial intelligence to solve real-world backend challenges. Will feature machine learning models, API design, and scalable architecture.',
      tech: ['Python', 'FastAPI', 'TensorFlow', 'Docker'],
      github: '#',
      live: null,
      status: 'In Development',
      icon: <Zap className="w-6 h-6" />
    }
  ];

  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoading(false), 1500);
    
    const photoInterval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 3000);

    const scrollPromptTimer = setTimeout(() => {
      setShowScrollPrompt(true);
    }, 5000);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 500);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('.scroll-section');
      let current = 0;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = index;
        }
      });
      setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      if (window.innerWidth > 768) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiProgressRef.current]) {
        konamiProgressRef.current += 1;
        if (konamiProgressRef.current === konamiCode.length) {
          //playSound(1200);
          setShowEasterEgg(true);
          setTimeout(() => setShowEasterEgg(false), 3000);
          konamiProgressRef.current = 0;
        }
      } else {
        konamiProgressRef.current = 0;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(photoInterval);
      clearTimeout(loadTimer);
      clearTimeout(scrollPromptTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleImageLoad = (index) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound(700);
  };

  const playSound = (frequency = 800) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('.scroll-section');
    sections[index]?.scrollIntoView({ behavior: 'smooth' });
    playSound(600);
  };

  const handleCardHover = (index) => {
    setHoveredCard(index);
    playSound(400);
  };

  const downloadResume = () => {
    playSound(800);
    
    // Check if resume exists
    if (!contactInfo.resumeUrl || contactInfo.resumeUrl === '/resume.pdf') {
      // Show error message
      setShowResumeError(true);
      setTimeout(() => setShowResumeError(false), 4000);
      return;
    }
    
    // Try to download the resume
    try {
      const link = document.createElement('a');
      link.href = contactInfo.resumeUrl;
      link.download = `${contactInfo.name}_Resume.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Resume download failed:', error);
      setShowResumeError(true);
      setTimeout(() => setShowResumeError(false), 4000);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="space-y-6 w-full max-w-4xl px-6">
          <div className={`h-12 rounded-full animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
          <div className={`h-12 rounded-full animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} w-3/4`}></div>
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className={`h-40 rounded-3xl animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
            <div className={`h-40 rounded-3xl animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
            <div className={`h-40 rounded-3xl animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
          </div>
        </div>
      </div>
    );
  }

  const theme = themes[colorTheme];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        
        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
          <div 
            className={`h-full bg-gradient-to-r ${theme.from} ${theme.to} transition-all duration-300`}
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* Custom Cursor Trail */}
        <div 
          className="fixed w-8 h-8 rounded-full border-2 pointer-events-none z-50 transition-all duration-300 hidden md:block"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            borderColor: darkMode ? '#8b5cf6' : '#6366f1',
            opacity: 0.5
          }}
        ></div>

        {/* Easter Egg */}
        {showEasterEgg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm pointer-events-none">
            <div className="text-center space-y-4 animate-bounce">
              <Zap className="w-24 h-24 text-yellow-400 mx-auto animate-spin" />
              <h2 className="text-4xl font-bold text-white">🎮 Konami Code Activated! 🎮</h2>
              <p className="text-xl text-gray-300">You found the secret! 🚀</p>
            </div>
          </div>
        )}

        {/* Resume Error Notification */}
        {showResumeError && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-[slideDown_0.5s_ease-out]">
            <div className={`px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-3 ${
              darkMode ? 'bg-red-900/90 border-red-700 text-red-200' : 'bg-red-50/95 border-red-200 text-red-800'
            }`}>
              <div className="flex-shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Resume Not Available</h3>
                <p className="text-sm mt-1">Please add your resume URL in the contactInfo section</p>
              </div>
            </div>
          </div>
        )}

        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, ${darkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated Background Blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-${theme.accent}-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse`}></div>
          <div className={`absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000`}></div>
          <div className={`absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000`}></div>
        </div>

        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-xl transition-all duration-300 ${
          darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'
        } border-b`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full overflow-hidden ring-2 shadow-lg transition-all ${
                darkMode ? 'ring-purple-500' : 'ring-indigo-500'
              }`}>
                <img 
                  src={photos[currentPhotoIndex]} 
                  alt={contactInfo.name}
                  loading="lazy"
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className={`font-bold text-xl bg-gradient-to-r ${theme.from} ${theme.to} bg-clip-text text-transparent hidden sm:block`}>
                {contactInfo.name}
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href={contactInfo.github}
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => playSound(500)}
                aria-label="GitHub Profile"
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}>
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={contactInfo.upwork}
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => playSound(500)}
                aria-label="Upwork Profile"
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}>
                <Briefcase className="w-5 h-5" />
              </a>
              <a 
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound(500)}
                aria-label="LinkedIn Profile"
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}>
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:${contactInfo.email}`}
                onClick={() => playSound(500)}
                aria-label="Send Email"
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}>
                <Mail className="w-5 h-5" />
              </a>
              
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
              
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowThemeSelector(!showThemeSelector);
                    playSound(600);
                  }}
                  aria-label="Change Color Theme"
                  className={`p-2 rounded-full transition-all hover:scale-110 ${
                    darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}>
                  <Palette className="w-5 h-5" />
                </button>
                {showThemeSelector && (
                  <div className={`absolute right-0 mt-2 p-3 rounded-2xl shadow-2xl backdrop-blur-xl border z-50 ${
                    darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
                  }`}>
                    <div className="flex gap-2">
                      {Object.keys(themes).map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setColorTheme(t);
                            playSound(700);
                            setShowThemeSelector(false);
                          }}
                          aria-label={`${t} theme`}
                          className={`w-8 h-8 rounded-full bg-gradient-to-r ${themes[t].from} ${themes[t].to} hover:scale-110 transition-transform ${
                            colorTheme === t ? 'ring-2 ring-offset-2 ring-white dark:ring-gray-700' : ''
                          }`}
                        ></button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => {
                  setDarkMode(!darkMode);
                  playSound(800);
                }}
                aria-label="Toggle Dark Mode"
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}>
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                playSound(600);
              }}
              aria-label="Toggle Mobile Menu"
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden border-t ${
              darkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'
            } backdrop-blur-xl`}>
              <div className="px-6 py-4 space-y-4">
                <div className="flex flex-wrap gap-3">
                  <a 
                    href={contactInfo.github}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => playSound(500)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    }`}>
                    <Github className="w-4 h-4" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a 
                    href={contactInfo.upwork}
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => playSound(500)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    }`}>
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">Upwork</span>
                  </a>
                  <a 
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound(500)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    }`}>
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    onClick={() => playSound(500)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    }`}>
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Email</span>
                  </a>
                </div>
                
                <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Theme:</span>
                  <div className="flex gap-2">
                    {Object.keys(themes).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setColorTheme(t);
                          playSound(700);
                        }}
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${themes[t].from} ${themes[t].to} hover:scale-110 transition-transform ${
                          colorTheme === t ? 'ring-2 ring-offset-2' : ''
                        }`}
                      ></button>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      setDarkMode(!darkMode);
                      playSound(800);
                    }}
                    className={`ml-auto p-2 rounded-full ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="scroll-section min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
            
            {/* Photo Carousel */}
            <div className="relative group">
              <div className={`relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 ${
                darkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-white/30 border-white/20'
              }`}>
                {photos.map((photo, index) => (
                  <div key={index} className="absolute inset-0">
                    {/* Blur placeholder */}
                    {!imagesLoaded[index] && (
                      <div className={`absolute inset-0 animate-pulse ${
                        darkMode ? 'bg-gray-800' : 'bg-gray-200'
                      }`}></div>
                    )}
                    <img
                      src={photo}
                      alt={`${contactInfo.name} - Photo ${index + 1}`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      onLoad={() => handleImageLoad(index)}
                      className={`w-full h-full object-cover transition-all duration-1000 ${
                        index === currentPhotoIndex ? 'opacity-100' : 'opacity-0'
                      } ${imagesLoaded[index] ? 'blur-0' : 'blur-md'}`}
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/50 transition-all"></div>
              </div>
              
              <div className="flex justify-center gap-2 mt-6">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentPhotoIndex(index);
                      playSound(500);
                    }}
                    aria-label={`View photo ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentPhotoIndex 
                        ? `w-12 bg-gradient-to-r ${theme.from} ${theme.to}` 
                        : 'w-2 bg-gray-300 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Introduction */}
            <div className="space-y-6">
              <div className="space-y-3 overflow-hidden">
                <h1 className="text-6xl font-bold animate-[slideInRight_0.8s_ease-out]">
                  <span className={`bg-gradient-to-r ${theme.from} ${theme.to} bg-clip-text text-transparent`}>
                    Backend Developer
                  </span>
                </h1>
                <div className={`h-2 w-32 bg-gradient-to-r ${theme.from} ${theme.to} rounded-full animate-[expandWidth_1s_ease-out]`}></div>
              </div>
              
              <p className={`text-xl leading-relaxed animate-[fadeIn_1s_ease-out_0.3s_both] ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Building robust, scalable backend systems with modern technologies. 
                Specialized in API development, database design, and cloud architecture.
              </p>

              <div className="space-y-4 animate-[fadeIn_1s_ease-out_0.6s_both]">
                <h3 className="font-semibold text-lg">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs', 'GraphQL', 'MongoDB'].map((skill) => (
                    <span 
                      key={skill}
                      onClick={() => playSound(400)}
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && playSound(400)}
                      role="button"
                      className={`px-4 py-2 backdrop-blur-sm rounded-full text-sm font-medium transition-all cursor-pointer hover:scale-105 focus:scale-105 ${
                        darkMode 
                          ? 'bg-gray-800/60 border border-gray-700 hover:border-purple-500 hover:text-purple-400 focus:border-purple-500' 
                          : 'bg-white/60 border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 focus:border-indigo-500'
                      }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 animate-[fadeIn_1s_ease-out_0.9s_both]">
                <button 
                  onClick={() => {
                    scrollToSection(1);
                    playSound(700);
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && scrollToSection(1)}
                  aria-label="View Projects Section"
                  className={`group relative px-8 py-4 bg-gradient-to-r ${theme.from} ${theme.to} text-white rounded-full font-semibold overflow-hidden hover:shadow-2xl transition-all hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}>
                  <span className="relative z-10">View Projects</span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
                <button 
                  onClick={downloadResume}
                  onKeyPress={(e) => e.key === 'Enter' && downloadResume()}
                  aria-label="Download Resume PDF"
                  className={`flex items-center gap-2 px-8 py-4 backdrop-blur-sm rounded-full font-semibold transition-all hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    darkMode 
                      ? 'bg-gray-800/60 border border-gray-700 hover:border-purple-500 focus:border-purple-500 focus:ring-purple-500' 
                      : 'bg-white/60 border border-gray-200 hover:border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}>
                  <Download className="w-4 h-4" />
                  Resume
                </button>
              </div>
            </div>
          </div>

          {showScrollPrompt && (
            <div 
              onClick={() => {
                scrollToSection(1);
                playSound(600);
              }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer group">
              <div className="flex flex-col items-center gap-2 animate-bounce">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Scroll to explore
                </span>
                <div className={`p-3 rounded-full backdrop-blur-sm transition-all group-hover:scale-110 ${
                  darkMode ? 'bg-gray-800/60 border border-gray-700' : 'bg-white/60 border border-gray-200'
                }`}>
                  <ChevronDown className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-indigo-600'}`} />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Projects Section */}
        <section className="scroll-section min-h-screen py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-5xl font-bold mb-4 bg-gradient-to-r ${theme.from} ${theme.to} bg-clip-text text-transparent`}>
                Featured Projects
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Building solutions that make a difference
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                    darkMode 
                      ? 'bg-gray-800/40 border border-gray-700 hover:border-purple-500' 
                      : 'bg-white/60 border border-gray-200 hover:border-indigo-500'
                  }`}
                  style={{
                    transform: hoveredCard === index ? 'perspective(1000px) rotateY(2deg) rotateX(2deg)' : '',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.from} ${theme.to} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${theme.from} ${theme.to} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      {project.icon}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold">{project.name}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-6 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech}
                          className={`text-xs px-3 py-1 rounded-full ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      {project.github !== '#' && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playSound(600)}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                            darkMode 
                              ? 'bg-gray-700 text-white hover:bg-gray-600' 
                              : 'bg-gray-900 text-white hover:bg-gray-800'
                          }`}>
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                      {project.github === '#' && (
                        <div className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold ${
                          darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                        }`}>
                          <Zap className="w-4 h-4" />
                          In Dev
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => {
                  scrollToSection(2);
                  playSound(700);
                }}
                aria-label="Scroll to Live Demos Section"
                className={`px-8 py-4 backdrop-blur-sm rounded-full font-semibold transition-all hover:scale-105 focus:scale-105 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  darkMode 
                    ? 'bg-gray-800/60 border border-gray-700 hover:border-purple-500 focus:border-purple-500 focus:ring-purple-500' 
                    : 'bg-white/60 border border-gray-200 hover:border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500'
                }`}>
                View Live Demos
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>
        </section>

        {/* Live Demos Section */}
        <section className="scroll-section min-h-screen py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-5xl font-bold mb-4 bg-gradient-to-r ${theme.from} ${theme.to} bg-clip-text text-transparent`}>
                Live Demonstrations
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Experience the projects in action
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                    darkMode ? 'bg-gray-800/40 border border-gray-700' : 'bg-white/60 border border-gray-200'
                  }`}>
                  <div className={`bg-gradient-to-r ${theme.from} ${theme.to} p-4`}>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <span className="text-white font-semibold text-sm">{project.name}</span>
                    </div>
                  </div>
                  
                  <div className={`aspect-video flex items-center justify-center p-8 ${
                    darkMode ? 'bg-gray-900/50' : 'bg-gray-50'
                  }`}>
                    {project.live ? (
                      <iframe
                        src={project.live}
                        className="w-full h-full border-0 rounded"
                        title={project.name}
                      />
                    ) : (
                      <div className="text-center space-y-4">
                        <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${theme.from} ${theme.to} text-white opacity-50`}>
                          {project.icon}
                        </div>
                        <p className={`font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {project.status === 'In Development' 
                            ? '🚀 Coming Soon - Under Development' 
                            : '⚙️ Demo deployment in progress'}
                        </p>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playSound(600)}
                          className={`inline-flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 ${
                            darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-indigo-600 hover:text-indigo-700'
                          }`}>
                          <Github className="w-4 h-4" />
                          View Source Code
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className={`fixed bottom-8 right-8 z-40 p-4 rounded-full shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 group ${
              darkMode 
                ? 'bg-gray-800/90 border border-gray-700 hover:border-purple-500 focus:ring-purple-500' 
                : 'bg-white/90 border border-gray-200 hover:border-indigo-500 focus:ring-indigo-500'
            }`}>
            <ArrowUp className={`w-6 h-6 transition-transform group-hover:-translate-y-1 ${darkMode ? 'text-purple-400' : 'text-indigo-600'}`} />
            <span className={`absolute bottom-full right-0 mb-2 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
              darkMode ? 'bg-gray-800 text-gray-200 border border-gray-700' : 'bg-white text-gray-700 border border-gray-200 shadow-lg'
            }`}>
              Back to Top
            </span>
          </button>
        )}

        {/* Section Indicators */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
          {['Hero', 'Projects', 'Demos'].map((label, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => {
                  scrollToSection(index);
                  playSound(500);
                }}
                aria-label={`Go to ${label} section`}
                className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  activeSection === index
                    ? `bg-gradient-to-r ${theme.from} ${theme.to} w-3 h-10 shadow-lg`
                    : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              ></button>
              <span className={`absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                darkMode ? 'bg-gray-800 text-gray-200 border border-gray-700' : 'bg-white text-gray-700 border border-gray-200 shadow-lg'
              }`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className={`py-16 border-t transition-colors ${
          darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              &copy; 2024 <span className="font-semibold">{contactInfo.name}</span> - Built with React & Tailwind CSS
            </p>
            <div className="flex justify-center gap-6">
              <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-indigo-600'}`}>GitHub</a>
              <a href={contactInfo.upwork} target="_blank" rel="noopener noreferrer" className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-indigo-600'}`}>Upwork</a>
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-indigo-600'}`}>LinkedIn</a>
              <a href={`mailto:${contactInfo.email}`} className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-indigo-600'}`}>Email</a>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              💡 Pro tip: Try the Konami code (↑↑↓↓←→←→BA)
            </p>
          </div>
        </footer>

        <style>{`
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes expandWidth {
            from { width: 0; }
            to { width: 8rem; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translate(-50%, -20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          html { scroll-behavior: smooth; }
          
          /* 60fps optimized animations */
          * {
            transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Smooth scrolling with easing */
          html {
            scroll-behavior: smooth;
          }
          
          /* Focus styles for accessibility */
          *:focus-visible {
            outline: 2px solid ${darkMode ? '#a78bfa' : '#6366f1'};
            outline-offset: 2px;
          }
          
          /* Smooth transitions for all interactive elements */
          button, a, input, select, textarea {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Optimize animations for mobile */
          @media (max-width: 768px) {
            * {
              animation-duration: 0.5s !important;
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}