import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  MapPin,
  AlertCircle,
  Clock,
  CheckSquare,
  Plus,
  Download,
  Sparkles,
  ChevronRight,
  Droplet,
  Wind,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { demoFields, demoTasks, demoChanges, getFarmStats, getFieldsNeedingAttention } from '../data/mockData';
import { ExportModal } from '../components/ExportModal';
import { CreateTaskModal } from '../components/CreateTaskModal';

export default function Overview() {
  const stats = getFarmStats();
  const fieldsNeedingAttention = getFieldsNeedingAttention();
  const todayTasks = demoTasks.filter(t => t.dueDate === '2026-02-14' && t.status !== 'done').slice(0, 10);
  const recentChanges = demoChanges.slice(0, 5);
  
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'attention':
        return <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">Attention</Badge>;
      case 'blocked':
        return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">Blocked</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'watch':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Watch</Badge>;
      default:
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Normal</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'irrigation':
        return <Droplet className="h-4 w-4 text-blue-600" />;
      case 'spray':
        return <Wind className="h-4 w-4 text-purple-600" />;
      default:
        return <TrendingUp className="h-4 w-4 text-green-600" />;
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1>Overview</h1>
        <p className="text-sm text-neutral-600 mt-1">Command center for Aggie Demo Farm</p>
      </div>

      {/* Onboarding Checklist */}
      {!onboardingDismissed && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <CheckCircle2 className="h-5 w-5" />
                Getting Started
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setOnboardingDismissed(true)}
              >
                Dismiss
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox checked disabled />
                <span className="text-sm text-neutral-500 line-through">Upload your first spreadsheet</span>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox checked disabled />
                <span className="text-sm text-neutral-500 line-through">Map columns to fields and tasks</span>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox />
                <span className="text-sm text-green-900">View your Today Plan</span>
                <Button variant="link" size="sm" className="ml-auto px-0 text-green-700" asChild>
                  <Link to="/app/today">Go to Today Plan →</Link>
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox />
                <span className="text-sm text-green-900">Export data as CSV</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Active Fields</p>
                <p className="text-3xl font-bold mt-1">{stats.activeFields}</p>
              </div>
              <MapPin className="h-8 w-8 text-neutral-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Tasks Due (24h)</p>
                <p className="text-3xl font-bold mt-1">{stats.tasksDue24h}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Overdue Tasks</p>
                <p className="text-3xl font-bold mt-1 text-red-600">{stats.overdueTasks}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Blocked Tasks</p>
                <p className="text-3xl font-bold mt-1 text-orange-600">{stats.blockedTasks}</p>
              </div>
              <Wind className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Data Freshness</p>
                <p className="text-sm font-semibold mt-1 text-green-900">2 hours ago</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fields at a Glance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Fields at a glance</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/fields">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Crop</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Next Task</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead className="text-center">Overdue</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoFields.map((field) => (
                      <TableRow key={field.id} className="cursor-pointer hover:bg-neutral-50">
                        <TableCell className="font-medium">
                          <Link to={`/app/fields/${field.id}`} className="hover:underline">
                            {field.name}
                          </Link>
                        </TableCell>
                        <TableCell>{field.crop}</TableCell>
                        <TableCell className="text-sm text-neutral-600">{field.stage}</TableCell>
                        <TableCell className="text-sm">{field.nextTask}</TableCell>
                        <TableCell className="text-sm">
                          {field.nextTaskDue ? new Date(field.nextTaskDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          {field.overdueCount > 0 ? (
                            <Badge variant="destructive" className="px-2">{field.overdueCount}</Badge>
                          ) : (
                            <span className="text-neutral-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(field.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Needs Attention */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Needs attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldsNeedingAttention.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-lg border border-orange-100 bg-orange-50 p-4">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <Link 
                        to={`/app/fields/${item.field.id}`}
                        className="font-semibold hover:underline"
                      >
                        {item.field.name} - {item.field.crop}
                      </Link>
                      <p className="text-sm text-neutral-700 mt-1">{item.reason}</p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/app/fields/${item.field.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* What Changed */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-base">What changed since last update</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentChanges.map((change) => (
                  <div key={change.id} className="flex gap-3 text-sm">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>
                    <div>
                      <p className="text-neutral-900">{change.description}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {new Date(change.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today Plan Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Today Plan</CardTitle>
              <Button variant="link" size="sm" asChild className="px-0">
                <Link to="/app/today">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayTasks.slice(0, 8).map((task) => (
                  <div key={task.id} className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-3 hover:border-neutral-300 transition-colors">
                    <div className="mt-0.5">
                      {getCategoryIcon(task.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-neutral-600">{task.field}</p>
                        {task.window && (
                          <Badge variant="outline" className="text-xs px-1.5 py-0">
                            {task.window}
                          </Badge>
                        )}
                        {task.blocked && (
                          <Badge variant="destructive" className="text-xs px-1.5 py-0">
                            Blocked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Briefing */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Daily Briefing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-700 mb-4">
                AI-powered summary of priorities, risks, and recommendations.
              </p>
              <Button className="w-full" variant="outline">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Briefing
              </Button>
              <p className="text-xs text-neutral-500 text-center mt-2">
                Last generated: Never
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => setCreateTaskModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
        <Button variant="outline" onClick={() => setExportModalOpen(true)}>
          <Download className="mr-2 h-4 w-4" />
          Export Today Plan to CSV
        </Button>
        <Button variant="outline">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Daily Briefing
        </Button>
      </div>

      {/* Modals */}
      <ExportModal open={exportModalOpen} onOpenChange={setExportModalOpen} />
      <CreateTaskModal open={createTaskModalOpen} onOpenChange={setCreateTaskModalOpen} />
    </div>
  );
}