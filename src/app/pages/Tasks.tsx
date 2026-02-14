import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { Search, Plus, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { demoTasks } from '../data/mockData';

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<typeof demoTasks[0] | null>(null);

  const filteredTasks = demoTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.field.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const groupedTasks = {
    today: filteredTasks.filter(t => t.dueDate === '2026-02-14'),
    tonight: filteredTasks.filter(t => t.dueDate === '2026-02-14' && t.window === 'night'),
    tomorrow: filteredTasks.filter(t => t.dueDate === '2026-02-15'),
    thisWeek: filteredTasks.filter(t => {
      const due = new Date(t.dueDate);
      const today = new Date('2026-02-14');
      const weekEnd = new Date('2026-02-20');
      return due > today && due <= weekEnd && t.dueDate !== '2026-02-15';
    }),
    later: filteredTasks.filter(t => new Date(t.dueDate) > new Date('2026-02-20')),
    overdue: filteredTasks.filter(t => t.overdue)
  };

  const categories = Array.from(new Set(demoTasks.map(t => t.category)));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'done':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Done</Badge>;
      case 'inprogress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      default:
        return <Badge variant="outline">To Do</Badge>;
    }
  };

  const TaskCard = ({ task }: { task: typeof demoTasks[0] }) => (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className="cursor-pointer rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 hover:shadow-sm transition-all"
          onClick={() => setSelectedTask(task)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate">{task.title}</h4>
              <p className="text-sm text-neutral-600 mt-1">{task.field}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs capitalize">
                  {task.category}
                </Badge>
                {task.window && (
                  <Badge variant="outline" className="text-xs capitalize">
                    {task.window}
                  </Badge>
                )}
                {getStatusBadge(task.status)}
                {task.overdue && task.status !== 'done' && (
                  <Badge variant="destructive" className="text-xs">Overdue</Badge>
                )}
                {task.blocked && (
                  <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200 text-xs">
                    Blocked
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-sm text-neutral-500 ml-4">
              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{task.title}</SheetTitle>
          <SheetDescription>{task.field}</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Task Details */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Category:</span>
                <span className="capitalize">{task.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Due date:</span>
                <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              {task.window && (
                <div className="flex justify-between">
                  <span className="text-neutral-600">Window:</span>
                  <span className="capitalize">{task.window}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-600">Priority:</span>
                <span className="capitalize">{task.priority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Status:</span>
                {getStatusBadge(task.status)}
              </div>
            </div>
          </div>

          {/* Notes */}
          {task.notes && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Notes</h4>
              <p className="text-sm text-neutral-700 bg-neutral-50 rounded p-3">
                {task.notes}
              </p>
            </div>
          )}

          {/* Blocked Status */}
          {task.blocked && task.blockReason && (
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                Blocked
              </h4>
              <p className="text-sm text-red-900 bg-red-50 rounded border border-red-100 p-3">
                {task.blockReason}
              </p>
            </div>
          )}

          {/* Audit Trail */}
          <div>
            <h4 className="text-sm font-semibold mb-2">History</h4>
            <div className="space-y-2 text-xs">
              {task.createdFrom && (
                <div className="flex gap-2 text-neutral-600">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                  <div>
                    <p>Imported from {task.createdFrom}</p>
                    <p className="text-neutral-500">Feb 14, 5:00 AM</p>
                  </div>
                </div>
              )}
              {task.movedReason && (
                <div className="flex gap-2 text-neutral-600">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                  <div>
                    <p>{task.movedReason}</p>
                    <p className="text-neutral-500">Feb 14, 6:30 AM</p>
                  </div>
                </div>
              )}
              <div className="flex gap-2 text-neutral-600">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                <div>
                  <p>Task created</p>
                  <p className="text-neutral-500">Feb 10, 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t">
            <Button className="w-full">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark as done
            </Button>
            <Button variant="outline" className="w-full">
              Edit task
            </Button>
            <Button variant="outline" className="w-full">
              Snooze
            </Button>
            <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
              Delete task
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  const TaskGroup = ({ title, tasks, icon }: { title: string; tasks: typeof demoTasks; icon?: React.ReactNode }) => {
    if (tasks.length === 0) return null;

    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className="text-lg font-bold">{title}</h2>
          <Badge variant="outline">{tasks.length}</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Tasks</h1>
          <p className="text-sm text-neutral-600 mt-1">All tasks across your farm</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="search"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="todo">To do</SelectItem>
                <SelectItem value="inprogress">In progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Task Groups */}
      <div className="space-y-8">
        <TaskGroup
          title="Overdue"
          tasks={groupedTasks.overdue}
          icon={<AlertCircle className="h-5 w-5 text-red-600" />}
        />
        <TaskGroup
          title="Today"
          tasks={groupedTasks.today.filter(t => !t.overdue && t.window !== 'night')}
          icon={<Calendar className="h-5 w-5 text-blue-600" />}
        />
        <TaskGroup
          title="Tonight"
          tasks={groupedTasks.tonight.filter(t => !t.overdue)}
          icon={<Clock className="h-5 w-5 text-indigo-600" />}
        />
        <TaskGroup
          title="Tomorrow"
          tasks={groupedTasks.tomorrow}
          icon={<Calendar className="h-5 w-5 text-neutral-600" />}
        />
        <TaskGroup
          title="This Week"
          tasks={groupedTasks.thisWeek}
          icon={<Calendar className="h-5 w-5 text-neutral-600" />}
        />
        <TaskGroup
          title="Later"
          tasks={groupedTasks.later}
          icon={<Calendar className="h-5 w-5 text-neutral-400" />}
        />
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
            <h3 className="font-semibold text-lg mb-2">No tasks found</h3>
            <p className="text-sm text-neutral-600 mb-6">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
            >
              Clear filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
