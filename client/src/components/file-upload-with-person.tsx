import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Upload, FileText, AlertCircle, User } from "lucide-react";
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
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

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
                Drag and drop your medical report or click to browse
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