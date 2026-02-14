import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Upload, LayoutDashboard, Download, Clock, MapPin, FileSpreadsheet,
  ArrowRight, Sparkles, CheckCircle2, Zap, BarChart3, Shield, Wand2,
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const handleTryDemo = () => {
    navigate('/app');
  };

  const handleUpload = () => {
    navigate('/app/upload');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-green-700 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Cropbase</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-neutral-500" asChild>
              <Link to="/app">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-green-700 hover:bg-green-800 shadow-sm" onClick={handleUpload}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative container mx-auto px-4 lg:px-6 pt-20 lg:pt-32 pb-16 lg:pb-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium bg-green-50 text-green-700 border-green-200">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              From spreadsheet to dashboard in 2 minutes
            </Badge>

            <div className="space-y-5">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                Turn farm spreadsheets into
                <span className="bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent"> a daily ops plan</span>
              </h1>
              <p className="text-lg lg:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                Upload any Excel or CSV. Get a live dashboard, today's task plan, and export back anytime. No migration needed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
              <Button size="lg" className="text-base px-8 h-13 bg-green-700 hover:bg-green-800 shadow-lg shadow-green-700/20 rounded-xl" onClick={handleUpload}>
                <Upload className="mr-2 h-5 w-5" />
                Upload Spreadsheet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 h-13 rounded-xl border-neutral-300" onClick={handleTryDemo}>
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Try Demo Data
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-neutral-400 pt-2">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Free to use</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> No account needed</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Works offline</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fake Dashboard Preview */}
      <section className="container mx-auto px-4 lg:px-6 -mt-4 mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-950 shadow-2xl shadow-neutral-900/20 p-1">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-neutral-500 font-mono">cropbase.app/dashboard</span>
            </div>
            <div className="rounded-xl bg-white overflow-hidden">
              <div className="grid grid-cols-4 gap-3 p-4">
                {[
                  { label: 'Total Fields', value: '6', sub: 'Active', color: 'text-green-600' },
                  { label: 'Tasks Today', value: '12', sub: 'Due now', color: 'text-blue-600' },
                  { label: 'Overdue', value: '3', sub: 'Need attention', color: 'text-red-500' },
                  { label: 'Acreage', value: '220', sub: 'Managed', color: 'text-amber-600' },
                ].map(kpi => (
                  <div key={kpi.label} className="bg-neutral-50 rounded-xl p-3.5">
                    <p className="text-xs text-neutral-400 font-medium">{kpi.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{kpi.sub}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 pb-4">
                <div className="rounded-xl border border-neutral-100 overflow-hidden">
                  <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-600">Today's Tasks</span>
                    <span className="text-xs text-neutral-400">Feb 14, 2026</span>
                  </div>
                  {[
                    { task: 'Check flood levels — Field A', badge: 'High', badgeColor: 'bg-orange-100 text-orange-700' },
                    { task: 'Apply nitrogen fertilizer — Field B', badge: 'High', badgeColor: 'bg-orange-100 text-orange-700' },
                    { task: 'Scout for aphids — Field C', badge: 'Medium', badgeColor: 'bg-yellow-100 text-yellow-700' },
                  ].map((row, i) => (
                    <div key={i} className="px-4 py-2.5 flex items-center justify-between border-b border-neutral-50 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border-2 border-neutral-300" />
                        <span className="text-sm text-neutral-700">{row.task}</span>
                      </div>
                      <Badge className={`text-[10px] ${row.badgeColor}`}>{row.badge}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — horizontal pills */}
      <section className="container mx-auto px-4 lg:px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Three steps. Two minutes.</h2>
            <p className="text-neutral-500 mt-3 text-lg">From Excel file to live operations dashboard.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01', icon: <Upload className="h-6 w-6" />,
                title: 'Drop your spreadsheet',
                desc: 'Drag any Excel, CSV, or TSV file. We auto-detect columns, fields, and task data.',
                accent: 'from-green-500 to-emerald-500',
              },
              {
                step: '02', icon: <Wand2 className="h-6 w-6" />,
                title: 'AI maps your columns',
                desc: 'Smart column matching pairs your data to fields, tasks, priorities, and due dates.',
                accent: 'from-blue-500 to-cyan-500',
              },
              {
                step: '03', icon: <LayoutDashboard className="h-6 w-6" />,
                title: 'Dashboard is live',
                desc: 'Instant operational view with today\'s plan, overdue alerts, and field status.',
                accent: 'from-amber-500 to-orange-500',
              },
            ].map(item => (
              <div key={item.step} className="group relative rounded-2xl border border-neutral-200 p-6 hover:border-neutral-300 hover:shadow-lg transition-all duration-200">
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${item.accent} text-white mb-4 shadow-sm`}>
                  {item.icon}
                </div>
                <span className="absolute top-5 right-5 text-xs font-mono text-neutral-300 font-bold">{item.step}</span>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature highlights — compact */}
      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="container mx-auto px-4 lg:px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              {[
                { icon: <FileSpreadsheet className="h-5 w-5" />, title: 'Keep using Excel', desc: 'No forced migration.' },
                { icon: <MapPin className="h-5 w-5" />, title: 'Field-level view', desc: 'Status, tasks, history per field.' },
                { icon: <Clock className="h-5 w-5" />, title: 'Daily plan', desc: 'Morning, afternoon, night tasks.' },
                { icon: <Zap className="h-5 w-5" />, title: 'Fast imports', desc: 'Parse data in seconds.' },
                { icon: <BarChart3 className="h-5 w-5" />, title: 'Reports & exports', desc: 'Download CSV anytime.' },
                { icon: <Shield className="h-5 w-5" />, title: 'Works offline', desc: 'Runs entirely in your browser.' },
              ].map(f => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="mt-0.5 text-green-600">{f.icon}</div>
                  <div>
                    <p className="font-medium text-sm">{f.title}</p>
                    <p className="text-xs text-neutral-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 lg:px-6 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Ready to try it?</h2>
          <p className="text-lg text-neutral-500">
            Upload a spreadsheet and see your farm dashboard in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button size="lg" className="text-base px-8 h-13 bg-green-700 hover:bg-green-800 shadow-lg shadow-green-700/20 rounded-xl" onClick={handleUpload}>
              <Upload className="mr-2 h-5 w-5" />
              Upload Spreadsheet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-13 rounded-xl border-neutral-300" onClick={handleTryDemo}>
              Try Demo Data
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-green-700 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">C</span>
              </div>
              <span>© 2026 Cropbase</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neutral-700 transition-colors">Help</a>
              <a href="#" className="hover:text-neutral-700 transition-colors">Docs</a>
              <a href="#" className="hover:text-neutral-700 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
