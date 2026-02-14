import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, MoreVertical, Download } from 'lucide-react';
import { demoImports } from '../data/mockData';

export default function Imports() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Success
          </Badge>
        );
      case 'partial':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Partial
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Imports</h1>
          <p className="text-sm text-neutral-600 mt-1">Upload and manage your spreadsheets</p>
        </div>
        <Button asChild>
          <Link to="/upload">
            <Upload className="mr-2 h-4 w-4" />
            New Import
          </Link>
        </Button>
      </div>

      {demoImports.length === 0 ? (
        <Card>
          <CardContent className="py-24 text-center">
            <div className="mx-auto w-fit p-4 rounded-full bg-neutral-100 mb-6">
              <FileSpreadsheet className="h-12 w-12 text-neutral-400" />
            </div>
            <h3 className="font-semibold text-xl mb-2">No imports yet</h3>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Upload your first spreadsheet to get started. We'll convert it into a live operational dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link to="/upload">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Spreadsheet
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#" download>
                  <Download className="mr-2 h-5 w-5" />
                  Use Sample Template
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead className="text-center">Rows</TableHead>
                    <TableHead className="text-center">Fields</TableHead>
                    <TableHead className="text-center">Tasks</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoImports.map((importRecord) => (
                    <TableRow key={importRecord.id} className="hover:bg-neutral-50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{importRecord.fileName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-neutral-600">
                        {formatDate(importRecord.uploadedTime)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="font-mono">
                          {importRecord.rowsParsed}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="font-mono">
                          {importRecord.fieldsDetected}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="font-mono">
                          {importRecord.tasksCreated}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(importRecord.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Mapping</DropdownMenuItem>
                            <DropdownMenuItem>Re-import</DropdownMenuItem>
                            <DropdownMenuItem>Download Cleaned CSV</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mt-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Supported formats</h3>
            <p className="text-sm text-neutral-700">
              .xlsx, .csv files up to 10MB
            </p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Keep Excel as source</h3>
            <p className="text-sm text-neutral-700">
              Upload updated files anytime to refresh your dashboard
            </p>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Save mapping templates</h3>
            <p className="text-sm text-neutral-700">
              Reuse column mappings for repeated imports
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
