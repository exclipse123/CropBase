import { useState } from 'react';
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

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function ExportModal({ 
  open, 
  onOpenChange, 
  title = 'Export Data', 
  description = 'Choose what to export' 
}: ExportModalProps) {
  const [format, setFormat] = useState('csv');
  const [scope, setScope] = useState('today');
  const [includeNotes, setIncludeNotes] = useState(true);
  const [includeHistory, setIncludeHistory] = useState(false);
  const [includeTags, setIncludeTags] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => {
        setExportComplete(false);
        onOpenChange(false);
      }, 2000);
    }, 1500);
  };

  const previewData = [
    { field: 'Field A', task: 'Check flood levels', due: '2026-02-14', status: 'To Do' },
    { field: 'Field C', task: 'Scout for aphids', due: '2026-02-14', status: 'To Do' },
    { field: 'Field E', task: 'Inspect bloom health', due: '2026-02-14', status: 'In Progress' },
    { field: 'Field B', task: 'Apply nitrogen fertilizer', due: '2026-02-14', status: 'Blocked' },
    { field: 'Field F', task: 'Adjust drip emitters', due: '2026-02-14', status: 'To Do' },
  ];

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
              <TabsTrigger value="preview">Preview (5 rows)</TabsTrigger>
            </TabsList>

            <TabsContent value="options" className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="export-scope">Scope</Label>
                  <Select value={scope} onValueChange={setScope}>
                    <SelectTrigger id="export-scope">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today Plan</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="filtered">Tasks (filtered)</SelectItem>
                      <SelectItem value="fields">Fields report</SelectItem>
                      <SelectItem value="worklog">Work log</SelectItem>
                      <SelectItem value="all">All tasks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="export-format">Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger id="export-format">
                      <SelectValue />
                    </SelectTrigger>
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
                    <Checkbox
                      id="include-notes"
                      checked={includeNotes}
                      onCheckedChange={(checked) => setIncludeNotes(checked as boolean)}
                    />
                    <Label htmlFor="include-notes" className="cursor-pointer font-normal text-sm">
                      Task notes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-history"
                      checked={includeHistory}
                      onCheckedChange={(checked) => setIncludeHistory(checked as boolean)}
                    />
                    <Label htmlFor="include-history" className="cursor-pointer font-normal text-sm">
                      Audit history
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-tags"
                      checked={includeTags}
                      onCheckedChange={(checked) => setIncludeTags(checked as boolean)}
                    />
                    <Label htmlFor="include-tags" className="cursor-pointer font-normal text-sm">
                      Tags & categories
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-metadata"
                      checked={includeMetadata}
                      onCheckedChange={(checked) => setIncludeMetadata(checked as boolean)}
                    />
                    <Label htmlFor="include-metadata" className="cursor-pointer font-normal text-sm">
                      Import metadata
                    </Label>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Share2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900 text-sm">Share Export (Optional)</p>
                    <p className="text-sm text-green-700 mt-1">
                      After export, you can generate a share link for crew members
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="py-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-neutral-50 border-b">
                      <tr>
                        <th className="text-left p-3 font-medium">Field</th>
                        <th className="text-left p-3 font-medium">Task</th>
                        <th className="text-left p-3 font-medium">Due Date</th>
                        <th className="text-left p-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {previewData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50">
                          <td className="p-3">{row.field}</td>
                          <td className="p-3">{row.task}</td>
                          <td className="p-3">{row.due}</td>
                          <td className="p-3">{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mt-3">
                Showing first 5 rows. Total rows to export: <strong>12</strong>
              </p>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="py-12 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Export complete!</h3>
            <p className="text-sm text-neutral-600">
              Your file is downloading now
            </p>
          </div>
        )}

        {!exportComplete && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isExporting}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={isExporting} className="bg-green-600 hover:bg-green-700">
              {isExporting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download {format.toUpperCase()}
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
