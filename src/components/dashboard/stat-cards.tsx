import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Star } from 'lucide-react';
import { students, courses, performance } from '@/lib/data';

export function StatCards() {
  const totalStudents = students.length;
  const totalCourses = courses.length;
  const averageGrade = performance.reduce((acc, p) => acc + p.score, 0) / performance.length;

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Active Courses',
      value: totalCourses,
      icon: BookOpen,
      color: 'text-chart-3',
    },
    {
      title: 'Average Grade',
      value: `${averageGrade.toFixed(1)}%`,
      icon: Star,
      color: 'text-chart-5',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
