import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Upload, FileText, AlertCircle, User, Camera, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { type Person } from "@shared/schema";

interface FileUploadWithPersonProps {
  onAnalysisComplete?: (analysis: any, reportId: string) => void;
  selectedPersonId?: string;
  onPersonSelect?: (personId: string) => void;
}

export function FileUploadWithPerson({ 
  onAnalysisComplete, 
  selectedPersonId, 
  onPersonSelect 
}: FileUploadWithPersonProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [personId, setPersonId] = useState<string>(selectedPersonId || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        ('ontouchstart' in window) ||
        (window.innerWidth <= 768);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { data: persons = [] } = useQuery<Person[]>({
    queryKey: ["/api/persons"],
    enabled: isAuthenticated,
  });

  const uploadMutation = useMutation({
    mutationFn: async ({ file, personId }: { file: File; personId?: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      if (personId) {
        formData.append('personId', personId);
      }

      const response = await fetch('/api/reports/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Medical report analyzed successfully",
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onAnalysisComplete?.(data.analysis, data.reportId);
    },
    onError: (error: Error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload JPEG, PNG, SVG, or PDF files only.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    uploadMutation.mutate({ 
      file: selectedFile, 
      personId: personId || undefined 
    });
  };

  const handlePersonChange = (value: string) => {
    const actualPersonId = value === "none" ? "" : value;
    setPersonId(actualPersonId);
    onPersonSelect?.(actualPersonId);
  };

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleCameraInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Person Selection - Only show for authenticated users */}
      {isAuthenticated && persons.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="person-select" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Select Family Member (Optional)
          </Label>
          <Select value={personId} onValueChange={handlePersonChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a family member or leave blank for general upload" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">General Upload (No specific person)</SelectItem>
              {persons.map((person) => (
                <SelectItem key={person.id} value={person.id}>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {person.name} {person.age && `(${person.age} years)`}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* File Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
            : 'border-slate-300 dark:border-slate-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Upload Medical Report
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {isMobile 
                  ? "Drag and drop, choose a file, or take a photo of your medical report"
                  : "Drag and drop your medical report or click to browse"
                }
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Supports JPEG, PNG, SVG, and PDF files up to 10MB
              </p>
            </div>

            {selectedFile ? (
              <div className="flex items-center justify-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-slate-500">
                  ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            ) : isMobile ? (
              <div className="flex gap-3 flex-col sm:flex-row">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950/20"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCameraCapture}
                  className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-950/20"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950/20"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.svg,.pdf"
              onChange={handleFileInputChange}
            />
            
            {/* Camera input for mobile */}
            <input
              ref={cameraInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              capture="environment"
              onChange={handleCameraInputChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Button */}
      {selectedFile && (
        <div className="flex justify-center">
          <Button
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 px-8"
          >
            {uploadMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Analyze Report
              </>
            )}
          </Button>
        </div>
      )}

      {/* Warning for anonymous users */}
      {!isAuthenticated && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You have 1 free analysis as an anonymous user. Sign in to get unlimited access and save your reports.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}