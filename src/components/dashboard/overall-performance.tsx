'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { performance } from '@/lib/data';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';

const aggregatedPerformance = performance.reduce((acc, p) => {
  if (!acc[p.courseId]) {
    acc[p.courseId] = { name: p.courseId, totalScore: 0, count: 0 };
  }
  acc[p.courseId].totalScore += p.score;
  acc[p.courseId].count += 1;
  return acc;
}, {} as Record<string, { name: string; totalScore: number; count: number }>);

const chartData = Object.values(aggregatedPerformance).map(item => ({
  name: item.name,
  averageGrade: item.totalScore / item.count,
}));

const chartConfig = {
  averageGrade: {
    label: 'Avg. Grade',
    color: 'hsl(var(--chart-1))',
  },
};

export function OverallPerformance() {
  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Overall Performance
        </CardTitle>
        <CardDescription>Average student grades across all courses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="averageGrade" fill="var(--color-averageGrade)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
