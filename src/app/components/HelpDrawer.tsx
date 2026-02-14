import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from './ui/sheet';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { CheckCircle2, FileSpreadsheet, Link as LinkIcon, Mail } from 'lucide-react';

interface HelpDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const checklistItems = [
  { id: 1, label: 'Upload your first spreadsheet', completed: true },
  { id: 2, label: 'Map columns to fields and tasks', completed: true },
  { id: 3, label: 'View your Today Plan', completed: false },
  { id: 4, label: 'Export data as CSV', completed: false },
];

export function HelpDrawer({ open, onOpenChange }: HelpDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Help & Quick Start</SheetTitle>
          <SheetDescription>
            Get up and running with Cropbase in minutes
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Quick Start Checklist */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Quick Start Checklist</h3>
              <div className="space-y-3">
                {checklistItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <Checkbox checked={item.completed} disabled />
                    <span className={item.completed ? 'text-neutral-500 line-through' : ''}>
                      {item.label}
                    </span>
                    {item.completed && (
                      <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How Cropbase Works */}
          <div>
            <h3 className="font-semibold mb-3">How Cropbase works</h3>
            <div className="space-y-3 text-sm text-neutral-600">
              <p>
                <strong className="text-neutral-900">1. Keep using Excel:</strong> Continue working in your familiar spreadsheets. No need to change your workflow.
              </p>
              <p>
                <strong className="text-neutral-900">2. Upload & Map:</strong> Import your Excel files and map columns to field names, tasks, and dates.
              </p>
              <p>
                <strong className="text-neutral-900">3. Live Operations:</strong> View prioritized daily plans, track what changed, and reduce coordination overhead.
              </p>
              <p>
                <strong className="text-neutral-900">4. Export Anytime:</strong> Download filtered views back to CSV for sharing or archiving.
              </p>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Download spreadsheet template
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <LinkIcon className="mr-2 h-4 w-4" />
                Column mapping guide
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Contact support
              </Button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-green-800">
              Enable data freshness alerts to get notified when your imported data is more than 24 hours old.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
