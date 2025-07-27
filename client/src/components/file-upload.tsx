import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, FileText, Loader2 } from "lucide-react";

interface FileUploadProps {
  onAnalysisComplete: (data: any) => void;
  onError?: (error: Error) => void;
}

export default function FileUpload({ onAnalysisComplete, onError }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiRequest('POST', '/api/reports/upload', formData);
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Analysis Complete!",
        description: "Your medical report has been analyzed successfully.",
      });
      onAnalysisComplete(data);
      setSelectedFile(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
      onError?.(error);
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
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
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
          dragOver 
            ? 'border-medical-blue bg-blue-50 scale-105' 
            : 'border-slate-300 hover:border-medical-blue hover:bg-blue-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileInputChange}
        />
        
        <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-slate-900 mb-2">
          Drop your medical report here
        </h4>
        <p className="text-slate-500 mb-4">or click to browse files</p>
        
        <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-400 mb-4">
          <span className="bg-slate-100 px-3 py-1 rounded-full">ECG</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full">X-Ray</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full">Blood Test</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full">MRI</span>
          <span className="bg-slate-100 px-3 py-1 rounded-full">CT Scan</span>
        </div>
        
        <Button 
          className="bg-medical-blue hover:bg-blue-700 text-white"
          onClick={(e) => {
            e.stopPropagation();
            openFileDialog();
          }}
        >
          Choose File
        </Button>
      </div>

      {/* Selected File */}
      {selectedFile && (
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-medical-blue" />
              <div>
                <p className="font-medium text-slate-900">{selectedFile.name}</p>
                <p className="text-sm text-slate-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              onClick={handleUpload}
              disabled={uploadMutation.isPending}
              className="bg-medical-blue hover:bg-blue-700 text-white"
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Report'
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Supported Formats */}
      <div className="text-center">
        <p className="text-sm text-slate-500">Supported formats: JPEG, PNG, PDF (Max 10MB)</p>
      </div>
    </div>
  );
}
