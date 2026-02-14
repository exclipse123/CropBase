import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { FileBarChart, Download, Sparkles, Calendar, AlertTriangle, FileText } from 'lucide-react';

export default function Reports() {
  const reports = [
    {
      id: 'weekly-ops',
      title: 'Weekly Ops Plan',
      description: 'Complete operational plan for the next 7 days, grouped by field and priority',
      icon: Calendar,
      lastGenerated: '2026-02-14T08:00:00',
      formats: ['PDF', 'CSV']
    },
    {
      id: 'field-status',
      title: 'Field Status Summary',
      description: 'Current status of all fields including crop stages, irrigation, and active tasks',
      icon: FileText,
      lastGenerated: '2026-02-14T05:00:00',
      formats: ['CSV', 'Excel']
    },
    {
      id: 'work-log',
      title: 'Work Log Export',
      description: 'Complete history of all tasks, status changes, and field notes',
      icon: FileBarChart,
      lastGenerated: '2026-02-13T18:00:00',
      formats: ['CSV', 'Excel']
    },
    {
      id: 'exceptions',
      title: 'Exceptions Report',
      description: 'What changed and why: overdue tasks, blocked operations, and schedule changes',
      icon: AlertTriangle,
      lastGenerated: 'Never',
      formats: ['PDF', 'CSV']
    },
  ];

  const formatDate = (dateString: string) => {
    if (dateString === 'Never') return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Reports</h1>
        <p className="text-sm text-neutral-600 mt-1">Generate and export operational reports</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                      <Icon className="h-5 w-5 text-neutral-700" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{report.title}</CardTitle>
                      <p className="text-sm text-neutral-600 mt-1">{report.description}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm">
                    <span className="text-neutral-600">Last generated:</span>{' '}
                    <span className="font-medium">{formatDate(report.lastGenerated)}</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  {report.formats.map(format => (
                    <Badge key={format} variant="outline" className="text-xs">
                      {format}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info */}
      <Card className="mt-8 border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <FileBarChart className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Export anytime</h3>
              <p className="text-sm text-blue-800">
                All reports can be exported to CSV or Excel format. Keep your spreadsheet workflow and use Cropbase for coordination and visibility.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
