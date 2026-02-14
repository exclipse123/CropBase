import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Plus, CheckCircle2 } from 'lucide-react';
import { useApp, generateId } from '../store/AppContext';
import { toast } from 'sonner';
import type { Task } from '../data/mockData';

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultFieldId?: string;
}

export function CreateTaskModal({ open, onOpenChange, defaultFieldId }: CreateTaskModalProps) {
  const { state, dispatch } = useApp();
  const [title, setTitle] = useState('');
  const [fieldId, setFieldId] = useState(defaultFieldId || '');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('2026-02-14');
  const [window, setWindow] = useState('');
  const [priority, setPriority] = useState('medium');
  const [notes, setNotes] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);

  const resetForm = () => {
    setTitle('');
    setFieldId(defaultFieldId || '');
    setCategory('');
    setDueDate('2026-02-14');
    setWindow('');
    setPriority('medium');
    setNotes('');
    setTaskCreated(false);
  };

  const handleCreate = () => {
    if (!title || !fieldId || !category) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsCreating(true);
    const field = state.fields.find(f => f.id === fieldId);

    setTimeout(() => {
      const newTask: Task = {
        id: generateId('task'),
        title,
        fieldId,
        field: field?.name || '',
        category: category as Task['category'],
        dueDate,
        window: window ? window as Task['window'] : undefined,
        status: 'todo',
        priority: priority as Task['priority'],
        notes: notes || undefined,
        overdue: false,
      };

      dispatch({ type: 'TASK_CREATE', payload: newTask });
      dispatch({
        type: 'CHANGE_ADD',
        payload: {
          id: generateId('change'),
          type: 'updated',
          description: `New task created: "${title}" for ${field?.name}`,
          timestamp: new Date().toISOString(),
          fieldId,
          taskId: newTask.id,
        },
      });

      setIsCreating(false);
      setTaskCreated(true);
      toast.success('Task created', { description: `"${title}" added to ${field?.name}` });

      setTimeout(() => {
        resetForm();
        onOpenChange(false);
      }, 1200);
    }, 500);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) resetForm();
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Add a task to your operational plan</DialogDescription>
        </DialogHeader>

        {!taskCreated ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Task Title *</Label>
              <Input id="task-title" placeholder="e.g., Check irrigation pressure" value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Field *</Label>
                <Select value={fieldId} onValueChange={setFieldId}>
                  <SelectTrigger><SelectValue placeholder="Select field" /></SelectTrigger>
                  <SelectContent>
                    {state.fields.map(f => (
                      <SelectItem key={f.id} value={f.id}>{f.name} - {f.crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="irrigation">Irrigation</SelectItem>
                    <SelectItem value="fertilization">Fertilization</SelectItem>
                    <SelectItem value="spray">Spray</SelectItem>
                    <SelectItem value="scout">Scout</SelectItem>
                    <SelectItem value="harvest">Harvest</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="planting">Planting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Due Date *</Label>
                <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Time Window</Label>
                <Select value={window} onValueChange={setWindow}>
                  <SelectTrigger><SelectValue placeholder="Any time" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="night">Night</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Add any additional details..." rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Task created!</h3>
            <p className="text-sm text-neutral-600">The task has been added to your plan</p>
          </div>
        )}

        {!taskCreated && (
          <DialogFooter>
            <Button variant="outline" onClick={() => handleClose(false)} disabled={isCreating}>Cancel</Button>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? (
                <><div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Creating...</>
              ) : (
                <><Plus className="mr-2 h-4 w-4" />Create Task</>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
