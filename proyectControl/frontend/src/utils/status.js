export const STATUS_LABELS = {
  new: 'New',
  'in progress': 'In Progress',
  final: 'Final',
};

export const STATUS_COLORS = {
  new: 'new',
  'in progress': 'progress',
  final: 'final',
};

export const TASK_STATUSES = ['new', 'in progress', 'final'];

export const getStatusColor = (status) => STATUS_COLORS[status] || 'new';
export const getStatusLabel = (status) => STATUS_LABELS[status] || status;

export const computeProjectStatus = (tasks = []) => {
  if (!tasks.length) return 'new';
  const statuses = tasks.map((t) => t.status);
  if (statuses.every((s) => s === 'final')) return 'final';
  if (statuses.some((s) => s === 'in progress')) return 'in progress';
  return 'new';
};

export const formatHours = (hours) => {
  if (!hours && hours !== 0) return '—';
  const h = parseFloat(hours);
  if (h < 1) return `${Math.round(h * 60)}m`;
  return `${h}h`;
};

export const getInitials = (name = '') =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
