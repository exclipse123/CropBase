import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  ArrowLeft, CheckCircle2, AlertTriangle, Eye, Sprout, Plus, Clock,
  Download, FileText, Leaf, Wind, Target, Wrench, MoreVertical, Droplet, Calendar, Trash2,
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { useApp, generateId } from '../store/AppContext';
import { CreateTaskModal } from '../components/CreateTaskModal';
import { toast } from 'sonner';

export default function FieldDetail() {
  const { fieldId } = useParams();
  const { state, dispatch, exportCSV } = useApp();
  const [noteText, setNoteText] = useState('');
  const [createTaskOpen, setCreateTaskOpen] = useState(false);

  const field = state.fields.find(f => f.id === fieldId);
  const fieldTasks = useMemo(() => state.tasks.filter(t => t.fieldId === fieldId), [state.tasks, fieldId]);
  const fieldNotes = useMemo(() => state.notes.filter(n => n.fieldId === fieldId), [state.notes, fieldId]);
  const fieldChanges = useMemo(() => state.changes.filter(c => c.fieldId === fieldId), [state.changes, fieldId]);

  const activeTasks = useMemo(() => fieldTasks.filter(t => t.status !== 'done'), [fieldTasks]);

  if (!field) {
    return (
      <div className="px-4 lg:px-8 py-16 text-center">
        <Sprout className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
        <h2 className="text-xl font-bold">Field not found</h2>
        <p className="text-neutral-600 mt-2 mb-4">The field you're looking for doesn't exist.</p>
        <Link to="/app/fields"><Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" />Back to Fields</Button></Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal': return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle2 className="h-3 w-3 mr-1" />Normal</Badge>;
      case 'attention': return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><AlertTriangle className="h-3 w-3 mr-1" />Attention</Badge>;
      case 'blocked': return <Badge className="bg-red-100 text-red-700 border-red-200"><AlertTriangle className="h-3 w-3 mr-1" />Blocked</Badge>;
      case 'overdue': return <Badge variant="destructive">Overdue</Badge>;
      case 'watch': return <Badge className="bg-orange-100 text-orange-700 border-orange-200"><Eye className="h-3 w-3 mr-1" />Watch</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

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

  const formatTimestamp = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    dispatch({
      type: 'NOTE_ADD',
      payload: {
        id: generateId('note'),
        fieldId: field.id,
        content: noteText.trim(),
        timestamp: new Date().toISOString(),
        author: 'You',
      },
    });
    setNoteText('');
    toast.success('Note added');
  };

  const handleDeleteNote = (noteId: string) => {
    dispatch({ type: 'NOTE_DELETE', payload: noteId });
    toast.success('Note deleted');
  };

  const handleMarkDone = (taskId: string) => {
    dispatch({ type: 'TASK_MARK_DONE', payload: taskId });
    toast.success('Task marked as done');
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch({ type: 'TASK_DELETE', payload: taskId });
    toast.success('Task deleted');
  };

  const handleExportFieldLog = () => {
    const log = [
      ...fieldTasks.map(t => ({ Type: 'Task', Timestamp: t.dueDate, Description: t.title, Status: t.status, Category: t.category })),
      ...fieldNotes.map(n => ({ Type: 'Note', Timestamp: n.timestamp, Description: n.content, Status: '-', Category: '-' })),
      ...fieldChanges.map(c => ({ Type: 'Change', Timestamp: c.timestamp, Description: c.description, Status: '-', Category: c.type })),
    ].sort((a, b) => b.Timestamp.localeCompare(a.Timestamp));

    exportCSV(log, `cropbase-${field.name.toLowerCase().replace(/\s+/g, '-')}-log.csv`);
    toast.success(`${field.name} log exported`);
  };

  return (
    <div className="pb-8">
      <div className="sticky top-16 z-30 bg-white border-b border-neutral-200 px-4 lg:px-8 py-4 mb-6">
        <div className="flex items-center gap-4 mb-3">
          <Link to="/app/fields"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Back</Button></Link>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{field.name}</h1>
              {getStatusBadge(field.status)}
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600">
              <span className="flex items-center gap-1"><Sprout className="h-4 w-4" />{field.crop}{field.variety ? ` (${field.variety})` : ''}</span>
              <span>{field.acreage} ac</span>
              <span>{field.stage}</span>
              <span>{field.irrigationType}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportFieldLog}>
              <Download className="h-4 w-4 mr-2" />Export Log
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" size="sm" onClick={() => setCreateTaskOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />Add Task
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="timeline">
              <TabsList>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="tasks">Tasks ({fieldTasks.length})</TabsTrigger>
                <TabsTrigger value="notes">Notes ({fieldNotes.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="mt-4">
                <div className="space-y-4">
                  {fieldChanges.length === 0 && fieldTasks.length === 0 && fieldNotes.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                      <FileText className="h-10 w-10 mx-auto mb-3 text-neutral-300" />
                      <p className="font-medium">No activity yet</p>
                    </div>
                  ) : (
                    <>
                      {fieldChanges.map(change => (
                        <div key={change.id} className="flex items-start gap-3 rounded-lg border border-neutral-200 p-4">
                          <div className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center ${change.type === 'blocked' || change.type === 'overdue' ? 'bg-red-100' : change.type === 'imported' ? 'bg-blue-100' : 'bg-neutral-100'}`}>
                            {change.type === 'blocked' || change.type === 'overdue' ? <AlertTriangle className="h-4 w-4 text-red-600" /> : <FileText className="h-4 w-4 text-blue-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{change.description}</p>
                            <p className="text-sm text-neutral-500 mt-1">{formatTimestamp(change.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                      {fieldTasks.filter(t => t.status === 'done').map(task => (
                        <div key={task.id} className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-900">{task.title}</p>
                            <p className="text-sm text-green-700 mt-1">Completed · {task.dueDate}</p>
                          </div>
                        </div>
                      ))}
                      {fieldNotes.map(note => (
                        <div key={note.id} className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-yellow-50 p-4">
                          <FileText className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm">{note.content}</p>
                            <p className="text-xs text-neutral-500 mt-2">{note.author ?? 'Unknown'} · {formatTimestamp(note.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="mt-4">
                <div className="space-y-3">
                  {fieldTasks.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                      <Target className="h-10 w-10 mx-auto mb-3 text-neutral-300" />
                      <p className="font-medium">No tasks for this field</p>
                      <Button variant="outline" size="sm" className="mt-3" onClick={() => setCreateTaskOpen(true)}>
                        <Plus className="h-4 w-4 mr-1" />Create task
                      </Button>
                    </div>
                  ) : (
                    fieldTasks.map(task => (
                      <div key={task.id} className={`flex items-center gap-3 rounded-lg border p-4 ${task.status === 'done' ? 'bg-green-50 border-green-200 opacity-70' : 'border-neutral-200 bg-white hover:border-neutral-300'}`}>
                        <div>{getCategoryIcon(task.category)}</div>
                        <div className="flex-1 min-w-0">
                          <span className={`font-medium ${task.status === 'done' ? 'line-through text-neutral-400' : ''}`}>{task.title}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs"><Calendar className="h-3 w-3 mr-1" />{task.dueDate}</Badge>
                            {task.window && <Badge variant="outline" className="text-xs"><Clock className="h-3 w-3 mr-1" />{task.window}</Badge>}
                            {task.overdue && <Badge variant="destructive" className="text-xs">Overdue</Badge>}
                            {task.blocked && <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">Blocked</Badge>}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {task.status !== 'done' && <DropdownMenuItem onClick={() => handleMarkDone(task.id)}>Mark as done</DropdownMenuItem>}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTask(task.id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <div className="mb-4">
                  <Textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add a note about this field..." className="min-h-[80px]" />
                  <div className="flex justify-end mt-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleAddNote} disabled={!noteText.trim()}>
                      <Plus className="h-4 w-4 mr-1" />Add Note
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {fieldNotes.length === 0 ? (
                    <div className="text-center py-8 text-neutral-500">
                      <FileText className="h-10 w-10 mx-auto mb-3 text-neutral-300" />
                      <p className="font-medium">No notes yet</p>
                      <p className="text-sm mt-1">Add observations, reminders, or context above</p>
                    </div>
                  ) : (
                    fieldNotes.map(note => (
                      <div key={note.id} className="rounded-lg border border-neutral-200 bg-white p-4">
                        <div className="flex justify-between items-start">
                          <p className="text-sm flex-1">{note.content}</p>
                          <Button variant="ghost" size="icon" className="h-7 w-7 ml-2 text-neutral-400 hover:text-red-600" onClick={() => handleDeleteNote(note.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <p className="text-xs text-neutral-500 mt-2">{note.author ?? 'Unknown'} · {formatTimestamp(note.timestamp)}</p>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right rail */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Field Info</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between"><span className="text-sm text-neutral-600">Crop</span><span className="font-medium flex items-center gap-1"><Sprout className="h-4 w-4 text-green-600" />{field.crop}</span></div>
                {field.variety && <div className="flex justify-between"><span className="text-sm text-neutral-600">Variety</span><span className="font-medium">{field.variety}</span></div>}
                <div className="flex justify-between"><span className="text-sm text-neutral-600">Acreage</span><span className="font-medium">{field.acreage} ac</span></div>
                <div className="flex justify-between"><span className="text-sm text-neutral-600">Stage</span><span className="font-medium">{field.stage}</span></div>
                <div className="flex justify-between"><span className="text-sm text-neutral-600">Irrigation</span><span className="font-medium">{field.irrigationType}</span></div>
                <div className="flex justify-between"><span className="text-sm text-neutral-600">Planted</span><span className="font-medium">{field.plantingDate}</span></div>
                <div className="flex justify-between"><span className="text-sm text-neutral-600">Status</span>{getStatusBadge(field.status)}</div>
                <div className="flex justify-between"><span className="text-sm text-neutral-600">Active tasks</span><span className="font-medium">{activeTasks.length}</span></div>
                <div className="flex justify-between"><span className="text-sm text-neutral-600">Overdue tasks</span><span className={`font-medium ${field.overdueCount > 0 ? 'text-red-600' : 'text-neutral-400'}`}>{field.overdueCount}</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm" onClick={() => setCreateTaskOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />New Task
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm" onClick={handleExportFieldLog}>
                  <Download className="h-4 w-4 mr-2" />Export Field Log
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <CreateTaskModal open={createTaskOpen} onOpenChange={setCreateTaskOpen} defaultFieldId={field.id} />
    </div>
  );
}
