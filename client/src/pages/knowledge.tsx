import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEOHead from "@/components/seo-head";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Search, 
  Heart, 
  Brain, 
  Activity, 
  TestTube, 
  Stethoscope,
  Eye,
  ArrowRight,
  Clock,
  User,
  ArrowLeft
} from "lucide-react";
import { useLocation } from "wouter";

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  slug: string;
  icon: any;
  tags: string[];
}

const articles: Article[] = [
  {
    id: "1",
    title: "Understanding Blood Test Results: A Complete Guide",
    description: "Learn how to read common blood test values like CBC, glucose, cholesterol, and liver function tests in simple terms.",
    category: "Lab Tests",
    readTime: "8 min",
    author: "Health Clarity AI",
    date: "Jan 27, 2025",
    slug: "understanding-blood-test-results",
    icon: TestTube,
    tags: ["blood test", "lab results", "health screening"]
  },
  {
    id: "2", 
    title: "ECG/EKG Basics: What Your Heart Rhythm Tells You",
    description: "Decode electrocardiogram readings and understand normal vs. abnormal heart rhythms, arrhythmias, and when to be concerned.",
    category: "Heart Health",
    readTime: "6 min",
    author: "Health Clarity AI",
    date: "Jan 27, 2025",
    slug: "ecg-ekg-basics-heart-rhythm",
    icon: Heart,
    tags: ["ECG", "heart rhythm", "cardiology"]
  },
  {
    id: "3",
    title: "X-Ray Reports Explained: Chest, Bone, and Joint Imaging",
    description: "Understand common X-ray findings, what radiologists look for, and how to interpret chest X-rays and bone imaging results.",
    category: "Medical Imaging",
    readTime: "10 min", 
    author: "Health Clarity AI",
    date: "Jan 27, 2025",
    slug: "x-ray-reports-explained",
    icon: Eye,
    tags: ["X-ray", "medical imaging", "radiology"]
  },
  {
    id: "4",
    title: "Medicine Interactions: What You Need to Know",
    description: "Learn about drug interactions, side effects, and how to safely manage multiple medications with expert guidance.",
    category: "Medications",
    readTime: "7 min",
    author: "Health Clarity AI", 
    date: "Jan 27, 2025",
    slug: "medicine-interactions-guide",
    icon: Brain,
    tags: ["drug interactions", "medication safety", "pharmacy"]
  },
  {
    id: "5",
    title: "Family Health Tracking: Managing Multiple Profiles",
    description: "Best practices for organizing family medical records, tracking health trends, and preparing for doctor visits.",
    category: "Health Management",
    readTime: "5 min",
    author: "Health Clarity AI",
    date: "Jan 27, 2025", 
    slug: "family-health-tracking-guide",
    icon: User,
    tags: ["family health", "health records", "medical organization"]
  },
  {
    id: "6",
    title: "When to See a Doctor: Red Flags in Medical Reports",
    description: "Recognize concerning findings in lab results and medical reports that require immediate medical attention.",
    category: "Health Alerts",
    readTime: "6 min",
    author: "Health Clarity AI",
    date: "Jan 27, 2025",
    slug: "when-to-see-doctor-red-flags",
    icon: Stethoscope,
    tags: ["medical alerts", "urgent care", "health warnings"]
  }
];

const categories = ["All", "Lab Tests", "Heart Health", "Medical Imaging", "Medications", "Health Management", "Health Alerts"];

export default function Knowledge() {
  const [location, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen medical-pattern medical-gradient">
      <SEOHead 
        title="Health Knowledge Base - Medical Education & Resources | Health Clarity"
        description="Comprehensive medical education articles covering blood tests, ECG readings, X-rays, medications, and family health management. Expert medical guidance simplified."
        keywords="medical education, health articles, blood test guide, ECG interpretation, X-ray explained, medication safety, family health"
        canonical="https://healthclarity.replit.app/knowledge"
      />
      
      {/* Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Knowledge Base</h1>
                <p className="text-sm text-slate-600">Medical education made simple</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="border-slate-300 hover:border-medical-blue"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Learn About Your Health
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Expert medical guidance simplified. Understand your test results, medications, and health reports with confidence.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles, topics, or health conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-slate-300 focus:border-medical-blue"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-medical-blue hover:bg-medical-blue/90" 
                : "border-slate-300 hover:border-medical-blue"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            const IconComponent = article.icon;
            return (
              <Card 
                key={article.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-slate-200"
                onClick={() => navigate(`/knowledge/${article.slug}`)}
              >
                <div className="p-6">
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-blue-50 text-medical-blue">
                      {article.category}
                    </Badge>
                    <div className="bg-medical-blue/10 p-2 rounded-lg">
                      <IconComponent className="w-6 h-6 text-medical-blue" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-medical-blue transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {article.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-slate-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </div>
                      <span>{article.date}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or category filter.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
            <Activity className="w-12 h-12 text-medical-blue mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Analyze Your Medical Reports?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Upload your lab results, X-rays, or other medical documents to get instant, personalized explanations powered by AI.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-medical-blue hover:bg-medical-blue/90 px-8 py-3"
            >
              Start Analysis
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}