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

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fieldId?: string;
}

export function CreateTaskModal({ open, onOpenChange, fieldId }: CreateTaskModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
    // Simulate task creation
    setTimeout(() => {
      setIsCreating(false);
      setTaskCreated(true);
      setTimeout(() => {
        setTaskCreated(false);
        onOpenChange(false);
      }, 1500);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Add a task to your operational plan</DialogDescription>
        </DialogHeader>

        {!taskCreated ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Task Title *</Label>
              <Input
                id="task-title"
                placeholder="e.g., Check irrigation pressure"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="task-field">Field *</Label>
                <Select defaultValue={fieldId || ''}>
                  <SelectTrigger id="task-field">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="field-a">Field A - Rice</SelectItem>
                    <SelectItem value="field-b">Field B - Corn</SelectItem>
                    <SelectItem value="field-c">Field C - Tomatoes</SelectItem>
                    <SelectItem value="field-d">Field D - Alfalfa</SelectItem>
                    <SelectItem value="field-e">Field E - Orchards</SelectItem>
                    <SelectItem value="field-f">Field F - Wheat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-category">Category *</Label>
                <Select>
                  <SelectTrigger id="task-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
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
                <Label htmlFor="task-due">Due Date *</Label>
                <Input
                  id="task-due"
                  type="date"
                  defaultValue="2026-02-14"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-window">Time Window</Label>
                <Select>
                  <SelectTrigger id="task-window">
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="night">Night</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-priority">Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="task-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-notes">Notes</Label>
              <Textarea
                id="task-notes"
                placeholder="Add any additional details..."
                rows={3}
              />
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Task created!</h3>
            <p className="text-sm text-neutral-600">
              The task has been added to your plan
            </p>
          </div>
        )}

        {!taskCreated && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isCreating}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Task
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
