import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { ExerciseDetails } from "@/components/ExerciseDetails";
import { Exercise, EXERCISE_LIST, fetchExerciseData } from "@/lib/api";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: exercises = [], isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const exercisePromises = EXERCISE_LIST.map(exerciseName => 
        fetchExerciseData(exerciseName)
      );
      return Promise.all(exercisePromises);
    },
  });

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 min-h-screen bg-background">
        <h1 className="text-3xl font-bold mb-6">Loading exercises...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen bg-background">
      <h1 className="text-3xl font-bold mb-6 text-center">Workout Watch</h1>

      
      {selectedExercise ? (
        <ExerciseDetails 
          exercise={selectedExercise} 
          onBack={() => setSelectedExercise(null)} 
        />
      ) : (
        <>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredExercises.map((exercise, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setSelectedExercise(exercise)}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-semibold">
                      {exercise.name}
                    </CardTitle>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Level: {exercise.level} | Category: {exercise.category}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default Index;
