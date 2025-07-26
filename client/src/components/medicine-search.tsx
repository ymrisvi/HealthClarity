import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Search, Loader2 } from "lucide-react";

interface MedicineSearchProps {
  onSearchComplete: (data: any) => void;
}

export default function MedicineSearch({ onSearchComplete }: MedicineSearchProps) {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  // Get popular medicines for suggestions
  const { data: popularMedicines } = useQuery({
    queryKey: ['/api/medicines/popular'],
    select: (data: any) => data.medicines || [],
  });

  const searchMutation = useMutation({
    mutationFn: async (medicineName: string) => {
      const response = await apiRequest('POST', '/api/medicines/search', { medicineName });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Medicine Information Found!",
        description: `Information for ${data.medicineInfo.medicineName} has been retrieved.`,
      });
      onSearchComplete(data);
      setQuery("");
    },
    onError: (error: Error) => {
      toast({
        title: "Search Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      toast({
        title: "Invalid Medicine Name",
        description: "Please enter at least 2 characters.",
        variant: "destructive",
      });
      return;
    }
    searchMutation.mutate(trimmedQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleQuickSearch = (medicineName: string) => {
    setQuery(medicineName);
    searchMutation.mutate(medicineName);
  };

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter medicine name (e.g., Paracetamol, Ibuprofen)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-4 pr-12 text-lg focus:ring-2 focus:ring-healthcare-teal focus:border-transparent"
        />
        <Button
          onClick={handleSearch}
          disabled={searchMutation.isPending}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-0 h-auto bg-transparent hover:bg-transparent text-slate-400 hover:text-healthcare-teal"
          variant="ghost"
        >
          {searchMutation.isPending ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Search className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Quick Search Suggestions */}
      {popularMedicines && popularMedicines.length > 0 && (
        <div>
          <p className="text-sm font-medium text-slate-700 mb-3">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {popularMedicines.slice(0, 8).map((medicine: string) => (
              <Button
                key={medicine}
                variant="outline"
                size="sm"
                onClick={() => handleQuickSearch(medicine)}
                disabled={searchMutation.isPending}
                className="bg-slate-100 text-slate-700 hover:bg-healthcare-teal hover:text-white transition-colors"
              >
                {medicine}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleSearch}
        disabled={searchMutation.isPending || !query.trim()}
        className="w-full bg-healthcare-teal hover:bg-cyan-600 text-white py-4 text-lg"
      >
        {searchMutation.isPending ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Searching...
          </>
        ) : (
          'Search Medicine Information'
        )}
      </Button>
    </div>
  );
}
