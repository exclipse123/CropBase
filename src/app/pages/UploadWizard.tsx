import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import {
  Upload, FileSpreadsheet, CheckCircle2, ArrowRight, ArrowLeft, Loader2,
  X, Table2, Sparkles, LayoutDashboard, ListTodo, Calendar, ChevronRight,
  AlertCircle, FileUp, Columns3, Wand2,
} from 'lucide-react';
import { useApp, generateId } from '../store/AppContext';
import type { MappingTemplate } from '../store/AppContext';
import { toast } from 'sonner';

// Simulated data that we "detect" from any uploaded file
const SIMULATED_ROWS = [
  { field: 'Field A', task: 'Check flood levels', category: 'irrigation', priority: 'high', dueDate: '2026-02-14' },
  { field: 'Field B', task: 'Apply nitrogen fertilizer', category: 'fertilization', priority: 'high', dueDate: '2026-02-14' },
  { field: 'Field C', task: 'Scout for aphids', category: 'scout', priority: 'medium', dueDate: '2026-02-14' },
  { field: 'Field D', task: 'Cut hay - first pass', category: 'harvest', priority: 'critical', dueDate: '2026-02-12' },
  { field: 'Field E', task: 'Inspect bloom health', category: 'scout', priority: 'medium', dueDate: '2026-02-14' },
  { field: 'Field F', task: 'Adjust drip emitters', category: 'irrigation', priority: 'medium', dueDate: '2026-02-14' },
  { field: 'Field C', task: 'Spray fungicide', category: 'spray', priority: 'high', dueDate: '2026-02-15' },
  { field: 'Field D', task: 'Service pivot motor', category: 'maintenance', priority: 'medium', dueDate: '2026-02-18' },
];

const SIMULATED_COLUMNS = ['field', 'task', 'category', 'priority', 'dueDate', 'notes', 'assignee'];
const CROPBASE_COLUMNS = ['Field Name', 'Task Title', 'Category', 'Priority', 'Due Date', 'Notes', 'Assignee'];

type Step = 'upload' | 'preview' | 'mapping' | 'processing' | 'success';

export default function UploadWizard() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [mappings, setMappings] = useState<Record<string, string>>({
    field: 'Field Name',
    task: 'Task Title',
    category: 'Category',
    priority: 'Priority',
    dueDate: 'Due Date',
    notes: 'Notes',
    assignee: 'Assignee',
  });
  const [saveTemplate, setSaveTemplate] = useState(true);
  const [importResult, setImportResult] = useState({ tasks: 0, fields: 0 });

  // ── Drag & Drop handlers ─────────────────────────────────────
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) acceptFile(dropped);
  }, []);

  const acceptFile = (f: File) => {
    setFile(f);
    // Simulate "parsing" animation then move to preview
    setStep('preview');
    setParseProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 25 + 10;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
      }
      setParseProgress(Math.min(p, 100));
    }, 200);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) acceptFile(selected);
  };

  // ── Process / Import (simulated) ─────────────────────────────
  const handleImport = () => {
    setStep('processing');
    setParseProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        // Create simulated tasks
        const fieldMap: Record<string, string> = {};
        state.fields.forEach(f => { fieldMap[f.name] = f.id; });
        const newTasks = SIMULATED_ROWS.map(row => ({
          id: generateId('task'),
          title: row.task,
          fieldId: fieldMap[row.field] || 'field-a',
          field: row.field,
          category: row.category as any,
          dueDate: row.dueDate,
          status: 'todo' as const,
          priority: row.priority as any,
          overdue: false,
          blocked: false,
          createdFrom: file?.name || 'upload',
        }));

        newTasks.forEach(t => dispatch({ type: 'TASK_CREATE', payload: t }));

        // Add import record
        dispatch({
          type: 'IMPORT_ADD',
          payload: {
            id: generateId('import'),
            fileName: file?.name || 'uploaded-file.csv',
            uploadedTime: new Date().toISOString(),
            rowsParsed: SIMULATED_ROWS.length + Math.floor(Math.random() * 10),
            fieldsDetected: new Set(SIMULATED_ROWS.map(r => r.field)).size,
            tasksCreated: newTasks.length,
            status: 'success',
          },
        });

        // Add change log entry
        dispatch({
          type: 'CHANGE_ADD',
          payload: {
            id: generateId('change'),
            type: 'imported',
            description: `Imported ${newTasks.length} tasks from ${file?.name || 'spreadsheet'}`,
            timestamp: new Date().toISOString(),
          },
        });

        dispatch({ type: 'UPDATE_LAST_IMPORT_TIME', payload: new Date().toISOString() });

        // Save mapping template if opted in
        if (saveTemplate) {
          const template: MappingTemplate = {
            id: generateId('template'),
            name: `${file?.name || 'Upload'} template`,
            created: new Date().toISOString().split('T')[0],
            lastUsed: new Date().toISOString().split('T')[0],
            source: file?.name,
            columns: SIMULATED_COLUMNS,
          };
          dispatch({ type: 'MAPPING_TEMPLATE_ADD', payload: template });
        }

        setImportResult({ tasks: newTasks.length, fields: new Set(SIMULATED_ROWS.map(r => r.field)).size });
        setStep('success');
        toast.success(`Successfully imported ${newTasks.length} tasks!`);
      }
      setParseProgress(Math.min(p, 100));
    }, 250);
  };

  // ── Step indicator ───────────────────────────────────────────
  const steps: { key: Step; label: string }[] = [
    { key: 'upload', label: 'Upload' },
    { key: 'preview', label: 'Preview' },
    { key: 'mapping', label: 'Mapping' },
    { key: 'success', label: 'Done' },
  ];
  const activeIdx = step === 'processing' ? 2.5 : steps.findIndex(s => s.key === step);

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="sticky top-16 z-30 bg-white border-b border-neutral-200 px-4 lg:px-8 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Import Data</h1>
            <p className="text-sm text-neutral-600 mt-1">Upload a spreadsheet to populate your dashboard</p>
          </div>
          {step !== 'success' && (
            <Button variant="ghost" onClick={() => navigate('/app')}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="px-4 lg:px-8 max-w-3xl mx-auto">
        {/* Step Progress */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i < activeIdx ? 'bg-green-600 text-white' :
                  i === Math.floor(activeIdx) ? 'bg-green-600 text-white ring-4 ring-green-100' :
                  'bg-neutral-100 text-neutral-400'
                }`}>
                  {i < activeIdx ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                </div>
                <span className={`text-xs mt-1.5 font-medium ${i <= activeIdx ? 'text-green-700' : 'text-neutral-400'}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 sm:w-24 h-0.5 mx-2 mt-[-18px] ${i < activeIdx ? 'bg-green-500' : 'bg-neutral-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* ─── STEP: Upload ──────────────────────────────────── */}
        {step === 'upload' && (
          <div className="space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-green-500 bg-green-50 scale-[1.01]'
                  : 'border-neutral-300 hover:border-green-400 hover:bg-green-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls,.tsv,.json"
                className="hidden"
                onChange={handleFileSelect}
              />
              <div className="h-16 w-16 mx-auto rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                <FileUp className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-lg font-semibold text-neutral-800">Drag & drop your spreadsheet here</p>
              <p className="text-sm text-neutral-500 mt-2 mb-4">or click to browse files</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['.CSV', '.XLSX', '.XLS', '.TSV', '.JSON'].map(ext => (
                  <Badge key={ext} variant="secondary" className="text-xs">{ext}</Badge>
                ))}
              </div>
            </div>

            {/* Saved templates */}
            {state.mappingTemplates.length > 0 && (
              <Card>
                <CardContent className="pt-4 pb-3">
                  <p className="text-sm font-medium text-neutral-700 mb-2">Saved Templates</p>
                  <div className="space-y-2">
                    {state.mappingTemplates.map(t => (
                      <div key={t.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-neutral-400" />
                          <span className="text-sm">{t.name}</span>
                          {t.source && <Badge variant="outline" className="text-xs">{t.source}</Badge>}
                        </div>
                        <span className="text-xs text-neutral-400">Used {t.lastUsed}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Any format works</p>
                <p className="text-xs text-blue-600 mt-0.5">Cropbase uses AI to auto-detect columns and map your data. Just upload and we'll handle the rest.</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP: Preview ─────────────────────────────────── */}
        {step === 'preview' && (
          <div className="space-y-6">
            {/* File info card */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{file?.name}</p>
                    <p className="text-xs text-neutral-500">{file ? `${(file.size / 1024).toFixed(1)} KB` : ''}</p>
                  </div>
                  {parseProgress < 100 ? (
                    <Badge className="bg-yellow-100 text-yellow-700">Parsing…</Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-700">Ready</Badge>
                  )}
                </div>
                {parseProgress < 100 && (
                  <div className="mt-3">
                    <Progress value={parseProgress} className="h-1.5" />
                    <p className="text-xs text-neutral-400 mt-1">Analyzing file structure…</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Simulated data preview */}
            {parseProgress >= 100 && (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Auto-detected {SIMULATED_ROWS.length} rows across {new Set(SIMULATED_ROWS.map(r => r.field)).size} fields</span>
                </div>

                <div className="rounded-xl border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-neutral-50 border-b">
                          {['Field', 'Task', 'Category', 'Priority', 'Due Date'].map(h => (
                            <th key={h} className="text-left p-3 font-medium text-neutral-600">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {SIMULATED_ROWS.slice(0, 5).map((row, i) => (
                          <tr key={i} className="border-b last:border-0 hover:bg-neutral-50/50">
                            <td className="p-3 font-medium">{row.field}</td>
                            <td className="p-3">{row.task}</td>
                            <td className="p-3"><Badge variant="outline" className="capitalize text-xs">{row.category}</Badge></td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                row.priority === 'critical' ? 'bg-red-100 text-red-700' :
                                row.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                row.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-neutral-100 text-neutral-600'
                              }`}>{row.priority}</Badge>
                            </td>
                            <td className="p-3 text-neutral-500">{row.dueDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {SIMULATED_ROWS.length > 5 && (
                    <div className="bg-neutral-50 p-2 text-center text-xs text-neutral-500">
                      + {SIMULATED_ROWS.length - 5} more rows
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => { setStep('upload'); setFile(null); }}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={() => setStep('mapping')}>
                    Continue to Mapping <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ─── STEP: Mapping ─────────────────────────────────── */}
        {step === 'mapping' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Columns3 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-semibold">Column Mapping</p>
                <p className="text-sm text-neutral-500">We auto-mapped your columns. Adjust if needed.</p>
              </div>
            </div>

            <Card>
              <CardContent className="pt-4 space-y-4">
                {SIMULATED_COLUMNS.map((col, i) => (
                  <div key={col} className="flex items-center gap-4">
                    <div className="w-32 text-right">
                      <Badge variant="outline" className="font-mono text-xs">{col}</Badge>
                    </div>
                    <ChevronRight className="h-4 w-4 text-neutral-300 shrink-0" />
                    <Select value={mappings[col]} onValueChange={v => setMappings(prev => ({ ...prev, [col]: v }))}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CROPBASE_COLUMNS.map(cc => (
                          <SelectItem key={cc} value={cc}>{cc}</SelectItem>
                        ))}
                        <SelectItem value="--skip--">Skip column</SelectItem>
                      </SelectContent>
                    </Select>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg">
              <input
                type="checkbox"
                checked={saveTemplate}
                onChange={e => setSaveTemplate(e.target.checked)}
                className="rounded border-neutral-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-neutral-700">Save this mapping as a template for future imports</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setStep('preview')}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleImport}>
                <Wand2 className="h-4 w-4 mr-2" /> Import {SIMULATED_ROWS.length} Tasks
              </Button>
            </div>
          </div>
        )}

        {/* ─── STEP: Processing ──────────────────────────────── */}
        {step === 'processing' && (
          <div className="text-center py-12">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-green-50 flex items-center justify-center mb-6">
              <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
            </div>
            <p className="text-lg font-semibold">Importing your data…</p>
            <p className="text-sm text-neutral-500 mt-1 mb-6">Creating tasks and updating your dashboard</p>
            <div className="max-w-xs mx-auto">
              <Progress value={parseProgress} className="h-2" />
              <p className="text-xs text-neutral-400 mt-2">{Math.round(parseProgress)}% complete</p>
            </div>
          </div>
        )}

        {/* ─── STEP: Success ─────────────────────────────────── */}
        {step === 'success' && (
          <div className="text-center py-8">
            <div className="h-20 w-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Import Complete!</h2>
            <p className="text-neutral-600 mb-6">Your data has been processed and your dashboard is updated.</p>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              <Card>
                <CardContent className="pt-4 pb-3 text-center">
                  <p className="text-2xl font-bold text-green-600">{importResult.tasks}</p>
                  <p className="text-xs text-neutral-500">Tasks Created</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-3 text-center">
                  <p className="text-2xl font-bold text-blue-600">{importResult.fields}</p>
                  <p className="text-xs text-neutral-500">Fields Detected</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-3 text-center">
                  <p className="text-2xl font-bold text-amber-600">1</p>
                  <p className="text-xs text-neutral-500">Template Saved</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto" onClick={() => navigate('/app')}>
                <LayoutDashboard className="h-4 w-4 mr-2" /> Go to Dashboard
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate('/app/today')}>
                <Calendar className="h-4 w-4 mr-2" /> Today's Plan
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate('/app/tasks')}>
                <ListTodo className="h-4 w-4 mr-2" /> View Tasks
              </Button>
            </div>

            <Separator className="my-8" />

            <Button variant="ghost" size="sm" onClick={() => { setStep('upload'); setFile(null); }}>
              <Upload className="h-4 w-4 mr-2" /> Import another file
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
