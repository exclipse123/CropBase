export interface Field {
  id: string;
  name: string;
  crop: string;
  variety?: string;
  stage: string;
  acreage: number;
  irrigationType: string;
  plantingDate: string;
  status: 'normal' | 'attention' | 'blocked' | 'overdue' | 'watch';
  nextTask?: string;
  nextTaskDue?: string;
  overdueCount: number;
}

export interface Task {
  id: string;
  title: string;
  fieldId: string;
  field: string;
  category: 'irrigation' | 'fertilization' | 'spray' | 'scout' | 'harvest' | 'maintenance' | 'planting';
  dueDate: string;
  window?: 'morning' | 'afternoon' | 'night';
  status: 'todo' | 'inprogress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  notes?: string;
  blocked?: boolean;
  blockReason?: string;
  overdue?: boolean;
  assignee?: string;
  createdFrom?: string;
  movedReason?: string;
}

export interface Note {
  id: string;
  fieldId: string;
  content: string;
  timestamp: string;
  tags?: string[];
  author?: string;
}

export interface ImportRecord {
  id: string;
  fileName: string;
  uploadedTime: string;
  rowsParsed: number;
  fieldsDetected: number;
  tasksCreated: number;
  status: 'success' | 'partial' | 'failed';
}

export interface ChangeItem {
  id: string;
  type: 'moved' | 'overdue' | 'blocked' | 'imported' | 'updated';
  description: string;
  timestamp: string;
  fieldId?: string;
  taskId?: string;
}

// Mock data for Aggie Demo Farm
export const demoFields: Field[] = [
  {
    id: 'field-a',
    name: 'Field A',
    crop: 'Rice',
    variety: 'CalRose',
    stage: 'Heading',
    acreage: 45,
    irrigationType: 'Flood irrigation',
    plantingDate: '2026-01-15',
    status: 'attention',
    nextTask: 'Check flood levels',
    nextTaskDue: '2026-02-14',
    overdueCount: 2
  },
  {
    id: 'field-b',
    name: 'Field B',
    crop: 'Corn',
    variety: 'Sweet Gold',
    stage: 'Tasseling',
    acreage: 32,
    irrigationType: 'Drip irrigation',
    plantingDate: '2026-01-10',
    status: 'blocked',
    nextTask: 'Apply nitrogen',
    nextTaskDue: '2026-02-15',
    overdueCount: 0
  },
  {
    id: 'field-c',
    name: 'Field C',
    crop: 'Tomatoes',
    variety: 'Roma',
    stage: 'Vegetative',
    acreage: 18,
    irrigationType: 'Overhead irrigation',
    plantingDate: '2026-01-20',
    status: 'normal',
    nextTask: 'Scout for pests',
    nextTaskDue: '2026-02-16',
    overdueCount: 0
  },
  {
    id: 'field-d',
    name: 'Field D',
    crop: 'Alfalfa',
    stage: 'Regrowth',
    acreage: 60,
    irrigationType: 'Pivot',
    plantingDate: '2025-11-05',
    status: 'overdue',
    nextTask: 'Cut hay',
    nextTaskDue: '2026-02-12',
    overdueCount: 3
  },
  {
    id: 'field-e',
    name: 'Field E',
    crop: 'Orchards',
    variety: 'Almonds',
    stage: 'Fruit set',
    acreage: 25,
    irrigationType: 'Micro-sprinkler',
    plantingDate: '2023-03-20',
    status: 'watch',
    nextTask: 'Inspect bloom',
    nextTaskDue: '2026-02-14',
    overdueCount: 1
  },
  {
    id: 'field-f',
    name: 'Field F',
    crop: 'Wheat',
    variety: 'Hard Red',
    stage: 'Tillering',
    acreage: 55,
    irrigationType: 'Drip irrigation',
    plantingDate: '2025-12-01',
    status: 'normal',
    nextTask: 'Monitor soil moisture',
    nextTaskDue: '2026-02-17',
    overdueCount: 0
  }
];

export const demoTasks: Task[] = [
  // Today Morning
  {
    id: 'task-1',
    title: 'Check flood levels',
    fieldId: 'field-a',
    field: 'Field A',
    category: 'irrigation',
    dueDate: '2026-02-14',
    window: 'morning',
    status: 'todo',
    priority: 'high',
    notes: 'Water level should be 3-4 inches above soil',
    overdue: false
  },
  {
    id: 'task-2',
    title: 'Scout for aphids',
    fieldId: 'field-c',
    field: 'Field C',
    category: 'scout',
    dueDate: '2026-02-14',
    window: 'morning',
    status: 'todo',
    priority: 'medium',
    notes: 'Focus on lower leaves',
    overdue: false
  },
  {
    id: 'task-3',
    title: 'Inspect bloom health',
    fieldId: 'field-e',
    field: 'Field E',
    category: 'scout',
    dueDate: '2026-02-14',
    window: 'morning',
    status: 'inprogress',
    priority: 'medium',
    notes: 'Check for frost damage',
    overdue: false
  },
  // Today Afternoon
  {
    id: 'task-4',
    title: 'Apply nitrogen fertilizer',
    fieldId: 'field-b',
    field: 'Field B',
    category: 'fertilization',
    dueDate: '2026-02-14',
    window: 'afternoon',
    status: 'todo',
    priority: 'high',
    blocked: true,
    blockReason: 'Wind speed too high',
    notes: 'Wait for wind to drop below 10mph',
    overdue: false
  },
  {
    id: 'task-5',
    title: 'Adjust drip emitters',
    fieldId: 'field-f',
    field: 'Field F',
    category: 'irrigation',
    dueDate: '2026-02-14',
    window: 'afternoon',
    status: 'todo',
    priority: 'medium',
    notes: 'Zone 3 needs adjustment',
    overdue: false
  },
  {
    id: 'task-6',
    title: 'Check pivot rotation',
    fieldId: 'field-d',
    field: 'Field D',
    category: 'maintenance',
    dueDate: '2026-02-14',
    window: 'afternoon',
    status: 'todo',
    priority: 'low',
    notes: 'Run full cycle test',
    overdue: false
  },
  // Today Night
  {
    id: 'task-7',
    title: 'Run irrigation cycle',
    fieldId: 'field-c',
    field: 'Field C',
    category: 'irrigation',
    dueDate: '2026-02-14',
    window: 'night',
    status: 'todo',
    priority: 'high',
    notes: '4 hour cycle starting 10pm',
    overdue: false
  },
  // Overdue
  {
    id: 'task-8',
    title: 'Cut hay - first pass',
    fieldId: 'field-d',
    field: 'Field D',
    category: 'harvest',
    dueDate: '2026-02-12',
    status: 'todo',
    priority: 'critical',
    overdue: true,
    notes: 'Weather delayed from Tuesday',
    movedReason: 'Moved due to rain'
  },
  {
    id: 'task-9',
    title: 'Refill flood basin',
    fieldId: 'field-a',
    field: 'Field A',
    category: 'irrigation',
    dueDate: '2026-02-13',
    status: 'todo',
    priority: 'high',
    overdue: true,
    notes: 'Water order confirmed'
  },
  {
    id: 'task-10',
    title: 'Prune damaged branches',
    fieldId: 'field-e',
    field: 'Field E',
    category: 'maintenance',
    dueDate: '2026-02-13',
    status: 'inprogress',
    priority: 'medium',
    overdue: true,
    notes: 'North section priority'
  },
  // Tomorrow
  {
    id: 'task-11',
    title: 'Scout for corn borers',
    fieldId: 'field-b',
    field: 'Field B',
    category: 'scout',
    dueDate: '2026-02-15',
    window: 'morning',
    status: 'todo',
    priority: 'medium',
    notes: 'Sample 20 plants',
    createdFrom: 'Import: weekly-plan.xlsx'
  },
  {
    id: 'task-12',
    title: 'Monitor soil moisture',
    fieldId: 'field-f',
    field: 'Field F',
    category: 'scout',
    dueDate: '2026-02-15',
    window: 'morning',
    status: 'todo',
    priority: 'low',
    notes: 'Check probe readings'
  },
  {
    id: 'task-13',
    title: 'Spray fungicide',
    fieldId: 'field-c',
    field: 'Field C',
    category: 'spray',
    dueDate: '2026-02-15',
    window: 'afternoon',
    status: 'todo',
    priority: 'high',
    notes: 'Apply before rain forecast',
    createdFrom: 'Import: weekly-plan.xlsx'
  },
  // This week
  {
    id: 'task-14',
    title: 'Test soil pH levels',
    fieldId: 'field-a',
    field: 'Field A',
    category: 'scout',
    dueDate: '2026-02-16',
    status: 'todo',
    priority: 'low',
    notes: 'Send samples to lab'
  },
  {
    id: 'task-15',
    title: 'Replace broken sprinkler heads',
    fieldId: 'field-e',
    field: 'Field E',
    category: 'maintenance',
    dueDate: '2026-02-16',
    status: 'todo',
    priority: 'medium',
    notes: 'Order parts first'
  },
  {
    id: 'task-16',
    title: 'Clean filters',
    fieldId: 'field-f',
    field: 'Field F',
    category: 'maintenance',
    dueDate: '2026-02-17',
    status: 'todo',
    priority: 'low',
    notes: 'Monthly maintenance'
  },
  {
    id: 'task-17',
    title: 'Scout for weeds',
    fieldId: 'field-b',
    field: 'Field B',
    category: 'scout',
    dueDate: '2026-02-17',
    status: 'todo',
    priority: 'medium',
    notes: 'Early detection critical'
  },
  {
    id: 'task-18',
    title: 'Harvest tomatoes - test batch',
    fieldId: 'field-c',
    field: 'Field C',
    category: 'harvest',
    dueDate: '2026-02-18',
    status: 'todo',
    priority: 'high',
    notes: 'Sample 100 lbs for market test'
  },
  {
    id: 'task-19',
    title: 'Service pivot motor',
    fieldId: 'field-d',
    field: 'Field D',
    category: 'maintenance',
    dueDate: '2026-02-18',
    status: 'todo',
    priority: 'medium',
    notes: 'Annual service due'
  },
  {
    id: 'task-20',
    title: 'Apply compost',
    fieldId: 'field-e',
    field: 'Field E',
    category: 'fertilization',
    dueDate: '2026-02-19',
    status: 'todo',
    priority: 'low',
    notes: '2 tons total'
  },
  // Later
  {
    id: 'task-21',
    title: 'Update irrigation schedule',
    fieldId: 'field-a',
    field: 'Field A',
    category: 'irrigation',
    dueDate: '2026-02-20',
    status: 'todo',
    priority: 'low',
    notes: 'Adjust for warmer temps'
  },
  {
    id: 'task-22',
    title: 'Soil amendment application',
    fieldId: 'field-c',
    field: 'Field C',
    category: 'fertilization',
    dueDate: '2026-02-21',
    status: 'todo',
    priority: 'medium',
    notes: 'Calcium boost needed'
  },
  {
    id: 'task-23',
    title: 'Pollination check',
    fieldId: 'field-e',
    field: 'Field E',
    category: 'scout',
    dueDate: '2026-02-22',
    status: 'todo',
    priority: 'high',
    notes: 'Count bee activity'
  },
  {
    id: 'task-24',
    title: 'Calibrate sprayer',
    fieldId: 'field-b',
    field: 'Field B',
    category: 'maintenance',
    dueDate: '2026-02-22',
    status: 'todo',
    priority: 'medium',
    notes: 'Before next application'
  },
  {
    id: 'task-25',
    title: 'Plan crop rotation',
    fieldId: 'field-d',
    field: 'Field D',
    category: 'planting',
    dueDate: '2026-02-23',
    status: 'todo',
    priority: 'low',
    notes: 'Consider legumes next'
  }
];

export const demoNotes: Note[] = [
  {
    id: 'note-1',
    fieldId: 'field-a',
    content: 'Water level dropped faster than expected. Check for leaks in berm.',
    timestamp: '2026-02-13T14:30:00',
    tags: ['irrigation', 'maintenance'],
    author: 'Maria'
  },
  {
    id: 'note-2',
    fieldId: 'field-a',
    content: 'pH test shows 6.2, within acceptable range',
    timestamp: '2026-02-11T09:15:00',
    tags: ['soil'],
    author: 'Jake'
  },
  {
    id: 'note-3',
    fieldId: 'field-b',
    content: 'Wind advisory through Friday. Postpone any spray applications.',
    timestamp: '2026-02-14T07:00:00',
    tags: ['weather', 'spray'],
    author: 'System'
  },
  {
    id: 'note-4',
    fieldId: 'field-c',
    content: 'First tomatoes showing color. Harvest in 7-10 days.',
    timestamp: '2026-02-13T16:45:00',
    tags: ['harvest', 'scout'],
    author: 'Maria'
  },
  {
    id: 'note-5',
    fieldId: 'field-c',
    content: 'Minor aphid pressure on east side. Keep monitoring.',
    timestamp: '2026-02-12T10:20:00',
    tags: ['pest', 'scout'],
    author: 'Jake'
  },
  {
    id: 'note-6',
    fieldId: 'field-d',
    content: 'Hay cutting delayed 2 days due to rain. Moisture still high.',
    timestamp: '2026-02-13T08:00:00',
    tags: ['harvest', 'weather'],
    author: 'Maria'
  },
  {
    id: 'note-7',
    fieldId: 'field-e',
    content: 'Bee hives moved into position. Good pollinator activity observed.',
    timestamp: '2026-02-10T15:30:00',
    tags: ['pollination'],
    author: 'Jake'
  },
  {
    id: 'note-8',
    fieldId: 'field-e',
    content: 'Light frost damage on 3 trees in NW corner. Minimal impact expected.',
    timestamp: '2026-02-09T07:45:00',
    tags: ['weather', 'damage'],
    author: 'Maria'
  },
  {
    id: 'note-9',
    fieldId: 'field-f',
    content: 'Drip system zone 3 has low pressure. Scheduled for repair.',
    timestamp: '2026-02-13T11:00:00',
    tags: ['irrigation', 'maintenance'],
    author: 'Jake'
  }
];

export const demoImports: ImportRecord[] = [
  {
    id: 'import-1',
    fileName: 'weekly-plan.xlsx',
    uploadedTime: '2026-02-14T05:00:00',
    rowsParsed: 48,
    fieldsDetected: 6,
    tasksCreated: 12,
    status: 'success'
  },
  {
    id: 'import-2',
    fileName: 'field-notes-feb.csv',
    uploadedTime: '2026-02-13T18:30:00',
    rowsParsed: 23,
    fieldsDetected: 6,
    tasksCreated: 5,
    status: 'success'
  },
  {
    id: 'import-3',
    fileName: 'irrigation-schedule.xlsx',
    uploadedTime: '2026-02-12T09:15:00',
    rowsParsed: 35,
    fieldsDetected: 5,
    tasksCreated: 8,
    status: 'partial'
  },
  {
    id: 'import-4',
    fileName: 'january-summary.csv',
    uploadedTime: '2026-02-01T14:00:00',
    rowsParsed: 156,
    fieldsDetected: 6,
    tasksCreated: 34,
    status: 'success'
  }
];

export const demoChanges: ChangeItem[] = [
  {
    id: 'change-1',
    type: 'moved',
    description: 'Task "Cut hay - first pass" moved due to rain',
    timestamp: '2026-02-14T06:30:00',
    fieldId: 'field-d',
    taskId: 'task-8'
  },
  {
    id: 'change-2',
    type: 'blocked',
    description: 'Spray blocked by wind in Field B',
    timestamp: '2026-02-14T07:00:00',
    fieldId: 'field-b',
    taskId: 'task-4'
  },
  {
    id: 'change-3',
    type: 'imported',
    description: 'Import added 4 new tasks from weekly-plan.xlsx',
    timestamp: '2026-02-14T05:00:00'
  },
  {
    id: 'change-4',
    type: 'overdue',
    description: 'New overdue task: Refill flood basin',
    timestamp: '2026-02-14T00:00:00',
    fieldId: 'field-a',
    taskId: 'task-9'
  },
  {
    id: 'change-5',
    type: 'updated',
    description: 'Field C: Irrigation cycle extended by 1 hour',
    timestamp: '2026-02-13T22:15:00',
    fieldId: 'field-c'
  }
];

export const getFarmStats = () => {
  const activeFields = demoFields.length;
  const tasksDue24h = demoTasks.filter(t => {
    const due = new Date(t.dueDate);
    const today = new Date('2026-02-14');
    const diff = due.getTime() - today.getTime();
    return diff <= 24 * 60 * 60 * 1000 && diff >= 0 && t.status !== 'done';
  }).length;
  const overdueTasks = demoTasks.filter(t => t.overdue && t.status !== 'done').length;
  const blockedTasks = demoTasks.filter(t => t.blocked && t.status !== 'done').length;
  
  return {
    activeFields,
    tasksDue24h,
    overdueTasks,
    blockedTasks
  };
};

export const getFieldsNeedingAttention = () => {
  return [
    {
      field: demoFields[3], // Field D - Alfalfa
      reason: '3 overdue tasks including critical hay cutting'
    },
    {
      field: demoFields[0], // Field A - Rice
      reason: '2 overdue tasks and flood level concerns'
    },
    {
      field: demoFields[1], // Field B - Corn
      reason: 'Fertilization blocked by wind conditions'
    }
  ];
};
