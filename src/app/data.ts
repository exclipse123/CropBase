// Sample data for Aggie Demo Farm

export interface Field {
  id: string;
  name: string;
  crop: string;
  variety?: string;
  stage: string;
  irrigationType: string;
  acreage: number;
  plantingDate: string;
  status: 'Normal' | 'Attention' | 'Blocked' | 'Overdue' | 'Watch';
  nextTask?: string;
  nextTaskDue?: string;
  overdueCount: number;
}

export interface Task {
  id: string;
  title: string;
  field: string;
  fieldId: string;
  category: 'Irrigation' | 'Fertilization' | 'Pest Control' | 'Harvest' | 'Planting' | 'Maintenance' | 'Scouting';
  dueDate: string;
  dueTime?: string;
  window?: 'Morning' | 'Afternoon' | 'Night' | 'Anytime';
  status: 'To do' | 'In progress' | 'Done' | 'Blocked';
  blockedReason?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  notes?: string;
  importSource?: string;
  crew?: string;
  isOverdue: boolean;
}

export interface Note {
  id: string;
  fieldId: string;
  content: string;
  timestamp: string;
  tags?: string[];
  importSource?: string;
}

export interface ImportRecord {
  id: string;
  fileName: string;
  uploadedTime: string;
  rowsParsed: number;
  fieldsDetected: number;
  tasksCreated: number;
  status: 'Success' | 'Partial' | 'Failed';
}

export interface Change {
  id: string;
  type: 'task_moved' | 'task_overdue' | 'task_blocked' | 'import_added' | 'task_completed';
  description: string;
  timestamp: string;
  relatedField?: string;
  relatedTask?: string;
}

// Sample fields for Aggie Demo Farm
export const demoFields: Field[] = [
  {
    id: 'field-a',
    name: 'Field A',
    crop: 'Rice',
    variety: 'Calrose',
    stage: 'Heading',
    irrigationType: 'Flood',
    acreage: 42.5,
    plantingDate: '2026-01-10',
    status: 'Attention',
    nextTask: 'Check water levels',
    nextTaskDue: '2026-02-14',
    overdueCount: 1
  },
  {
    id: 'field-b',
    name: 'Field B',
    crop: 'Corn',
    variety: 'Sweet corn',
    stage: 'Tasseling',
    irrigationType: 'Drip',
    acreage: 28.3,
    plantingDate: '2025-12-15',
    status: 'Blocked',
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
    irrigationType: 'Overhead',
    acreage: 15.8,
    plantingDate: '2026-01-20',
    status: 'Normal',
    nextTask: 'Scout for pests',
    nextTaskDue: '2026-02-16',
    overdueCount: 0
  },
  {
    id: 'field-d',
    name: 'Field D',
    crop: 'Alfalfa',
    stage: 'Regrowth',
    irrigationType: 'Pivot',
    acreage: 65.0,
    plantingDate: '2025-09-01',
    status: 'Overdue',
    nextTask: 'First cutting',
    nextTaskDue: '2026-02-13',
    overdueCount: 2
  },
  {
    id: 'field-e',
    name: 'Field E',
    crop: 'Orchards',
    variety: 'Almonds',
    stage: 'Fruit set',
    irrigationType: 'Micro-sprinkler',
    acreage: 38.2,
    plantingDate: '2022-03-01',
    status: 'Watch',
    nextTask: 'Monitor bloom health',
    nextTaskDue: '2026-02-14',
    overdueCount: 0
  },
  {
    id: 'field-f',
    name: 'Field F',
    crop: 'Lettuce',
    variety: 'Romaine',
    stage: 'Heading',
    irrigationType: 'Drip',
    acreage: 12.4,
    plantingDate: '2026-01-05',
    status: 'Normal',
    nextTask: 'Harvest ready check',
    nextTaskDue: '2026-02-17',
    overdueCount: 0
  }
];

// Sample tasks
export const demoTasks: Task[] = [
  // Today - Morning
  {
    id: 'task-1',
    title: 'Check water levels',
    field: 'Field A',
    fieldId: 'field-a',
    category: 'Irrigation',
    dueDate: '2026-02-14',
    dueTime: '07:00',
    window: 'Morning',
    status: 'To do',
    priority: 'High',
    notes: 'Water table has been dropping. Need to maintain 2-inch depth.',
    importSource: 'weekly-plan.xlsx, Row 12',
    isOverdue: true
  },
  {
    id: 'task-2',
    title: 'Scout for aphids',
    field: 'Field C',
    fieldId: 'field-c',
    category: 'Scouting',
    dueDate: '2026-02-14',
    dueTime: '08:30',
    window: 'Morning',
    status: 'To do',
    priority: 'Medium',
    notes: 'Focus on lower leaves. Weather has been warm.',
    importSource: 'weekly-plan.xlsx, Row 18',
    isOverdue: false
  },
  {
    id: 'task-3',
    title: 'Calibrate drip lines',
    field: 'Field F',
    fieldId: 'field-f',
    category: 'Irrigation',
    dueDate: '2026-02-14',
    dueTime: '09:00',
    window: 'Morning',
    status: 'In progress',
    priority: 'Medium',
    crew: 'Team A',
    notes: 'Check zones 1-4 for clogs.',
    isOverdue: false
  },
  // Today - Afternoon
  {
    id: 'task-4',
    title: 'Apply nitrogen',
    field: 'Field B',
    fieldId: 'field-b',
    category: 'Fertilization',
    dueDate: '2026-02-14',
    dueTime: '14:00',
    window: 'Afternoon',
    status: 'Blocked',
    blockedReason: 'High wind forecast',
    priority: 'High',
    notes: 'Wait for wind to drop below 10mph. Have 40 bags ready.',
    importSource: 'weekly-plan.xlsx, Row 25',
    isOverdue: false
  },
  {
    id: 'task-5',
    title: 'Monitor bloom health',
    field: 'Field E',
    fieldId: 'field-e',
    category: 'Scouting',
    dueDate: '2026-02-14',
    dueTime: '15:30',
    window: 'Afternoon',
    status: 'To do',
    priority: 'Medium',
    notes: 'Check 20 trees per section. Look for bee activity.',
    isOverdue: false
  },
  {
    id: 'task-6',
    title: 'Inspect pivot system',
    field: 'Field D',
    fieldId: 'field-d',
    category: 'Maintenance',
    dueDate: '2026-02-14',
    dueTime: '16:00',
    window: 'Afternoon',
    status: 'To do',
    priority: 'Low',
    notes: 'Annual check. Look for leaks and tire pressure.',
    isOverdue: false
  },
  // Today - Night
  {
    id: 'task-7',
    title: 'Start overnight irrigation',
    field: 'Field A',
    fieldId: 'field-a',
    category: 'Irrigation',
    dueDate: '2026-02-14',
    dueTime: '20:00',
    window: 'Night',
    status: 'To do',
    priority: 'High',
    notes: 'Run for 8 hours. Monitor flow rate.',
    isOverdue: false
  },
  // Tomorrow
  {
    id: 'task-8',
    title: 'Harvest ready check',
    field: 'Field F',
    fieldId: 'field-f',
    category: 'Harvest',
    dueDate: '2026-02-15',
    dueTime: '07:00',
    window: 'Morning',
    status: 'To do',
    priority: 'High',
    notes: 'Check head firmness. Coordinate with packing crew.',
    isOverdue: false
  },
  {
    id: 'task-9',
    title: 'Apply foliar spray',
    field: 'Field C',
    fieldId: 'field-c',
    category: 'Pest Control',
    dueDate: '2026-02-15',
    dueTime: '08:00',
    window: 'Morning',
    status: 'To do',
    priority: 'Medium',
    notes: 'Use organic spray. Avoid wind above 5mph.',
    isOverdue: false
  },
  {
    id: 'task-10',
    title: 'Soil moisture test',
    field: 'Field B',
    fieldId: 'field-b',
    category: 'Scouting',
    dueDate: '2026-02-15',
    dueTime: '10:00',
    window: 'Morning',
    status: 'To do',
    priority: 'Low',
    notes: 'Test at 6, 12, 18 inch depths. Record readings.',
    isOverdue: false
  },
  // Overdue
  {
    id: 'task-11',
    title: 'First cutting',
    field: 'Field D',
    fieldId: 'field-d',
    category: 'Harvest',
    dueDate: '2026-02-13',
    dueTime: '08:00',
    window: 'Morning',
    status: 'To do',
    priority: 'Critical',
    notes: 'Rain delayed. Start ASAP.',
    importSource: 'weekly-plan.xlsx, Row 8',
    isOverdue: true
  },
  {
    id: 'task-12',
    title: 'Fertilizer application',
    field: 'Field D',
    fieldId: 'field-d',
    category: 'Fertilization',
    dueDate: '2026-02-12',
    status: 'To do',
    priority: 'High',
    notes: 'Postponed due to rain. Apply after cutting.',
    isOverdue: true
  },
  // This week
  {
    id: 'task-13',
    title: 'Scout for pests',
    field: 'Field C',
    fieldId: 'field-c',
    category: 'Scouting',
    dueDate: '2026-02-16',
    dueTime: '09:00',
    window: 'Morning',
    status: 'To do',
    priority: 'Medium',
    notes: 'Weekly check. Look for leaf damage.',
    isOverdue: false
  },
  {
    id: 'task-14',
    title: 'Prune water shoots',
    field: 'Field E',
    fieldId: 'field-e',
    category: 'Maintenance',
    dueDate: '2026-02-16',
    dueTime: '14:00',
    window: 'Afternoon',
    status: 'To do',
    priority: 'Low',
    notes: 'Focus on north section. Crew needs ladders.',
    isOverdue: false
  },
  {
    id: 'task-15',
    title: 'Rotate irrigation blocks',
    field: 'Field F',
    fieldId: 'field-f',
    category: 'Irrigation',
    dueDate: '2026-02-17',
    dueTime: '06:00',
    window: 'Morning',
    status: 'To do',
    priority: 'Medium',
    notes: 'Move to blocks 5-8. Update schedule.',
    isOverdue: false
  },
  {
    id: 'task-16',
    title: 'Weed control spray',
    field: 'Field A',
    fieldId: 'field-a',
    category: 'Pest Control',
    dueDate: '2026-02-17',
    dueTime: '15:00',
    window: 'Afternoon',
    status: 'To do',
    priority: 'Medium',
    notes: 'Spot treat edges. Stay away from water.',
    isOverdue: false
  },
  {
    id: 'task-17',
    title: 'Check pump pressure',
    field: 'Field D',
    fieldId: 'field-d',
    category: 'Maintenance',
    dueDate: '2026-02-18',
    dueTime: '08:00',
    window: 'Morning',
    status: 'To do',
    priority: 'Low',
    notes: 'Monthly check. Log readings.',
    isOverdue: false
  },
  {
    id: 'task-18',
    title: 'Tissue sample collection',
    field: 'Field E',
    fieldId: 'field-e',
    category: 'Scouting',
    dueDate: '2026-02-18',
    dueTime: '10:00',
    window: 'Morning',
    status: 'To do',
    priority: 'Medium',
    notes: 'Send to lab by end of day. 30 sample points.',
    isOverdue: false
  },
  {
    id: 'task-19',
    title: 'Clean filter screens',
    field: 'Field B',
    fieldId: 'field-b',
    category: 'Maintenance',
    dueDate: '2026-02-19',
    dueTime: '09:00',
    window: 'Morning',
    status: 'To do',
    priority: 'Medium',
    notes: 'Drip system maintenance. Replace if damaged.',
    isOverdue: false
  },
  {
    id: 'task-20',
    title: 'Update growth stage records',
    field: 'Field C',
    fieldId: 'field-c',
    category: 'Scouting',
    dueDate: '2026-02-19',
    dueTime: '14:00',
    window: 'Afternoon',
    status: 'To do',
    priority: 'Low',
    notes: 'Weekly observation. Take photos.',
    isOverdue: false
  },
  // Later
  {
    id: 'task-21',
    title: 'Pre-harvest planning',
    field: 'Field F',
    fieldId: 'field-f',
    category: 'Harvest',
    dueDate: '2026-02-20',
    status: 'To do',
    priority: 'High',
    notes: 'Coordinate crew, equipment, and buyers.',
    isOverdue: false
  },
  {
    id: 'task-22',
    title: 'Fertilizer order',
    field: 'Field A',
    fieldId: 'field-a',
    category: 'Fertilization',
    dueDate: '2026-02-21',
    status: 'To do',
    priority: 'Medium',
    notes: 'Order 60 bags urea. Delivery by end of month.',
    isOverdue: false
  },
  {
    id: 'task-23',
    title: 'Equipment service',
    field: 'Field D',
    fieldId: 'field-d',
    category: 'Maintenance',
    dueDate: '2026-02-22',
    status: 'To do',
    priority: 'Low',
    notes: 'Tractor 50-hour service. Schedule downtime.',
    isOverdue: false
  },
  {
    id: 'task-24',
    title: 'Bee hive inspection',
    field: 'Field E',
    fieldId: 'field-e',
    category: 'Scouting',
    dueDate: '2026-02-23',
    status: 'To do',
    priority: 'Medium',
    notes: 'Work with beekeeper. Check pollination activity.',
    isOverdue: false
  },
  {
    id: 'task-25',
    title: 'Soil test planning',
    field: 'Field B',
    fieldId: 'field-b',
    category: 'Scouting',
    dueDate: '2026-02-25',
    status: 'To do',
    priority: 'Low',
    notes: 'Prep for end-of-season soil sampling.',
    isOverdue: false
  }
];

// Sample notes
export const demoNotes: Note[] = [
  {
    id: 'note-1',
    fieldId: 'field-a',
    content: 'Water table dropped 4 inches overnight. Increase flow rate.',
    timestamp: '2026-02-14T06:30:00',
    tags: ['irrigation', 'urgent'],
    importSource: 'daily-log.xlsx'
  },
  {
    id: 'note-2',
    fieldId: 'field-b',
    content: 'Wind picking up. Hold off on spraying until tomorrow.',
    timestamp: '2026-02-14T11:15:00',
    tags: ['weather', 'fertilization']
  },
  {
    id: 'note-3',
    fieldId: 'field-c',
    content: 'Spotted early signs of aphids on south edge. Monitor closely.',
    timestamp: '2026-02-13T15:20:00',
    tags: ['pests', 'scouting'],
    importSource: 'daily-log.xlsx'
  },
  {
    id: 'note-4',
    fieldId: 'field-d',
    content: 'Rain delay pushed cutting back 2 days. Notify buyer.',
    timestamp: '2026-02-13T08:00:00',
    tags: ['harvest', 'weather'],
    importSource: 'daily-log.xlsx'
  },
  {
    id: 'note-5',
    fieldId: 'field-e',
    content: 'Good bee activity seen this morning. Bloom looking healthy.',
    timestamp: '2026-02-14T09:45:00',
    tags: ['pollination', 'scouting']
  },
  {
    id: 'note-6',
    fieldId: 'field-f',
    content: 'Drip line zone 3 has low pressure. Check for clogs.',
    timestamp: '2026-02-13T16:30:00',
    tags: ['irrigation', 'maintenance']
  },
  {
    id: 'note-7',
    fieldId: 'field-a',
    content: 'Birds spotted in field. Consider netting if damage increases.',
    timestamp: '2026-02-12T14:00:00',
    tags: ['pests']
  },
  {
    id: 'note-8',
    fieldId: 'field-c',
    content: 'Growth stage progressing well. Expect harvest window in 3 weeks.',
    timestamp: '2026-02-11T10:30:00',
    tags: ['growth', 'harvest'],
    importSource: 'weekly-plan.xlsx'
  }
];

// Sample import records
export const demoImports: ImportRecord[] = [
  {
    id: 'import-1',
    fileName: 'weekly-plan.xlsx',
    uploadedTime: '2026-02-14T10:00:00',
    rowsParsed: 45,
    fieldsDetected: 6,
    tasksCreated: 18,
    status: 'Success'
  },
  {
    id: 'import-2',
    fileName: 'daily-log.xlsx',
    uploadedTime: '2026-02-13T16:30:00',
    rowsParsed: 32,
    fieldsDetected: 5,
    tasksCreated: 12,
    status: 'Success'
  },
  {
    id: 'import-3',
    fileName: 'field-notes-feb.csv',
    uploadedTime: '2026-02-12T09:15:00',
    rowsParsed: 28,
    fieldsDetected: 6,
    tasksCreated: 8,
    status: 'Partial'
  },
  {
    id: 'import-4',
    fileName: 'irrigation-schedule.xlsx',
    uploadedTime: '2026-02-10T14:20:00',
    rowsParsed: 18,
    fieldsDetected: 4,
    tasksCreated: 6,
    status: 'Success'
  }
];

// Sample changes
export const demoChanges: Change[] = [
  {
    id: 'change-1',
    type: 'task_blocked',
    description: 'Nitrogen application blocked by high wind forecast',
    timestamp: '2026-02-14T11:30:00',
    relatedField: 'Field B',
    relatedTask: 'Apply nitrogen'
  },
  {
    id: 'change-2',
    type: 'task_overdue',
    description: 'First cutting now overdue (delayed by rain)',
    timestamp: '2026-02-14T08:00:00',
    relatedField: 'Field D',
    relatedTask: 'First cutting'
  },
  {
    id: 'change-3',
    type: 'import_added',
    description: 'Import added 18 new tasks from weekly-plan.xlsx',
    timestamp: '2026-02-14T10:00:00'
  },
  {
    id: 'change-4',
    type: 'task_moved',
    description: 'Water check moved to morning due to overnight drop',
    timestamp: '2026-02-14T06:45:00',
    relatedField: 'Field A',
    relatedTask: 'Check water levels'
  }
];
