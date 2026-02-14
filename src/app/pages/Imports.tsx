import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '../components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Upload, Search, FileSpreadsheet, CheckCircle2, AlertTriangle, Clock,
  MoreVertical, Trash2, Download, Plus,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { toast } from 'sonner';

export default function Imports() {
  const { state, dispatch, exportCSV } = useApp();
  const [search, setSearch] = useState('');

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filtered = useMemo(() => {
    if (!search) return state.imports;
    const q = search.toLowerCase();
    return state.imports.filter(i =>
      i.fileName.toLowerCase().includes(q) ||
      i.status.toLowerCase().includes(q)
    );
  }, [state.imports, search]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle2 className="h-3 w-3 mr-1" />Success</Badge>;
      case 'partial': return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><AlertTriangle className="h-3 w-3 mr-1" />Partial</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDelete = (importId: string) => {
    dispatch({ type: 'IMPORT_DELETE', payload: importId });
    toast.success('Import record deleted');
  };

  const handleExportHistory = () => {
    const data = state.imports.map(i => ({
      File: i.fileName,
      'Uploaded At': formatTime(i.uploadedTime),
      Status: i.status,
      'Rows Parsed': i.rowsParsed,
      'Fields Detected': i.fieldsDetected,
      'Tasks Created': i.tasksCreated,
    }));
    exportCSV(data, 'cropbase-import-history.csv');
    toast.success('Import history exported');
  };

  const stats = {
    total: state.imports.length,
    success: state.imports.filter(i => i.status === 'success').length,
    partial: state.imports.filter(i => i.status === 'partial').length,
    totalRows: state.imports.reduce((s, i) => s + i.rowsParsed, 0),
  };

  return (
    <div className="pb-8">
      <div className="sticky top-16 z-30 bg-white border-b border-neutral-200 px-4 lg:px-8 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Imports</h1>
            <p className="text-sm text-neutral-600 mt-1">{stats.total} imports · {stats.totalRows} rows parsed</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handleExportHistory}><Download className="h-4 w-4 mr-2" />Export History</Button>
            <Link to="/app/upload">
              <Button className="bg-green-600 hover:bg-green-700" size="sm"><Upload className="h-4 w-4 mr-2" />New Import</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="rounded-lg border border-neutral-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-neutral-600">Total Imports</p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{stats.success}</p>
            <p className="text-sm text-green-700">Successful</p>
          </div>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center">
            <p className="text-2xl font-bold text-yellow-700">{stats.partial}</p>
            <p className="text-sm text-yellow-700">Partial</p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold">{stats.totalRows}</p>
            <p className="text-sm text-neutral-600">Rows Parsed</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input placeholder="Search imports..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
            <p className="text-lg font-medium">No imports found</p>
            <p className="text-sm mt-2 mb-4">Upload your first data file to get started</p>
            <Link to="/app/upload"><Button className="bg-green-600 hover:bg-green-700"><Plus className="h-4 w-4 mr-2" />New Import</Button></Link>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Rows</TableHead>
                  <TableHead className="text-right">Fields</TableHead>
                  <TableHead className="text-right">Tasks Created</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(imp => (
                  <TableRow key={imp.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4 text-neutral-500" />
                        <span className="font-medium">{imp.fileName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-neutral-600">{formatTime(imp.uploadedTime)}</TableCell>
                    <TableCell>{getStatusBadge(imp.status)}</TableCell>
                    <TableCell className="text-right font-medium">{imp.rowsParsed}</TableCell>
                    <TableCell className="text-right font-medium">{imp.fieldsDetected}</TableCell>
                    <TableCell className="text-right font-medium">{imp.tasksCreated}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(imp.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
