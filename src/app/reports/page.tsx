import ReportGenerator from '@/components/reports/report-generator';

export default function ReportsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
        Generate Reports
      </h1>
      <section className="animate-fade-in">
        <ReportGenerator />
      </section>
    </div>
  );
}
