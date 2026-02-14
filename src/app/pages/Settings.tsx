import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '../components/ui/table';
import {
  Save, RotateCcw, Download, Trash2, MapPin, Building2, User, FileSpreadsheet, Database,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { toast } from 'sonner';

export default function Settings() {
  const { state, dispatch, exportCSV } = useApp();

  const [farmName, setFarmName] = useState(state.farmSettings.farmName);
  const [location, setLocation] = useState(state.farmSettings.location);
  const [owner, setOwner] = useState(state.farmSettings.owner ?? '');
  const [email, setEmail] = useState(state.farmSettings.email ?? '');
  const [notes, setNotes] = useState(state.farmSettings.notes ?? '');
  const [hasChanges, setHasChanges] = useState(false);

  const handleFieldChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
    setHasChanges(true);
  };

  const handleSave = () => {
    dispatch({ type: 'FARM_SETTINGS_UPDATE', payload: { farmName, location, owner, email, notes } });
    setHasChanges(false);
    toast.success('Farm settings saved');
  };

  const handleReset = () => {
    dispatch({ type: 'FARM_SETTINGS_RESET' });
    setFarmName('Aggie Demo Farm');
    setLocation('Central Valley, CA');
    setOwner('');
    setEmail('');
    setNotes('');
    setHasChanges(false);
    toast.success('Settings reset to defaults');
  };

  const handleDeleteTemplate = (templateId: string) => {
    dispatch({ type: 'MAPPING_TEMPLATE_DELETE', payload: templateId });
    toast.success('Template deleted');
  };

  const handleExportAllData = () => {
    const allData = [
      ...state.tasks.map(t => ({ Type: 'Task', Name: t.title, Field: t.field, Date: t.dueDate, Status: t.status, Category: t.category, Notes: t.notes || '' })),
      ...state.fields.map(f => ({ Type: 'Field', Name: f.name, Field: f.name, Date: '', Status: f.status, Category: f.crop, Notes: `${f.acreage} ac` })),
      ...state.notes.map(n => {
        const fieldName = state.fields.find(f => f.id === n.fieldId)?.name ?? n.fieldId;
        return { Type: 'Note', Name: fieldName, Field: fieldName, Date: n.timestamp, Status: '-', Category: '-', Notes: n.content };
      }),
      ...state.imports.map(i => ({ Type: 'Import', Name: i.fileName, Field: '-', Date: i.uploadedTime, Status: i.status, Category: '-', Notes: `${i.rowsParsed} rows` })),
    ];
    exportCSV(allData, 'cropbase-full-export.csv');
    toast.success(`Exported ${allData.length} records`);
  };

  const handleExportTasks = () => {
    const data = state.tasks.map(t => ({
      Title: t.title, Field: t.field, 'Due Date': t.dueDate, Window: t.window || '',
      Status: t.status, Category: t.category, Priority: t.priority,
      Overdue: t.overdue ? 'Yes' : 'No', Blocked: t.blocked ? 'Yes' : 'No', Notes: t.notes || '',
    }));
    exportCSV(data, 'cropbase-tasks-export.csv');
    toast.success(`Exported ${data.length} tasks`);
  };

  const handleExportFields = () => {
    const data = state.fields.map(f => ({
      Name: f.name, Crop: f.crop, Variety: f.variety || '', Stage: f.stage,
      'Acreage (ac)': f.acreage, Irrigation: f.irrigationType,
      Status: f.status, 'Overdue Tasks': f.overdueCount,
    }));
    exportCSV(data, 'cropbase-fields-export.csv');
    toast.success(`Exported ${data.length} fields`);
  };

  return (
    <div className="pb-8">
      <div className="sticky top-16 z-30 bg-white border-b border-neutral-200 px-4 lg:px-8 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-neutral-600 mt-1">Farm profile, templates, and data management</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handleReset}><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
            <Button className="bg-green-600 hover:bg-green-700" size="sm" onClick={handleSave} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-2" />Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 space-y-6">
        {/* Farm Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" />Farm Profile</CardTitle>
            <CardDescription>Your farm details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmName">Farm Name</Label>
                <Input id="farmName" value={farmName} onChange={handleFieldChange(setFarmName)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <Input id="location" value={location} onChange={handleFieldChange(setLocation)} className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="owner">Owner / Manager</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <Input id="owner" value={owner} onChange={handleFieldChange(setOwner)} className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={handleFieldChange(setEmail)} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" value={notes} onChange={handleFieldChange(setNotes)} placeholder="Additional farm notes..." className="mt-1" />
            </div>
          </CardContent>
        </Card>

        {/* Mapping Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileSpreadsheet className="h-5 w-5" />Mapping Templates</CardTitle>
            <CardDescription>Saved column mappings for recurring data imports</CardDescription>
          </CardHeader>
          <CardContent>
            {state.mappingTemplates.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                <FileSpreadsheet className="h-10 w-10 mx-auto mb-3 text-neutral-300" />
                <p className="font-medium">No saved templates</p>
                <p className="text-sm mt-1">Templates are created during the import wizard</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    {state.mappingTemplates.some(t => t.columns && t.columns.length > 0) && <TableHead>Columns</TableHead>}
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.mappingTemplates.map(tpl => (
                    <TableRow key={tpl.id}>
                      <TableCell className="font-medium">{tpl.name}</TableCell>
                      <TableCell className="text-neutral-500">{tpl.created}</TableCell>
                      <TableCell className="text-neutral-500">{tpl.lastUsed}</TableCell>
                      {state.mappingTemplates.some(t => t.columns && t.columns.length > 0) && (
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {(tpl.columns ?? []).map((col: string) => <Badge key={col} variant="outline" className="text-xs">{col}</Badge>)}
                          </div>
                        </TableCell>
                      )}
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-red-600" onClick={() => handleDeleteTemplate(tpl.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5" />Data Export</CardTitle>
            <CardDescription>Download your farm data as CSV files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button onClick={handleExportAllData} className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-neutral-300 p-6 hover:border-green-400 hover:bg-green-50 transition-colors cursor-pointer">
                <Download className="h-8 w-8 text-neutral-500" />
                <div className="text-center">
                  <p className="font-medium">Full Export</p>
                  <p className="text-sm text-neutral-500">{state.tasks.length + state.fields.length + state.notes.length + state.imports.length} records</p>
                </div>
              </button>
              <button onClick={handleExportTasks} className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-neutral-300 p-6 hover:border-green-400 hover:bg-green-50 transition-colors cursor-pointer">
                <Download className="h-8 w-8 text-neutral-500" />
                <div className="text-center">
                  <p className="font-medium">Tasks Only</p>
                  <p className="text-sm text-neutral-500">{state.tasks.length} tasks</p>
                </div>
              </button>
              <button onClick={handleExportFields} className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-neutral-300 p-6 hover:border-green-400 hover:bg-green-50 transition-colors cursor-pointer">
                <Download className="h-8 w-8 text-neutral-500" />
                <div className="text-center">
                  <p className="font-medium">Fields Only</p>
                  <p className="text-sm text-neutral-500">{state.fields.length} fields</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions — proceed with caution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reset all data to demo defaults</p>
                <p className="text-sm text-neutral-500">This will erase all your changes and restore demo data</p>
              </div>
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50" onClick={() => {
                dispatch({ type: 'RESET_TO_DEMO' });
                toast.success('All data reset to demo defaults');
                setFarmName('Aggie Demo Farm'); setLocation('Central Valley, CA');
                setOwner(''); setEmail(''); setNotes(''); setHasChanges(false);
              }}>
                <RotateCcw className="h-4 w-4 mr-2" />Reset All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
