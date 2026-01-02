'use client';

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltipContent, ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Activity } from 'lucide-react';

const chartData = [
  { level: 'Low', engagement: 15, fill: 'var(--color-low)' },
  { level: 'Medium', engagement: 45, fill: 'var(--color-medium)' },
  { level: 'High', engagement: 75, fill: 'var(--color-high)' },
];

const chartConfig = {
  engagement: {
    label: 'Engagement',
  },
  low: {
    label: 'Low',
    color: 'hsl(var(--chart-5))',
  },
  medium: {
    label: 'Medium',
    color: 'hsl(var(--chart-3))',
  },
  high: {
    label: 'High',
    color: 'hsl(var(--chart-1))',
  },
};

export function StudentEngagementChart() {
  return (
    <Card className="flex h-full flex-col animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Student Engagement
        </CardTitle>
        <CardDescription>Distribution of student engagement levels</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center pb-6">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[250px]">
          <ResponsiveContainer>
            <RadialBarChart
              data={chartData}
              startAngle={-90}
              endAngle={270}
              innerRadius="50%"
              outerRadius="100%"
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {chartData.find(({ level }) => level === 'High')?.engagement.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Highly Engaged
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="engagement"
                background
                cornerRadius={10}
              />
               <ChartLegend content={<ChartLegendContent nameKey="level" />} className="-translate-y-4" />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
