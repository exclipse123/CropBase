import { useState, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '../components/ui/sheet';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  Droplet,
  Wind,
  Leaf,
  Target,
  Sprout,
  Wrench,
  Trash2,
  Calendar,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { CreateTaskModal } from '../components/CreateTaskModal';
import { toast } from 'sonner';

export default function Tasks() {
  const { state, dispatch } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [fieldFilter, setFieldFilter] = useState<string>('all');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'irrigation': return <Droplet className="h-4 w-4 text-blue-600" />;
      case 'fertilization': return <Leaf className="h-4 w-4 text-green-600" />;
      case 'spray': return <Wind className="h-4 w-4 text-purple-600" />;
      case 'scout': return <Target className="h-4 w-4 text-orange-600" />;
      case 'harvest': return <Sprout className="h-4 w-4 text-yellow-600" />;
      case 'maintenance': return <Wrench className="h-4 w-4 text-neutral-600" />;
      default: return <Target className="h-4 w-4 text-neutral-600" />;
    }
  };

  const getStatusBadge = (status: string, overdue?: boolean, blocked?: boolean) => {
    if (blocked) return <Badge className="bg-red-100 text-red-700 border-red-200">Blocked</Badge>;
    if (overdue) return <Badge variant="destructive">Overdue</Badge>;
    switch (status) {
      case 'done': return <Badge className="bg-green-100 text-green-700 border-green-200">Done</Badge>;
      case 'inprogress': return <Badge className="bg-blue-100 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'todo': return <Badge variant="outline">To Do</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filtered = useMemo(() => {
    return state.tasks.filter(t => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.field.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter === 'overdue' && !t.overdue) return false;
      if (statusFilter === 'blocked' && !t.blocked) return false;
      if (statusFilter !== 'all' && statusFilter !== 'overdue' && statusFilter !== 'blocked' && t.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
      if (fieldFilter !== 'all' && t.field !== fieldFilter) return false;
      return true;
    });
  }, [state.tasks, search, statusFilter, categoryFilter, fieldFilter]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    for (const t of filtered) {
      const key = t.dueDate || 'No date';
      if (!groups[key]) groups[key] = [];
      groups[key].push(t);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const selectedTask = selectedTaskId ? state.tasks.find(t => t.id === selectedTaskId) : null;
  const uniqueFields = [...new Set(state.tasks.map(t => t.field))].sort();

  const handleMarkDone = (taskId: string) => {
    dispatch({ type: 'TASK_MARK_DONE', payload: taskId });
    toast.success('Task marked as done');
  };

  const handleSnooze = (taskId: string, days: number) => {
    const d = new Date('2026-02-14');
    d.setDate(d.getDate() + days);
    dispatch({ type: 'TASK_SNOOZE', payload: { id: taskId, newDate: d.toISOString().split('T')[0] } });
    toast.success(`Task snoozed ${days} day(s)`);
  };

  const handleDelete = (taskId: string) => {
    dispatch({ type: 'TASK_DELETE', payload: taskId });
    if (selectedTaskId === taskId) setSelectedTaskId(null);
    toast.success('Task deleted');
  };

  const handleBulkMarkDone = () => {
    dispatch({ type: 'TASK_BULK_MARK_DONE', payload: selectedTasks });
    toast.success(`${selectedTasks.length} tasks marked as done`);
    setSelectedTasks([]);
  };

  const handleBulkDelete = () => {
    dispatch({ type: 'TASK_BULK_DELETE', payload: selectedTasks });
    toast.success(`${selectedTasks.length} tasks deleted`);
    setSelectedTasks([]);
  };

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]);
  };

  const stats = {
    total: state.tasks.length,
    todo: state.tasks.filter(t => t.status === 'todo').length,
    inprogress: state.tasks.filter(t => t.status === 'inprogress').length,
    done: state.tasks.filter(t => t.status === 'done').length,
    overdue: state.tasks.filter(t => t.overdue).length,
    blocked: state.tasks.filter(t => t.blocked).length,
  };

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="sticky top-16 z-30 bg-white border-b border-neutral-200 px-4 lg:px-8 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Tasks</h1>
            <p className="text-sm text-neutral-600 mt-1">{stats.total} tasks · {stats.overdue} overdue · {stats.blocked} blocked</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />Create Task
          </Button>
        </div>
      </div>

      <div className="px-4 lg:px-8">
        {/* Stat chips */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge variant="outline" className="py-1.5 px-3 cursor-pointer" onClick={() => setStatusFilter('all')}>All ({stats.total})</Badge>
          <Badge variant="outline" className="py-1.5 px-3 cursor-pointer" onClick={() => setStatusFilter('todo')}>To Do ({stats.todo})</Badge>
          <Badge variant="outline" className="py-1.5 px-3 cursor-pointer bg-blue-50" onClick={() => setStatusFilter('inprogress')}>In Progress ({stats.inprogress})</Badge>
          <Badge variant="outline" className="py-1.5 px-3 cursor-pointer bg-green-50" onClick={() => setStatusFilter('done')}>Done ({stats.done})</Badge>
          <Badge variant="outline" className="py-1.5 px-3 cursor-pointer bg-red-50 text-red-700" onClick={() => setStatusFilter('overdue')}>Overdue ({stats.overdue})</Badge>
          <Badge variant="outline" className="py-1.5 px-3 cursor-pointer bg-orange-50 text-orange-700" onClick={() => setStatusFilter('blocked')}>Blocked ({stats.blocked})</Badge>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="irrigation">Irrigation</SelectItem>
              <SelectItem value="fertilization">Fertilization</SelectItem>
              <SelectItem value="spray">Spray</SelectItem>
              <SelectItem value="scout">Scout</SelectItem>
              <SelectItem value="harvest">Harvest</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="planting">Planting</SelectItem>
            </SelectContent>
          </Select>
          <Select value={fieldFilter} onValueChange={setFieldFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="All Fields" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fields</SelectItem>
              {uniqueFields.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Bulk actions */}
        {selectedTasks.length > 0 && (
          <Card className="mb-6 border-neutral-900 bg-neutral-50">
            <CardContent className="py-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{selectedTasks.length} selected</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleBulkMarkDone}>
                    <CheckCircle2 className="h-4 w-4 mr-1" />Mark done
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600" onClick={handleBulkDelete}>
                    <Trash2 className="h-4 w-4 mr-1" />Delete
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setSelectedTasks([])}>Clear</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Task list grouped by date */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            <Target className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
            <p className="text-lg font-medium">No tasks match your filters</p>
            <p className="text-sm mt-2">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map(([date, tasks]) => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-neutral-500" />
                  <h3 className="font-semibold text-neutral-700">{date}</h3>
                  <Badge variant="outline" className="text-xs">{tasks.length}</Badge>
                </div>
                <div className="space-y-2">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${task.status === 'done' ? 'bg-green-50 border-green-200 opacity-70' : selectedTasks.includes(task.id) ? 'border-green-600 bg-green-50' : 'border-neutral-200 bg-white hover:border-neutral-300'}`}
                    >
                      <Checkbox
                        checked={selectedTasks.includes(task.id) || task.status === 'done'}
                        onCheckedChange={() => task.status !== 'done' && toggleTaskSelection(task.id)}
                        className="h-5 w-5"
                      />
                      <div className="flex-1 min-w-0" onClick={() => setSelectedTaskId(task.id)}>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(task.category)}
                          <span className={`font-medium ${task.status === 'done' ? 'line-through text-neutral-400' : ''}`}>{task.title}</span>
                        </div>
                        <p className="text-sm text-neutral-600 mt-0.5">{task.field}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {task.window && <Badge variant="outline" className="text-xs">{task.window}</Badge>}
                        {getStatusBadge(task.status, task.overdue, task.blocked)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleMarkDone(task.id)}>Mark as done</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleSnooze(task.id, 1)}>Snooze 1 day</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSnooze(task.id, 3)}>Snooze 3 days</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSnooze(task.id, 7)}>Snooze 1 week</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(task.id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Task detail drawer */}
      <Sheet open={!!selectedTask} onOpenChange={() => setSelectedTaskId(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedTask && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  {getCategoryIcon(selectedTask.category)}
                  {selectedTask.title}
                </SheetTitle>
                <SheetDescription>{selectedTask.field}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(selectedTask.status, selectedTask.overdue, selectedTask.blocked)}
                  {selectedTask.window && <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{selectedTask.window}</Badge>}
                  <Badge variant="outline"><Calendar className="h-3 w-3 mr-1" />Due: {selectedTask.dueDate}</Badge>
                  <Badge variant="outline" className="capitalize">{selectedTask.category}</Badge>
                </div>

                {selectedTask.notes && (
                  <div>
                    <h4 className="font-semibold text-sm text-neutral-700 mb-1">Notes</h4>
                    <p className="text-sm text-neutral-600">{selectedTask.notes}</p>
                  </div>
                )}

                {selectedTask.blocked && selectedTask.blockReason && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-900">Blocked</h4>
                        <p className="text-sm text-red-800 mt-1">{selectedTask.blockReason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTask.movedReason && (
                  <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                    <h4 className="font-semibold text-blue-900 text-sm">Moved</h4>
                    <p className="text-sm text-blue-800 mt-1">{selectedTask.movedReason}</p>
                  </div>
                )}

                {selectedTask.createdFrom && (
                  <div className="text-sm text-neutral-600">
                    <span className="font-medium">Source:</span> {selectedTask.createdFrom}
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-4 border-t">
                  {selectedTask.status !== 'done' && (
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => { handleMarkDone(selectedTask.id); setSelectedTaskId(null); }}>
                      <CheckCircle2 className="h-4 w-4 mr-2" />Mark as done
                    </Button>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => { handleSnooze(selectedTask.id, 1); setSelectedTaskId(null); }}>
                      <Clock className="h-4 w-4 mr-2" />Snooze 1 day
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => { handleSnooze(selectedTask.id, 7); setSelectedTaskId(null); }}>
                      Snooze 1 week
                    </Button>
                  </div>
                  <Button variant="outline" className="text-red-600" onClick={() => { handleDelete(selectedTask.id); }}>
                    <Trash2 className="h-4 w-4 mr-2" />Delete task
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CreateTaskModal open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
