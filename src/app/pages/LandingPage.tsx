import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Upload, LayoutDashboard, Download, Clock, MapPin, FileSpreadsheet } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const handleTryDemo = () => {
    navigate('/app');
  };

  const handleUpload = () => {
    navigate('/app/imports');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-xl">Cropbase</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/app">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-6 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Turn farm spreadsheets into a daily ops plan
            </h1>
            <p className="text-xl lg:text-2xl text-neutral-600 max-w-2xl mx-auto">
              Upload Excel. Get a live dashboard, today's tasks, and export back to CSV.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 h-12" onClick={handleUpload}>
              <Upload className="mr-2 h-5 w-5" />
              Upload Spreadsheet
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-12" onClick={handleTryDemo}>
              Try Demo Data
            </Button>
          </div>

          <p className="text-sm text-neutral-500">
            Works with your current workflow. No rip-and-replace.
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-2">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold">Instant dashboard from Excel</h3>
              <p className="text-neutral-600">
                Upload your existing spreadsheets and get a live operational view in 2 minutes. No manual data entry.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold">Today + next 72 hours plan</h3>
              <p className="text-neutral-600">
                See what needs to happen now, what's blocked, and what changed since yesterday.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Download className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold">Exports back to CSV anytime</h3>
              <p className="text-neutral-600">
                Keep Excel as your source of truth. Export updated plans, task lists, and field logs anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 lg:px-6 py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload your Excel in 2 minutes</h3>
                <p className="text-neutral-600">
                  Drag and drop your existing farm spreadsheets. We'll parse your fields, crops, tasks, and notes.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Get a dashboard of fields, tasks, and notes</h3>
                <p className="text-neutral-600">
                  Instantly see your entire operation: what's overdue, what's blocked, and what needs attention today.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">See what changed since yesterday</h3>
                <p className="text-neutral-600">
                  Track task movements, new overdue items, and blockers. Know exactly what shifted and why.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Export back to CSV anytime</h3>
                <p className="text-neutral-600">
                  Keep your workflow. Export updated data back to spreadsheet format whenever you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 lg:px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Built for how farms actually work</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <FileSpreadsheet className="h-8 w-8 text-green-700" />
              <h3 className="font-semibold">Keep using Excel</h3>
              <p className="text-sm text-neutral-600">No forced migration. Your spreadsheets stay in control.</p>
            </div>
            <div className="space-y-2">
              <MapPin className="h-8 w-8 text-green-700" />
              <h3 className="font-semibold">Field-level view</h3>
              <p className="text-sm text-neutral-600">See every field's status, tasks, and history in one place.</p>
            </div>
            <div className="space-y-2">
              <Clock className="h-8 w-8 text-green-700" />
              <h3 className="font-semibold">Daily prioritized plan</h3>
              <p className="text-sm text-neutral-600">Morning, afternoon, and night tasks organized automatically.</p>
            </div>
            <div className="space-y-2">
              <Upload className="h-8 w-8 text-green-700" />
              <h3 className="font-semibold">Fast imports</h3>
              <p className="text-sm text-neutral-600">Parse your data in seconds. See results immediately.</p>
            </div>
            <div className="space-y-2">
              <LayoutDashboard className="h-8 w-8 text-green-700" />
              <h3 className="font-semibold">Single source of truth</h3>
              <p className="text-sm text-neutral-600">Stop juggling scattered notes and messages.</p>
            </div>
            <div className="space-y-2">
              <Download className="h-8 w-8 text-green-700" />
              <h3 className="font-semibold">Always exportable</h3>
              <p className="text-sm text-neutral-600">Download updated CSV files anytime you need them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 lg:px-6 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-green-50 rounded-2xl p-12 border-2 border-green-200">
          <h2 className="text-3xl font-bold">Ready to reduce coordination overhead?</h2>
          <p className="text-xl text-neutral-700">
            Turn your spreadsheets into a live ops plan in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 h-12" onClick={handleUpload}>
              <Upload className="mr-2 h-5 w-5" />
              Upload Spreadsheet
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-12" onClick={handleTryDemo}>
              Try Demo Data
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">C</span>
              </div>
              <span>© 2026 Cropbase. Built for farmers.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neutral-900">Help</a>
              <a href="#" className="hover:text-neutral-900">Documentation</a>
              <a href="#" className="hover:text-neutral-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
