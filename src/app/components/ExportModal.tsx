import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Download, CheckCircle2, Share2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { toast } from 'sonner';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function ExportModal({ open, onOpenChange, title = 'Export Data', description = 'Choose what to export' }: ExportModalProps) {
  const { state, exportCSV } = useApp();
  const [format, setFormat] = useState('csv');
  const [scope, setScope] = useState('today');
  const [includeNotes, setIncludeNotes] = useState(true);
  const [includeHistory, setIncludeHistory] = useState(false);
  const [includeTags, setIncludeTags] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const scopeData = useMemo(() => {
    switch (scope) {
      case 'today':
        return state.tasks.filter(t => t.dueDate === '2026-02-14' && t.status !== 'done');
      case 'week':
        return state.tasks.filter(t => new Date(t.dueDate) <= new Date('2026-02-20'));
      case 'fields':
        return state.fields as unknown as typeof state.tasks;
      case 'all':
      default:
        return state.tasks;
    }
  }, [scope, state.tasks, state.fields]);

  const previewRows = useMemo(() => {
    if (scope === 'fields') {
      return state.fields.slice(0, 5).map(f => ({
        Field: f.name,
        Crop: f.crop,
        Stage: f.stage,
        Acreage: f.acreage,
        Status: f.status,
      }));
    }
    const tasks = scope === 'today'
      ? state.tasks.filter(t => t.dueDate === '2026-02-14' && t.status !== 'done')
      : scope === 'week'
        ? state.tasks.filter(t => new Date(t.dueDate) <= new Date('2026-02-20'))
        : state.tasks;
    return tasks.slice(0, 5).map(t => ({
      Field: t.field,
      Task: t.title,
      'Due Date': t.dueDate,
      Status: t.status,
      ...(includeNotes ? { Notes: t.notes || '' } : {}),
      ...(includeTags ? { Category: t.category } : {}),
    }));
  }, [scope, state.tasks, state.fields, includeNotes, includeTags]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      let data: Record<string, unknown>[];
      let filename: string;

      if (scope === 'fields') {
        data = state.fields.map(f => ({
          Field: f.name, Crop: f.crop, Stage: f.stage, Acreage: f.acreage,
          Irrigation: f.irrigationType, 'Overdue Count': f.overdueCount, Status: f.status,
        }));
        filename = 'cropbase-fields-export.csv';
      } else {
        const tasks = scope === 'today'
          ? state.tasks.filter(t => t.dueDate === '2026-02-14')
          : scope === 'week'
            ? state.tasks.filter(t => new Date(t.dueDate) <= new Date('2026-02-20'))
            : state.tasks;
        data = tasks.map(t => ({
          Field: t.field, Task: t.title, Category: t.category, 'Due Date': t.dueDate,
          Window: t.window || '', Status: t.status, Priority: t.priority,
          ...(includeNotes ? { Notes: t.notes || '' } : {}),
          ...(includeMetadata ? { 'Created From': t.createdFrom || '' } : {}),
        }));
        filename = `cropbase-${scope}-export.csv`;
      }

      if (format === 'csv') {
        exportCSV(data, filename);
      }

      setIsExporting(false);
      setExportComplete(true);
      toast.success('Export complete', { description: `${data.length} rows exported as ${format.toUpperCase()}` });
      setTimeout(() => {
        setExportComplete(false);
        onOpenChange(false);
      }, 1500);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {!exportComplete ? (
          <Tabs defaultValue="options" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="options">Export Options</TabsTrigger>
              <TabsTrigger value="preview">Preview ({Math.min(previewRows.length, 5)} rows)</TabsTrigger>
            </TabsList>

            <TabsContent value="options" className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Scope</Label>
                  <Select value={scope} onValueChange={setScope}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today Plan</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="fields">Fields report</SelectItem>
                      <SelectItem value="all">All tasks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV (Excel compatible)</SelectItem>
                      <SelectItem value="pdf">PDF (read-only)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Include Columns</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inc-notes" checked={includeNotes} onCheckedChange={(c) => setIncludeNotes(c as boolean)} />
                    <Label htmlFor="inc-notes" className="cursor-pointer font-normal text-sm">Task notes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inc-history" checked={includeHistory} onCheckedChange={(c) => setIncludeHistory(c as boolean)} />
                    <Label htmlFor="inc-history" className="cursor-pointer font-normal text-sm">Audit history</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inc-tags" checked={includeTags} onCheckedChange={(c) => setIncludeTags(c as boolean)} />
                    <Label htmlFor="inc-tags" className="cursor-pointer font-normal text-sm">Tags & categories</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inc-meta" checked={includeMetadata} onCheckedChange={(c) => setIncludeMetadata(c as boolean)} />
                    <Label htmlFor="inc-meta" className="cursor-pointer font-normal text-sm">Import metadata</Label>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 border rounded-lg p-4 text-sm text-neutral-600">
                <strong>{scopeData.length}</strong> rows will be exported
              </div>
            </TabsContent>

            <TabsContent value="preview" className="py-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-neutral-50 border-b">
                      <tr>
                        {previewRows.length > 0 && Object.keys(previewRows[0]).map(key => (
                          <th key={key} className="text-left p-3 font-medium">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {previewRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50">
                          {Object.values(row).map((val, i) => (
                            <td key={i} className="p-3">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mt-3">
                Showing first {previewRows.length} rows. Total: <strong>{scopeData.length}</strong>
              </p>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="py-12 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Export complete!</h3>
            <p className="text-sm text-neutral-600">Your file has been downloaded</p>
          </div>
        )}

        {!exportComplete && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isExporting}>Cancel</Button>
            <Button onClick={handleExport} disabled={isExporting} className="bg-green-600 hover:bg-green-700">
              {isExporting ? (
                <><div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Exporting...</>
              ) : (
                <><Download className="mr-2 h-4 w-4" />Download {format.toUpperCase()}</>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
