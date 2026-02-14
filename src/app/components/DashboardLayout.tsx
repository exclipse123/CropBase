import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router';
import { 
  LayoutDashboard, 
  CalendarClock, 
  MapPin, 
  CheckSquare, 
  Upload, 
  FileBarChart, 
  Bell, 
  Settings, 
  Search, 
  Menu, 
  X,
  ChevronDown,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Today Plan', href: '/dashboard/today', icon: CalendarClock },
  { name: 'Fields', href: '/dashboard/fields', icon: MapPin },
  { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { name: 'Imports', href: '/dashboard/imports', icon: Upload },
  { name: 'Reports', href: '/dashboard/reports', icon: FileBarChart },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavContent = () => (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex h-screen flex-col bg-neutral-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-neutral-200 bg-white px-4 lg:px-6">
        {/* Mobile menu toggle */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center border-b border-neutral-200 px-6">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
                  <span className="font-bold text-white text-sm">CB</span>
                </div>
                <span className="font-bold text-lg">Cropbase</span>
              </Link>
            </div>
            <NavContent />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/dashboard" className="hidden lg:flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
            <span className="font-bold text-white text-sm">CB</span>
          </div>
          <span className="font-bold text-lg">Cropbase</span>
        </Link>

        {/* Farm dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              Aggie Demo Farm
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Aggie Demo Farm</DropdownMenuItem>
            <DropdownMenuItem disabled>Add new farm...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Location chip */}
        <div className="hidden md:flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-xs text-neutral-700">
          <MapPin className="h-3.5 w-3.5" />
          <span>Central Valley, CA</span>
        </div>

        {/* Last import chip */}
        <Link to="/dashboard/imports">
          <Badge variant="outline" className="hidden md:flex gap-1.5 cursor-pointer hover:bg-neutral-100">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Last import 2 hours ago
          </Badge>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Global search */}
        <div className="relative hidden lg:block w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            type="search"
            placeholder="Search fields, tasks..."
            className="pl-9 bg-neutral-50 border-neutral-200"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Account settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-neutral-200 bg-white">
          <NavContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
