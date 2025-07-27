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
      {/* Enhanced Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 medical-card ${
          dragOver 
            ? 'border-medical-blue bg-gradient-to-br from-blue-50 to-blue-100 scale-105 shadow-xl' 
            : 'border-slate-300 hover:border-medical-blue hover:bg-gradient-to-br hover:from-slate-50 hover:to-blue-50 hover:shadow-lg'
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
          accept=".jpg,.jpeg,.png,.svg,.pdf"
          onChange={handleFileInputChange}
        />
        
        <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-6 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg floating">
          <Upload className="w-10 h-10 text-white drop-shadow-lg" />
        </div>
        
        <h4 className="text-2xl font-bold text-slate-900 mb-3">
          Drop your medical report here
        </h4>
        <p className="text-lg text-slate-600 mb-6">or click to browse and select your files</p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">ECG Reports</span>
          <span className="bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">X-Ray Images</span>
          <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">Blood Tests</span>
          <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">MRI Scans</span>
          <span className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">CT Scans</span>
        </div>
        
        <Button 
          className="bg-gradient-to-r from-medical-blue to-healthcare-teal hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            openFileDialog();
          }}
        >
          <FileText className="w-5 h-5 mr-2" />
          Choose Medical File
        </Button>
        
        <p className="text-sm text-slate-500 mt-4">
          Supports JPEG, PNG, SVG, PDF files • Maximum size: 10MB
        </p>
      </div>

      {/* Enhanced Selected File */}
      {selectedFile && (
        <div className="glass-effect rounded-2xl p-6 medical-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-3 rounded-xl shadow-lg">
                <FileText className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">{selectedFile.name}</p>
                <p className="text-slate-600">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                </p>
              </div>
            </div>
            <Button
              onClick={handleUpload}
              disabled={uploadMutation.isPending}
              className="bg-gradient-to-r from-medical-blue to-healthcare-teal hover:from-blue-700 hover:to-teal-700 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing with AI...
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
