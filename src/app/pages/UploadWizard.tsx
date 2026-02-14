import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Switch } from '../components/ui/switch';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CheckCheck
} from 'lucide-react';

type Step = 'upload' | 'preview' | 'mapping' | 'success';

export default function UploadWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState<string>('');
  const [saveMappingTemplate, setSaveMappingTemplate] = useState(false);

  // Mock data for preview
  const previewData = [
    { field: 'Field A', crop: 'Rice', stage: 'Heading', acres: '45', irrigation: 'Flood', task: 'Check flood levels', due: '2/14/2026' },
    { field: 'Field B', crop: 'Corn', stage: 'Tasseling', acres: '32', irrigation: 'Drip', task: 'Apply nitrogen', due: '2/15/2026' },
    { field: 'Field C', crop: 'Tomatoes', stage: 'Vegetative', acres: '18', irrigation: 'Overhead', task: 'Scout for pests', due: '2/16/2026' },
  ];

  const detectedColumns = ['field', 'crop', 'stage', 'acres', 'irrigation', 'task', 'due', 'notes'];

  const warnings = [
    'Column "last_action" is empty and will be skipped',
    '2 rows have invalid date formats in "due" column',
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep('preview'), 300);
        }
      }, 100);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.csv'))) {
      setFileName(file.name);
      setCurrentStep('preview');
    }
  };

  const getStepNumber = (step: Step) => {
    switch (step) {
      case 'upload': return 1;
      case 'preview': return 2;
      case 'mapping': return 3;
      case 'success': return 4;
    }
  };

  const currentStepNumber = getStepNumber(currentStep);

  return (
    <div className="min-h-screen bg-neutral-50 p-4 lg:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Upload Spreadsheet</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Convert your Excel file into a live operational dashboard
          </p>
        </div>

        {/* Progress Steps */}
        {currentStep !== 'success' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className={`flex items-center gap-2 ${currentStepNumber >= 1 ? 'text-neutral-900' : 'text-neutral-400'}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStepNumber > 1 ? 'bg-green-600 text-white' : currentStepNumber === 1 ? 'bg-neutral-900 text-white' : 'bg-neutral-200'
                }`}>
                  {currentStepNumber > 1 ? <CheckCircle2 className="h-5 w-5" /> : '1'}
                </div>
                <span className="text-sm font-medium">Upload</span>
              </div>
              <div className="flex-1 mx-4 h-1 bg-neutral-200">
                <div className={`h-full ${currentStepNumber > 1 ? 'bg-green-600' : 'bg-neutral-200'}`} />
              </div>
              <div className={`flex items-center gap-2 ${currentStepNumber >= 2 ? 'text-neutral-900' : 'text-neutral-400'}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStepNumber > 2 ? 'bg-green-600 text-white' : currentStepNumber === 2 ? 'bg-neutral-900 text-white' : 'bg-neutral-200'
                }`}>
                  {currentStepNumber > 2 ? <CheckCircle2 className="h-5 w-5" /> : '2'}
                </div>
                <span className="text-sm font-medium">Preview</span>
              </div>
              <div className="flex-1 mx-4 h-1 bg-neutral-200">
                <div className={`h-full ${currentStepNumber > 2 ? 'bg-green-600' : 'bg-neutral-200'}`} />
              </div>
              <div className={`flex items-center gap-2 ${currentStepNumber >= 3 ? 'text-neutral-900' : 'text-neutral-400'}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStepNumber >= 3 ? 'bg-neutral-900 text-white' : 'bg-neutral-200'
                }`}>
                  3
                </div>
                <span className="text-sm font-medium">Mapping</span>
              </div>
            </div>
          </div>
        )}

        {/* Step A: Upload */}
        {currentStep === 'upload' && (
          <Card>
            <CardContent className="pt-6">
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-neutral-300 rounded-lg p-12 text-center hover:border-neutral-400 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".xlsx,.csv"
                  onChange={handleFileSelect}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Drop your spreadsheet here</h3>
                  <p className="text-sm text-neutral-600 mb-4">or click to browse</p>
                  <Badge variant="outline" className="mb-2">Supported: .xlsx, .csv</Badge>
                </label>
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{fileName}</span>
                    <span className="text-sm text-neutral-600">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                  <p className="text-xs text-neutral-500 mt-2">Uploading and parsing file...</p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t">
                <div className="flex items-start gap-2 text-sm text-blue-600">
                  <Download className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <a href="#" className="font-medium hover:underline">Download sample template</a>
                    <p className="text-xs text-neutral-600 mt-1">
                      See an example of a properly formatted spreadsheet
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step B: Preview */}
        {currentStep === 'preview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview Data</CardTitle>
                <p className="text-sm text-neutral-600">First 20 rows from {fileName}</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {Object.keys(previewData[0]).map(key => (
                          <TableHead key={key} className="capitalize">{key}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, index) => (
                        <TableRow key={index}>
                          {Object.values(row).map((value, i) => (
                            <TableCell key={i}>{value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-neutral-600 mb-2">Detected columns:</p>
                  <div className="flex flex-wrap gap-2">
                    {detectedColumns.map(col => (
                      <Badge key={col} variant="outline">{col}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {warnings.length > 0 && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {warnings.map((warning, index) => (
                      <li key={index} className="text-sm text-yellow-900 flex items-start gap-2">
                        <span className="text-yellow-600">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep('upload')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => setCurrentStep('mapping')}>
                Continue to Mapping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step C: Mapping */}
        {currentStep === 'mapping' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Map Columns</CardTitle>
                <p className="text-sm text-neutral-600">Match your spreadsheet columns to Cropbase fields</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold">Required mappings</h4>
                    <Button variant="outline" size="sm">
                      Use suggested mapping
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="map-field">Field Name *</Label>
                      <Select defaultValue="field">
                        <SelectTrigger id="map-field">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {detectedColumns.map(col => (
                            <SelectItem key={col} value={col}>{col}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="map-crop">Crop *</Label>
                      <Select defaultValue="crop">
                        <SelectTrigger id="map-crop">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {detectedColumns.map(col => (
                            <SelectItem key={col} value={col}>{col}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="map-stage">Growth Stage *</Label>
                      <Select defaultValue="stage">
                        <SelectTrigger id="map-stage">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {detectedColumns.map(col => (
                            <SelectItem key={col} value={col}>{col}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="map-task-due">Task Due Date</Label>
                      <Select defaultValue="due">
                        <SelectTrigger id="map-task-due">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">-- Not mapped --</SelectItem>
                          {detectedColumns.map(col => (
                            <SelectItem key={col} value={col}>{col}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-4">Optional mappings</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="map-acres">Acreage</Label>
                        <Select defaultValue="acres">
                          <SelectTrigger id="map-acres">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">-- Not mapped --</SelectItem>
                            {detectedColumns.map(col => (
                              <SelectItem key={col} value={col}>{col}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="map-irrigation">Irrigation Type</Label>
                        <Select defaultValue="irrigation">
                          <SelectTrigger id="map-irrigation">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">-- Not mapped --</SelectItem>
                            {detectedColumns.map(col => (
                              <SelectItem key={col} value={col}>{col}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="map-task">Next Planned Task</Label>
                        <Select defaultValue="task">
                          <SelectTrigger id="map-task">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">-- Not mapped --</SelectItem>
                            {detectedColumns.map(col => (
                              <SelectItem key={col} value={col}>{col}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="map-notes">Notes</Label>
                        <Select defaultValue="notes">
                          <SelectTrigger id="map-notes">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">-- Not mapped --</SelectItem>
                            {detectedColumns.map(col => (
                              <SelectItem key={col} value={col}>{col}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="save-template"
                        checked={saveMappingTemplate}
                        onCheckedChange={setSaveMappingTemplate}
                      />
                      <Label htmlFor="save-template" className="cursor-pointer">
                        Save mapping template for future imports
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-base">Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-700 mb-3">How your data will appear:</p>
                <div className="bg-white rounded border border-neutral-200 p-3 text-sm space-y-2">
                  <div><span className="font-medium">Field:</span> Field A</div>
                  <div><span className="font-medium">Crop:</span> Rice</div>
                  <div><span className="font-medium">Stage:</span> Heading</div>
                  <div><span className="font-medium">Acres:</span> 45</div>
                  <div><span className="font-medium">Irrigation:</span> Flood</div>
                  <div><span className="font-medium">Next Task:</span> Check flood levels (Due: Feb 14)</div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep('preview')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => setCurrentStep('success')}>
                Create Dashboard
                <CheckCheck className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {currentStep === 'success' && (
          <Card className="border-green-200">
            <CardContent className="pt-16 pb-12 text-center">
              <div className="mx-auto w-fit p-4 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Dashboard created!</h2>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Your spreadsheet has been converted into a live operational dashboard
              </p>

              <div className="grid gap-4 sm:grid-cols-3 mb-10 max-w-2xl mx-auto">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-green-600">6</div>
                    <div className="text-sm text-neutral-600 mt-1">Fields created</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-green-600">25</div>
                    <div className="text-sm text-neutral-600 mt-1">Tasks imported</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-green-600">9</div>
                    <div className="text-sm text-neutral-600 mt-1">Notes imported</div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" onClick={() => navigate('/dashboard')}>
                  Go to Overview
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/dashboard/today')}>
                  Review Today Plan
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/dashboard/alerts')}>
                  Set Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
