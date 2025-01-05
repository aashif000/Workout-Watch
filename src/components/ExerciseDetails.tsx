import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface Exercise {
  name: string;
  description?: string;
  force?: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
}

interface ExerciseDetailsProps {
  exercise: Exercise;
  onBack: () => void;
}

export const ExerciseDetails = ({ exercise, onBack }: ExerciseDetailsProps) => {
  return (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to exercises
      </Button>

      <h2 className="text-2xl font-bold mb-4">{exercise.name}</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
  {exercise.images.map((image, index) => (
    <Card key={index} className="overflow-hidden">
      <img 
        src={image} 
        alt={`${exercise.name} step ${index + 1}`} 
        className="w-full h-100 object-cover rounded-lg" // Increased height and added rounded corners
      />
    </Card>
  ))}
</div>


      <Card>
        <CardContent className="pt-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Details</h3>
            <dl className="grid grid-cols-2 gap-2 text-muted-foreground">
              <dt className="font-medium">Level:</dt>
              <dd className="capitalize">{exercise.level}</dd>
              <dt className="font-medium">Equipment:</dt>
              <dd className="capitalize">{exercise.equipment}</dd>
              <dt className="font-medium">Mechanic:</dt>
              <dd className="capitalize">{exercise.mechanic}</dd>
              <dt className="font-medium">Category:</dt>
              <dd className="capitalize">{exercise.category}</dd>
            </dl>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Muscles</h3>
            <div className="space-y-2">
              <div>
                <h4 className="font-medium">Primary:</h4>
                <p className="text-muted-foreground capitalize">
                  {exercise.primaryMuscles.join(", ")}
                </p>
              </div>
              {exercise.secondaryMuscles.length > 0 && (
                <div>
                  <h4 className="font-medium">Secondary:</h4>
                  <p className="text-muted-foreground capitalize">
                    {exercise.secondaryMuscles.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="text-muted-foreground">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};