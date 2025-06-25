import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Schedule = () => {
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only add the script if it hasn't been added yet
    if (!document.getElementById("calendly-widget-script")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="font-space font-bold text-xl text-gray-900">
              ProXima Centauri
            </Link>
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-inter">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Schedule Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-6">
              Schedule a Call
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-2xl mx-auto">
              Book a free consultation to discuss your project requirements and see how we can help transform your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Call Details */}
            <div className="lg:col-span-2 flex flex-col space-y-8">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-space font-semibold text-gray-900 mb-6">
                  What to Expect
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-600 mt-1 mr-3" />
                    <div>
                      <p className="font-inter font-medium text-gray-900">30-minute consultation</p>
                      <p className="text-gray-600 font-inter text-sm">Free discovery call to understand your needs</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Video className="h-5 w-5 text-gray-600 mt-1 mr-3" />
                    <div>
                      <p className="font-inter font-medium text-gray-900">Video or phone call</p>
                      <p className="text-gray-600 font-inter text-sm">Your preference - we're flexible</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-600 mt-1 mr-3" />
                    <div>
                      <p className="font-inter font-medium text-gray-900">Flexible scheduling</p>
                      <p className="text-gray-600 font-inter text-sm">Available Monday to Friday, 9 AM - 6 PM PHT</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 mt-auto">
                <h3 className="text-2xl font-space font-semibold text-gray-900 mb-4">
                  We'll Discuss
                </h3>
                <ul className="space-y-3 font-inter text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                    Your business goals and challenges
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                    Technical requirements and scope
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                    Timeline and budget expectations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                    Our development process
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                    Next steps and proposal
                  </li>
                </ul>
              </div>
            </div>

            {/* Calendly Booking Widget - Now Takes More Space */}
            <div className="lg:col-span-3">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-2xl font-space font-semibold text-gray-900 mb-6 text-center">
                  Book Your Call
                </h3>
                {/* Calendly inline widget */}
                <div
                  className="calendly-inline-widget w-full"
                  data-url="https://calendly.com/carlofelipe101/30min"
                  style={{ 
                    width: '100%', 
                    height: '492px',
                    
                  }}
                  ref={calendlyRef}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 font-inter">
              Questions about scheduling? Email us at{" "}
              <a href="mailto:hello@proximacentauri.dev" className="text-black font-medium">
                hello@proximacentauri.dev
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;