import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Globe, Smartphone, Zap, Users, Target, ShoppingCart, Database, Monitor, ChevronLeft, ChevronRight, Menu, X, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  

  const services = [
    {
      icon: Globe,
      title: "Business Websites",
      description: "Clean, professional, responsive sites for brand presence"
    },
    {
      icon: Smartphone,
      title: "E-Commerce Stores",
      description: "Scalable online shops with full cart and payment features"
    },
    {
      icon: Users,
      title: "Customer Portals",
      description: "Secure logins, dashboards, and user account systems"
    },
    {
      icon: Target,
      title: "Booking Platforms",
      description: "Automate appointments and reservations"
    },
    {
      icon: Code2,
      title: "CRM Dashboards",
      description: "Custom client management systems tailored to workflow"
    },
    {
      icon: Zap,
      title: "Admin Panels",
      description: "Manage teams, data, and operations in one place"
    }
  ];

  const offerings = [
    "Custom Website Development",
    "Website Improvement & Speed Optimization",
    "Mobile & SEO Optimization",
    "Automation Integrations",
    "Post-launch Support & Maintenance"
  ];

  const projects = [
    {
      id: "chocomart",
      title: "ChocoMart",
      description: "Advanced e-commerce platform with group buying functionality, comprehensive client portal, and sophisticated admin dashboard for streamlined operations.",
      tags: ["E-commerce", "Group Buying", "Admin Dashboard", "Payment Gateway"],
      category: "E-commerce",
      technology: "React",
      industry: "Retail",
      icon: ShoppingCart,
      image: "/assets/chocomart.png"
    },
    {
      id: "devflowai",
      title: "DevFlowAI",
      description: "AI-powered development management platform combining project tracking with intelligent automation - like Monday.com but specifically designed for development teams.",
      tags: ["AI Integration", "Project Management", "Team Collaboration", "Automation"],
      category: "SaaS",
      technology: "AI/ML",
      industry: "Technology",
      icon: Code2,
      image: "/assets/devflow.png"
    },
    {
      id: "kdm",
      title: "KDM Esports Cafe",
      description: "Strategic business proposal website for Kadiliman Esports Cafe, one of the Philippines' leading internet cafe chains, showcasing services and competitive advantages.",
      tags: ["Business Proposal", "Esports", "Landing Page", "Philippines"],
      category: "Landing Page",
      technology: "React",
      industry: "Entertainment",
      icon: Monitor,
      image: "/assets/kdm.png"
    },
    {
      id: "kingland",
      title: "Kingland.ph",
      description: "Multi-purpose platform combining e-commerce functionality with comprehensive admin management system for diverse business operations and inventory control.",
      tags: ["Multi-purpose", "E-commerce", "Admin System", "Inventory"],
      category: "E-commerce",
      technology: "Full-Stack",
      industry: "Business",
      icon: Globe,
      image: "/assets/kingland.png"
    },
    {
      id: "pdis",
      title: "PDIS",
      description: "Project Duo Information System - comprehensive data management platform designed for organizational efficiency and streamlined information processing workflows.",
      tags: ["Information System", "Data Management", "Workflows", "Enterprise"],
      category: "Enterprise",
      technology: "Database",
      industry: "Business",
      icon: Database,
      image: "/assets/pdis.png"
    }
  ];

  const nextProject = () => {
    if (isTransitioning) return;
    const filtered = selectedFilter === "All" 
      ? projects 
      : projects.filter(project => 
          project.category === selectedFilter || 
          project.technology === selectedFilter || 
          project.industry === selectedFilter
        );
    if (filtered.length === 0) return;
    setIsTransitioning(true);
    setCurrentProjectIndex((prev) => (prev + 1) % filtered.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    const filtered = selectedFilter === "All" 
      ? projects 
      : projects.filter(project => 
          project.category === selectedFilter || 
          project.technology === selectedFilter || 
          project.industry === selectedFilter
        );
    if (filtered.length === 0) return;
    setIsTransitioning(true);
    setCurrentProjectIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Filter projects based on selected filter
  const filteredProjects = selectedFilter === "All" 
    ? projects 
    : projects.filter(project => 
        project.category === selectedFilter || 
        project.technology === selectedFilter || 
        project.industry === selectedFilter
      );

  // Add keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events when focused on the projects section
      const projectsSection = document.getElementById('projects-section');
      if (!projectsSection || !projectsSection.contains(document.activeElement)) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevProject();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextProject();
      } else if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        if (index < filteredProjects.length) {
          setIsTransitioning(true);
          setCurrentProjectIndex(index);
          setTimeout(() => setIsTransitioning(false), 500);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredProjects.length]);

  // Add swipe gesture support for trackpads
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let isScrolling = false;
    let lastWheelTime = 0;
    let accumulatedDeltaX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isScrolling = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!startX || !startY || isTransitioning) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      
      const diffX = startX - currentX;
      const diffY = startY - currentY;
      
      // Determine if this is a horizontal swipe (increased threshold)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
        if (!isScrolling) {
          isScrolling = true;
          if (diffX > 0) {
            // Swipe left - next project
            nextProject();
          } else {
            // Swipe right - previous project
            prevProject();
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;
      
      const now = Date.now();
      
      // Check if this is a horizontal scroll (trackpad swipe) with higher threshold
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30) {
        e.preventDefault();
        
        // Accumulate delta for smoother detection
        accumulatedDeltaX += e.deltaX;
        
        // Only trigger if enough time has passed and threshold is met
        if (now - lastWheelTime > 300 && Math.abs(accumulatedDeltaX) > 100) {
          if (accumulatedDeltaX > 0) {
            nextProject();
          } else {
            prevProject();
          }
          lastWheelTime = now;
          accumulatedDeltaX = 0;
        }
        
        // Reset accumulation if too much time passes
        if (now - lastWheelTime > 500) {
          accumulatedDeltaX = 0;
        }
      }
    };

    const projectsSection = document.getElementById('projects-section');
    if (projectsSection) {
      projectsSection.addEventListener('touchstart', handleTouchStart, { passive: true });
      projectsSection.addEventListener('touchmove', handleTouchMove, { passive: true });
      projectsSection.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (projectsSection) {
        projectsSection.removeEventListener('touchstart', handleTouchStart);
        projectsSection.removeEventListener('touchmove', handleTouchMove);
        projectsSection.removeEventListener('wheel', handleWheel);
      }
    };
  }, [nextProject, prevProject]);


  const team = [
    {
      name: "Carlo Angelo Felipe",
      role: "CEO & Founder",
      specialties: "Tech Lead & Backend Developer",
      image: "/assets/Carlo.png",
      description: "Visionary leader with expertise in backend architecture, system design, and business strategy. Drives technical excellence and innovation.",
      skills: ["Node.js", "Python", "System Architecture", "DevOps", "Leadership"]
    },
    {
      name: "Renzo Gregorio",
      role: "Co-Founder",
      specialties: "Lead Frontend Developer",
      image: "/assets/Renzo.png", 
      description: "Frontend specialist focused on creating beautiful, user-centric interfaces with modern technologies and exceptional user experiences.",
      skills: ["React", "TypeScript", "UI/UX Design", "Frontend Architecture", "Performance Optimization"]
    }
  ];

  // Filter projects based on selected filter
  // Get filter categories
  const filterCategories = ["All", ...Array.from(new Set([
    ...projects.map(p => p.category),
    ...projects.map(p => p.technology),
    ...projects.map(p => p.industry)
  ]))];

  // Adjust current project index when filter changes
  const currentProject = filteredProjects[currentProjectIndex] || filteredProjects[0];
  const CurrentIcon = currentProject?.icon;


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Contact Bar */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+63 921 204 2845</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>hello@proximacentauri.solutions</span>
            </div>
          </div>
          <div className="text-xs">
            <span className="bg-green-600 px-2 py-1 rounded-full">FREE CONSULTATION</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-space font-bold text-xl text-gray-900">
              ProXima Centauri
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors font-inter">Services</a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors font-inter">Projects</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-inter">About</a>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors font-inter">Contact</Link>
              <Button asChild size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                <Link to="/schedule">Get Started</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
              <div className="px-4 pt-2 pb-6 space-y-4">
                <a 
                  href="#services" 
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-inter py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </a>
                <a 
                  href="#projects" 
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-inter py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Projects
                </a>
                <a 
                  href="#about" 
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-inter py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
                <Link 
                  to="/contact" 
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-inter py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="pt-4">
                  <Button asChild className="w-full bg-gray-900 text-white hover:bg-gray-800">
                    <Link to="/schedule" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-full inline-block mb-6 text-sm font-inter">
              🚀 Building digital solutions for Philippine businesses
            </div>
            <h1 className="text-5xl md:text-7xl font-space font-bold text-gray-900 mb-6 leading-tight">
              Build. Scale. Dominate.
              <br />
              <span className="text-gray-600">The Digital Advantage</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto font-inter font-light leading-relaxed">
              Transform your business with conversion-focused websites that drive real results. 
              Philippines-based experts delivering global-standard solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-gray-900 text-white hover:bg-gray-800 font-inter text-lg px-8 py-4">
                <Link to="/contact">
                  Get Free Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-inter border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-lg px-8 py-4">
                <Link to="/schedule">
                  View Success Stories
                </Link>
              </Button>
            </div>
            
            {/* Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-inter">Free Website Audit</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-inter">30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-inter">Custom Timeline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-6">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto">
              A proven 4-step process that transforms your business vision into digital reality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-2xl font-bold text-gray-900 font-space">1</span>
              </div>
              <h3 className="text-xl font-space font-semibold text-gray-900 mb-3">
                Discovery
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                We analyze your business goals, target audience, and competitive landscape to create a strategic roadmap.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-2xl font-bold text-gray-900 font-space">2</span>
              </div>
              <h3 className="text-xl font-space font-semibold text-gray-900 mb-3">
                Strategy
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                Custom development roadmap with wireframes, technical specifications, and timeline for your project.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-2xl font-bold text-gray-900 font-space">3</span>
              </div>
              <h3 className="text-xl font-space font-semibold text-gray-900 mb-3">
                Execution
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                Build your solution with regular updates, testing phases, and continuous feedback integration.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-2xl font-bold text-gray-900 font-space">4</span>
              </div>
              <h3 className="text-xl font-space font-semibold text-gray-900 mb-3">
                Launch & Support
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                Go live with comprehensive training, documentation, and ongoing support to ensure success.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-16 text-center">
            <div className="bg-white border border-gray-200 p-8 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-space font-semibold text-gray-900 mb-4">
                🚀 Project-Based Timeline
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed mb-4">
                Timeline varies by project complexity. We provide realistic delivery schedules during consultation without compromising quality.
              </p>
              <Button asChild className="bg-gray-900 text-white hover:bg-gray-800 font-inter">
                <Link to="/contact">
                  Start Your Project Today
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation First Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-6">
              Let's Start with a Conversation
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto">
              Every great project starts with understanding your unique needs. Before we talk numbers, 
              let's discuss your vision and create a solution that perfectly fits your business.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {/* 3-Step Process */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-gray-100 border border-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="text-2xl font-bold text-gray-900 font-space">1</span>
                </div>
                <h3 className="text-xl font-space font-semibold text-gray-900 mb-3">
                  Free Consultation
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  We discuss your business goals, challenges, and vision. This 30-minute call helps us understand exactly what you need.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 border border-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="text-2xl font-bold text-gray-900 font-space">2</span>
                </div>
                <h3 className="text-xl font-space font-semibold text-gray-900 mb-3">
                  Custom Proposal
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  Based on our conversation, we create a detailed proposal with project scope, timeline, and transparent pricing.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 border border-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="text-2xl font-bold text-gray-900 font-space">3</span>
                </div>
                <h3 className="text-xl font-space font-semibold text-gray-900 mb-3">
                  Project Kickoff
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  Once you approve the proposal, we begin development with regular updates and milestone check-ins.
                </p>
              </div>
            </div>

            {/* Why Consultation First */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-space font-semibold text-gray-900 mb-6 text-center">
                Why We Start with a Consultation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-inter font-semibold text-gray-900 mb-3">No Cookie-Cutter Solutions</h4>
                  <p className="text-gray-600 font-inter leading-relaxed mb-4">
                    Every business is unique. What works for a restaurant won't work for a law firm. 
                    We need to understand your specific needs before recommending solutions.
                  </p>
                  
                  <h4 className="font-inter font-semibold text-gray-900 mb-3">Accurate Pricing</h4>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    Generic pricing can lead to surprises. After understanding your requirements, 
                    we provide exact costs with no hidden fees or unexpected charges.
                  </p>
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-gray-900 mb-3">Right-Fit Technology</h4>
                  <p className="text-gray-600 font-inter leading-relaxed mb-4">
                    Should you use WordPress, custom development, or a hybrid approach? 
                    The consultation helps us recommend the best technology stack for your needs.
                  </p>
                  
                  <h4 className="font-inter font-semibold text-gray-900 mb-3">Clear Timeline</h4>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    Based on your launch goals and project complexity, we create realistic timelines 
                    that work for your business schedule.
                  </p>
                </div>
              </div>
            </div>

            {/* What We'll Discuss */}
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-2xl font-space font-semibold text-gray-900 mb-8 text-center">
                What We'll Discuss in Your Consultation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-inter font-medium text-gray-900">Your Business Goals</h4>
                    <p className="text-gray-600 font-inter text-sm">What you want to achieve with your digital presence</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-inter font-medium text-gray-900">Target Audience</h4>
                    <p className="text-gray-600 font-inter text-sm">Who you're trying to reach and how they behave online</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-inter font-medium text-gray-900">Current Challenges</h4>
                    <p className="text-gray-600 font-inter text-sm">Pain points with your existing website or processes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-inter font-medium text-gray-900">Feature Requirements</h4>
                    <p className="text-gray-600 font-inter text-sm">Must-have functionality and nice-to-have features</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-inter font-medium text-gray-900">Budget Range</h4>
                    <p className="text-gray-600 font-inter text-sm">Your investment level to recommend the right approach</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-inter font-medium text-gray-900">Timeline Goals</h4>
                    <p className="text-gray-600 font-inter text-sm">When you need to launch and any important deadlines</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gray-900 text-white rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-space font-semibold mb-4">
                  Ready to Start the Conversation?
                </h3>
                <p className="font-inter text-gray-300 mb-6">
                  Book your free 30-minute consultation. No sales pressure, just honest advice about the best path forward for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-inter">
                    <Link to="/schedule">
                      Schedule Free Consultation
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="font-inter bg-white text-gray-900 hover:bg-gray-100">
                    <Link to="/contact">
                      Send Us a Message
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-500 font-inter mt-6 text-sm">
                🇵🇭 Philippines-based team • Free consultation • No commitment required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-6">
              What We Build
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto">
              From simple websites to complex systems, we create digital solutions that drive results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div key={index} className="bg-gray-50 border border-gray-200 p-8 rounded-lg hover:border-gray-300 hover:bg-gray-100 transition-all duration-300 group">
                  <ServiceIcon className="h-12 w-12 text-gray-900 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-space font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-6">
              Our Work
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto mb-8">
              Showcasing digital solutions that transform businesses and drive real results
            </p>
            
            {/* Project Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {filterCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedFilter(category);
                    setCurrentProjectIndex(0); // Reset to first project when filter changes
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-inter transition-all duration-200 ${
                    selectedFilter === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 font-inter hidden md:block">
              Use trackpad gestures or click the arrows to navigate • {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div 
            id="projects-section" 
            className="relative max-w-5xl mx-auto"
            tabIndex={0}
            role="region"
            aria-label="Projects showcase with keyboard navigation"
            onFocus={() => {
              // Focus the projects section when clicked
              document.getElementById('projects-section')?.focus();
            }}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 xl:-translate-x-20 z-10 bg-white border border-gray-200 rounded-full p-4 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 shadow-lg hover:shadow-xl"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            
            <button
              onClick={nextProject}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 xl:translate-x-20 z-10 bg-white border border-gray-200 rounded-full p-4 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 shadow-lg hover:shadow-xl"
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>

            {/* Current Project */}
            {currentProject && (
              <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all duration-500 ${
                isTransitioning ? 'opacity-90 scale-[0.98]' : 'opacity-100 scale-100'
              }`}>
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img 
                    src={currentProject.image} 
                    alt={currentProject.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isTransitioning ? 'scale-105' : 'scale-100'
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-8">
                  <div className={`flex items-center gap-4 mb-4 transition-all duration-300 ${
                    isTransitioning ? 'translate-x-2 opacity-80' : 'translate-x-0 opacity-100'
                  }`}>
                    {CurrentIcon && <CurrentIcon className="h-8 w-8 text-gray-900 transition-transform duration-300" />}
                    <h3 className="text-2xl font-space font-semibold text-gray-900">
                      {currentProject.title}
                    </h3>
                  </div>
                  <p className={`text-lg text-gray-600 font-inter leading-relaxed mb-6 transition-all duration-400 delay-75 ${
                    isTransitioning ? 'translate-y-2 opacity-70' : 'translate-y-0 opacity-100'
                  }`}>
                    {currentProject.description}
                  </p>
                  <div className={`flex flex-wrap gap-3 transition-all duration-500 delay-100 ${
                    isTransitioning ? 'translate-y-4 opacity-60' : 'translate-y-0 opacity-100'
                  }`}>
                    {currentProject.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="px-4 py-2 bg-gray-100 text-sm font-inter text-gray-700 rounded-full border border-gray-200 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Project Metadata */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span><strong>Category:</strong> {currentProject.category}</span>
                      <span><strong>Technology:</strong> {currentProject.technology}</span>
                      <span><strong>Industry:</strong> {currentProject.industry}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {!currentProject && (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500 font-inter">No projects found for the selected filter.</p>
              </div>
            )}

            {/* Project Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setCurrentProjectIndex(index);
                      setTimeout(() => setIsTransitioning(false), 500);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex 
                      ? 'bg-gray-900 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto">
              The talented individuals behind ProXima Centauri, bringing years of experience and passion for innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-all duration-300 text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-200 bg-white overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-space font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-lg text-gray-700 mb-1 font-inter font-medium">
                  {member.role}
                </div>
                <div className="text-sm text-gray-600 mb-4 font-inter">
                  {member.specialties}
                </div>
                <p className="text-gray-600 font-inter leading-relaxed mb-6">
                  {member.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="px-3 py-1 bg-gray-100 text-xs font-inter text-gray-700 rounded-full border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Philippines Highlight */}
          <div className="mt-16 text-center">
            <div className="bg-white border border-gray-200 p-8 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-space font-semibold text-gray-900 mb-4">
                🇵🇭 Proudly Philippines-Based
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                We're a homegrown Filipino team passionate about helping businesses thrive in the digital landscape. 
                With deep understanding of local markets and global standards, we deliver solutions that work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-6">
              What We Offer
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {offerings.map((offering, index) => (
              <div key={index} className="flex items-center py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 px-4 rounded transition-colors duration-300">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-6"></div>
                <p className="text-lg font-inter text-gray-700">{offering}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-8">
              We Don't Just Make Websites
            </h2>
            <p className="text-xl text-gray-600 font-inter leading-relaxed mb-8">
              We build tools that drive results, automate work, and help you scale. 
              Our focus is on creating technology that works seamlessly with your business goals.
            </p>
            <p className="text-lg text-gray-500 font-inter">
              Let's bring your business to life online - with speed, clarity, and tech that works.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-8">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 font-inter mb-12 max-w-2xl mx-auto">
              Let's discuss how we can help you build a digital presence that drives real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gray-900 text-white hover:bg-gray-800 font-inter">
                <Link to="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-inter border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                <Link to="/schedule">
                  Schedule a Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-space font-bold text-xl text-gray-900 mb-4">
              ProXima Centauri
            </div>
            <p className="text-gray-600 font-inter mb-6">
              Empowering businesses through technology
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>Philippines-based team</span>
              <span>•</span>
              <span>High-impact development</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;