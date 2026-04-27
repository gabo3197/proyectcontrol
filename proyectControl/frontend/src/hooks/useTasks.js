import { useState, useCallback } from 'react';
import { tasksService } from '../services/tasks';
import { useAppStore } from '../store';

export const useTasks = (projectId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setTasks, setSelectedTask, addTask, updateTaskInStore } = useAppStore();

  const fetchTasks = useCallback(async (params = {}) => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await tasksService.getByProject(projectId, params);
      setTasks(projectId, res.data, res.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId, setTasks]);

  const fetchTask = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await tasksService.getById(id);
      setSelectedTask(res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setSelectedTask]);

  const createTask = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await tasksService.create(projectId, data);
      addTask(projectId, res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId, addTask]);

  const updateTask = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await tasksService.update(id, data);
      updateTaskInStore(projectId, res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId, updateTaskInStore]);

  return { fetchTasks, fetchTask, createTask, updateTask, loading, error };
};
