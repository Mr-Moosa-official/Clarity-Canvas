'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { analyzeLearningTrends, AnalyzeLearningTrendsOutput } from '@/ai/flows/analyze-learning-trends';
import { identifyStrugglingStudents, IdentifyStrugglingStudentsOutput } from '@/ai/flows/identify-struggling-students';
import { students, enrollments, courses, performance } from '@/lib/data';
import { Loader2, FileText, Download } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import type { Student } from '@/lib/types';

type ReportData = AnalyzeLearningTrendsOutput | IdentifyStrugglingStudentsOutput | null;

export default function ReportGenerator() {
  const [reportType, setReportType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<ReportData>(null);

  const handleGenerateReport = async () => {
    if (!reportType) {
      setError('Please select a report type.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReportData(null);

    try {
      let response: ReportData;
      const learningData = JSON.stringify({ students, enrollments, courses, performance });

      if (reportType === 'summary') {
        response = await analyzeLearningTrends({ learningData });
      } else if (reportType === 'at-risk') {
        response = await identifyStrugglingStudents({
          studentData: learningData,
          performanceThreshold: 70,
          engagementThreshold: 50,
        });
      }
      setReportData(response);
    } catch (e) {
      setError('Failed to generate the report. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderReport = () => {
    if (!reportData) return null;

    if (reportType === 'summary' && 'trends' in reportData) {
      return (
        <div className="space-y-4 rounded-lg border bg-background p-4">
          <div>
            <h4 className="font-semibold">Identified Trends</h4>
            <p className="text-sm text-muted-foreground">{reportData.trends}</p>
          </div>
          <div>
            <h4 className="font-semibold">Recommendations</h4>
            <p className="text-sm text-muted-foreground">{reportData.recommendations}</p>
          </div>
        </div>
      );
    }

    if (reportType === 'at-risk' && 'atRiskStudents' in reportData) {
      const atRiskStudentDetails = reportData.atRiskStudents.map(studentId =>
        students.find(s => s.id === studentId)
      ).filter((s): s is Student => s !== undefined);

      return (
        <div className="space-y-4 rounded-lg border bg-background p-4">
           <p className="text-sm text-muted-foreground">
            {reportData.summary}
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Join Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atRiskStudentDetails.length > 0 ? (
                atRiskStudentDetails.map(student => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.joinDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No at-risk students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      );
    }

    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Report Generator
        </CardTitle>
        <CardDescription>Select a report type to generate insights from the learning data.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Select onValueChange={setReportType} disabled={isLoading}>
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Select report type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Overall Performance Summary</SelectItem>
                <SelectItem value="at-risk">At-Risk Student List</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateReport} disabled={!reportType || isLoading} className="w-full sm:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate Report'}
            </Button>
            {reportData && (
                 <Button variant="outline" className="w-full sm:w-auto ml-auto">
                    <Download className="mr-2"/>
                    Download
                </Button>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mt-6">{renderReport()}</div>
        </div>
      </CardContent>
    </Card>
  );
}
