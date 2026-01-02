'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { identifyStrugglingStudents, IdentifyStrugglingStudentsOutput } from '@/ai/flows/identify-struggling-students';
import { students, enrollments, courses, performance } from '@/lib/data';
import { Loader2, UserX } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function AtRiskStudents() {
  const [performanceThreshold, setPerformanceThreshold] = useState(60);
  const [engagementThreshold, setEngagementThreshold] = useState(40);
  const [result, setResult] = useState<IdentifyStrugglingStudentsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleIdentify = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const studentData = JSON.stringify({ students, enrollments, courses, performance });
      const response = await identifyStrugglingStudents({
        studentData,
        performanceThreshold,
        engagementThreshold,
      });
      setResult(response);
    } catch (e) {
      setError('Failed to get analysis. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const atRiskStudentDetails = result?.atRiskStudents.map(studentId => 
    students.find(s => s.id === studentId)
  ).filter(Boolean);

  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserX className="h-5 w-5 text-destructive" />
          Predict At-Risk Students
        </CardTitle>
        <CardDescription>Use AI to identify students who may need additional support based on performance and engagement.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="perf-threshold">Performance Threshold: {performanceThreshold}%</Label>
              <Slider
                id="perf-threshold"
                min={0}
                max={100}
                step={5}
                value={[performanceThreshold]}
                onValueChange={(value) => setPerformanceThreshold(value[0])}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="eng-threshold">Engagement Threshold: {engagementThreshold}%</Label>
              <Slider
                id="eng-threshold"
                min={0}
                max={100}
                step={5}
                value={[engagementThreshold]}
                onValueChange={(value) => setEngagementThreshold(value[0])}
                disabled={isLoading}
              />
            </div>
          </div>

          <Button onClick={handleIdentify} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLoading ? 'Analyzing...' : 'Identify Students'}
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
                <h4 className="font-semibold">Analysis Summary</h4>
                <p className="text-sm text-muted-foreground">{result.summary}</p>
              </div>
              <div>
                <h4 className="font-semibold">Identified Students ({atRiskStudentDetails?.length || 0})</h4>
                {atRiskStudentDetails && atRiskStudentDetails.length > 0 ? (
                  <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                    {atRiskStudentDetails.map((student) => student && (
                      <li key={student.id}>{student.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">No students identified as at-risk with the current thresholds.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
