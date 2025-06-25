
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Globe, Smartphone, Zap, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-space font-bold text-xl text-gray-900">
              ProXima Centauri
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors font-inter">Services</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-inter">About</a>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors font-inter">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-space font-bold text-gray-900 mb-6 leading-tight">
              Empowering Businesses
              <br />
              <span className="text-gray-600">Through Technology</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto font-inter font-light leading-relaxed">
              We help businesses build, revamp, and optimize their digital presence through modern, 
              conversion-focused websites. Philippines-based team providing high-impact development 
              for startups, SMEs, and scaling brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 font-inter">
                <Link to="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-inter">
                <Link to="/schedule">
                  Schedule a Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
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
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <service.icon className="h-12 w-12 text-gray-900 mb-4" />
                <h3 className="text-xl font-space font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-6">
              What We Offer
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {offerings.map((offering, index) => (
              <div key={index} className="flex items-center py-4 border-b border-gray-100 last:border-b-0">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-6"></div>
                <p className="text-lg font-inter text-gray-700">{offering}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-8">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 font-inter mb-12 max-w-2xl mx-auto">
              Let's discuss how we can help you build a digital presence that drives real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 font-inter">
                <Link to="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-inter">
                <Link to="/schedule">
                  Schedule a Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
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
