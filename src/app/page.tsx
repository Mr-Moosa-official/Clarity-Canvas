import { StatCards } from '@/components/dashboard/stat-cards';
import { OverallPerformance } from '@/components/dashboard/overall-performance';
import { StudentEngagementChart } from '@/components/dashboard/student-engagement-chart';
import AtRiskStudents from '@/components/dashboard/at-risk-students';
import TrendAnalysis from '@/components/dashboard/trend-analysis';
import PersonalizedRecommendations from '@/components/dashboard/personalized-recommendations';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
        Dashboard
      </h1>

      <section className="mb-8">
        <StatCards />
      </section>

      <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OverallPerformance />
        </div>
        <div>
          <StudentEngagementChart />
        </div>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          AI-Powered Insights
        </h2>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <AtRiskStudents />
          <TrendAnalysis />
          <div className="xl:col-span-2">
            <PersonalizedRecommendations />
          </div>
        </div>
      </section>
    </div>
  );
}
