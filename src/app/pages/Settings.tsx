import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
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
import { Building2, MapPin, Database, Download, Users, Trash2, Palette } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [farmName, setFarmName] = useState('Aggie Demo Farm');
  const [location, setLocation] = useState('Central Valley, CA');
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [units, setUnits] = useState('imperial');

  const mappingTemplates = [
    {
      id: 'template-1',
      name: 'Weekly Plan Template',
      created: '2026-02-01',
      lastUsed: '2026-02-14'
    },
    {
      id: 'template-2',
      name: 'Field Notes Template',
      created: '2026-01-20',
      lastUsed: '2026-02-13'
    },
  ];

  const handleSave = () => {
    toast.success('Settings saved');
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1>Settings</h1>
        <p className="text-sm text-neutral-600 mt-1">Manage your farm and account preferences</p>
      </div>

      {/* Design System Link */}
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Palette className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-blue-900">Design System</p>
              <p className="text-sm text-blue-700 mt-1">
                View the complete component library and style guide
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="border-blue-300 text-blue-700 hover:bg-blue-100">
              <Link to="/app/design-system">View Design System</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Farm Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Farm Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farm-name">Farm Name</Label>
              <Input
                id="farm-name"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="units">Units</Label>
              <Select value={units} onValueChange={setUnits}>
                <SelectTrigger id="units">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imperial">Imperial (acres, F°)</SelectItem>
                  <SelectItem value="metric">Metric (hectares, C°)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Mapping Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Mapping Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              Saved column mappings for faster imports
            </p>
            {mappingTemplates.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mappingTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell className="text-sm text-neutral-600">
                        {new Date(template.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell className="text-sm text-neutral-600">
                        {new Date(template.lastUsed).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-neutral-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-sm text-neutral-500">
                No saved templates yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Data Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-neutral-600">
              Export all your farm data at any time
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Export all fields
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Export all tasks
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Export all notes
              </Button>
            </div>
            <p className="text-xs text-neutral-500">
              Exports will be generated in CSV format compatible with Excel
            </p>
          </CardContent>
        </Card>

        {/* Team Members (Optional) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
              <Badge variant="outline" className="ml-2">Coming Soon</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              Invite team members to collaborate on farm operations
            </p>
            <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-neutral-500">
              <div className="text-sm">
                Team collaboration features are not yet available
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => {
            setFarmName('Aggie Demo Farm');
            setLocation('Central Valley, CA');
            setTimezone('America/Los_Angeles');
            setUnits('imperial');
          }}>
            Reset
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </div>
    </div>
  );
}