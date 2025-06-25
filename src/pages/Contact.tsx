
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-space font-bold text-gray-900 mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 font-inter">
              Ready to transform your business? Let's discuss your project and see how we can help.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-inter flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-inter flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@company.com"
                    required
                    className="font-inter"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="font-inter">
                  Company Name
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name (optional)"
                  className="font-inter"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-inter flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Project Details
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  rows={6}
                  required
                  className="font-inter"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-black text-white hover:bg-gray-800 font-inter"
              >
                Send Message
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600 font-inter">
                Prefer to email directly? Reach us at{" "}
                <a href="mailto:hello@proximacentauri.dev" className="text-black font-medium">
                  hello@proximacentauri.dev
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
