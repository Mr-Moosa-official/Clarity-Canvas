'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { analyzeLearningTrends, AnalyzeLearningTrendsOutput } from '@/ai/flows/analyze-learning-trends';
import { students, enrollments, courses, performance } from '@/lib/data';
import { Loader2, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function TrendAnalysis() {
  const [result, setResult] = useState<AnalyzeLearningTrendsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const learningData = JSON.stringify({ students, enrollments, courses, performance });
      const response = await analyzeLearningTrends({ learningData });
      setResult(response);
    } catch (e) {
      setError('Failed to get analysis. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-chart-5" />
          Learning Trend Identification
        </CardTitle>
        <CardDescription>Use AI to discover trends and patterns in student learning data across all courses.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLoading ? 'Analyzing Data...' : 'Analyze Learning Trends'}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="space-y-4 rounded-lg border bg-background p-4">
              <div>
                <h4 className="font-semibold">Identified Trends</h4>
                <p className="text-sm text-muted-foreground">{result.trends}</p>
              </div>
              <div>
                <h4 className="font-semibold">Recommendations</h4>
                <p className="text-sm text-muted-foreground">{result.recommendations}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
