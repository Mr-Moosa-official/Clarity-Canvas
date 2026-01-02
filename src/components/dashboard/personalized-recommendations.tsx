'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getPersonalizedRecommendations, GetPersonalizedRecommendationsOutput } from '@/ai/flows/get-personalized-recommendations';
import { students, performance } from '@/lib/data';
import { Loader2, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function PersonalizedRecommendations() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [result, setResult] = useState<GetPersonalizedRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    if (!selectedStudentId) {
      setError('Please select a student.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const studentPerformance = performance.filter(p => p.studentId === selectedStudentId);
      const learningHistory = studentPerformance.map(p => `Course: ${p.courseId}, Score: ${p.score}`).join('; ');
      const performanceMetrics = `Average score: ${studentPerformance.reduce((acc, p) => acc + p.score, 0) / (studentPerformance.length || 1)}`;
      const areasOfStruggle = studentPerformance.filter(p => p.score < 70).map(p => p.courseId).join(', ');

      const response = await getPersonalizedRecommendations({
        studentId: selectedStudentId,
        learningHistory,
        performanceMetrics,
        areasOfStruggle: areasOfStruggle || 'None identified',
      });
      setResult(response);
    } catch (e) {
      setError('Failed to get recommendations. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-chart-5" />
          Personalized Recommendations
        </CardTitle>
        <CardDescription>Generate tailored learning suggestions for individual students using AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Select onValueChange={setSelectedStudentId} disabled={isLoading}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {students.map(student => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleGetRecommendations} disabled={!selectedStudentId || isLoading} className="w-full sm:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Get Recommendations
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="space-y-4 rounded-lg border bg-background p-4">
              <h4 className="font-semibold">Recommendations for {students.find(s => s.id === selectedStudentId)?.name}</h4>
              {result.recommendations && result.recommendations.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-sm">
                  {result.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No specific recommendations generated.</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
