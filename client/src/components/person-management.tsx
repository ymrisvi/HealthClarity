import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit2, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertPersonSchema, type Person } from "@shared/schema";
import { z } from "zod";

const personFormSchema = insertPersonSchema.omit({ userId: true });
type PersonFormData = z.infer<typeof personFormSchema>;

interface PersonManagementProps {
  selectedPersonId?: string;
  onPersonSelect?: (personId: string) => void;
  showPersonSelector?: boolean;
}

export function PersonManagement({ selectedPersonId, onPersonSelect, showPersonSelector = true }: PersonManagementProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: persons = [], isLoading } = useQuery<Person[]>({
    queryKey: ["/api/persons"],
  });

  const form = useForm<PersonFormData>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      name: "",
      age: "",
      sex: undefined,
      height: "",
      weight: "",
    },
  });

  const createPersonMutation = useMutation({
    mutationFn: async (data: PersonFormData) => {
      return apiRequest("POST", "/api/persons", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/persons"] });
      setDialogOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Person added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updatePersonMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PersonFormData> }) => {
      return apiRequest("PUT", `/api/persons/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/persons"] });
      setDialogOpen(false);
      setEditingPerson(null);
      form.reset();
      toast({
        title: "Success",
        description: "Person updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deletePersonMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/persons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/persons"] });
      toast({
        title: "Success",
        description: "Person deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PersonFormData) => {
    // Convert string values to numbers or undefined
    const processedData = {
      ...data,
      age: data.age && data.age !== "" ? (typeof data.age === "string" ? parseInt(data.age) : data.age) : undefined,
      height: data.height && data.height !== "" ? (typeof data.height === "string" ? parseFloat(data.height) : data.height) : undefined,
      weight: data.weight && data.weight !== "" ? (typeof data.weight === "string" ? parseFloat(data.weight) : data.weight) : undefined,
    };
    
    if (editingPerson) {
      updatePersonMutation.mutate({ id: editingPerson.id, data: processedData });
    } else {
      createPersonMutation.mutate(processedData);
    }
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    form.reset({
      name: person.name,
      age: person.age ? person.age.toString() : "",
      sex: person.sex as "Male" | "Female" | "Other" | undefined,
      height: person.height ? person.height.toString() : "",
      weight: person.weight ? person.weight.toString() : "",
    });
    setDialogOpen(true);
  };

  const handleDelete = (person: Person) => {
    if (confirm(`Are you sure you want to delete ${person.name}? This will also delete all their medical reports.`)) {
      deletePersonMutation.mutate(person.id);
    }
  };

  const handleAddNew = () => {
    setEditingPerson(null);
    form.reset();
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-muted h-20 rounded-lg"></div>
        <div className="animate-pulse bg-muted h-20 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Family Members</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} size="sm" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Person
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" aria-describedby="person-dialog-description">
            <DialogHeader>
              <DialogTitle>
                {editingPerson ? "Edit Person" : "Add New Person"}
              </DialogTitle>
              <p id="person-dialog-description" className="text-sm text-muted-foreground">
                {editingPerson ? "Update the person's information below." : "Add a new family member to track their medical reports separately."}
              </p>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Age"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : "")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sex</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Height"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : "")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Weight"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : "")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={createPersonMutation.isPending || updatePersonMutation.isPending}
                    className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                  >
                    {editingPerson ? "Update" : "Add"} Person
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {persons.length === 0 ? (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              No family members added yet. Add people to track their medical reports separately.
            </p>
            <Button onClick={handleAddNew} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add First Person
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {persons.map((person: Person) => (
            <Card 
              key={person.id} 
              className={`transition-all hover:shadow-md cursor-pointer ${
                selectedPersonId === person.id ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20' : ''
              }`}
              onClick={() => showPersonSelector && onPersonSelect?.(person.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    {person.name}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(person);
                      }}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(person);
                      }}
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  {person.age && <div>Age: {person.age}</div>}
                  {person.sex && <div>Sex: {person.sex}</div>}
                  {person.height && <div>Height: {person.height} cm</div>}
                  {person.weight && <div>Weight: {person.weight} kg</div>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}