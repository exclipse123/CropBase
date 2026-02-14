import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { CheckCircle2, AlertCircle, Upload, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function DesignSystem() {
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1>Cropbase Design System</h1>
        <p className="text-neutral-600 mt-2">
          Component library and style guide for the Cropbase operations dashboard
        </p>
      </div>

      {/* Color Palette */}
      <section className="mb-12">
        <h2 className="mb-6">Color Palette</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="mb-4">Primary (Green Accent)</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="h-20 bg-green-600 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-neutral-600">#16a34a</p>
              </div>
              <div className="flex-1">
                <div className="h-20 bg-green-50 rounded-lg mb-2 border border-green-200"></div>
                <p className="text-sm font-medium">Primary Light</p>
                <p className="text-xs text-neutral-600">#dcfce7</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4">Status Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="h-16 bg-green-600 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Success</p>
                <p className="text-xs text-neutral-600">#16a34a</p>
              </div>
              <div>
                <div className="h-16 bg-amber-500 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Warning</p>
                <p className="text-xs text-neutral-600">#f59e0b</p>
              </div>
              <div>
                <div className="h-16 bg-red-600 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Error</p>
                <p className="text-xs text-neutral-600">#dc2626</p>
              </div>
              <div>
                <div className="h-16 bg-sky-500 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Info</p>
                <p className="text-xs text-neutral-600">#0ea5e9</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4">Neutrals</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              <div>
                <div className="h-16 bg-white border border-neutral-200 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">White</p>
              </div>
              <div>
                <div className="h-16 bg-neutral-50 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Gray 50</p>
              </div>
              <div>
                <div className="h-16 bg-neutral-100 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Gray 100</p>
              </div>
              <div>
                <div className="h-16 bg-neutral-300 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Gray 300</p>
              </div>
              <div>
                <div className="h-16 bg-neutral-600 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Gray 600</p>
              </div>
              <div>
                <div className="h-16 bg-neutral-900 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Gray 900</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="mb-6">Typography</h2>
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h1>Heading 1 - Farm Dashboard</h1>
              <p className="text-xs text-neutral-500 mt-1">text-2xl, font-medium</p>
            </div>
            <div>
              <h2>Heading 2 - Section Title</h2>
              <p className="text-xs text-neutral-500 mt-1">text-xl, font-medium</p>
            </div>
            <div>
              <h3>Heading 3 - Card Title</h3>
              <p className="text-xs text-neutral-500 mt-1">text-lg, font-medium</p>
            </div>
            <div>
              <h4>Heading 4 - List Header</h4>
              <p className="text-xs text-neutral-500 mt-1">text-base, font-medium</p>
            </div>
            <div>
              <p>Body text - This is standard paragraph text used throughout the interface. It should be clear and easy to read at various sizes.</p>
              <p className="text-xs text-neutral-500 mt-1">text-base, font-normal</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600">Caption - Smaller text for metadata, timestamps, and secondary information</p>
              <p className="text-xs text-neutral-500 mt-1">text-sm, text-neutral-600</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="mb-6">Buttons</h2>
        <Card>
          <CardContent className="pt-6 space-y-8">
            <div>
              <h4 className="mb-4">Variants</h4>
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Sizes</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <h4 className="mb-4">With Icons</h4>
              <div className="flex flex-wrap gap-3">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Task
                </Button>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import File
                </Button>
              </div>
            </div>
            <div>
              <h4 className="mb-4">States</h4>
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Input States */}
      <section className="mb-12">
        <h2 className="mb-6">Input States</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Default</label>
              <Input placeholder="Enter field name..." />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">With Value</label>
              <Input value="Field A" readOnly />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block text-red-600">Error State</label>
              <Input placeholder="Required field" className="border-red-300 focus:border-red-500" />
              <p className="text-sm text-red-600 mt-1">This field is required</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Disabled</label>
              <Input placeholder="Cannot edit" disabled />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Badges */}
      <section className="mb-12">
        <h2 className="mb-6">Badges</h2>
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h4 className="mb-4">Status Badges</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Success
                </Badge>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Warning
                </Badge>
                <Badge variant="destructive">
                  Overdue
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  Info
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Severity Badges</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-neutral-50">Normal</Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Watch</Badge>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">Attention</Badge>
                <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">Blocked</Badge>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Context Badges</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Imported</Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Moved</Badge>
                <Badge variant="outline">Morning</Badge>
                <Badge variant="outline">Afternoon</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tables */}
      <section className="mb-12">
        <h2 className="mb-6">Tables</h2>
        <Card>
          <CardContent className="pt-6">
            <h4 className="mb-4">Standard Density</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Field A</TableCell>
                  <TableCell>Rice</TableCell>
                  <TableCell>Heading</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                      Attention
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Field B</TableCell>
                  <TableCell>Corn</TableCell>
                  <TableCell>Tasseling</TableCell>
                  <TableCell>
                    <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">
                      Blocked
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Field C</TableCell>
                  <TableCell>Tomatoes</TableCell>
                  <TableCell>Vegetative</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Normal
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Cards */}
      <section className="mb-12">
        <h2 className="mb-6">Cards</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Standard Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600">
                Basic card for grouping related content
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Clickable Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600">
                Interactive card with hover effect
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-900">Highlighted Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-700">
                Emphasized card for important information
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <span className="text-amber-900">Warning Card</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-700">
                Card for warnings and alerts
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skeleton Loaders */}
      <section className="mb-12">
        <h2 className="mb-6">Skeleton Loaders</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Toast Notifications */}
      <section className="mb-12">
        <h2 className="mb-6">Toast Notifications</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toast.success('Task completed successfully')}>
                Show Success Toast
              </Button>
              <Button 
                variant="outline" 
                onClick={() => toast.error('Failed to save changes')}
              >
                Show Error Toast
              </Button>
              <Button 
                variant="outline"
                onClick={() => toast('Import in progress...', { 
                  description: 'Processing 48 rows from weekly-plan.xlsx' 
                })}
              >
                Show Info Toast
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Spacing Scale */}
      <section className="mb-12">
        <h2 className="mb-6">Spacing Scale</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-neutral-600">0.5rem (2)</div>
              <div className="h-2 bg-green-600" style={{ width: '0.5rem' }}></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-neutral-600">1rem (4)</div>
              <div className="h-2 bg-green-600" style={{ width: '1rem' }}></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-neutral-600">1.5rem (6)</div>
              <div className="h-2 bg-green-600" style={{ width: '1.5rem' }}></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-neutral-600">2rem (8)</div>
              <div className="h-2 bg-green-600" style={{ width: '2rem' }}></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-neutral-600">3rem (12)</div>
              <div className="h-2 bg-green-600" style={{ width: '3rem' }}></div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Icon Guidelines */}
      <section className="mb-12">
        <h2 className="mb-6">Icons</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-neutral-600 mb-4">
              All icons use Lucide React. Standard sizes: 16px (h-4 w-4), 20px (h-5 w-5), 24px (h-6 w-6)
            </p>
            <div className="flex gap-6">
              <div className="text-center">
                <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-xs">Success</p>
              </div>
              <div className="text-center">
                <AlertCircle className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                <p className="text-xs">Warning</p>
              </div>
              <div className="text-center">
                <Upload className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs">Action</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
