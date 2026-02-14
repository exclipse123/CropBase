import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '../components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../components/ui/select';
import {
  Search, Filter, MapPin, AlertTriangle, CheckCircle2, Eye, ArrowUpDown, Sprout,
} from 'lucide-react';
import { useApp } from '../store/AppContext';

export default function Fields() {
  const { state } = useApp();
  const [search, setSearch] = useState('');
  const [cropFilter, setCropFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'name' | 'acreage' | 'overdueCount'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const uniqueCrops = [...new Set(state.fields.map(f => f.crop))].sort();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal': return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle2 className="h-3 w-3 mr-1" />Normal</Badge>;
      case 'attention': return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><AlertTriangle className="h-3 w-3 mr-1" />Attention</Badge>;
      case 'blocked': return <Badge className="bg-red-100 text-red-700 border-red-200"><AlertTriangle className="h-3 w-3 mr-1" />Blocked</Badge>;
      case 'overdue': return <Badge variant="destructive">Overdue</Badge>;
      case 'watch': return <Badge className="bg-orange-100 text-orange-700 border-orange-200"><Eye className="h-3 w-3 mr-1" />Watch</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filtered = useMemo(() => {
    let result = [...state.fields];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(f => f.name.toLowerCase().includes(q) || f.crop.toLowerCase().includes(q));
    }
    if (cropFilter !== 'all') result = result.filter(f => f.crop === cropFilter);
    if (statusFilter !== 'all') result = result.filter(f => f.status === statusFilter);
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortField === 'acreage') cmp = a.acreage - b.acreage;
      else if (sortField === 'overdueCount') cmp = a.overdueCount - b.overdueCount;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [state.fields, search, cropFilter, statusFilter, sortField, sortDir]);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  // Compute active task count per field from store
  const activeTaskCount = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of state.tasks) {
      if (t.status !== 'done') {
        map[t.fieldId] = (map[t.fieldId] || 0) + 1;
      }
    }
    return map;
  }, [state.tasks]);

  const stats = {
    total: state.fields.length,
    normal: state.fields.filter(f => f.status === 'normal').length,
    attention: state.fields.filter(f => f.status === 'attention' || f.status === 'watch').length,
    blocked: state.fields.filter(f => f.status === 'blocked' || f.status === 'overdue').length,
    totalArea: state.fields.reduce((s, f) => s + f.acreage, 0),
  };

  return (
    <div className="pb-8">
      <div className="sticky top-16 z-30 bg-white border-b border-neutral-200 px-4 lg:px-8 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Fields</h1>
            <p className="text-sm text-neutral-600 mt-1">{stats.total} fields · {stats.totalArea.toFixed(0)} ac total</p>
          </div>
          <div className="flex gap-3">
            <Badge variant="outline" className="py-1.5 px-3"><CheckCircle2 className="h-3 w-3 mr-1 text-green-600" />{stats.normal} Normal</Badge>
            <Badge variant="outline" className="py-1.5 px-3"><AlertTriangle className="h-3 w-3 mr-1 text-yellow-600" />{stats.attention} Attention</Badge>
            <Badge variant="outline" className="py-1.5 px-3"><AlertTriangle className="h-3 w-3 mr-1 text-red-600" />{stats.blocked} Blocked</Badge>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input placeholder="Search fields or crops..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={cropFilter} onValueChange={setCropFilter}>
            <SelectTrigger className="w-40"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {uniqueCrops.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="attention">Attention</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="watch">Watch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            <Sprout className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
            <p className="text-lg font-medium">No fields match your filters</p>
            <p className="text-sm mt-2">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort('name')}>
                    <div className="flex items-center gap-1">Field <ArrowUpDown className="h-3 w-3" /></div>
                  </TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort('acreage')}>
                    <div className="flex items-center gap-1">Acreage <ArrowUpDown className="h-3 w-3" /></div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Task</TableHead>
                  <TableHead className="cursor-pointer text-right" onClick={() => toggleSort('overdueCount')}>
                    <div className="flex items-center gap-1 justify-end">Overdue <ArrowUpDown className="h-3 w-3" /></div>
                  </TableHead>
                  <TableHead className="text-right">Active</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(field => (
                  <TableRow key={field.id} className="hover:bg-neutral-50 cursor-pointer">
                    <TableCell>
                      <Link to={`/app/fields/${field.id}`} className="font-medium text-neutral-900 hover:text-green-700 hover:underline">
                        {field.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2"><Sprout className="h-4 w-4 text-green-600" />{field.crop}</div>
                    </TableCell>
                    <TableCell className="text-neutral-600">{field.stage}</TableCell>
                    <TableCell>{field.acreage} ac</TableCell>
                    <TableCell>{getStatusBadge(field.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm text-neutral-600">
                        {field.nextTask ? (
                          <span>{field.nextTask}{field.nextTaskDue && <span className="text-neutral-400 ml-1">({field.nextTaskDue})</span>}</span>
                        ) : '—'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {field.overdueCount > 0 ? <span className="text-red-600 font-medium">{field.overdueCount}</span> : <span className="text-neutral-400">0</span>}
                    </TableCell>
                    <TableCell className="text-right font-medium">{activeTaskCount[field.id] || 0}</TableCell>
                    <TableCell>
                      <Link to={`/app/fields/${field.id}`}>
                        <Button variant="ghost" size="sm"><MapPin className="h-4 w-4 mr-1" />View</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
