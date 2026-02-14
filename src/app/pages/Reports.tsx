import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  BarChart3, TrendingUp, Droplets, Bug, Calendar, Download, Loader2, FileText,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { toast } from 'sonner';

export default function Reports() {
  const { state, exportCSV } = useApp();
  const [generating, setGenerating] = useState<string | null>(null);

  const handleGenerate = (reportType: string, reportName: string) => {
    setGenerating(reportType);
    setTimeout(() => {
      let data: Record<string, unknown>[] = [];
      switch (reportType) {
        case 'weekly':
          data = state.tasks.map(t => ({
            Task: t.title, Field: t.field, Category: t.category,
            'Due Date': t.dueDate, Status: t.status, Priority: t.priority,
            Overdue: t.overdue ? 'Yes' : 'No', Blocked: t.blocked ? 'Yes' : 'No',
          }));
          break;
        case 'irrigation':
          data = state.fields.map(f => ({
            Field: f.name, Crop: f.crop, 'Acreage (ac)': f.acreage,
            Irrigation: f.irrigationType, Status: f.status,
            'Irrigation Tasks': state.tasks.filter(t => t.fieldId === f.id && t.category === 'irrigation').length,
          }));
          break;
        case 'pest':
          data = state.fields.map(f => ({
            Field: f.name, Crop: f.crop, Status: f.status,
            'Spray Tasks': state.tasks.filter(t => t.fieldId === f.id && t.category === 'spray').length,
            'Scout Tasks': state.tasks.filter(t => t.fieldId === f.id && t.category === 'scout').length,
            'Active Issues': state.tasks.filter(t => t.fieldId === f.id && (t.category === 'spray' || t.category === 'scout') && t.status !== 'done').length,
          }));
          break;
        case 'season':
          data = [
            { Metric: 'Total Fields', Value: state.fields.length },
            { Metric: 'Total Acreage', Value: state.fields.reduce((s, f) => s + f.acreage, 0) },
            { Metric: 'Total Tasks', Value: state.tasks.length },
            { Metric: 'Tasks Completed', Value: state.tasks.filter(t => t.status === 'done').length },
            { Metric: 'Tasks Overdue', Value: state.tasks.filter(t => t.overdue).length },
            { Metric: 'Tasks Blocked', Value: state.tasks.filter(t => t.blocked).length },
            { Metric: 'Total Imports', Value: state.imports.length },
            { Metric: 'Total Notes', Value: state.notes.length },
          ];
          break;
      }
      exportCSV(data, `cropbase-${reportType}-report.csv`);
      setGenerating(null);
      toast.success(`${reportName} generated and downloaded`);
    }, 1500);
  };

  const reports = [
    {
      id: 'weekly', title: 'Weekly Operations Report',
      description: 'Summary of all tasks, completions, and blockers for the week.',
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      badge: 'Popular', badgeColor: 'bg-blue-100 text-blue-700',
      dataPoints: `${state.tasks.length} tasks · ${state.fields.length} fields`,
    },
    {
      id: 'irrigation', title: 'Irrigation Summary',
      description: 'Irrigation status across all fields and upcoming schedules.',
      icon: <Droplets className="h-8 w-8 text-cyan-600" />,
      badge: 'Updated', badgeColor: 'bg-cyan-100 text-cyan-700',
      dataPoints: `${state.tasks.filter(t => t.category === 'irrigation').length} irrigation tasks`,
    },
    {
      id: 'pest', title: 'Pest & Disease Report',
      description: 'Current pest pressure, spray schedules, and scouting results.',
      icon: <Bug className="h-8 w-8 text-red-600" />,
      badge: null, badgeColor: '',
      dataPoints: `${state.tasks.filter(t => t.category === 'spray' || t.category === 'scout').length} pest-related tasks`,
    },
    {
      id: 'season', title: 'Season Overview',
      description: 'High-level summary: task completion rates, import history, and trends.',
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      badge: 'New', badgeColor: 'bg-green-100 text-green-700',
      dataPoints: `${state.tasks.filter(t => t.status === 'done').length}/${state.tasks.length} tasks completed`,
    },
  ];

  return (
    <div className="pb-8">
      <div className="sticky top-16 z-30 bg-white border-b border-neutral-200 px-4 lg:px-8 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-sm text-neutral-600 mt-1">Generate and download farm operation reports</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Calendar className="h-4 w-4" />
            <span>Data as of {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map(report => (
            <Card key={report.id} className="hover:border-neutral-300 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-14 w-14 rounded-xl bg-neutral-50 flex items-center justify-center">{report.icon}</div>
                  {report.badge && <Badge className={report.badgeColor}>{report.badge}</Badge>}
                </div>
                <CardTitle className="mt-4">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-500">{report.dataPoints}</p>
                  <Button className="bg-green-600 hover:bg-green-700" size="sm" disabled={generating === report.id} onClick={() => handleGenerate(report.id, report.title)}>
                    {generating === report.id ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating...</> : <><Download className="h-4 w-4 mr-2" />Generate</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-dashed border-neutral-300 p-6 text-center">
          <FileText className="h-10 w-10 mx-auto mb-3 text-neutral-300" />
          <p className="font-medium text-neutral-700">Reports are downloaded as CSV files</p>
          <p className="text-sm text-neutral-500 mt-1">Click Generate to create a report from your current farm data.</p>
        </div>
      </div>
    </div>
  );
}
