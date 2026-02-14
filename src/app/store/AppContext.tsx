import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { demoFields, demoTasks, demoNotes, demoImports, demoChanges } from '../data/mockData';
import type { Field, Task, Note, ImportRecord, ChangeItem } from '../data/mockData';

// ── Types ──────────────────────────────────────────────────────

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface AlertSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  email: string;
  phone: string;
  overdueEnabled: boolean;
  overdueThreshold: string;
  blockedEnabled: boolean;
  freshnessEnabled: boolean;
  freshnessThreshold: string;
  quietStart: string;
  quietEnd: string;
  fieldOverrides: { fieldId: string; fieldName: string; rule: string }[];
}

export interface FarmSettings {
  farmName: string;
  location: string;
  timezone: string;
  units: string;
  owner?: string;
  email?: string;
  notes?: string;
}

export interface MappingTemplate {
  id: string;
  name: string;
  created: string;
  lastUsed: string;
  source?: string;
  columns?: string[];
}

export interface AppState {
  fields: Field[];
  tasks: Task[];
  notes: Note[];
  imports: ImportRecord[];
  changes: ChangeItem[];
  notifications: Notification[];
  alertSettings: AlertSettings;
  farmSettings: FarmSettings;
  mappingTemplates: MappingTemplate[];
  onboardingDismissed: boolean;
  lastImportTime: string;
}

// ── Actions ────────────────────────────────────────────────────

type Action =
  // Tasks
  | { type: 'TASK_CREATE'; payload: Task }
  | { type: 'TASK_UPDATE'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'TASK_DELETE'; payload: string }
  | { type: 'TASK_MARK_DONE'; payload: string }
  | { type: 'TASK_SNOOZE'; payload: { id: string; newDate: string } }
  | { type: 'TASK_BULK_MARK_DONE'; payload: string[] }
  | { type: 'TASK_BULK_DELETE'; payload: string[] }
  // Notes
  | { type: 'NOTE_ADD'; payload: Note }
  | { type: 'NOTE_DELETE'; payload: string }
  // Fields
  | { type: 'FIELD_UPDATE'; payload: { id: string; updates: Partial<Field> } }
  // Imports
  | { type: 'IMPORT_ADD'; payload: ImportRecord }
  | { type: 'IMPORT_DELETE'; payload: string }
  // Changes
  | { type: 'CHANGE_ADD'; payload: ChangeItem }
  // Notifications
  | { type: 'NOTIFICATION_ADD'; payload: Notification }
  | { type: 'NOTIFICATION_MARK_READ'; payload: string }
  | { type: 'NOTIFICATIONS_MARK_ALL_READ' }
  // Settings
  | { type: 'ALERT_SETTINGS_UPDATE'; payload: Partial<AlertSettings> }
  | { type: 'ALERT_SETTINGS_RESET' }
  | { type: 'FARM_SETTINGS_UPDATE'; payload: Partial<FarmSettings> }
  | { type: 'FARM_SETTINGS_RESET' }
  // Mapping templates
  | { type: 'MAPPING_TEMPLATE_ADD'; payload: MappingTemplate }
  | { type: 'MAPPING_TEMPLATE_DELETE'; payload: string }
  // Onboarding
  | { type: 'ONBOARDING_DISMISS' }
  // Import time
  | { type: 'UPDATE_LAST_IMPORT_TIME'; payload: string }
  // Reset to demo
  | { type: 'RESET_TO_DEMO' };

// ── Initial State ──────────────────────────────────────────────

const defaultAlertSettings: AlertSettings = {
  emailEnabled: true,
  smsEnabled: false,
  email: 'manager@aggiedemo.farm',
  phone: '',
  overdueEnabled: true,
  overdueThreshold: '1',
  blockedEnabled: true,
  freshnessEnabled: true,
  freshnessThreshold: '3',
  quietStart: '22:00',
  quietEnd: '07:00',
  fieldOverrides: [
    { fieldId: 'field-d', fieldName: 'Field D - Alfalfa', rule: 'Alert on any task overdue' },
    { fieldId: 'field-e', fieldName: 'Field E - Orchards', rule: 'Alert on weather blocks only' },
  ],
};

const defaultFarmSettings: FarmSettings = {
  farmName: 'Aggie Demo Farm',
  location: 'Central Valley, CA',
  timezone: 'America/Los_Angeles',
  units: 'imperial',
};

const defaultMappingTemplates: MappingTemplate[] = [
  { id: 'template-1', name: 'Weekly Plan Template', created: '2026-02-01', lastUsed: '2026-02-14' },
  { id: 'template-2', name: 'Field Notes Template', created: '2026-01-20', lastUsed: '2026-02-13' },
];

const buildInitialState = (): AppState => ({
  fields: [...demoFields],
  tasks: [...demoTasks],
  notes: [...demoNotes],
  imports: [...demoImports],
  changes: [...demoChanges],
  notifications: [
    { id: 'n1', message: 'Import completed: weekly-plan.xlsx', timestamp: '2026-02-14T10:00:00', read: false, type: 'success' },
    { id: 'n2', message: '3 tasks are now overdue', timestamp: '2026-02-14T08:00:00', read: false, type: 'warning' },
    { id: 'n3', message: 'Nitrogen application blocked by wind', timestamp: '2026-02-14T07:00:00', read: false, type: 'error' },
  ],
  alertSettings: { ...defaultAlertSettings },
  farmSettings: { ...defaultFarmSettings },
  mappingTemplates: [...defaultMappingTemplates],
  onboardingDismissed: false,
  lastImportTime: '2026-02-14T12:00:00',
});

// ── Persistence ────────────────────────────────────────────────

const STORAGE_KEY = 'cropbase-state';

function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults so new keys added in future are always present
      return { ...buildInitialState(), ...parsed };
    }
  } catch {
    // ignore corrupted state
  }
  return buildInitialState();
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded – ignore
  }
}

// ── Helpers ────────────────────────────────────────────────────

function recomputeFieldStats(fields: Field[], tasks: Task[]): Field[] {
  return fields.map(field => {
    const fieldTasks = tasks.filter(t => t.fieldId === field.id);
    const overdueTasks = fieldTasks.filter(t => t.overdue && t.status !== 'done');
    const activeTasks = fieldTasks.filter(t => t.status !== 'done').sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    const nextTask = activeTasks[0];
    const hasBlocked = fieldTasks.some(t => t.blocked && t.status !== 'done');
    
    let status: Field['status'] = 'normal';
    if (overdueTasks.length > 0) status = 'overdue';
    else if (hasBlocked) status = 'blocked';
    else if (overdueTasks.length > 0 || activeTasks.some(t => t.priority === 'critical' || t.priority === 'high')) status = 'attention';
    // Keep existing watch status
    if (field.status === 'watch' && status === 'normal') status = 'watch';
    
    return {
      ...field,
      overdueCount: overdueTasks.length,
      nextTask: nextTask?.title || undefined,
      nextTaskDue: nextTask?.dueDate || undefined,
      status,
    };
  });
}

let nextId = Date.now();
export function generateId(prefix: string) {
  return `${prefix}-${++nextId}`;
}

// ── Reducer ────────────────────────────────────────────────────

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    // ─── Tasks ───────────────────────
    case 'TASK_CREATE': {
      const tasks = [...state.tasks, action.payload];
      return { ...state, tasks, fields: recomputeFieldStats(state.fields, tasks) };
    }
    case 'TASK_UPDATE': {
      const tasks = state.tasks.map(t => t.id === action.payload.id ? { ...t, ...action.payload.updates } : t);
      return { ...state, tasks, fields: recomputeFieldStats(state.fields, tasks) };
    }
    case 'TASK_DELETE': {
      const tasks = state.tasks.filter(t => t.id !== action.payload);
      return { ...state, tasks, fields: recomputeFieldStats(state.fields, tasks) };
    }
    case 'TASK_MARK_DONE': {
      const tasks = state.tasks.map(t => t.id === action.payload ? { ...t, status: 'done' as const, overdue: false, blocked: false } : t);
      const change: ChangeItem = {
        id: generateId('change'),
        type: 'updated',
        description: `Task "${state.tasks.find(t => t.id === action.payload)?.title}" marked as done`,
        timestamp: new Date().toISOString(),
        taskId: action.payload,
      };
      return { ...state, tasks, changes: [change, ...state.changes], fields: recomputeFieldStats(state.fields, tasks) };
    }
    case 'TASK_SNOOZE': {
      const tasks = state.tasks.map(t => t.id === action.payload.id ? { ...t, dueDate: action.payload.newDate, overdue: false, movedReason: 'Snoozed' } : t);
      const change: ChangeItem = {
        id: generateId('change'),
        type: 'moved',
        description: `Task "${state.tasks.find(t => t.id === action.payload.id)?.title}" snoozed to ${action.payload.newDate}`,
        timestamp: new Date().toISOString(),
        taskId: action.payload.id,
      };
      return { ...state, tasks, changes: [change, ...state.changes], fields: recomputeFieldStats(state.fields, tasks) };
    }
    case 'TASK_BULK_MARK_DONE': {
      const ids = new Set(action.payload);
      const tasks = state.tasks.map(t => ids.has(t.id) ? { ...t, status: 'done' as const, overdue: false, blocked: false } : t);
      const change: ChangeItem = {
        id: generateId('change'),
        type: 'updated',
        description: `${action.payload.length} tasks marked as done`,
        timestamp: new Date().toISOString(),
      };
      return { ...state, tasks, changes: [change, ...state.changes], fields: recomputeFieldStats(state.fields, tasks) };
    }
    case 'TASK_BULK_DELETE': {
      const ids = new Set(action.payload);
      const tasks = state.tasks.filter(t => !ids.has(t.id));
      return { ...state, tasks, fields: recomputeFieldStats(state.fields, tasks) };
    }

    // ─── Notes ───────────────────────
    case 'NOTE_ADD':
      return { ...state, notes: [action.payload, ...state.notes] };
    case 'NOTE_DELETE':
      return { ...state, notes: state.notes.filter(n => n.id !== action.payload) };

    // ─── Fields ──────────────────────
    case 'FIELD_UPDATE': {
      const fields = state.fields.map(f => f.id === action.payload.id ? { ...f, ...action.payload.updates } : f);
      return { ...state, fields: recomputeFieldStats(fields, state.tasks) };
    }

    // ─── Imports ─────────────────────
    case 'IMPORT_ADD':
      return { ...state, imports: [action.payload, ...state.imports], lastImportTime: action.payload.uploadedTime };
    case 'IMPORT_DELETE':
      return { ...state, imports: state.imports.filter(i => i.id !== action.payload) };

    // ─── Changes ─────────────────────
    case 'CHANGE_ADD':
      return { ...state, changes: [action.payload, ...state.changes] };

    // ─── Notifications ───────────────
    case 'NOTIFICATION_ADD':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'NOTIFICATION_MARK_READ':
      return { ...state, notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n) };
    case 'NOTIFICATIONS_MARK_ALL_READ':
      return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };

    // ─── Alert Settings ──────────────
    case 'ALERT_SETTINGS_UPDATE':
      return { ...state, alertSettings: { ...state.alertSettings, ...action.payload } };
    case 'ALERT_SETTINGS_RESET':
      return { ...state, alertSettings: { ...defaultAlertSettings } };

    // ─── Farm Settings ───────────────
    case 'FARM_SETTINGS_UPDATE':
      return { ...state, farmSettings: { ...state.farmSettings, ...action.payload } };
    case 'FARM_SETTINGS_RESET':
      return { ...state, farmSettings: { ...defaultFarmSettings } };

    // ─── Templates ───────────────────
    case 'MAPPING_TEMPLATE_ADD':
      return { ...state, mappingTemplates: [...state.mappingTemplates, action.payload] };
    case 'MAPPING_TEMPLATE_DELETE':
      return { ...state, mappingTemplates: state.mappingTemplates.filter(t => t.id !== action.payload) };

    // ─── Onboarding ──────────────────
    case 'ONBOARDING_DISMISS':
      return { ...state, onboardingDismissed: true };

    // ─── Import time ─────────────────
    case 'UPDATE_LAST_IMPORT_TIME':
      return { ...state, lastImportTime: action.payload };

    // ─── Reset ───────────────────────
    case 'RESET_TO_DEMO': {
      localStorage.removeItem(STORAGE_KEY);
      return buildInitialState();
    }

    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  // Convenience helpers
  getField: (id: string) => Field | undefined;
  getFieldTasks: (fieldId: string) => Task[];
  getFieldNotes: (fieldId: string) => Note[];
  getFarmStats: () => { activeFields: number; tasksDue24h: number; overdueTasks: number; blockedTasks: number };
  getFieldsNeedingAttention: () => { field: Field; reason: string }[];
  exportCSV: (data: Record<string, unknown>[], filename: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, loadState);

  // Persist on every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const getField = useCallback((id: string) => state.fields.find(f => f.id === id), [state.fields]);

  const getFieldTasks = useCallback((fieldId: string) => state.tasks.filter(t => t.fieldId === fieldId), [state.tasks]);

  const getFieldNotes = useCallback((fieldId: string) => state.notes.filter(n => n.fieldId === fieldId), [state.notes]);

  const getFarmStats = useCallback(() => {
    const activeFields = state.fields.length;
    const todayStr = '2026-02-14'; // simulated "today"
    const tasksDue24h = state.tasks.filter(t => {
      const due = new Date(t.dueDate);
      const today = new Date(todayStr);
      const diff = due.getTime() - today.getTime();
      return diff <= 24 * 60 * 60 * 1000 && diff >= 0 && t.status !== 'done';
    }).length;
    const overdueTasks = state.tasks.filter(t => t.overdue && t.status !== 'done').length;
    const blockedTasks = state.tasks.filter(t => t.blocked && t.status !== 'done').length;
    return { activeFields, tasksDue24h, overdueTasks, blockedTasks };
  }, [state.tasks, state.fields]);

  const getFieldsNeedingAttention = useCallback(() => {
    return state.fields
      .filter(f => f.status !== 'normal')
      .sort((a, b) => b.overdueCount - a.overdueCount)
      .slice(0, 3)
      .map(field => {
        const fieldTasks = state.tasks.filter(t => t.fieldId === field.id);
        const overdue = fieldTasks.filter(t => t.overdue && t.status !== 'done').length;
        const blocked = fieldTasks.filter(t => t.blocked && t.status !== 'done').length;
        let reason = '';
        if (overdue > 0) reason += `${overdue} overdue task${overdue > 1 ? 's' : ''}`;
        if (blocked > 0) reason += `${reason ? ', ' : ''}${blocked} blocked task${blocked > 1 ? 's' : ''}`;
        if (!reason) reason = `Status: ${field.status}`;
        return { field, reason };
      });
  }, [state.fields, state.tasks]);

  const exportCSV = useCallback((data: Record<string, unknown>[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => headers.map(h => {
        const val = String(row[h] ?? '');
        // Escape commas and quotes
        if (val.includes(',') || val.includes('"') || val.includes('\n')) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(','))
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, getField, getFieldTasks, getFieldNotes, getFarmStats, getFieldsNeedingAttention, exportCSV }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
