import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Search, Filter, ArrowUpDown, MapPin, X } from 'lucide-react';
import { demoFields } from '../data/mockData';
import { NoFilterResultsState } from '../components/EmptyStates';

export default function Fields() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cropFilter, setCropFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'attention':
        return <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">Attention</Badge>;
      case 'blocked':
        return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">Blocked</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'watch':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Watch</Badge>;
      default:
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Normal</Badge>;
    }
  };

  const filteredFields = demoFields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         field.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = cropFilter === 'all' || field.crop === cropFilter;
    const matchesStatus = statusFilter === 'all' || field.status === statusFilter;
    return matchesSearch && matchesCrop && matchesStatus;
  });

  const uniqueCrops = Array.from(new Set(demoFields.map(f => f.crop)));
  
  const hasActiveFilters = cropFilter !== 'all' || statusFilter !== 'all' || searchQuery !== '';
  
  const clearFilters = () => {
    setSearchQuery('');
    setCropFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1>Fields</h1>
        <p className="text-sm text-neutral-600 mt-1">Manage all fields across your farm</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="search"
                placeholder="Search fields or crops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={cropFilter} onValueChange={setCropFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All crops" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All crops</SelectItem>
                {uniqueCrops.map(crop => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="attention">Attention</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="watch">Watch</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                className="w-full sm:w-auto" 
                onClick={clearFilters}
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
          
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Search: "{searchQuery}"
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-2 hover:text-blue-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {cropFilter !== 'all' && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Crop: {cropFilter}
                  <button 
                    onClick={() => setCropFilter('all')}
                    className="ml-2 hover:text-green-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {statusFilter !== 'all' && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Status: {statusFilter}
                  <button 
                    onClick={() => setStatusFilter('all')}
                    className="ml-2 hover:text-purple-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {filteredFields.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <MapPin className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
            <h3 className="font-semibold text-lg mb-2">No fields found</h3>
            <p className="text-sm text-neutral-600 mb-6">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setCropFilter('all');
                setStatusFilter('all');
              }}
            >
              Clear filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Acreage</TableHead>
                    <TableHead>Irrigation</TableHead>
                    <TableHead>Next Task</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead className="text-center">Overdue</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFields.map((field) => (
                    <TableRow key={field.id} className="cursor-pointer hover:bg-neutral-50">
                      <TableCell className="font-medium">
                        <Link to={`/dashboard/fields/${field.id}`} className="hover:underline">
                          {field.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{field.crop}</div>
                          {field.variety && (
                            <div className="text-xs text-neutral-500">{field.variety}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-neutral-600">{field.stage}</TableCell>
                      <TableCell className="text-sm">{field.acreage} ac</TableCell>
                      <TableCell className="text-sm text-neutral-600">{field.irrigationType}</TableCell>
                      <TableCell className="text-sm">{field.nextTask || '-'}</TableCell>
                      <TableCell className="text-sm">
                        {field.nextTaskDue ? new Date(field.nextTaskDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                      </TableCell>
                      <TableCell className="text-center">
                        {field.overdueCount > 0 ? (
                          <Badge variant="destructive" className="px-2">{field.overdueCount}</Badge>
                        ) : (
                          <span className="text-neutral-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(field.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-4 text-sm text-neutral-600">
        Showing {filteredFields.length} of {demoFields.length} fields
      </div>
    </div>
  );
}