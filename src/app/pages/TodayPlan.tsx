import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Clock,
  Droplet,
  Wind,
  Leaf,
  Sprout,
  Target,
  Wrench,
  MoreVertical,
  Download,
  Printer,
  AlertCircle,
  CheckCircle2,
  Sun,
  Moon,
  Sunrise,
  Timer
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { ExportModal } from '../components/ExportModal';
import { toast } from 'sonner';

export default function TodayPlan() {
  const { state, dispatch, exportCSV } = useApp();
  const [crewView, setCrewView] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [exportOpen, setExportOpen] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'irrigation': return <Droplet className="h-5 w-5 text-blue-600" />;
      case 'fertilization': return <Leaf className="h-5 w-5 text-green-600" />;
      case 'spray': return <Wind className="h-5 w-5 text-purple-600" />;
      case 'scout': return <Target className="h-5 w-5 text-orange-600" />;
      case 'harvest': return <Sprout className="h-5 w-5 text-yellow-600" />;
      case 'maintenance': return <Wrench className="h-5 w-5 text-neutral-600" />;
      default: return <Target className="h-5 w-5 text-neutral-600" />;
    }
  };

  const morningTasks = state.tasks.filter(t => t.dueDate === '2026-02-14' && t.window === 'morning' && !t.overdue);
  const afternoonTasks = state.tasks.filter(t => t.dueDate === '2026-02-14' && t.window === 'afternoon' && !t.overdue);
  const nightTasks = state.tasks.filter(t => t.dueDate === '2026-02-14' && t.window === 'night' && !t.overdue);
  const overdueTasks = state.tasks.filter(t => t.overdue && t.status !== 'done');
  const tomorrowTasks = state.tasks.filter(t => t.dueDate === '2026-02-15').slice(0, 4);

  const allTodayTasks = [...morningTasks, ...afternoonTasks, ...nightTasks];
  const totalTasks = allTodayTasks.length;
  const doneCount = allTodayTasks.filter(t => t.status === 'done').length;
  const blockedCount = allTodayTasks.filter(t => t.blocked).length;
  const estimatedHours = (totalTasks - doneCount) * 1.5;

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]);
  };

  const handleMarkDone = (taskId: string) => {
    dispatch({ type: 'TASK_MARK_DONE', payload: taskId });
    setSelectedTasks(prev => prev.filter(id => id !== taskId));
    toast.success('Task marked as done');
  };

  const handleSnooze = (taskId: string, option: string) => {
    let newDate = '2026-02-14';
    if (option === 'later') newDate = '2026-02-14'; // same day, later
    if (option === 'tomorrow') newDate = '2026-02-15';
    if (option === 'nextweek') newDate = '2026-02-21';

    dispatch({ type: 'TASK_SNOOZE', payload: { id: taskId, newDate } });
    toast.success(`Task snoozed to ${option === 'tomorrow' ? 'tomorrow' : option === 'nextweek' ? 'next week' : 'later today'}`);
  };

  const handleBulkMarkDone = () => {
    dispatch({ type: 'TASK_BULK_MARK_DONE', payload: selectedTasks });
    toast.success(`${selectedTasks.length} tasks marked as done`);
    setSelectedTasks([]);
  };

  const handleDelete = (taskId: string) => {
    dispatch({ type: 'TASK_DELETE', payload: taskId });
    toast.success('Task deleted');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportSelected = () => {
    const selectedData = state.tasks
      .filter(t => selectedTasks.includes(t.id))
      .map(t => ({ Field: t.field, Task: t.title, Due: t.dueDate, Status: t.status, Category: t.category, Notes: t.notes || '' }));
    exportCSV(selectedData, 'cropbase-selected-tasks.csv');
    toast.success(`${selectedData.length} tasks exported`);
    setSelectedTasks([]);
  };

  const TaskCard = ({ task }: { task: typeof state.tasks[0] }) => {
    const isSelected = selectedTasks.includes(task.id);
    const isDone = task.status === 'done';

    if (crewView) {
      return (
        <div className={`flex items-center gap-4 rounded-lg border p-5 transition-colors ${isDone ? 'bg-green-50 border-green-200' : 'border-neutral-200 bg-white hover:border-green-300'}`}>
          <Checkbox checked={isDone} onCheckedChange={() => !isDone && handleMarkDone(task.id)} className="h-7 w-7" />
          <div className="flex-1">
            <p className={`font-semibold text-xl ${isDone ? 'line-through text-neutral-400' : ''}`}>{task.title}</p>
            <p className="text-neutral-600 mt-1 text-lg">{task.field}</p>
            {task.window && <Badge variant="outline" className="mt-2">{task.window}</Badge>}
          </div>
          {task.blocked && <AlertCircle className="h-6 w-6 text-red-600" />}
          {isDone && <CheckCircle2 className="h-6 w-6 text-green-600" />}
        </div>
      );
    }

    return (
      <div className={`rounded-lg border ${isDone ? 'bg-green-50 border-green-200 opacity-70' : isSelected ? 'border-green-600 bg-green-50' : 'border-neutral-200 bg-white'} p-4 hover:border-neutral-300 transition-colors`}>
        <div className="flex items-start gap-3">
          <Checkbox checked={isSelected || isDone} onCheckedChange={() => isDone ? null : toggleTaskSelection(task.id)} className="mt-1 h-5 w-5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getCategoryIcon(task.category)}</div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold ${isDone ? 'line-through text-neutral-400' : ''}`}>{task.title}</h4>
                <p className="text-sm text-neutral-600 mt-0.5">{task.field}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleMarkDone(task.id)}>Mark as done</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleSnooze(task.id, 'later')}>Snooze: later today</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSnooze(task.id, 'tomorrow')}>Snooze: tomorrow</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSnooze(task.id, 'nextweek')}>Snooze: next week</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    const newTask = { ...task, id: `${task.id}-dup-${Date.now()}` };
                    dispatch({ type: 'TASK_CREATE', payload: newTask });
                    toast.success('Task duplicated');
                  }}>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(task.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {task.window && <Badge variant="outline" className="text-xs"><Clock className="h-3 w-3 mr-1" />{task.window}</Badge>}
              {task.overdue && <Badge variant="destructive" className="text-xs">Overdue</Badge>}
              {task.blocked && <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">Blocked</Badge>}
              {task.movedReason && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">Moved</Badge>}
              {task.createdFrom && <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">Imported</Badge>}
              {isDone && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">Done</Badge>}
            </div>

            {task.notes && <p className="text-sm text-neutral-600 mt-2">{task.notes}</p>}

            {task.blocked && task.blockReason && (
              <div className="flex items-start gap-2 mt-3 rounded bg-red-50 border border-red-100 p-2">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-900">{task.blockReason}</p>
              </div>
            )}

            {!isDone && (
              <div className="flex items-center gap-2 mt-3">
                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleMarkDone(task.id)}>
                  <CheckCircle2 className="h-4 w-4 mr-1" />Mark done
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline"><Clock className="h-4 w-4 mr-1" />Snooze</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleSnooze(task.id, 'later')}>Later today</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSnooze(task.id, 'tomorrow')}>Tomorrow</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSnooze(task.id, 'nextweek')}>Next week</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const TaskSection = ({ title, tasks, icon }: { title: string; tasks: typeof state.tasks; icon: React.ReactNode }) => {
    if (tasks.length === 0) return null;
    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className="text-lg font-bold">{title}</h2>
          <Badge variant="outline">{tasks.filter(t => t.status !== 'done').length}/{tasks.length}</Badge>
        </div>
        <div className="space-y-3">
          {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
    );
  };

  return (
    <div className="pb-8">
      <div className="sticky top-16 z-30 bg-white border-b border-neutral-200 px-4 lg:px-8 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Today Plan</h1>
            <p className="text-sm text-neutral-600 mt-1">Friday, February 14, 2026</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="font-medium">{doneCount}/{totalTasks} done</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="font-medium text-red-600">{overdueTasks.length} overdue</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wind className="h-4 w-4 text-orange-600" />
              <span className="font-medium text-orange-600">{blockedCount} blocked</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Timer className="h-4 w-4 text-neutral-600" />
              <span className="font-medium">~{estimatedHours.toFixed(1)}h left</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Switch id="crew-view" checked={crewView} onCheckedChange={setCrewView} />
            <Label htmlFor="crew-view" className="cursor-pointer">Crew View (simplified)</Label>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />Print
            </Button>
            <Button variant="outline" size="sm" onClick={() => setExportOpen(true)}>
              <Download className="mr-2 h-4 w-4" />Export
            </Button>
          </div>
        </div>

        {selectedTasks.length > 0 && !crewView && (
          <Card className="mb-6 border-neutral-900 bg-neutral-50">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{selectedTasks.length} tasks selected</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleBulkMarkDone}>Mark all done</Button>
                  <Button size="sm" variant="outline" onClick={handleExportSelected}>Export selected</Button>
                  <Button size="sm" variant="ghost" onClick={() => setSelectedTasks([])}>Clear</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-8">
          <TaskSection title="Overdue" tasks={overdueTasks} icon={<AlertCircle className="h-5 w-5 text-red-600" />} />
          <TaskSection title="Morning" tasks={morningTasks} icon={<Sunrise className="h-5 w-5 text-orange-500" />} />
          <TaskSection title="Afternoon" tasks={afternoonTasks} icon={<Sun className="h-5 w-5 text-yellow-500" />} />
          {nightTasks.length > 0 && (
            <TaskSection title="Night" tasks={nightTasks} icon={<Moon className="h-5 w-5 text-indigo-500" />} />
          )}

          <div className="border-t pt-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-neutral-500" />
              <h2 className="text-lg font-bold text-neutral-700">Tomorrow (Preview)</h2>
              <Badge variant="outline" className="bg-neutral-50">{tomorrowTasks.length}+</Badge>
            </div>
            <div className="space-y-3 opacity-70">
              {tomorrowTasks.map(task => <TaskCard key={task.id} task={task} />)}
            </div>
          </div>
        </div>
      </div>

      <ExportModal open={exportOpen} onOpenChange={setExportOpen} title="Export Today Plan" />
    </div>
  );
}
