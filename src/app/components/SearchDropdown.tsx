import { useState } from 'react';
import { Link } from 'react-router';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MapPin, CheckSquare, FileText, Clock } from 'lucide-react';
import { demoFields, demoTasks } from '../data/mockData';

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDropdown({ isOpen, onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredFields = demoFields.filter(f => 
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.crop.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredTasks = demoTasks.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.field.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const recentSearches = ['Field A', 'Irrigation tasks', 'Overdue'];

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-neutral-200 z-50">
        <div className="p-4">
          <Input
            placeholder="Search fields, tasks, notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-4"
            autoFocus
          />

          {query ? (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="fields">Fields</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-2">
                {filteredFields.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 mb-2">FIELDS</p>
                    {filteredFields.map(field => (
                      <Link
                        key={field.id}
                        to={`/app/fields/${field.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2 rounded hover:bg-neutral-50"
                      >
                        <MapPin className="h-4 w-4 text-neutral-400" />
                        <div>
                          <p className="font-medium text-sm">{field.name}</p>
                          <p className="text-xs text-neutral-600">{field.crop} · {field.stage}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                
                {filteredTasks.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-neutral-500 mb-2">TASKS</p>
                    {filteredTasks.map(task => (
                      <Link
                        key={task.id}
                        to="/app/tasks"
                        onClick={onClose}
                        className="flex items-center gap-3 p-2 rounded hover:bg-neutral-50"
                      >
                        <CheckSquare className="h-4 w-4 text-neutral-400" />
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-neutral-600">{task.field} · {task.dueDate}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="fields" className="space-y-2">
                {filteredFields.map(field => (
                  <Link
                    key={field.id}
                    to={`/app/fields/${field.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded hover:bg-neutral-50"
                  >
                    <MapPin className="h-4 w-4 text-neutral-400" />
                    <div>
                      <p className="font-medium text-sm">{field.name}</p>
                      <p className="text-xs text-neutral-600">{field.crop} · {field.stage}</p>
                    </div>
                  </Link>
                ))}
              </TabsContent>

              <TabsContent value="tasks" className="space-y-2">
                {filteredTasks.map(task => (
                  <Link
                    key={task.id}
                    to="/app/tasks"
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded hover:bg-neutral-50"
                  >
                    <CheckSquare className="h-4 w-4 text-neutral-400" />
                    <div>
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-neutral-600">{task.field} · {task.dueDate}</p>
                    </div>
                  </Link>
                ))}
              </TabsContent>
            </Tabs>
          ) : (
            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-2">RECENT SEARCHES</p>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 p-2 rounded hover:bg-neutral-50 w-full text-left"
                    onClick={() => setQuery(search)}
                  >
                    <Clock className="h-4 w-4 text-neutral-400" />
                    <span className="text-sm">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
