import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { demoTasks } from '../data/mockData';

export default function TodayPlan() {
  const [crewView, setCrewView] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'irrigation':
        return <Droplet className="h-5 w-5 text-blue-600" />;
      case 'fertilization':
        return <Leaf className="h-5 w-5 text-green-600" />;
      case 'spray':
        return <Wind className="h-5 w-5 text-purple-600" />;
      case 'scout':
        return <Target className="h-5 w-5 text-orange-600" />;
      case 'harvest':
        return <Sprout className="h-5 w-5 text-yellow-600" />;
      case 'maintenance':
        return <Wrench className="h-5 w-5 text-neutral-600" />;
      default:
        return <Target className="h-5 w-5 text-neutral-600" />;
    }
  };

  const morningTasks = demoTasks.filter(t => t.dueDate === '2026-02-14' && t.window === 'morning');
  const afternoonTasks = demoTasks.filter(t => t.dueDate === '2026-02-14' && t.window === 'afternoon');
  const nightTasks = demoTasks.filter(t => t.dueDate === '2026-02-14' && t.window === 'night');
  const overdueTasks = demoTasks.filter(t => t.overdue && t.status !== 'done');
  const tomorrowTasks = demoTasks.filter(t => t.dueDate === '2026-02-15').slice(0, 4);

  const totalTasks = morningTasks.length + afternoonTasks.length + nightTasks.length;
  const blockedCount = [...morningTasks, ...afternoonTasks, ...nightTasks].filter(t => t.blocked).length;
  const estimatedHours = totalTasks * 1.5; // Mock calculation

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const TaskCard = ({ task, showDate = false }: { task: typeof demoTasks[0], showDate?: boolean }) => {
    const isSelected = selectedTasks.includes(task.id);

    if (crewView) {
      return (
        <div className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-5 hover:border-green-300 transition-colors">
          <Checkbox
            checked={task.status === 'done'}
            className="h-7 w-7"
          />
          <div className="flex-1">
            <p className={`font-semibold text-xl ${task.status === 'done' ? 'line-through text-neutral-400' : ''}`}>
              {task.title}
            </p>
            <p className="text-neutral-600 mt-1 text-lg">{task.field}</p>
            {task.window && (
              <Badge variant="outline" className="mt-2">
                {task.window}
              </Badge>
            )}
          </div>
          {task.blocked && (
            <AlertCircle className="h-6 w-6 text-red-600" />
          )}
        </div>
      );
    }

    return (
      <div className={`rounded-lg border ${isSelected ? 'border-green-600 bg-green-50' : 'border-neutral-200 bg-white'} p-4 hover:border-neutral-300 transition-colors`}>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleTaskSelection(task.id)}
            className="mt-1 h-5 w-5"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getCategoryIcon(task.category)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-sm text-neutral-600 mt-0.5">{task.field}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Edit task</DropdownMenuItem>
                  <DropdownMenuItem>Snooze</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {task.window && (
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {task.window}
                </Badge>
              )}
              {task.overdue && (
                <Badge variant="destructive" className="text-xs">
                  Overdue
                </Badge>
              )}
              {task.blocked && (
                <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                  Blocked
                </Badge>
              )}
              {task.movedReason && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                  Moved
                </Badge>
              )}
              {task.createdFrom && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                  Imported
                </Badge>
              )}
            </div>

            {task.notes && (
              <p className="text-sm text-neutral-600 mt-2">{task.notes}</p>
            )}

            {task.blocked && task.blockReason && (
              <div className="flex items-start gap-2 mt-3 rounded bg-red-50 border border-red-100 p-2">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-900">{task.blockReason}</p>
              </div>
            )}

            <div className="flex items-center gap-2 mt-3">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Mark done
              </Button>
              <Button size="sm" variant="outline">
                <Clock className="h-4 w-4 mr-1" />
                Snooze
              </Button>
              <Button size="sm" variant="ghost">
                Add note
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-8">
      {/* Sticky Summary Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-neutral-200 px-4 lg:px-8 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Today Plan</h1>
            <p className="text-sm text-neutral-600 mt-1">
              Saturday, February 14, 2026
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="font-medium">{totalTasks} tasks</span>
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
              <span className="font-medium">~{estimatedHours}h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8">
        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch
                id="crew-view"
                checked={crewView}
                onCheckedChange={setCrewView}
              />
              <Label htmlFor="crew-view" className="cursor-pointer">Crew View (simplified)</Label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedTasks.length > 0 && !crewView && (
          <Card className="mb-6 border-neutral-900 bg-neutral-50">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{selectedTasks.length} tasks selected</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Mark all done
                  </Button>
                  <Button size="sm" variant="outline">
                    Export selected
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedTasks([])}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-8">
          {/* Overdue Section */}
          {overdueTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h2 className="text-lg font-bold text-red-900">Overdue</h2>
                <Badge variant="destructive">{overdueTasks.length}</Badge>
              </div>
              <div className="space-y-3">
                {overdueTasks.map(task => (
                  <TaskCard key={task.id} task={task} showDate />
                ))}
              </div>
            </div>
          )}

          {/* Morning Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sunrise className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-bold">Morning</h2>
              <Badge variant="outline">{morningTasks.length}</Badge>
            </div>
            <div className="space-y-3">
              {morningTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Afternoon Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sun className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg font-bold">Afternoon</h2>
              <Badge variant="outline">{afternoonTasks.length}</Badge>
            </div>
            <div className="space-y-3">
              {afternoonTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Night Section */}
          {nightTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Moon className="h-5 w-5 text-indigo-500" />
                <h2 className="text-lg font-bold">Night</h2>
                <Badge variant="outline">{nightTasks.length}</Badge>
              </div>
              <div className="space-y-3">
                {nightTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Tomorrow Preview */}
          <div className="border-t pt-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-neutral-500" />
              <h2 className="text-lg font-bold text-neutral-700">Tomorrow (Preview)</h2>
              <Badge variant="outline" className="bg-neutral-50">{tomorrowTasks.length}+</Badge>
            </div>
            <div className="space-y-3 opacity-70">
              {tomorrowTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}