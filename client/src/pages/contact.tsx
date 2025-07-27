import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, ArrowLeft, Heart } from "lucide-react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

export default function Contact() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<ContactForm>({
    name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "",
    email: user?.email || "",
    subject: "",
    category: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({
        name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "",
        email: user?.email || "",
        subject: "",
        category: "",
        message: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen medical-pattern medical-gradient">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-3 rounded-xl shadow-lg">
                <Mail className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Contact Us</h1>
                <p className="text-sm text-slate-600">We'd love to hear from you</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="border-slate-300 hover:border-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
              <h2 className="text-3xl font-bold gradient-text mb-4">Get in Touch</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Have questions about our medical report analysis? Need help understanding a feature? 
                Want to provide feedback or report an issue? We're here to help!
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 glass-effect border-white/20">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">What can we help you with?</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Questions about medical report analysis</li>
                  <li>• Medicine information inquiries</li>
                  <li>• Technical support and troubleshooting</li>
                  <li>• Feature requests and suggestions</li>
                  <li>• Account and billing questions</li>
                  <li>• General feedback</li>
                </ul>
              </Card>

              <Card className="p-6 glass-effect border-white/20">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Response Time</h3>
                <p className="text-slate-600">
                  We typically respond to all inquiries within 24-48 hours during business days. 
                  For urgent medical questions, please consult with a healthcare professional directly.
                </p>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 glass-effect border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-slate-700 font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category" className="text-slate-700 font-medium">
                  Category
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject" className="text-slate-700 font-medium">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="Brief description of your inquiry"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-slate-700 font-medium">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Please describe your requirements, questions, or feedback in detail..."
                  rows={6}
                  required
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3"
              >
                {contactMutation.isPending ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* Medical Disclaimer */}
        <Card className="mt-12 p-6 border-amber-200 bg-amber-50">
          <div className="flex items-start space-x-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Mail className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Important Notice</h3>
              <p className="text-amber-700 text-sm">
                For urgent medical questions or emergencies, please contact your healthcare provider directly 
                or call emergency services. This contact form is for general inquiries and support only.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}