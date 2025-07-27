import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/seo-head";
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  BookOpen, 
  Heart, 
  AlertTriangle,
  CheckCircle,
  Info,
  Activity,
  TestTube,
  Brain,
  Eye,
  Stethoscope,
  User
} from "lucide-react";
import { useLocation } from "wouter";

interface ArticleContent {
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
  content: {
    sections: Array<{
      title: string;
      content: string;
      type?: 'text' | 'warning' | 'tip' | 'important';
    }>;
  };
}

const articleDatabase: { [key: string]: ArticleContent } = {
  "understanding-blood-test-results": {
    id: "1",
    title: "Understanding Blood Test Results: A Complete Guide",
    description: "Learn how to read common blood test values like CBC, glucose, cholesterol, and liver function tests in simple terms.",
    category: "Lab Tests",
    readTime: "8 min",
    author: "Health Clarity AI",
    date: "Jan 27, 2025",
    slug: "understanding-blood-test-results",
    icon: TestTube,
    tags: ["blood test", "lab results", "health screening"],
    content: {
      sections: [
        {
          title: "What Are Blood Tests?",
          content: "Blood tests are medical examinations that analyze samples of your blood to check your overall health, diagnose diseases, or monitor treatment effectiveness. They're one of the most common and important diagnostic tools in healthcare.",
          type: "text"
        },
        {
          title: "Complete Blood Count (CBC)",
          content: "The CBC measures different components of your blood:\n\n• **Red Blood Cells (RBC)**: Carry oxygen throughout your body. Normal range: 4.5-5.5 million cells/mcL\n• **White Blood Cells (WBC)**: Fight infections. Normal range: 4,000-11,000 cells/mcL\n• **Platelets**: Help blood clot. Normal range: 150,000-450,000/mcL\n• **Hemoglobin**: Protein that carries oxygen. Normal range: 14-17 g/dL (men), 12-15 g/dL (women)\n• **Hematocrit**: Percentage of blood that's red blood cells. Normal range: 41-50% (men), 36-44% (women)",
          type: "text"
        },
        {
          title: "Blood Sugar (Glucose) Levels",
          content: "Blood glucose tests measure sugar levels in your blood:\n\n• **Fasting glucose**: Taken after 8+ hours without food. Normal: 70-99 mg/dL\n• **Random glucose**: Taken any time. Normal: Less than 140 mg/dL\n• **HbA1c**: Average blood sugar over 2-3 months. Normal: Less than 5.7%\n\nHigh levels may indicate diabetes or prediabetes.",
          type: "text"
        },
        {
          title: "Cholesterol Panel",
          content: "Cholesterol tests measure fats in your blood:\n\n• **Total Cholesterol**: Should be less than 200 mg/dL\n• **LDL (Bad Cholesterol)**: Should be less than 100 mg/dL\n• **HDL (Good Cholesterol)**: Should be 40+ mg/dL (men), 50+ mg/dL (women)\n• **Triglycerides**: Should be less than 150 mg/dL\n\nHigh cholesterol increases heart disease risk.",
          type: "text"
        },
        {
          title: "Liver Function Tests",
          content: "These tests check how well your liver is working:\n\n• **ALT (Alanine Aminotransferase)**: Normal: 7-56 units/L\n• **AST (Aspartate Aminotransferase)**: Normal: 10-40 units/L\n• **Bilirubin**: Normal: 0.1-1.2 mg/dL\n• **Albumin**: Normal: 3.5-5.0 g/dL\n\nElevated levels may indicate liver damage or disease.",
          type: "text"
        },
        {
          title: "When to Be Concerned",
          content: "Contact your doctor immediately if you see:\n\n• Extremely high or low blood sugar levels\n• Very high cholesterol readings\n• Liver enzymes more than 3x normal range\n• Significant changes from previous results\n• Any values marked as 'critical' or 'panic'",
          type: "warning"
        },
        {
          title: "Tips for Accurate Results",
          content: "For the most accurate blood test results:\n\n• Follow fasting instructions (usually 8-12 hours)\n• Stay hydrated but avoid excessive water\n• Avoid alcohol 24 hours before testing\n• Take medications as prescribed unless told otherwise\n• Inform your doctor about all supplements and medications",
          type: "tip"
        }
      ]
    }
  },
  "ecg-ekg-basics-heart-rhythm": {
    id: "2",
    title: "ECG/EKG Basics: What Your Heart Rhythm Tells You",
    description: "Decode electrocardiogram readings and understand normal vs. abnormal heart rhythms, arrhythmias, and when to be concerned.",
    category: "Heart Health",
    readTime: "6 min",
    author: "Health Clarity AI", 
    date: "Jan 27, 2025",
    slug: "ecg-ekg-basics-heart-rhythm",
    icon: Heart,
    tags: ["ECG", "heart rhythm", "cardiology"],
    content: {
      sections: [
        {
          title: "What is an ECG/EKG?",
          content: "An electrocardiogram (ECG or EKG) records the electrical activity of your heart. It shows how fast your heart is beating, whether the rhythm is steady, and the strength of electrical signals as they pass through your heart.",
          type: "text"
        },
        {
          title: "Understanding Normal Heart Rhythm",
          content: "A normal ECG shows:\n\n• **Heart Rate**: 60-100 beats per minute at rest\n• **Regular Rhythm**: Consistent spacing between heartbeats\n• **P Wave**: Shows atrial contraction (top chambers)\n• **QRS Complex**: Shows ventricular contraction (bottom chambers)\n• **T Wave**: Shows heart muscle recovery\n\nThe pattern should be consistent and regular.",
          type: "text"
        },
        {
          title: "Common ECG Findings",
          content: "Your ECG report might mention:\n\n• **Sinus Rhythm**: Normal heart rhythm\n• **Bradycardia**: Heart rate under 60 bpm (may be normal in athletes)\n• **Tachycardia**: Heart rate over 100 bpm\n• **Arrhythmia**: Irregular heartbeat pattern\n• **ST Changes**: May indicate heart muscle problems",
          type: "text"
        },
        {
          title: "When ECG Results Are Concerning",
          content: "Seek immediate medical attention for:\n\n• Severe chest pain with ECG changes\n• Heart rate under 40 or over 150 bpm\n• Signs of heart attack (ST elevation)\n• New irregular rhythms with symptoms\n• Fainting episodes with rhythm problems",
          type: "warning"
        },
        {
          title: "Understanding Your Results",
          content: "ECG interpretation requires medical training. Key points:\n\n• Many minor abnormalities are not dangerous\n• Results must be considered with symptoms\n• Previous ECGs help identify changes\n• Some medications can affect ECG readings\n• Athletes may have different normal patterns",
          type: "important"
        }
      ]
    }
  }
};

export default function Article() {
  const [location, navigate] = useLocation();
  const [article, setArticle] = useState<ArticleContent | null>(null);
  
  // Extract slug from URL path
  const slug = location.split('/').pop();

  useEffect(() => {
    if (slug && articleDatabase[slug]) {
      setArticle(articleDatabase[slug]);
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen medical-pattern medical-gradient flex items-center justify-center">
        <Card className="p-8 text-center">
          <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Article Not Found</h2>
          <p className="text-slate-600 mb-4">The requested article could not be found.</p>
          <Button onClick={() => navigate('/knowledge')} variant="outline">
            Back to Knowledge Base
          </Button>
        </Card>
      </div>
    );
  }

  const IconComponent = article.icon;

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'tip': return CheckCircle;
      case 'important': return Info;
      default: return null;
    }
  };

  const getSectionStyles = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-red-50 border-red-200 text-red-800';
      case 'tip': return 'bg-green-50 border-green-200 text-green-800';
      case 'important': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen medical-pattern medical-gradient">
      <SEOHead 
        title={`${article.title} | Health Clarity Knowledge Base`}
        description={article.description}
        keywords={article.tags.join(', ')}
        canonical={`https://healthclarity.replit.app/knowledge/${article.slug}`}
      />
      
      {/* Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              onClick={() => navigate('/knowledge')}
              variant="outline"
              size="sm"
              className="border-slate-300 hover:border-medical-blue"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
            <Button 
              onClick={() => {
                navigator.share?.({ 
                  title: article.title, 
                  url: window.location.href 
                }) || navigator.clipboard.writeText(window.location.href);
              }}
              variant="outline"
              size="sm"
              className="border-slate-300 hover:border-medical-blue"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-medical-blue/10 p-3 rounded-xl">
              <IconComponent className="w-8 h-8 text-medical-blue" />
            </div>
            <div>
              <Badge variant="secondary" className="bg-blue-50 text-medical-blue mb-2">
                {article.category}
              </Badge>
              <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                {article.title}
              </h1>
            </div>
          </div>
          
          <p className="text-xl text-slate-600 mb-6 leading-relaxed">
            {article.description}
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {article.readTime} read
            </div>
            <span>By {article.author}</span>
            <span>{article.date}</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-slate-300">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-slate max-w-none">
          {article.content.sections.map((section, index) => {
            const SectionIcon = getSectionIcon(section.type || 'text');
            const isSpecialSection = section.type && section.type !== 'text';
            
            return (
              <section key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  {SectionIcon && (
                    <SectionIcon className="w-6 h-6 mr-3 text-medical-blue" />
                  )}
                  {section.title}
                </h2>
                
                <div className={`
                  ${isSpecialSection ? `p-6 rounded-lg border-2 ${getSectionStyles(section.type!)}` : ''}
                `}>
                  <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 p-6 bg-amber-50 border-2 border-amber-200 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Medical Disclaimer</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                This article is for educational purposes only and does not constitute medical advice. 
                Always consult with qualified healthcare professionals for diagnosis, treatment, and 
                medical decisions. Do not use this information to replace professional medical consultation.
              </p>
            </div>
          </div>
        </div>

        {/* Related Actions */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
            <Activity className="w-8 h-8 text-medical-blue mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Analyze Your Reports
            </h3>
            <p className="text-slate-600 mb-4 text-sm">
              Upload your medical documents to get personalized AI analysis based on your specific results.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-medical-blue hover:bg-medical-blue/90"
            >
              Start Analysis
            </Button>
          </Card>

          <Card className="p-6 border-slate-200">
            <BookOpen className="w-8 h-8 text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              More Articles
            </h3>
            <p className="text-slate-600 mb-4 text-sm">
              Explore our comprehensive knowledge base for more health education topics.
            </p>
            <Button 
              onClick={() => navigate('/knowledge')}
              variant="outline"
            >
              Browse Articles
            </Button>
          </Card>
        </div>
      </article>
    </div>
  );
}