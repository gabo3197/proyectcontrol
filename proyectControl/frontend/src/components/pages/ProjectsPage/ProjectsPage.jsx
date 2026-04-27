import React, { useEffect, useState, useCallback } from "react";
import MainLayout from "../../templates/MainLayout/MainLayout";
import ProjectList from "../../organisms/ProjectList/ProjectList";
import TaskList from "../../organisms/TaskList/TaskList";
import TaskDetail from "../../organisms/TaskDetail/TaskDetail";
import CreateTaskForm from "../../organisms/CreateTaskForm/CreateTaskForm";
import Modal from "../../molecules/Modal/Modal";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Badge";
import { useProjects } from "../../../hooks/useProjects";
import { useTasks } from "../../../hooks/useTasks";
import { usePersons } from "../../../hooks/usePersons";
import { useAppStore } from "../../../store";
import styles from "./ProjectsPage.module.css";

/**
 * PAGE — ProjectsPage
 * Main dashboard: project grid → task list → task detail (three-column layout).
 */
const ProjectsPage = () => {
  const {
    projects,
    projectsMeta,
    selectedProject,
    tasks,
    tasksMeta,
    selectedTask,
    filters,
  } = useAppStore();
  const { fetchProjects, loading: projectsLoading } = useProjects();
  const { fetchTasks, loading: tasksLoading } = useTasks(selectedProject?.id);
  const { fetchPersons } = usePersons();

  const [projectPage, setProjectPage] = useState(1);
  const [taskPage, setTaskPage] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  // Load persons once
  useEffect(() => {
    fetchPersons();
  }, [fetchPersons]);

  // Load projects when page changes
  useEffect(() => {
    fetchProjects({ page: projectPage, pageSize: 6 });
  }, [fetchProjects, projectPage]);

  // Load tasks when project or filters change
  useEffect(() => {
    if (selectedProject) {
      fetchTasks({
        page: taskPage,
        personId: filters.personId || undefined,
        status: filters.status || undefined,
      });
    }
  }, [selectedProject, taskPage, filters, fetchTasks]);

  const handleSelectProject = useCallback((project) => {
    useAppStore.getState().setSelectedProject(project);
    useAppStore.getState().setSelectedTask(null);
    setTaskPage(1);
  }, []);

  const handleSelectTask = useCallback((task) => {
    useAppStore.getState().setSelectedTask(task);
  }, []);

  const handleFilter = useCallback(() => {
    setTaskPage(1);
  }, []);

  const handleTaskCreated = () => {
    setCreateModalOpen(false);
    fetchTasks({
      page: taskPage,
      personId: filters.personId || undefined,
      status: filters.status || undefined,
    });
    fetchProjects({ page: projectPage, pageSize: 6 });
  };

  const handleTaskUpdated = () => {
    fetchProjects({ page: projectPage, pageSize: 6 });
  };

  const projectTasks = selectedProject ? tasks[selectedProject.id] || [] : [];
  const projectTasksMeta = selectedProject
    ? tasksMeta[selectedProject.id] || null
    : null;

  return (
    <MainLayout
      headerActions={
        <div className={styles.buttonsheader}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCreateUserModalOpen(true)}
          >
            + New user
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCreateModalOpen(true)}
          >
            + New Project
          </Button>
        </div>
      }
    >
      <div className={styles.workspace}>
        {/* ── Column 1: Projects ── */}
        <div className={styles.col1}>
          <div className={styles.colHeader}>
            <h1 className={styles.colTitle}>Projects</h1>
            <span className={styles.colCount}>{projectsMeta?.total ?? 0}</span>
          </div>
          <ProjectList
            projects={projects}
            pagination={projectsMeta}
            loading={projectsLoading}
            selectedId={selectedProject?.id}
            onSelect={handleSelectProject}
            onPageChange={setProjectPage}
          />
        </div>

        {/* ── Column 2: Tasks ── */}
        <div
          className={`${styles.col2} ${!selectedProject ? styles.empty : ""}`}
        >
          {!selectedProject ? (
            <div className={styles.placeholder}>
              <div className={styles.placeholderIcon}>←</div>
              <p className={styles.placeholderText}>
                Select a project to view its tasks
              </p>
            </div>
          ) : (
            <>
              <div className={styles.colHeader}>
                <div className={styles.projectInfo}>
                  <h2 className={styles.colTitle}>{selectedProject.name}</h2>
                  <Badge status={selectedProject.status} size="sm" />
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setCreateModalOpen(true)}
                >
                  + Task
                </Button>
              </div>
              {selectedProject.description && (
                <p className={styles.projectDesc}>
                  {selectedProject.description}
                </p>
              )}
              <TaskList
                tasks={projectTasks}
                pagination={projectTasksMeta}
                loading={tasksLoading}
                selectedId={selectedTask?.id}
                onSelect={handleSelectTask}
                onPageChange={setTaskPage}
                onFilter={handleFilter}
              />
            </>
          )}
        </div>

        {/* ── Column 3: Task Detail ── */}
        <div className={`${styles.col3} ${!selectedTask ? styles.empty : ""}`}>
          {!selectedTask ? (
            <div className={styles.placeholder}>
              <div className={styles.placeholderIcon}>←</div>
              <p className={styles.placeholderText}>
                Select a task to view its details
              </p>
            </div>
          ) : (
            <TaskDetail
              key={selectedTask.id}
              task={selectedTask}
              projectId={selectedProject?.id}
              onUpdated={handleTaskUpdated}
            />
          )}
        </div>
      </div>

      {/* ── Create Task Modal ── */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create new task"
        size="md"
      >
        <CreateTaskForm
          projectId={selectedProject?.id}
          onCreated={handleTaskCreated}
          onCancel={() => setCreateModalOpen(false)}
        />
      </Modal>

      {/* ── Create Project Modal ── */}
      <Modal
        isOpen={createProjectModalOpen}
        onClose={() => setCreateProjectModalOpen(false)}
        title="Create new project"
        size="sm"
      >
        <CreateProjectForm
          onCreated={() => {
            setCreateProjectModalOpen(false);
            fetchProjects({ page: 1, pageSize: 6 });
            setProjectPage(1);
          }}
          onCancel={() => setCreateProjectModalOpen(false)}
        />
      </Modal>
      {/* ── Create User Modal ── */}
      <Modal
        isOpen={createUserModalOpen}
        onClose={() => setCreateUserModalOpen(false)}
        title="Create new project"
        size="sm"
      >
        <CreateUserForm
          onCreated={() => {
            setCreateUserModalOpen(false);
            fetchPersons();
          }}
          onCancel={() => setCreateUserModalOpen(false)}
        />
      </Modal>
    </MainLayout>
  );
};

/* ─── Inline mini-form for project creation ─────────────────────────────── */
const CreateProjectForm = ({ onCreated, onCancel }) => {
  const { createProject, loading } = useProjects();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }
    try {
      await createProject({ name, description });
      onCreated?.();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div>
        <label
          style={{
            fontSize: 13,
            color: "var(--color-text-muted)",
            display: "block",
            marginBottom: 6,
          }}
        >
          Project name *
        </label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="e.g. Mobile App Redesign"
          style={{
            width: "100%",
            background: "var(--color-surface-2)",
            border: `1px solid ${
              error ? "var(--color-danger)" : "var(--color-border)"
            }`,
            borderRadius: "var(--radius-md)",
            padding: "10px 14px",
            color: "var(--color-text)",
            fontSize: 14,
            outline: "none",
            fontFamily: "inherit",
          }}
          autoFocus
        />
        {error && (
          <p
            style={{ fontSize: 12, color: "var(--color-danger)", marginTop: 4 }}
          >
            {error}
          </p>
        )}
      </div>
      <div>
        <label
          style={{
            fontSize: 13,
            color: "var(--color-text-muted)",
            display: "block",
            marginBottom: 6,
          }}
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional project description…"
          rows={3}
          style={{
            width: "100%",
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "10px 14px",
            color: "var(--color-text)",
            fontSize: 14,
            resize: "vertical",
            outline: "none",
            fontFamily: "inherit",
            lineHeight: 1.5,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          paddingTop: 8,
          borderTop: "1px solid var(--color-border-soft)",
        }}
      >
        <Button variant="secondary" size="md" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" size="md" type="submit" loading={loading}>
          Create
        </Button>
      </div>
    </form>
  );
};
/* ─── Inline mini-form for user creation ─────────────────────────────── */
const CreateUserForm = ({ onCreated, onCancel }) => {
  const { createPersons, loading } = usePersons();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }
    try {
      await createPersons({ name, email });
      onCreated?.();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div>
        <label
          style={{
            fontSize: 13,
            color: "var(--color-text-muted)",
            display: "block",
            marginBottom: 6,
          }}
        >
          User name *
        </label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="e.g. Gabo Arguello"
          style={{
            width: "100%",
            background: "var(--color-surface-2)",
            border: `1px solid ${
              error ? "var(--color-danger)" : "var(--color-border)"
            }`,
            borderRadius: "var(--radius-md)",
            padding: "10px 14px",
            color: "var(--color-text)",
            fontSize: 14,
            outline: "none",
            fontFamily: "inherit",
          }}
          autoFocus
        />
        {error && (
          <p
            style={{ fontSize: 12, color: "var(--color-danger)", marginTop: 4 }}
          >
            {error}
          </p>
        )}
      </div>
      <div>
        <label
          style={{
            fontSize: 13,
            color: "var(--color-text-muted)",
            display: "block",
            marginBottom: 6,
          }}
        >
          User email *
        </label>
        <input
          value={name}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="e.g. gabo@correo.com"
          style={{
            width: "100%",
            background: "var(--color-surface-2)",
            border: `1px solid ${
              error ? "var(--color-danger)" : "var(--color-border)"
            }`,
            borderRadius: "var(--radius-md)",
            padding: "10px 14px",
            color: "var(--color-text)",
            fontSize: 14,
            outline: "none",
            fontFamily: "inherit",
          }}
          autoFocus
        />
        {error && (
          <p
            style={{ fontSize: 12, color: "var(--color-danger)", marginTop: 4 }}
          >
            {error}
          </p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          paddingTop: 8,
          borderTop: "1px solid var(--color-border-soft)",
        }}
      >
        <Button variant="secondary" size="md" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" size="md" type="submit" loading={loading}>
          Create
        </Button>
      </div>
    </form>
  );
};

export default ProjectsPage;
