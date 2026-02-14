import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Upload, LayoutDashboard, Download, Clock, FileSpreadsheet, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
                <span className="font-bold text-white text-sm">CB</span>
              </div>
              <span className="font-bold text-lg">Cropbase</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Turn farm spreadsheets into a daily ops plan.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">
            Upload Excel. Get a live dashboard, today's tasks, and export back to CSV.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base px-8" asChild>
              <Link to="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload Spreadsheet
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8" asChild>
              <Link to="/dashboard">
                Try Demo Data
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-neutral-500">
            Works with your current workflow. No rip-and-replace.
          </p>
        </div>

        {/* Value Cards */}
        <div className="mt-20 grid gap-8 sm:grid-cols-3">
          <Card className="border-neutral-200">
            <CardContent className="pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-900 text-white">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">Instant dashboard from Excel</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Upload your existing spreadsheets. See fields, tasks, and notes in seconds.
              </p>
            </CardContent>
          </Card>

          <Card className="border-neutral-200">
            <CardContent className="pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-900 text-white">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">Today + next 72 hours plan</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Prioritized daily tasks with weather blocks and time windows. Know what changed.
              </p>
            </CardContent>
          </Card>

          <Card className="border-neutral-200">
            <CardContent className="pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-900 text-white">
                <Download className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">Exports back to CSV anytime</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Keep Excel as your source of truth. Export updated data whenever you need.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold text-neutral-900">
            Upload your Excel in 2 minutes
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-white font-bold text-xl">
                1
              </div>
              <h3 className="mt-4 font-semibold">Upload spreadsheet</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Drag and drop your .xlsx or .csv file
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-white font-bold text-xl">
                2
              </div>
              <h3 className="mt-4 font-semibold">Map columns</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Match your columns to fields and tasks
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-white font-bold text-xl">
                3
              </div>
              <h3 className="mt-4 font-semibold">Get your dashboard</h3>
              <p className="mt-2 text-sm text-neutral-600">
                See what needs attention today
              </p>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 rounded-lg border border-neutral-200 bg-white p-8">
          <h2 className="text-center text-2xl font-bold text-neutral-900 mb-8">
            Everything you need to reduce coordination overhead
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex gap-3">
              <Zap className="h-5 w-5 text-neutral-700 mt-0.5" />
              <div>
                <h4 className="font-semibold">See what changed since yesterday</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  Track task changes, weather blocks, and new priorities automatically
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <FileSpreadsheet className="h-5 w-5 text-neutral-700 mt-0.5" />
              <div>
                <h4 className="font-semibold">Keep Excel as source of truth</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  Import updated spreadsheets anytime. Export back to CSV with one click
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-neutral-700 mt-0.5" />
              <div>
                <h4 className="font-semibold">Prioritized daily task list</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  See morning, afternoon, and night tasks with recommended windows
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <LayoutDashboard className="h-5 w-5 text-neutral-700 mt-0.5" />
              <div>
                <h4 className="font-semibold">Field-by-field status</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  Track crop stages, irrigation, and what needs attention by field
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">
            Ready to get started?
          </h2>
          <p className="mt-4 text-neutral-600">
            Try it with demo data or upload your own spreadsheet.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base px-8" asChild>
              <Link to="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload Spreadsheet
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8" asChild>
              <Link to="/dashboard">
                Try Demo Data
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white mt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-neutral-500">
            © 2026 Cropbase. Built for farmers who live in spreadsheets.
          </p>
        </div>
      </footer>
    </div>
  );
}
