import { useState, useMemo } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Calendar, 
  MapPin, 
  CheckSquare, 
  Upload, 
  FileText, 
  Bell, 
  Settings, 
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  HelpCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { HelpDrawer } from '../HelpDrawer';
import { SearchDropdown } from '../SearchDropdown';
import { DataFreshnessModal } from '../DataFreshnessModal';
import { useApp } from '../../store/AppContext';

const navItems = [
  { path: '/app', label: 'Overview', icon: LayoutDashboard },
  { path: '/app/today', label: 'Today Plan', icon: Calendar },
  { path: '/app/fields', label: 'Fields', icon: MapPin },
  { path: '/app/tasks', label: 'Tasks', icon: CheckSquare },
  { path: '/app/imports', label: 'Imports', icon: Upload },
  { path: '/app/reports', label: 'Reports', icon: FileText },
  { path: '/app/alerts', label: 'Alerts', icon: Bell },
  { path: '/app/settings', label: 'Settings', icon: Settings },
];

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [helpDrawerOpen, setHelpDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dataFreshnessOpen, setDataFreshnessOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useApp();

  const unreadCount = state.notifications.filter(n => !n.read).length;

  const importAgo = useMemo(() => {
    const importDate = new Date(state.lastImportTime);
    const now = new Date('2026-02-14T12:02:00'); // simulated now
    const diffMs = now.getTime() - importDate.getTime();
    const mins = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }, [state.lastImportTime]);

  const isActive = (path: string) => {
    if (path === '/app') {
      return location.pathname === '/app';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <Link to="/app" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline">Cropbase</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                  {state.farmSettings.farmName}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>{state.farmSettings.farmName}</DropdownMenuItem>
                <DropdownMenuItem>Switch farm...</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden md:flex items-center gap-2 text-sm text-neutral-600">
              <MapPin className="h-4 w-4" />
              <span>{state.farmSettings.location}</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setDataFreshnessOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-md text-sm text-green-700 hover:bg-green-100 transition-colors cursor-pointer"
            >
              <Upload className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Last import</span>
              <span className="font-medium">{importAgo}</span>
            </button>

            <div className="hidden md:block relative">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" 
              />
              <Input
                placeholder="Search fields, tasks..."
                className="pl-9 h-9 w-64"
                onFocus={() => setSearchOpen(true)}
              />
              <SearchDropdown isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            </div>

            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setHelpDrawerOpen(true)}
              title="Help"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-3 py-2 border-b">
                  <span className="font-semibold text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <button 
                      className="text-xs text-green-700 hover:underline"
                      onClick={() => dispatch({ type: 'NOTIFICATIONS_MARK_ALL_READ' })}
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                {state.notifications.slice(0, 5).map(n => (
                  <DropdownMenuItem 
                    key={n.id} 
                    className={`flex flex-col items-start gap-1 ${!n.read ? 'bg-blue-50' : ''}`}
                    onClick={() => dispatch({ type: 'NOTIFICATION_MARK_READ', payload: n.id })}
                  >
                    <span className="text-sm">{n.message}</span>
                    <span className="text-xs text-neutral-500">
                      {new Date(n.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64
            bg-white border-r border-neutral-200 transition-transform duration-200
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                    ${active 
                      ? 'bg-green-50 text-green-900 font-medium' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Modals and Drawers */}
      <HelpDrawer open={helpDrawerOpen} onOpenChange={setHelpDrawerOpen} />
      <DataFreshnessModal open={dataFreshnessOpen} onOpenChange={setDataFreshnessOpen} />
    </div>
  );
}