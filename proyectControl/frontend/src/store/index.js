import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  // ── Persons ──────────────────────────────────────────────────────────────
  persons: [],
  setPersons: (persons) => set({ persons }),

  // ── Projects ─────────────────────────────────────────────────────────────
  projects: [],
  projectsMeta: null,
  selectedProject: null,
  setProjects: (projects, meta) => set({ projects, projectsMeta: meta }),
  setSelectedProject: (project) => set({ selectedProject: project }),

  // ── Tasks ─────────────────────────────────────────────────────────────────
  tasks: {},           // keyed by projectId
  tasksMeta: {},       // pagination meta keyed by projectId
  selectedTask: null,
  setTasks: (projectId, tasks, meta) =>
    set((s) => ({
      tasks: { ...s.tasks, [projectId]: tasks },
      tasksMeta: { ...s.tasksMeta, [projectId]: meta },
    })),
  setSelectedTask: (task) => set({ selectedTask: task }),
  addTask: (projectId, task) =>
    set((s) => ({
      tasks: {
        ...s.tasks,
        [projectId]: [task, ...(s.tasks[projectId] || [])],
      },
    })),
  updateTaskInStore: (projectId, updatedTask) =>
    set((s) => ({
      tasks: {
        ...s.tasks,
        [projectId]: (s.tasks[projectId] || []).map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        ),
      },
      selectedTask:
        s.selectedTask?.id === updatedTask.id ? updatedTask : s.selectedTask,
    })),

  // ── UI ────────────────────────────────────────────────────────────────────
  filters: { personId: '', status: '' },
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  resetFilters: () => set({ filters: { personId: '', status: '' } }),
}));
