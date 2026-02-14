import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2, AlertTriangle, FileSpreadsheet, Calendar, Database } from 'lucide-react';

interface DataFreshnessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DataFreshnessModal({ open, onOpenChange }: DataFreshnessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Data Freshness Details</DialogTitle>
          <DialogDescription>
            Last import information and data quality summary
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Import Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-neutral-50 rounded-lg p-4">
              <p className="text-xs text-neutral-600 mb-1">Last Import</p>
              <p className="text-lg font-semibold">2 hours ago</p>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4">
              <p className="text-xs text-neutral-600 mb-1">Rows Processed</p>
              <p className="text-lg font-semibold">48</p>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4">
              <p className="text-xs text-neutral-600 mb-1">Status</p>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Success
              </Badge>
            </div>
          </div>

          {/* Import Details */}
          <div className="border rounded-lg divide-y">
            <div className="p-4 flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <FileSpreadsheet className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">weekly-plan.xlsx</p>
                <p className="text-sm text-neutral-600">Imported from local file</p>
              </div>
              <Button variant="ghost" size="sm">View file</Button>
            </div>
            
            <div className="p-4 flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Import Timestamp</p>
                <p className="text-sm text-neutral-600">February 14, 2026 at 5:00 AM</p>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <Database className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Data Created</p>
                <p className="text-sm text-neutral-600">6 fields detected, 12 tasks created</p>
              </div>
            </div>
          </div>

          {/* Warnings */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-amber-900 mb-2">2 Warnings</p>
                <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                  <li>3 rows skipped due to missing required field (Field Name)</li>
                  <li>1 date format adjusted from MM/DD/YY to standard format</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              View mapping details
            </Button>
            <Button className="flex-1">
              Re-import with adjustments
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
