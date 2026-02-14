import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  ArrowLeft,
  Plus,
  Download,
  Droplet,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  Tag
} from 'lucide-react';
import { demoFields, demoTasks, demoNotes } from '../data/mockData';

export default function FieldDetail() {
  const { fieldId } = useParams();
  const field = demoFields.find(f => f.id === fieldId);
  const [newNote, setNewNote] = useState('');
  const [newTag, setNewTag] = useState('');

  if (!field) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Field not found</h1>
        <Button className="mt-4" asChild>
          <Link to="/dashboard/fields">Back to Fields</Link>
        </Button>
      </div>
    );
  }

  const fieldTasks = demoTasks.filter(t => t.fieldId === fieldId);
  const fieldNotes = demoNotes.filter(n => n.fieldId === fieldId);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'attention':
        return <Badge variant="destructive" className="bg-orange-100 text-orange-700 border-orange-200">Attention</Badge>;
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

  const nextActions = fieldTasks
    .filter(t => t.status !== 'done')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/dashboard/fields">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Fields
          </Link>
        </Button>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">{field.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-neutral-500" />
                <span className="text-sm text-neutral-600">{field.acreage} acres</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-neutral-600">{field.irrigationType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-neutral-500" />
                <span className="text-sm text-neutral-600">
                  Planted {new Date(field.plantingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              {getStatusBadge(field.status)}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export field log
            </Button>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid gap-4 sm:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-neutral-600">Crop</div>
            <div className="text-xl font-bold mt-1">{field.crop}</div>
            {field.variety && (
              <div className="text-xs text-neutral-500 mt-1">{field.variety}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-neutral-600">Growth Stage</div>
            <div className="text-xl font-bold mt-1">{field.stage}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-neutral-600">Active Tasks</div>
            <div className="text-xl font-bold mt-1">
              {fieldTasks.filter(t => t.status !== 'done').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-neutral-600">Overdue Tasks</div>
            <div className="text-xl font-bold mt-1 text-red-600">
              {field.overdueCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="context">Context</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Combine tasks and notes chronologically */}
                    {[...fieldTasks, ...fieldNotes.map(n => ({ ...n, type: 'note' }))]
                      .sort((a, b) => {
                        const dateA = 'timestamp' in a ? new Date(a.timestamp) : new Date(a.dueDate);
                        const dateB = 'timestamp' in b ? new Date(b.timestamp) : new Date(b.dueDate);
                        return dateB.getTime() - dateA.getTime();
                      })
                      .slice(0, 15)
                      .map((item, index) => {
                        if ('type' in item && item.type === 'note') {
                          return (
                            <div key={`note-${item.id}`} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                                </div>
                                {index < 14 && <div className="w-px flex-1 bg-neutral-200 mt-2" />}
                              </div>
                              <div className="flex-1 pb-6">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-neutral-500">
                                    {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                  </span>
                                  {item.tags && item.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <p className="text-sm">{item.content}</p>
                                {item.author && (
                                  <p className="text-xs text-neutral-500 mt-1">by {item.author}</p>
                                )}
                              </div>
                            </div>
                          );
                        } else {
                          const task = item as typeof demoTasks[0];
                          return (
                            <div key={`task-${task.id}`} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                  task.status === 'done' ? 'bg-green-100' : task.overdue ? 'bg-red-100' : 'bg-neutral-100'
                                }`}>
                                  {task.status === 'done' ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Clock className="h-4 w-4 text-neutral-600" />
                                  )}
                                </div>
                                {index < 14 && <div className="w-px flex-1 bg-neutral-200 mt-2" />}
                              </div>
                              <div className="flex-1 pb-6">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-neutral-500">
                                    {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                  </span>
                                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                                    {task.category}
                                  </Badge>
                                  {task.status === 'done' && (
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs px-1.5 py-0">
                                      Done
                                    </Badge>
                                  )}
                                  {task.overdue && task.status !== 'done' && (
                                    <Badge variant="destructive" className="text-xs px-1.5 py-0">
                                      Overdue
                                    </Badge>
                                  )}
                                </div>
                                <p className="font-medium text-sm">{task.title}</p>
                                {task.notes && (
                                  <p className="text-sm text-neutral-600 mt-1">{task.notes}</p>
                                )}
                              </div>
                            </div>
                          );
                        }
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>All Tasks</CardTitle>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add task
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Due</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fieldTasks.map(task => (
                        <TableRow key={task.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{task.title}</div>
                              {task.notes && (
                                <div className="text-xs text-neutral-500 mt-0.5">{task.notes}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm capitalize">{task.category}</TableCell>
                          <TableCell className="text-sm">
                            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {task.status === 'done' && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Done</Badge>
                              )}
                              {task.status === 'inprogress' && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>
                              )}
                              {task.status === 'todo' && !task.overdue && (
                                <Badge variant="outline">To Do</Badge>
                              )}
                              {task.overdue && task.status !== 'done' && (
                                <Badge variant="destructive">Overdue</Badge>
                              )}
                              {task.blocked && (
                                <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">Blocked</Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Field Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add Note Form */}
                  <div className="mb-6 space-y-3">
                    <Textarea
                      placeholder="Add a note about this field..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add tags (comma separated)"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="flex-1"
                      />
                      <Button>Add Note</Button>
                    </div>
                  </div>

                  {/* Notes List */}
                  <div className="space-y-4">
                    {fieldNotes.map(note => (
                      <div key={note.id} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex gap-2">
                            {note.tags?.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-xs text-neutral-500">
                            {new Date(note.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm">{note.content}</p>
                        {note.author && (
                          <p className="text-xs text-neutral-500 mt-2">— {note.author}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="context" className="mt-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600">
                      Weather data integration coming soon. This will show current conditions, forecast, and impact on field operations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Operational Blockers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600">
                      Active blockers and constraints will be displayed here (wind advisories, equipment availability, crew scheduling, etc.)
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Rail - 1/3 width */}
        <div className="space-y-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-base">Next actions for this field</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nextActions.map(task => (
                  <div key={task.id} className="flex items-start gap-2 text-sm">
                    <div className="mt-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-neutral-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add task
              </Button>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Export field log
          </Button>
        </div>
      </div>
    </div>
  );
}
