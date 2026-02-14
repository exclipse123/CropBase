import { EmptyState } from './EmptyState';
import { CheckCircle2, AlertCircle, Filter, FileSpreadsheet, WifiOff } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

// Collection of all empty states used in the app

export function NoTasksTodayState({ onCreateTask }: { onCreateTask?: () => void }) {
  return (
    <EmptyState
      icon={CheckCircle2}
      title="No tasks due today"
      description="Great! You're all caught up for today. Check tomorrow's plan or create a new task."
      action={onCreateTask ? {
        label: 'Create Task',
        onClick: onCreateTask
      } : undefined}
      variant="success"
    />
  );
}

export function NoOverdueTasksState() {
  return (
    <EmptyState
      icon={CheckCircle2}
      title="No overdue tasks"
      description="Excellent work! All tasks are on schedule."
      variant="success"
    />
  );
}

export function NoFilterResultsState({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState
      icon={Filter}
      title="No fields match your filters"
      description="Try adjusting your filters to see more results."
      action={onClearFilters ? {
        label: 'Clear All Filters',
        onClick: onClearFilters
      } : undefined}
    />
  );
}

export function ImportSuccessState({ rowCount }: { rowCount: number }) {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center py-8">
          <div className="rounded-full bg-green-100 p-4 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-green-900">Import Successful</h3>
          <p className="text-green-700 mb-4">
            Successfully processed {rowCount} rows with no errors
          </p>
          <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
            View Imported Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ImportWarningState({ rowCount, warnings }: { rowCount: number; warnings: string[] }) {
  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center py-8">
          <div className="rounded-full bg-amber-100 p-4 mb-4">
            <AlertCircle className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-amber-900">Import Completed with Warnings</h3>
          <p className="text-amber-700 mb-4">
            Processed {rowCount} rows, but {warnings.length} issues were found
          </p>
          <div className="bg-white rounded-lg p-4 mb-4 max-w-md">
            <ul className="text-left text-sm text-amber-900 space-y-2">
              {warnings.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
              Review Warnings
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Continue Anyway
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ImportErrorState({ error }: { error: string }) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center py-8">
          <div className="rounded-full bg-red-100 p-4 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-red-900">Import Failed</h3>
          <p className="text-red-700 mb-4 max-w-md">{error}</p>
          <div className="bg-white rounded-lg p-4 mb-4 max-w-md">
            <p className="text-sm text-neutral-700 text-left">
              <strong>Common solutions:</strong>
            </p>
            <ul className="text-left text-sm text-neutral-600 space-y-1 mt-2 list-disc list-inside">
              <li>Ensure all required columns are present (Field Name, Task, Due Date)</li>
              <li>Check date formats are consistent (YYYY-MM-DD or MM/DD/YYYY)</li>
              <li>Remove any merged cells or complex formatting</li>
              <li>Save as .xlsx or .csv format</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Download Template
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Try Again
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function OfflineState() {
  return (
    <Card className="border-neutral-200 bg-neutral-50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center py-8">
          <div className="rounded-full bg-neutral-100 p-4 mb-4">
            <WifiOff className="h-8 w-8 text-neutral-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Connection Lost</h3>
          <p className="text-neutral-600 mb-4 max-w-md">
            You're currently offline. Some features may be limited until connection is restored.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry Connection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
